//更改网络 为慢3g，就可以比较明显的看到进度条了
var fileMaxCount=6;
var imgBox =document.getElementsByClassName('img-box')[0];
var willUploadFile=[];//保存待上传的文件以及相关附属信息
document.getElementById('f1').addEventListener('change',function (e) {
    var fileList = document.getElementById('f1').files;

    if (willUploadFile.length > fileMaxCount || fileList.length>fileMaxCount || (willUploadFile.length+ fileList.length>fileMaxCount)) {
        alert('最多只能上传' + fileMaxCount + '张图');
        return;
    }
    for (var i = 0; i < fileList.length; i++) {
        var f = fileList[i];//先预览图片

        var img = document.createElement('img');
        var item = document.createElement('div');
        var progress = document.createElement('div');
        progress.className='progress';
        progress.innerHTML = '<span class="red"></span><button type="button">Abort</button>';
        item.className='item';
        img.src = window.URL.createObjectURL(f);
        img.onload = function () {
            //显示要是否这块儿内存
            window.URL.revokeObjectURL(this.src);
        }
        
        item.appendChild(img);
        item.appendChild(progress);
        imgBox.appendChild(item);

        willUploadFile.push({
            file:f,
            item,
            progress
        });
    }
});


function xhrSend({file, progress}) {

    // var progressSpan = progress.firstElementChild;
    // var btnCancel = progress.getElementsByTagName('button')[0];
    
    // btnCancel.removeEventListener('click',function(e) {
        
    // });
    // btnCancel.addEventListener('click',function(e) {
    //    if(xhr && xhr.readyState!==4){
    //        //取消上传
    //        xhr.abort();
    //    } 
    // });
    
    // progressSpan.style.width='0';
    // progressSpan.classList.remove('green');

    var fd = new FormData();   //构造FormData对象
    fd.append('f1',file);
    console.log(file,'file')

    var xhr = new XMLHttpRequest();   //创建对象
    xhr.open('POST', 'http://localhost:8100/upload', true);

    xhr.onreadystatechange = function () {
        console.log('state change', xhr.readyState);
        //调用 abort 后，state 立即变成了4,并不会变成0
        //增加自定义属性  xhr.uploaded
        if (xhr.readyState == 4 &&  xhr.uploaded) {
            var obj = JSON.parse(xhr.responseText);   //返回值
            console.log(obj);
            if(obj.fileUrl.length){
                //alert('上传成功');
            }
        }
    }

   // xhr.onprogress=updateProgress;
   // xhr.upload.onprogress = updateProgress;
    function updateProgress(event) {
        if (event.lengthComputable) {
            var completedPercent = (event.loaded / event.total * 100).toFixed(2);
            console.log(completedPercent,'completedPercent')
            progressSpan.style.width= completedPercent+'%';
            progressSpan.innerHTML=completedPercent+'%';
            if(completedPercent>90){//进度条变色
                progressSpan.classList.add('green');
            }
            if(completedPercent>=100){
                xhr.uploaded=true;
            }
            console.log('已上传',completedPercent);
        }
    }
    //注意 send 一定要写在最下面，否则 onprogress 只会执行最后一次 也就是100%的时候
    xhr.send(fd);//发送时  Content-Type默认就是: multipart/form-data; 
    return xhr;
}

//文件上传
function submitUpload(willFiles) {
    if(!willFiles.length){
        return;
    }
    console.log(willFiles,'willFiles')
    //遍历文件信息进行上传
    willFiles.forEach(function (item) {
         xhrSend({
             file:item.file,
             progress:0
         });
    });
}
//绑定提交事件
document.getElementById('btn-submit').addEventListener('click',function () {
    submitUpload(willUploadFile);
});
var box = document.getElementById('drop-box')
// 禁止浏览器的拖放默认行为
document.addEventListener('drop',function(e) {
    e.preventDefault()
})
// 设置拖拽事件
function openDropEvent() {
    box.addEventListener("dragover",function (e) {
        console.log('elemenet dragover');
         box.classList.add('over');
           e.preventDefault();
    });
     box.addEventListener("dragleave", function (e) {
          console.log('elemenet dragleave');
        box.classList.remove('over');
          e.preventDefault();
    });

    box.addEventListener("drop", function (e) {
        e.preventDefault(); //取消浏览器默认拖拽效果

        var fileList = e.dataTransfer.files; //获取拖拽中的文件对象
        var len=fileList.length;//用来获取文件的长度（其实是获得文件数量）
        console.log(fileList,'333')
        
        //检测是否是拖拽文件到页面的操作
        if (!len) {
            box.classList.remove('over');
            return;
        }

        box.classList.add('over');

       // window.willUploadFileList=[fileList];
        xhrSend({
            file:fileList[0],
            progress:0
        })

    }, false);
}
openDropEvent();