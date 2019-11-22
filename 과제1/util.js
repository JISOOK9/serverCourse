const util = {}

util.sendResponse = (res, output) => {
    const outputType = typeof(output)
    console.log('output type -> ' + outputType)

    const result = {
        code: 200,
        message: 'okay',
        data: output
    }

    res.writeHead(200, {'Content-Type':'application/json;charset=UTF-8'})
    res.end(JSON.stringify(result))
}

util.sendError = (res, output) => {
    const result = {
        code: 400,
        message: output
    }

    res.writeHead(200, {'Content-Type': 'application/json;charset=utf8'})
    res.end(JSON.stringify(result))
}
module.exports = util