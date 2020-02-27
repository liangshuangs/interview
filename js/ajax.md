# ajax发送数据的步骤
```
var xhr = new XMLHttpRequest(); // 创建异步对象
xhr.open('post','validate.php'); // 设置请求行open(请求方式，请求url)
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded') // 设置请求头
xhr.send(data) // 设置请求体
xhr.onreadystatechange = function() { // 接受服务器响应数据
    if(xhr.status == 200 && xhr.readyState == 4) {
        console.log(xhr.responseText)
    }
}
```
readyState表示请求的五种状态
0-－未打开：XHR对象已创建，open()方法还没调用
1-－未发送
2-－已获取响应头
3-－正在下载响应体
4-－请求完成