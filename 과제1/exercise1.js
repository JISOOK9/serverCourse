
const http = require('http')
const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')

const CustomerController = require('./customer-controller')
const customerController = new CustomerController()

const config = require('./config')

const app = express()

app.use('/', express.static(path.join(__dirname/*이 파일의 현재 경로를 의미*/, 'public')))

const router = express.Router()

// 라우터 보다 위에 등록 되어야 한다.
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/', router)

config.controller.forEach((item, idx) => {
    router.route(item.path)[item.method](customerController[item.func].bind(customerController))
})

http.createServer(app).listen(config.server.port, () => {
    console.log('웹 서버 준비됨 : ' + config.server.port)
})