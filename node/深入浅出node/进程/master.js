let child = require('child_process').fork('child.js')
let server = require('net').createServer();
server.on('connection',function(socket){
    socket.end('handled by parent \n')
})
server.listen(1337,function() {
    console.log('listen 1337')
    child.send('server',server)
    server.close();
})