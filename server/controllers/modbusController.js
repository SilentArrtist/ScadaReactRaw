const e = require("express");
const modbus = require("jsmodbus");
const net = require('net')
const socket = new net.Socket()
socket.setTimeout(1000*10)
const client = new modbus.client.TCP(socket)

const ApiError = require('../error/ApiError');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db',sqlite3.OPEN_READWRITE,()=>{});
let sql;

let isPollingStart = false;
let isHoldingRegistersUpdate = false;
let holdingRegistersToWriteArray = [];
let isCoilsUpdate = false;
let colisToWriteArray = [];


socket.on('connect', ()=>{
    setInterval(() => {
        if(isHoldingRegistersUpdate){
            client.writeMultipleRegisters(0, holdingRegistersToWriteArray)
            .then(function (resp) {
                return;
            }).catch(function (e) {
                console.error(require('util').inspect(arguments, {depth: null}))
                return;
            }).finally(()=>{isHoldingRegistersUpdate = false})
        }

        if(isCoilsUpdate){
            client.writeMultipleCoils(0, colisToWriteArray)
            .then(function (resp) {
                return;
            }).catch(function (e) {
                console.error(require('util').inspect(arguments, {depth: null}))
                return;
            }).finally(()=>{isCoilsUpdate = false})
        }

        client.readHoldingRegisters(0, 10)
        .then(function (resp) {
            const data = JSON.stringify(resp.response._body.valuesAsArray);
            sql = `UPDATE devices SET holdingRegisters = ? where id = 1`
            db.run(sql,[data],(err)=>{
                if(err) return console.error(err.message)
            })
        }).catch(function () {
            console.error(require('util').inspect(arguments, {depth: null}))
        })

        client.readCoils(0, 10)
        .then(function (resp) {
            const data = JSON.stringify(resp.response._body.valuesAsArray);
            sql = `UPDATE devices SET coils = ? where id = 1`
            db.run(sql,[data],(err)=>{
                if(err) return console.error(err.message)
            })
        }).catch(function () {
            console.error(require('util').inspect(arguments, {depth: null}))
        })

        client.readInputRegisters(0, 10)
        .then(function (resp) {
            const data = JSON.stringify(resp.response._body.valuesAsArray);
            sql = `UPDATE devices SET inputRegisters = ? where id = 1`
            db.run(sql,[data],(err)=>{
                if(err) return console.error(err.message)
            })
        }).catch(function () {
            console.error(require('util').inspect(arguments, {depth: null}))
        })  

        sql = `UPDATE devices SET status = ? where id = 1`
        db.run(sql,[true],(err)=>{
            if(err) return console.error(err.message)
        })
    }, 1000);
}).on('error', (err)=>{
    sql = `UPDATE devices SET status = ? where id = 1`
    db.run(sql,[false],(err)=>{
        if(err) return console.error(err.message)
    })
    sql = `UPDATE devices SET holdingRegisters = ? where id = 1`
    db.run(sql,["[]"],(err)=>{
        if(err) return console.error(err.message)
    })
    sql = `UPDATE devices SET inputRegisters = ? where id = 1`
    db.run(sql,["[]"],(err)=>{
        if(err) return console.error(err.message)
    })
    sql = `UPDATE devices SET coils = ? where id = 1`
    db.run(sql,["[]"],(err)=>{
        if(err) return console.error(err.message)
    })
    console.log(err);
})

function startPolling(){
    isPollingStart = true;
    sql = `SELECT * FROM devices`
    db.all(sql,[],async (err,row)=>{
        if(err) return err.message
        else{
            if(row.length!==0){
                const device = row[0].ip;
                const ipAndPort = device.split(":");
                socket.connect(ipAndPort[1],ipAndPort[0],()=>{})
            }
        }
    })  
}


class ModbusController {
    async addDevice(req, res, next) {
        const {ip} = req.body
        sql = `SELECT * FROM devices WHERE ip = ?`
        db.all(sql,[ip],async (err,row)=>{
            if(err) return err.message
            else{
                if(row.length===0){
                    sql = `INSERT INTO devices(ip,holdingRegisters,inputRegisters,coils,status) VALUES (?,?,?,?,?)`;
                    db.run(sql,[ip,`[]`,`[]`,`[]`,false],(err)=>{
                        if(err) return next(ApiError.internal(err.message))
                        return res.json({message:"Added successfully"})
                    })
                }
                else{
                    return next(ApiError.badRequest('Device with this IP has already been added'))
                }
            }
        })
    }

    async deleteDevice(req, res, next) {
        const {ip} = req.body
        sql = `SELECT * FROM devices WHERE ip = ?`
        db.all(sql,[ip],async (err,row)=>{
            if(err) return err.message
            else{
                if(row.length!==0){
                    const id = row[0].id;
                    sql = `DELETE FROM devices WHERE id = ?`
                    db.run(sql,[id],(err)=>{
                        if(err) return next(ApiError.internal(err))
                        return res.json({message:`deleted successfully`})
                    })
                }
            }
        })
    }

    async getAll(req, res,next) {
        sql = `SELECT * FROM devices`
        db.all(sql,[],async (err,rows)=>{
            if(err) return next(ApiError.internal(err.message) )
            if(!isPollingStart)startPolling();
            return res.json({data:rows});
        })
    }

    async changeValue(req, res,next) {
        const {tagName,tagIndex,tagValue} = req.body
        sql = `SELECT * FROM devices`
        db.all(sql,[],async (err,rows)=>{
            if(err) return next(ApiError.internal(err.message)) 
            if(rows.length!==0){
                if(rows[0].status!==false)
                {
                    if(tagName === "holdingRegisters")
                    {
                        holdingRegistersToWriteArray = JSON.parse(rows[0].holdingRegisters);
                        holdingRegistersToWriteArray[tagIndex] = tagValue;
                        isHoldingRegistersUpdate = true;
                        return;
                    }
                    else if(tagName === "coils")
                    {
                        colisToWriteArray = JSON.parse(rows[0].coils);
                        colisToWriteArray[tagIndex] = tagValue;
                        isCoilsUpdate = true;
                        return;
                    }
                    return;
                }
            }
        })
    }

    async getSave(req, res) {
        sql = `SELECT * FROM save`
        db.all(sql,[],(err,rows)=>{
            if(err) return next(ApiError.internal(err.message)) 
            return res.json({data:rows});
        })
    }

    async setSave(req, res,next) {
        const {elements} = req.body
        sql = `UPDATE save SET elements = ? where id = 1`
        db.run(sql,[elements],(err)=>{
            if(err) return console.error(err.message)
            return res.json({message:"Saved successfully"});
        })
    }
}

module.exports = new ModbusController()
