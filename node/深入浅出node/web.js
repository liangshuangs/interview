let http = require('http')
http.createServer(function(req, res) {
    let pathName = url.pase(req.url)
    
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('hello word')
}).listen(1337,'127.0.0.1')