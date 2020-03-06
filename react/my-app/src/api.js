
// uploadChunk
export const uploadChunk = (data) => {
    let chunks = splitChunk(data)
    for(let i = 0; i < chunks.length; i++) {
        uploadFile(chunks[i])
    }

}
export const uploadFile = (data) => {
    var fd = new FormData();   //构造FormData对象
    fd.append('file', data);//支持多文件上传
    let url = 'http://localhost:8100/upload'
   return postFn(url, fd)
}
// 切片
export const splitChunk = (file) => {
    let chunkSize = 2 * 1024 * 1024 // 2M
    let chunks = []
    let token = (+ new Date())
    if(file.size <= chunkSize) {
      chunks.push(file)
    }else {
      let start = 0, end = 0;
      while(true) {
        end += chunkSize
        let blob = file.slice(start, end)
        start += chunkSize
        if(!blob.size) {
          break
        }
        chunks.push(blob)
      }
    }
    return chunks
  }
export const postFn = (url,fd) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', url, true);
        xhr.send(fd);//发送时  Content-Type默认就是: multipart/form-data; 
        xhr.onreadystatechange = function () {
            console.log('state change', xhr.readyState);
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                resolve(obj)
                if(obj.fileUrl.length){
                    alert('上传成功');
                }
            }
        };
        // xhr.onprogress=updateProgress;
        // xhr.upload.onprogress = updateProgress;
    })
   
}
function updateProgress(event) {
    console.log(event);
    if (event.lengthComputable) {
        var completedPercent = (event.loaded / event.total * 100).toFixed(2);
        //console.log(event,'event')
        // progressSpan.style.width= completedPercent+'%';
        // progressSpan.innerHTML=completedPercent+'%';
        // if(completedPercent>90){//进度条变色
        //     progressSpan.classList.add('green');
        // }
    }
}