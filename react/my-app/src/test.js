import React, { useState, useEffect } from 'react'
function App() {
    const [count, setCount] = useState(0)
    // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
    return (
        <div>
            <input />
            <p>you clicked444{count} times</p>
            <button onClick={() => setCount(count + 1)}>
                click me
            </button>
        </div>
    )

}
export default App;