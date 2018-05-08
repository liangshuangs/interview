1: 盒模型

IE盒模型、标准模型
IE盒模型：width = content+padding＋border
标准模型：width = content
盒模型的内容：content＋padding＋margin＋border
如何实现模型的转变 box-sizing:border(IE盒模型) box-sizing:content(标准模型)

2:css居中

水平居中

行内元素：text-align:center
块级元素： 定宽（margin：0 auto） 不定宽(父级元素：display:flex,justify-content:center)

垂直居中
行内元素：line-height = height
块级元素： 定宽（margin：0 auto） 不定宽(父级元素：display:flex,align-items:center)

水平垂直居中
position:absolute top:50% left:50% transfrom:translate(-50%,-50%)

3:position的几个属性

static:没有脱离文档流
absolute:绝对定位 相对与除static外的第一个父类元素 脱离文档流
relative：相对定位，相对其在文档流中的正常位置 并没有脱离文档流
fixed：固定定位，相对与浏览器的窗口 脱离文档流
inherit：规定从父类处继承position属性

4:css3新特性
 圆角（border-radius） 阴影（box-shadow） 边框图片（border-image）
 对文字加特效（text-shadow）强制文本换行（word-wrap） 线性渐变（line-gradient）
 旋转（rotate），缩放(scale)，定位(translate)，倾斜(skew)
 增加了更多选择器 el:nd-th(n),伪元素 ::selection
 媒体查询（ @media） 多栏布局（flex）

