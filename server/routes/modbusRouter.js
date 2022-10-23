const Router = require('express')
const router = new Router()
const modbusController = require('../controllers/modbusController')

router.post('/create', modbusController.addDevice)
router.post('/delete', modbusController.deleteDevice)
router.post('/change/value', modbusController.changeValue)
router.post('/set/save', modbusController.setSave)
router.get('/get/save', modbusController.getSave)
router.get('/get/all', modbusController.getAll)
module.exports = router
