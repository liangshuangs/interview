主要围绕以下几个问题？
1. 为什么？
2. 怎么做？
3. 有什么优点缺点？

# webrtc为了解决什么问题？
为了解决实时音视频传输的问题。
## 现有的实时流媒体的实现方式：webrtc、hls、rtmp
### hls（http live streaming）
主要是用于直播，把流媒体拆成多个独立的小文件，按照播放事件请求不同文件，把hls的文件进行解复用之后取出音视频数据然后丢给video去播放
使用http协议，所以兼容性和稳定性都很好
服务端可以把hls文件上传到cdn上，可以应对百万级别观众的直播
缺点：延时比较大，通常在10s以上
### RTMP
苹果退出的，使用长连接，接受不间断的数据流，所以延时要比hls要小很多，通常在1-3秒
需要使用flv视频容器，原生的浏览器不支持
### WebRTC
做到比RTMP提供更低的延时和更小的缓冲率
## webRTC的组成
1. getUserMedia:获取本地的多媒体数据，如调起摄像头录像等
2. RTCPeerConnection：负责建立P2P连接以及传输多媒体数据（数据不用经过服务器）
3. RTCDataChannel:提供一个信令通道
### RTCPeerConnection实现点对点传输数据，首要解决的问题是NAT穿墙打洞？为什么？怎么做？通过什么协议传输数据
1. 什么要NAT穿墙打洞？
要连接对方，首先要知道对方的IP地址和端口号，两台设备连在同一个路由器下，会被路由器转换成不同的端口，对外网表现为相同的IP不同的端口号，当服务器再给这两个端口发送数据的时候，路由器再根据地址转换表把数据发给相应的主机
2. 怎么打洞？
第一步：服务器（S）先与其中一方（A）建立连接，这个时候路由器就会建立一个端口号内网和外网的映射关系并保存起来。这个时候服务器在把A的端口和IP地址告诉另一方（B），让它和这个打好洞的地址进行连接，这就是P2P连接穿墙打洞的原理。
打不了洞的情况，如果路由器的映射关系既取决与内容的IP＋端口，也取决与服务器的IP＋端口号，这个时候就打不了洞，因为服务器打的这个洞，因为服务器拿到的A这个IP＋端口，是与服务器有有关的，只能在这两者间用，不同给其他的应用程序用，这个时候就打不了洞，那怎么办呢？
webRTC也提供了解决方法，即用一个服务器转发多媒体数据
帮忙打洞的服务器叫TURN服务，转发多媒体数据的服务叫STUN服务
## 具体的工作流程？
1. 通过getUserMedia获取到本地的多媒体数据mediaStream后
2. 把这个iceConfig传给RTCPeerConnection,然后创建一个offer，这个offer主要是描述了本机的一些网络和媒体信息（sdp格式）
3. 然后通过websocket把这个offer发给对方，对方接受到后创建一个answer，格式和作用和offer是一样的。当任意一方接受到sdp后，就会调起setRemoteDescription记录起来
4. 当收到默认的ICE server(打通服务器)发来的打洞信息candidate之后，再通过websocket发送给对方，让对方发起P2P连接，成功的话就会触发onaddstream事件，把事件里的event.stream画到video上面即得到对方的影像
```
// 发送方
const pc = new RTCPeerConnection(iceConfig)
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
sendToPeerViaSingalingServer(SINNALING_OFFER,offer)// 用websocket发送信令给对方
// 接受方
const pc = new RTCPeerConnection(iceConfig);
await pc.setRemoteDescription(offer);
const answer = await pc.createAnswer();
await pc.setLocalDescription(answer);
sendToPeerViaSignalingServer(SIGNALING_ANSWER, answer); // 接收方发送信令消息

```