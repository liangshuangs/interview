## react中的setState是同步还是异步？
setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimetout中都是同步的。
1. 合成事件：就是react在组件中的onClick等都是属于它自定义的合成事件
2. 比如通过addeventLister添加的，dom中原生事件
setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
## React合成事件和原生事件区别
React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，然后React将事件封装给正式的函数处理运行和处理.
## React为什么要合成事件？
如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。
1. 当用户在为onClick添加函数时，React并没有将Click时间绑定在DOM上面。
2. 而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
3. 所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行。
看下面的例子：
```
class Text extends Component {
    constructor() {
        super(arguments)
        this.onReactClick.bind(this)
    }
    componentDidMount() {
        const parentDom = ReactDOM.findDOMNode(this)
        const childrenDom = parentDom.queneSlector('.button')
        childrenDom.addEventLister('click',this.onDomClick, flase)
    }
    onDomClick() {
        console.log('dom click')
    }
    onReactClick() {
        console.log('react click')
    }
    render() {
        <div>
            <button className="button" onClick={this.onReactClick()}>点击</button>
        </div>    
    }
}
// 结果： dom click  react click
```
原生的事件先于合成事件，说明合成事件不是绑定在dom上，而是绑到了document上，通过冒泡来实现