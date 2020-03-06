import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {uploadFile,uploadChunk} from './api'

function App() {
  const [files, setFile] = useState([])
  const handleFileChange = (e) =>{
    let file = e.target.files[0]
    setFile(file)
    uploadChunk(file)
  }
  const inserNodeToEditor = (editor, ele) =>{
    let range;
    let node = window.getSelection().anchorNode;
    if(node != null) {
      range = window.getSelection().getRangeAt(0);// 获取光标起始位置
            range.insertNode(ele);// 在光标位置插入该对象
    }else {
      editor.append(ele);
    }
  }
  // 切片
  const splitChunk = (file) => {
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
  
  // 粘贴上传
  const handleOnPaste = (event) => {
    let data = (event.clipboardData || window.clipboardData);
    let items = data.items;
    let fileList = [];//存储文件数据
        if (items && items.length) {
            // 检索剪切板items
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].getAsFile());
                let file = items[i].getAsFile()
                var img = document.createElement('img');
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                  img.src=this.result;
                }
                  img.style.width='100px';
                  let range = window.getSelection().getRangeAt(0);// 获取光标起始位置
          range.insertNode(img);// 在光标位置插入该对象
                uploadFile(file).then(res => {
                })
            }
        }
  }
  return (
    <div className="App">
      react demo
      <input id="file" onChange={handleFileChange} type="file"  name="file" multiple="multiple"/>
      <div className="editor-box" id="editor-box" contenteditable="true" onPaste={handleOnPaste}>
       可以直接粘贴图片到这里直接上传
 </div>
      <ul className="upload-file">
      <li>{files.name}</li>
      </ul>
    </div>
  );
}

export default App;
