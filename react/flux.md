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
redux可以被看作flux的一种实现吗？是，也可以说不是