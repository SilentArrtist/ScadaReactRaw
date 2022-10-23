const Router = require('express')
const router = new Router()
const modbusRouter = require('./modbusRouter')
const userRouter = require('./userRouter')

router.use('/modbus', modbusRouter)
router.use('/user', userRouter)

module.exports = router
