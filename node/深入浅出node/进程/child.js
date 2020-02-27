
let http = require('http')
let server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('handled by child, pid is ' + process.pid + '\n'); }); // 在子进程开启一个服务
process.on('message',function(m, tcp) {
    if(m === 'server') {
        tcp.on('connection',function(socket) {
            server.emit('connection',socket)
        })
    }
})    