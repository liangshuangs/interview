# flux
flux是另外一个独立于React的架构，flux就是用来管理数据流的；和其他的MVC框架倡导的双向数据绑定不同，Flux使用了单向数据绑定的机制，即数据模型到视图的流动；如下两个图展示MVC和Flux之间的差异：
![Image text](https://github.com/liangshuangs/interview/blob/master/react/images/flux.jpg)
![Image text](https://github.com/liangshuangs/interview/blob/master/react/images/mvc.jpg)

Flux主要使用了三个概念：Dispatcher,action和store
1. action 使用传递数据给dispatcher的操作集合，action可能来自于用户界面的操作，也可能是服务器端的数据更新
2. dispatcher是一个全局的分发器，接受action，并传递给注册的回调函数
3. stores包含了应用的状态及注册到dispatcher的回调函数，这些函数用于处理业务逻辑
4. react view从store取得state和其他数据，并更新界面
## Flux和redux的区别？
### redux三个原则
1. 单一数据源：整个应用的sate被储存在一个object tree中，并且这个object tree只存在于唯一一个store中。
2. state是只读的：唯一改变state的方法是触发action,action是一个用于描述已发生事件的普通对象。
3. 使用纯函数来执行修改
什么是纯函数？
如果函数的入参相同，则永远返回相同的结果。不会产生其他的副作用
只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算
### redux可以被看作flux的一种实现吗？是，也可以说不是
1. 相同点：两者都不允许程序直接修改数据，而是用一个叫action的普通对象来对更改进行描述
2. 不同点：redux并没有dispatcher的概念，原因是它依赖纯函数来替代事件处理器。
