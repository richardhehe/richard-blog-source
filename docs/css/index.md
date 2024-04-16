# CSS

## 基础

### CSS 选择器及其优先级

| **选择器**     | **格式**      | **优先级权重** |
| -------------- | ------------- | -------------- |
| id 选择器      | #id           | 100            |
| 类选择器       | #classname    | 10             |
| 属性选择器     | a[ref=“eee”]  | 10             |
| 伪类选择器     | li:last-child | 10             |
| 标签选择器     | div           | 1              |
| 伪元素选择器   | li::after     | 1              |
| 相邻兄弟选择器 | h1+p          | 0              |
| 子选择器       | ul>li         | 0              |
| 后代选择器     | li a          | 0              |
| 通配符选择器   | *             | 0              |

- 标签选择器 类选择器 id选择器
- 后代选择器 `.father p`
- 子代选择器 `.father>p>a`
复杂选择器
- 通配符选择器
- 并集选择器 `p,div 满足其中一个`
- 交集选择器 `p.red 既又都要满足`
- 属性选择器 `a[rel = "external"]`
- 伪类选择器 `a:hover`, `li:nth-child`

对于选择器的**优先级**：
important>行内>id>类>标签>继承

**注意事项：**

- 如果优先级相同，则最后出现的样式生效；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

### CSS 中可继承属性有哪些

**有继承性的属性**

`字体系列属性`

- font-family：字体系列
- font-weight：字体的粗细
- font-size：字体的大小
- font-style：字体的风格

`文本系列属性`

- text-indent：文本缩进
- text-align：文本水平对齐
- line-height：行高
- color：文本颜色
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）

`元素可见性`

- visibility：控制元素显示隐藏
- opacity

`列表布局属性`

- list-style：列表风格，包括 list-style-type、list-style-image 等

`光标属性`

- cursor：光标显示为何种形态

### display 的属性值及其作用

| **属性值**   | **作用**                                                   |
| ------------ | ---------------------------------------------------------- |
| none         | 元素不显示，并且会从文档流中移除。                         |
| block        | 块类型。默认宽度为父元素宽度，可设置宽高，换行显示。       |
| inline       | 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。               |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                 |
| table        | 此元素会作为块级表格来显示。                               |
| inherit      | 规定应该从父元素继承 display 属性的值。                    |

### block、inline和inline-block区别

（1）**block：** 会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性；

（2）**inline：** 元素不会独占一行，设置 width、height 属性无效。但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；

（3）**inline-block：** 将对象设置为 inline 对象，但对象的内容作为 block 对象呈现，之后的内联对象会被排列在同一行内。

对于行内元素和块级元素，其特点如下：

**（1）行内元素**

- 设置宽高无效；
- 可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin；
- 不会自动换行；

**（2）块级元素**

- 可以设置宽高；
- 设置 margin 和 padding 都有效；
- 可以自动换行；
- 多个块状，默认排列从上到下。

### 隐藏元素的方法有哪些

- `overflow：hidden` 多余的部分隐藏，会触发BFC
- `visibility：hidden` 隐藏之后会继续在文档流中占位，不能触发点击事件，会触发重绘
- `display：none` 隐藏元素，会从页面中删除掉dom，所以会触发回流和重绘
- `opcitiy: 0` 透明，会继续在文档流中占位，所以触发重绘。由于是作用于元素自身，所以子元素会继承，全部变透明
- `rgba(0,0,0,0)` 透明，会继续在文档流中占位，所以触发重绘。由于只作用于颜色或背景色，所以子元素不会继承
- `position: absolute;` 设置一个很大的 left 负值定位，使元素定位在可见区域之外；
- `transform: scale(0);` 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留；

后面不说

- `z-index: 负值**`：来使其他元素遮盖住该元素，以此来实现隐藏。
- `<div hidden="hidden">` `HTML5`属性,效果和`display:none;`相同，但这个属性用于记录一个元素的状态；
- `height: 0;` 将元素高度设为 0 ，并消除边框；
- `filter: blur(0);` `CSS3`属性，括号内的数值越大，图像高斯模糊的程度越大，到达一定程度可使图像消失`（此处感谢小伙伴支持）`；

另外 `transition` 过渡不支持 `display:none`，其他三个是支持的

### display:none与visibility:hidden区别

都是让元素隐藏。两者**区别如下：**

**隐藏方式：**

- display: none：移出页面中的dom元素，并在页面中不占据空间，其他元素会填充它的位置。
- visibility: hidden：隐藏元素，但仍保留其布局空间，其他元素不会填充它的位置。

**性能消耗：**

- display: none：初始性能开销较低，因为它不会被渲染
- visibility: hidden：初始性能开销较高，因为它仍然需要被渲染

如果要完全移除元素并且不占用布局空间，使用display: none，否则使用visibility: hidden

### overflow属性溢出元素内容区的处理

- 参数是`scroll`的时候，一定会出滚动条；
- 参数是`auto`的时候，子元素内容大于父元素时出现滚动条；
- 参数是`visible`的时候，溢出的内容出现在父元素之外；
- 参数是`hidden`的时候，溢出隐藏；

### link 和@import 的区别

link和@import是引入外部资源（如样式表）的两种方法，它们有一些区别。

`<link>` 和 `@import` 都是用于引入外部资源（通常是 CSS 文件）的方法，它们有一些区别：

- 语法：

`<link>` 是 HTML 元素，通过在 HTML 文档中使用 `<link>` 元素来引入外部 CSS 文件，例如：`<link rel="stylesheet" href="styles.css">`。
`@import` 是 CSS 规则，通过在 CSS 文件中使用 @import 规则来引入外部 CSS 文件，例如：`@import url('styles.css');`。

- 加载时机：

`<link>` 元素在页面加载时会同时加载和解析 CSS 文件，并且不会阻塞页面的渲染。
`@import` 规则只有在解析到它的位置时才会开始加载并解析被引入的 CSS 文件，这可能会导致页面在加载 CSS 文件之前出现闪烁的情况。

- 权重：

在 CSS 文件中使用 @import 规则引入的样式表会被视为嵌套在引入它的样式表中，因此具有更低的权重。而使用 `<link>` 元素引入的样式表则具有较高的权重，会覆盖通过 @import 引入的样式表。

- 兼容性：

`<link>` 元素在所有浏览器中都有良好的兼容性，支持所有主流浏览器。
@import 规则在较老的浏览器（如 IE 8 及更早版本）中可能存在兼容性问题，不建议在生产环境中过度依赖它。

总的来说，推荐使用 `<link>` 元素来引入外部 CSS 文件，因为它具有更好的性能和更广泛的兼容性。而 @import 规则更适合在 CSS 文件内部引入较小的模块化样式，或者用于特定的样式表加载策略。

### 伪元素和伪类的区别和作用

- 伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在页面显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```css
p::before {content:"第一章：";}
p::after {content:"Hot!";}
p::first-line {background:red;}
p::first-letter {font-size:30px;}
```

- 伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {color: #FF00FF}
p:first-child {color: red}
```

**总结：** 伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。

### 对盒模型的理解

盒模型（Box Model）是指在网页布局中，可以把每个 HTML 元素都被看作是一个矩形的盒子，包括元素的内容、内边距、边框和外边距。盒模型定义了元素在页面中所占的空间和每个盒子之间如何相互影响。

**盒模型类型**

w3c标准盒模型 + 怪异盒模型（IE盒模型）

  - 标准盒子模型盒子的width/height仅包括内容区域`content`
  - IE盒子模型盒子的宽高则包括`content + padding + border`部分

IE 盒模型的出现主要是因为在早期的 Web 开发中，Internet Explorer 浏览器（尤其是 IE6）采用了这种不符合标准的盒模型计算方式，与其他浏览器存在差异。这导致在编写 CSS 样式时，开发者需要对不同浏览器的盒模型进行兼容处理。

随着时间的推移，各大现代浏览器逐渐对标准盒模型达成了共识，并遵循了标准的盒模型计算方式。然而，为了保持对旧版网站的兼容性，某些浏览器（如 IE）仍然提供了通过特定的 CSS 属性（如 box-sizing）来切换到 IE 盒模型的支持。

为了避免盒模型的混乱，可以在CSS中使用box-sizing属性来明确指定所需的盒模型

  - 标准：box-sizing：content-box;(浏览器默认)
  - IE：box-sizing: border-box;
  - box-sizing: inherit为继承父元素的 box-sizing 属性。

### 如何获取元素盒模型的宽高

**偏移尺寸**

- offsetWidth/offsetHeight(content+padding+border) 返回元素的宽高(最常用的，也是兼容最好的)
- offsetLeft/offsetTop:距离最近的有定位的父元素的偏移量

**客户端尺寸**

- clientWidth/clientHeight(content+padding) 返回元素可视区的宽高，不包括boder和滚动条
- clientLeft/clientTop:返回元素左边框的宽

**滚动尺寸**

- scrollWidth/scrollHeight(content+padding): 返回元素里面的宽，包括滚动条部分
- scrollleft/scrolltop：元素里面内容从顶部滚出去的距离，可以动态赋值，其他都不行

**浏览器尺寸**

- window.innerHeight/innerWidth 获取浏览器可视区的大小
- window.pageYoffset/pageXoffset 获取浏览器滚出去的距离

**其他**

- document.style.width/height 获取的是字符串`200px`，只能获取dom内联样式宽高，嵌入style标签和外联css文件获取不到
- dom.getBoundingClientRect().width/height 这种方式是根据元素在视窗中的绝对位置来获取宽高的
- window.getComputedStyle(dom).width/height获取的是字符串`200px`，这种方式的原理和2是一样的，这个可以兼容更多的浏览器，通用性好一些。
- document.currentStyle.width/height:获取是在页面渲染完成后的结果，不论什么设置样式的方式都能获取到。IE浏览器不支持

### 对 BFC 的理解，如何创建 BFC

BFC（块级格式化上下文，Block Formatting Context）是 CSS 中一种布局机制，它定义了块级元素在文档中的布局方式。

**BFC 的特点：**

`元素布局独立性`：BFC 是一个独立的渲染区域，内部的元素按照一定的规则进行布局，**内部的元素**不会影响到外部的布局

**创建 BFC 的条件：**

- `body` 本身BFC元素
- `overflow`的值 hidden | auto | scroll；不为`visible`(这个最合适，其他的会影响布局)
- `float`的值不为`none`
- `display`的值为 inline-block | tabke-cell | table-caption | flex等；不为`block`和`inline`和`none`
- `position`的值为 absolute | fixed; 不为`relative`

**BFC 的作用：**

- **相邻元素 margin 的重叠问题**：正常情况下，上下相邻的两个块级元素的垂直外边距（margin）会发生重叠，创建BFC来解决。因为BFC 是一个独立的区域，内部的元素不会影响到外面的元素，将两个块级元素作为子元素，将它们两个的父级元素变为两个 BFC，就解决了 margin 重叠的问题。
    - 两个相邻的外面边距是正数时，折叠结果就是他们之中的较大值；
    - 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值；
    - 两个外边距一正一负时，折叠结果是两者的相加的和；

- **父子元素 margin 塌陷的问题**：子盒子在使用`margin-top`的时候，父盒子也会也会跟着塌陷下来，给父盒子设置BFC，也可以给父盒子加`padding/border`
- **解决高度塌陷的问题**：在对子元素设置浮动或后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置`overflow: hidden`。
- **创建自适应两栏布局**：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

### 前端动画方案有哪些

主要分类为css动画和js动画，做动画最优的方案无疑是css动画，但是某些特定场景下，css动画无法实现我们所需要的需求，此时，我们就要考虑使用js去做动画了

**CSS3动画**

- `transition`过渡动画
- `animation`直接动画（搭配@keyframes）

**js动画**

- `setInterval`或`setTimeout`定时器（比如不停地更改dom元素的位置，使其运动起来）
- `canvas`动画，搭配js中的定时器去运动起来（canvas只是一个画笔，然后我们通过定时器会使用这个画笔去画画-动画）
- `requestAnimationFrame`动画（js动画中的较好方案）

另有svg动画标签，不过工作中这种方式是比较少的，这里不赘述

### transition 和 animation 的区别

transition属性允许我们定义元素从一个状态过渡到另一个状态的动画效果。它是基于元素属性的变化来触发动画。可以使用transition属性来定义元素属性的变化过程，包括属性的变化时间、过渡效果的类型（如淡入、缩放等）以及延迟等

```css
/* 定义一个过渡效果 */
.element {
  transition: width 0.3s ease;
}

/* 触发过渡效果 */
.element:hover {
  width: 200px;
}
```

animation属性允许我们创建更复杂和自定义的动画效果。它使用关键帧（keyframes）来定义动画的每个阶段，可以在不同的关键帧之间设置元素属性的变化。通过定义多个关键帧，我们可以创建更为精细的动画效果，例如循环、逆向等

```css
/* 定义一个动画效果 */
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
/* 应用动画效果 */
.element {
  animation: slide-in 1s ease-in-out;
}
```

上述示例中，元素会在1秒的时间内从左侧滑入，从translateX(-100%)的位置到translateX(0)的位置。

**主要区别**

- transition适用于简单的属性变化过渡，而animation适用于复杂的动画效果。
- transition通常是通过触发事件（如鼠标悬停）或添加/移除类名来启动，而animation可以通过添加类名、JavaScript 控制或自动循环等方式启动。
- transition只能定义两个状态之间的过渡效果，而animation可以定义多个关键帧之间的变化。
- transition只需要指定过渡时间、过渡效果类型和延迟等简单属性，而animation需要使用关键帧来定义动画的每个阶段。
- transition可以通过transition-property属性指定需要过渡的属性，而animation可以同时控制多个属性的变化。
- animation更适合创建复杂、连续的动画效果，而transition更适合简单的过渡效果。

### 对requestAnimationframe 的理解

`requestAnimationFrame(请求动画帧)`是HTML5 提供一个专门用于在浏览器中执行动画的 API。它的主要作用是在每个浏览器重绘（repaint）之前调用指定的回调函数，以便创建平滑的动画效果。这个api就是解决了定时器不精准的问题的。

`window.requestAnimationFrame(callback)` 其中，callback 是**下一次重绘之前更新动画帧所调用的函数**(即上面所说的回调函数)。该方法属于**宏任务**，所以会在执行完微任务之后再去执行。使用 `cancelAnimationFrame()`来取消执行动画，该方法接收一个参数——requestAnimationFrame 默认返回的 id，只需要传入这个 id 就可以取消动画了。

**为什么定时器会卡**

- 我们在手机或者电脑显示屏上看东西时，显示屏会默默的刷新画面
- 这个刷新值得是每秒钟刷新次数，普通显示器的刷新率约为60Hz（每秒刷新60次），高档的有75Hz、90Hz、120Hz、144Hz等等
- 刷新率次数越高，显示器显示的图像越流畅
- 动画想要丝滑流畅，需要卡住时间点进行代码操作（代码语句赋值、浏览器重绘）
- 所以只需要每隔1000毫秒的60分之一（60HZ）即约为17毫秒，进行一次动画操作即可
- 但是定时器的回调函数，会受到js的事件队列宏任务、微任务影响，可能设定的是17毫秒执行一次，实际执行时间总是比设定时间要晚，这次是17毫秒、下次21毫秒，所以并不是严格的卡住了这个60HZ的时间
- 没有在合适的时间点操作，就会出现：类似这样的情况：变、不变、不变、变、不变...
- 于是就出现了，绘制不及时的情况，就会有抖动的出现

**为何requestAnimationFrame不会卡**

`requestAnimationFrame`能够做到，精准严格的卡住显示器刷新的时间，比如普通显示器60HZ它会自动对应17ms执行一次，比如高级显示器120HZ，它会自动对应9ms执行一次。换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象。当然requestAnimationFrame只会执行一次，想要使其多次执行，要写成递归的形式。

**优势：**

- **CPU 节能**：使用 SetTinterval 实现的动画，当页面被隐藏或最小化时，SetTinterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 RequestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 RequestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
- **函数节流**：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。
- **减少 DOM 操作**：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。

### li与li之间有空白间隔的原因

浏览器会把内联元素(inline/inline-block)间的空白字符（空格、换行、Tab 等）渲染成一个空格

**解决办法：**

- 为`<li>`设置 float:left。不足：塌陷，有些时候需要清除浮动
- 将`<ul>`内的`font-size`直接设为 0。不足：由于font-size是可继承的，所以子元素还需要单独设置font-size
- margin 负值
- 使用注释拼接，如下
- 将所有`<li>`写在同一行。不足：代码不美观。
- 消除`<ul>`的字符间隔 letter-spacing:-8px，不足：这也设置了`<li>`内的字符间隔，因此需要将`<li>`内的字符间隔设为默认 letter-spacing:normal。

线上代码通过压缩之后，没有换行，所以不会出现问题

### CSS3 中有哪些新特性

**选择器**

- 属性选择器：根据元素的属性值选择元素。
- 伪类选择器：选择元素的特定状态，如:hover、:active等。
- 伪元素选择器：选择元素的特定部分，如::before、::after等。

**盒模型**

- box-sizing：指定元素的盒模型计算方式，可以是 content-box（默认）或 border-box。
- 边框圆角：使用 border-radius 属性可以创建圆角边框。
- 阴影效果：使用 box-shadow 属性可以添加元素的阴影效果。

**过渡和动画**

- 过渡效果：使用 transition 属性可以为元素的样式变化添加平滑过渡效果。
- 动画效果：使用 @keyframes 规则可以创建关键帧动画，并通过 animation 属性应用到元素上。

**布局**

- 弹性盒子布局：使用 flexbox 布局模型可以实现灵活的、响应式的页面布局。
- 网格布局：使用 grid 布局模型可以创建复杂的网格式布局，以更精确地控制元素的位置和大小。
- 媒体查询：使用媒体查询可以根据设备的特性和视口尺寸来应用不同的样式规则，实现响应式布局。

**2d**

- 2d转换： tranform对元素进行移动、缩放、转动、拉长或拉伸。旋转`（rotate`）/缩放`（scale）`/倾斜`（skew）`/移动`（translate）`;
- 3d转换： 操作与2D相同，只是多了一个对Z轴的操作，如translateZ()，而rotate也分为rotateX(), rotateY(), rotateZ()，分别表示绕着X轴，Y轴，Z轴旋转。2D变换的rotate()其实就相当于rotateZ()。
- 计算盒子宽度：`calc`函数

**背景和渐变**

- 渐变背景：使用 linear-gradient() 或 radial-gradient() 创建线性或径向渐变背景。
- 多重背景：使用 multiple backgrounds 可以为元素设置多个背景图像。
- 颜色：新增RGBA，HSLA模式
- 滤镜：filter将模糊或颜色偏移等图形效果应用于元素

**文字效果**

- 文字阴影：使用 text-shadow 属性可以添加文字阴影效果。
- 文字渐变：使用 background-clip 和 text-fill-color 属性可以实现文字渐变效果。
- 字体引用：使用 @font-face 规则可以引入自定义字体。
- 文字换行：word-wrap

**兼容性处理**

一般加私有前缀，再有就是遵循两大原则，渐进增强，优雅降级

### 常见的图片格式及使用场景

（1）**JPEG** 是一种广泛使用的有损压缩图像格式。它在保持较高图像质量的同时，能够显著减小图像文件的大小

（2）**PNG** 是一种无损压缩图像格式。PNG格式支持透明背景和高品质图像，并且能够保存更多的细节和颜色信息。PNG适合用于图标、图形、透明背景的图像，以及需要保持图像质量和细节的情况，如网页设计、标志、图表等。

（3）**GIF** 使用一种基于索引的调色板技术来实现较小的文件大小和动画效果。GIF适合用于简单的动画、徽标、图标、小尺寸的图像等。

（4）**BMP**，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以 BMP 格式的图片通常是较大的文件。

（5）**SVG**是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲线，而不会出现像素点。SVG 图片在放大时，不会失真，所以它适合用来绘制 Logo、Icon 等。

（6）**WebP**是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为 Web 而生的，什么叫为 Web 而生呢？就是说相同质量的图片，WebP 具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有 Chrome 浏览器和 Opera 浏览器支持 WebP 格式，兼容性不太好。

- 在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小 26%；
- 在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要比 JPEG 小 25%~34%；
- WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要支持透明度只需要 22%的格外文件大小。

### 对 CSSS prites 的理解

CSSSprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background-repeat，background-position 属性的组合进行背景定位。

**优点：**

- 利用`CSS Sprites`能很好地减少网页的 http 请求，从而大大提高了页面的性能，这是`CSS Sprites`最大的优点；
- `CSS Sprites`能减少图片的字节，把 3 张图片合并成 1 张图片的字节总是小于这 3 张图片的字节总和。

**缺点：**

- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- `CSSSprites`在开发的时候相对来说有点麻烦，需要借助`photoshop`或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：`CSS Sprites`在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的`CSS`，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动`CSS`。

### 为什么在移动端需要@3x, @2x图片

在移动端开发中，使用@3x、@2x等图片是为了适应不同设备的像素密度（Pixel Density）差异。不同移动设备的屏幕像素密度可以有所不同，即同样大小的屏幕上所显示的像素点数量是不同的。

以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 DIV 元素宽度为 414px，这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3 个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。

当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。

还可以使用 CSS 媒体查询来css判断不同的像素密度，从而选择不同的图片:

```css
my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```

### 对line-height 的理解及其赋值方式

**（1）line-height 的概念：**

- line-height 指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离；
- 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
- 一个容器没有设置高度，那么撑开容器高度的是 line-height，而不是容器内的文本内容；
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；
- line-height 和 height 都能撑开一个高度；

**（2）line-height 的赋值方式：**

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
- 百分比：将计算后的值传递给后代

### CSS 优化和提高性能的方法有哪些

**加载性能：**

- css 压缩，可以减小文件体积
- css文件放在页面上面
- 减少使用@import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

**选择器性能：**

- 减少使用后代选择器，后代选择器浏览器会遍历所有子元素来确定是否是指定的元素等等；
- 避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。
- 尽量少的去对标签进行选择，而是用 class。
- 了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

**渲染性能：**

- 慎重使用高性能属性：浮动、定位。
- 尽量减少页面重排、重绘。
- css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

### CSS 预处理器/后处理器的理解

**预处理器，** 如：`less`，`sass`，`stylus`，用来预编译成css，增加了`css`代码的复用性。层级，`mixin`， 变量，循环， 函数等对编写以及开发 UI 组件都极为方便。

**后处理器，** 如： `postCss`，通常是在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

### less scss sass stylus的区别

| 区别     | less | scss | sass             | stylus           |
| -------- | ---- | ---- | ---------------- | ---------------- |
| 声明变量 | @    | $    | $                | 不限制           |
| 其他     |      |      | 可以省略{}和分号 | 可以省略{}和分号 |

### 单行、多行文本溢出隐藏

- 单行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```

- 多行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```

注意：由于上面的三个属性都是 CSS3 的属性，不是所有浏览器都可以兼容，所以要在前面加一个`-webkit-` 来兼容一部分浏览器。

### 对媒体查询的理解

CSS媒体查询（Media Queries）是一种CSS功能，允许根据设备的特性和属性来应用不同的样式规则。通过媒体查询，可以根据屏幕宽度、高度、设备方向、设备类型等条件来调整网页的布局和样式，实现响应式设计。@media 可以针对不同的屏幕尺寸设置不同的样式，特别是需要设置设计响应式的页面，@media 是非常有用的。当重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

**常用的属性：**

width：屏幕宽度
height：屏幕高度
orientation：设备方向（横向或纵向）
max-width：最大屏幕宽度
min-width：最小屏幕宽度
max-height：最大屏幕高度
min-height：最小屏幕高度
device-width：设备宽度
device-height：设备高度

### 如何判断元素是否到达可视区域

以图片显示为例：

- `window.innerHeight` 是浏览器可视区的高度；
- `document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动的过的距离；
- `imgs.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距离）；
- 内容达到显示区域的：`img.offsetTop < window.innerHeight + document.body.scrollTop;`

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c4df9fb3a9240bda6917fe201bfae84~tplv-k3u1fbpfcp-zoom-1.image)

### z-index 属性在什么情况下会失效

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative，absolute 或是 fixed。

z-index 属性在下列情况下会失效：

- 父元素 position 为 relative 时，子元素的 z-index 失效。解决：父元素 position 改为 absolute 或 static；
- 元素没有设置 position 属性为非 static 属性。解决：设置该元素的 position 属性为 relative，absolute 或是 fixed 中的一种；
- 元素在设置 z-index 的同时还设置了 float 浮动。解决：float 去除，改为 display：inline-block；

### rgba()和opacity透明效果

`opacity` 作用于元素以及元素内的所有内容（包括文字）的透明度；

`rgba()`只作用于元素自身的颜色或其背景色，子元素不会继承透明效果；

### 浏览器兼容性问题

我们在开发的时候会明确项目要兼容哪些浏览器的最低版本，我之前的项目要求兼容IE8.0以上的版本，Chrome 48以上，FireFox 44以上。有了这些最基本的要求，在开发中就是要考虑到CSS样式和JavaScript的在这些浏览器的兼容性了

[浏览器兼容文章](https://juejin.cn/post/6844903633708908557)

**css部分**

- 不同的浏览器样式存在差异，可以通过 `Normalize.css` 抹平差异，也可以定制自己的 `reset.css`，例如通过通配符选择器，全局重置样式
- 在CSS3还没有成为真正的标准时，浏览器厂商就开始支持这些属性的使用了。CSS3样式语法还存在波动时，浏览器厂商提供了针对浏览器的前缀，直到现在还是有部分的属性需要加上浏览器前缀。在开发过程中我们一般通过IDE开发插件、css 预处理器以及前端自动化构建工程帮我们处理。
- IE9以下不兼容opacity 使用滤镜属性filter：alpha（opcity = 50）

**js部分**

- 移动端点击事件有300ms延迟的问题，下载引入fastClick
- 标准的事件绑定函数为addEventListener，IE678不支持，使用attachEvent
- 现代浏览器可以直接使用形参e接受事件对象，ie8用window.event,兼容性写法 e = e || window.event
- innerText早期火狐不能用，用textcontent
- 获取元素：doucument.queryselector()和doucument。queryselectorAll（）IE8+支持
- 获取浏览器可视区大小：window.innerWidth/innerHeight IE8以下不支持，使用document.body.clientWidth/clientHeight
- 获取浏览器顶部滚动出去的距离：window.pageYoffset IE8以下不支持，使用document.documentElement.scrolltop
- 阻止冒泡：stopPropagation IE用canceBubble = true
- 阻止默认行为preventDefault IE用returnValue = true
- 获取自定义属性getAttribute（）或则dataSet.id 火狐只能使用第一个
- 如何阻止事件冒泡和事件的默认行为

```js
// 阻止事件冒泡：
标准写法：Event.stopPropagation()
IE兼容写法：window.event.cancelBubble = true 
 
阻止事件默认行为：
标准写法：Event.preventDefault()
IE兼容写法：window.event.returnValue = false
```

### css hack概念

`CSS hack`是通过在`CSS`样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，`CSS hack`就是让你记住这个标准），以达到应用不同的`CSS`样式的目的。

`CSS hack`大致有3种表现形式，`CSS属性前缀法`、`选择器前缀法`以及`IE条件注释法`（即HTML头部引用if IE）Hack，实际项目中CSSHack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

- 属性前缀hack(即类内部Hack)

```js
  /*Mozilla内核浏览器：firefox3.5+*/
  -moz-transform: rotate | scale | skew | translate ;
 /*Webkit内核浏览器：Safari and Chrome*/
  -webkit-transform: rotate | scale | skew | translate ;
 /*Opera*/
  -o-transform: rotate | scale | skew | translate ;
 /*IE9*/
  -ms-transform: rotate | scale | skew | translate ;
 /*W3C标准*/
  transform: rotate | scale | skew | translate ;
  *background-color:green; // 只会对IE6、7生效
  -background-color:green; // 只有IE6识别
  ....
```

- 选择器hack：例如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。
- IE条件注释法(即HTML条件注释Hack)：针对所有IE(注：IE10+已经不再支持条件注释)

```html
<!-- 仅针对IE9及以下版本 -->
<!--[if lte IE 9]>
<link rel="stylesheet" href="ie9-styles.css">
<![endif]-->
```

### style标签写在body后与body前区别

一般情况下，页面加载时自上而下的。将`style`标签至于`body`之前，为的是先加载样式。

若是写在`body`标签之后，由于浏览器以逐行方式对html文档进行解析，当解析到写在写在文档尾部的样式表时，会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后会重新渲染，在`windows`的`IE`下可能会出现`FOUC`现象（页面闪烁）。

### 如何利用标签提升渲染速度

**link标签**

通过`rel`属性进行`预加载`，如

```html
<link rel="dns-prefetch" href="//xx.baidu.com">
```

rel有几个属性：

- `dns-prefetch`：浏览器会对href中的域名进行DNS解析并缓存，当再次请求该域名资源时，能省去查询IP的过程，从而减少时间损耗
- `prefetch`/`preload`：都是预先下载并缓存某个资源，不同的是prefetch可能会在浏览器忙时被忽略，而preload则一定会预先下载
- `preconnect`：正式发送http请求前预先执行DNS解析、TCP握手、TLS协商。通过消除往返延迟来节省时间
- `prerender`：浏览器不仅会加载资源，还会解析执行页面，并进行预渲染

**script标签**

由于浏览器底层运行机制，渲染引擎在解析HTML时遇到script标签引用文件是会暂停解析过程的，同时通过网络线程加载文件，文件加载后切换至js引擎执行相应代码，代码执行完成后再切换回渲染引擎继续渲染页面

可是首次渲染可能并不依赖这些js文件，这就延长了页面渲染的时间，所以为了减少这些时间损耗，可以通过script标签三个属性来实现：

- `async`：立即请求文件，但不阻塞渲染引擎，而是文件加载完毕后再阻塞渲染引擎并执行js先
- `defer`：立即请求文件，但不阻塞渲染引擎，等解析完HTML再执行js
- `H5`标准的`type="module"`：让浏览器按照ES6标准将文件当模板解析，默认阻塞效果和defer一样，也可以配合async在请求完成后立即执行

### 全屏滚动的如何实现

全屏滚动有点类似于轮播，整体的元素一直排列下去，假设有`5`个需要展示的全屏页面，那么高度是`500%`，只是展示`100%`。也可以理解为超出隐藏部分，滚动时显示。使用JavaScript来监听滚动事件，并根据滚动方向和滚动距离来切换到相应的页面。也可以是用fullpage.js插件来实现

```css
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  /* 大容器 */
  .box {
    width: 100%;
    height: 100vh;
  }
  /* 每个页面 */
  .box-item {
    width: 100%;
    height: 100vh;
  }
```

```js
// wheel是一个JavaScript事件，用于检测鼠标滚轮滚动的动作。
// 当用户使用鼠标滚轮滚动时，浏览器会触发wheel事件，并且会传递一个包含有关滚动行为的事件对象
var container = document.querySelector('.box');
var sections = document.querySelectorAll('.box-item');
var currentSection = 0;

function scrollToSection(index) {
  container.style.transform = `translateY(-${index * 100}vh)`;
  currentSection = index;
}

window.addEventListener('wheel', function(event) {
  var delta = event.deltaY;

  if (delta > 0 && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (delta < 0 && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
});

```

### 如何优化网页的打印样式

`<link rel="stylesheet" type="text/css" media="screen(或者print、tv等) href="aaa.css">`

🍀**注意**，在打印样式表也应该注意以下几点：

- 打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景图。如果坚持要显示图片，可以使用`html`插入到页面中；
- 最好不要使用像素作为单位，因为打印样式表要打印出来的是实物，建议使用`pt/cm`;
- 隐藏掉不必要的内容。（如`@print content{display: none}`）;
- 打印样式表中不建议使用浮动属性（建议少用），因为它们会消失。

### /deep/和::v-deep的区别

都是`深度选择器`，可以操作`样式穿透`，用于局部修改UI组件库默认样式

区别是 `>>>` 只作用于 CSS，在 Less/Sass 中无法识别，所以用 deep 代替，在 Vue3.0之前用 `/deep/`，Vue3.0之后用 `::v-deep`

## 页面布局

### 常见的 CSS 布局单位

常用的布局单位包括像素（`px`），百分比（`%`），`em`，`rem`，`vw/vh`。

**（1）像素**（`px`）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS 像素和物理像素：

- **CSS 像素**：为 web 开发者提供，在 CSS 中使用的一个抽象单位；
- **物理像素**：只与设备的硬件密度有关，任何设备的物理像素都是固定的。

**（2）百分比**（`%`），当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。

**（3）em 和 rem**相对于 px 更具灵活性，它们都是相对长度单位，它们之间的区别：**em 相对于父元素，rem 相对于根元素。**

- **em：** 文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(默认 16px)。(相对父元素的字体大小倍数)。
- **rem：** rem 是 CSS3 新增的一个相对单位，相对于根元素（html 元素）的 font-size 的倍数。**作用**：利用 rem 可以实现简单的响应式布局，可以利用 html 元素中字体的大小与屏幕间的比值来设置 font-size 的值，以此实现当屏幕分辨率变化时让元素也随之变化。

**（4）vw/vh**是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax 两个相关的单位。

- vw：相对于视窗的宽度，视窗宽度是 100vw；
- vh：相对于视窗的高度，视窗高度是 100vh；
- vmin：vw 和 vh 中的较小值；
- vmax：vw 和 vh 中的较大值；

**vw/vh** 和百分比很类似，两者的区别：

- 百分比（`%`）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate 等)
- vw/vm：相对于视窗的尺寸

### px、em、rem 的区别

**三者的区别：**

- `px`是绝对单位，是固定的像素，px相对于显示器屏幕分辨率而言，一旦设置了就无法因为适应页面大小而改变
- `em`是相对自身的font-size，如果没有设置会找父元素
- `rem`是CSS3新增的一个相对单位（root em，根em，一般只用于移动端）相对的是html根元素，只修改根元素就可以成比例地调整所有的字体大小。rem以html的字号为基准，比如`2rem`，而`html`的字号时`16px`，此时`rem`就是`32px`。目前除了IE8及更早版本，所有浏览器均支持rem

**使用场景：**

- 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用 px 即可 。
- 对于需要适配各种移动设备，使用 rem，例如需要适配 iPhone 和 iPad 等分辨率差别比较挺大的设备。

### 两栏布局的实现

一般两栏布局指的是**左边一栏宽度固定，右边一栏宽度自适应**，两栏布局的具体实现：

- 利用浮动，将左边元素宽度设置为 200px，并且设置向左浮动。将右边元素的 margin-left 设置为 200px，宽度设置为 auto（默认为 auto，撑满整个父元素）。

```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  background: tomato;
}
.right {
  margin-left: 200px;
  width: auto;
  background: gold;
}
```

- 利用BFC，左侧元素设置固定大小，并左浮动，右侧元素设置 overflow: hidden; 这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。

```css
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 200px;
     background: blue;
     overflow: hidden;
 }
```

- 利用 flex 布局，将左边元素设置为固定宽度 200px，将右边的元素设置为 flex:1。

```css
.outer {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  flex: 1;
  background: gold;
}
```

- 利用calc函数

```css
.outer {
  height: 100px;
  font-size: 0;
}
.left {
  width: 200px;
  display: inline-block;
  background: tomato;
}
.right {
  width: calc(100% - 200px);
  display: inline-block;
  background: gold;
}
```

- 利用绝对定位，将父级元素设置为相对定位。左边元素设置为 absolute 定位，并且宽度设置为 200px。将右边元素的 margin-left 的值设置为 200px。

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: tomato;
}
.right {
  margin-left: 200px;
  background: gold;
}
```

- 利用绝对定位，将父级元素设置为相对定位。左边元素宽度设置为 200px，右边元素设置为绝对定位，左边定位为 200px，其余方向定位为 0。

```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  background: tomato;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  background: gold;
}
```

### 三栏布局的实现

三栏布局一般指的是页面中一共有三栏，**左右两栏宽度固定，中间自适应的布局**，三栏布局的具体实现：

- 利用**绝对定位**，左右两栏设置为绝对定位，中间设置对应方向大小的 margin/padding 的值。

```css
.outer {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}
```

- 利用 flex 布局，左右两栏设置固定大小，中间一栏设置为 flex:1。

```css
.outer {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1;
  background: lightgreen;
}
```

- 利用浮动，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的 margin 值，注意这种方式 **，中间一栏必须放到最后：**

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}
或者
.center {
  height: 100px;
  overflow: hidden;
  background: lightgreen;
}
```

- 圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。

```css
.outer {
  height: 100px;
  padding-left: 200px; /* 左侧边栏宽度 */
  padding-right: 200px; /* 右侧边栏宽度 */
}

.main {
  float: left;
  width: 100%;
  height: 100px;
  background-color: pink;
}

.left {
  float: left;
  width: 200px;
  height: 100px;
  margin-left: -200px;
  background-color: red;
}

.right {
  float: left;
  width: 200px;
  height: 100px;
  margin-right: -200px;
  background-color: blue;
}
```

圣杯布局的弊端就是当浏览器宽度缩小到一定程度时，会使得中间子元素的宽度比左右子元素宽度小，此时布局就会出现问题，如下图所示：![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe16e9cdd5ed4b5897fa280831f0c529~tplv-k3u1fbpfcp-zoom-1.image)这也提示我们在使用圣杯布局时，一定要设置整个容器的最小宽度，避免发生以下布局混乱现象。

- **双飞翼布局**
  - 和圣杯布局的区别 圣杯布局和双飞翼布局解决问题的方案都是左中右三栏全部float浮动，在左右两栏加上负margin让其跟中间栏div并排，以形成三栏布局。  
不同之处在于中间栏div内容不被遮挡解决思路不一样：

  - 圣杯布局：将outer设置了左右padding-left和padding-right后，左右用相对定位配合宽度属性，来实现不遮挡
  - 双飞翼布局：中间div外层又包裹了一层div，在该子div里用margin-left和margin-right为左右两栏div留出位置

```html
  <div class="mid">
    <div class="center">center--center--center--center--center--center--center--center--center</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div> 
```

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: left;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.wrapper {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
}
```

### 水平垂直居中的实现

**不定宽高**

```html
<div class="box">
   <span class="content">这碗又大又圆，这面又长又宽</span>
</div>
```

- 定位 + translate

```css
/* 子元素设置 */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- flex布局

```css
/* 父元素设置 */
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- table布局

```css
/* 父元素设置 */
.box {
  display: table
}
/* 子元素设置 */
.content {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

**grid布局**

```css
/* 但它在兼容性上不如 flex，特别是 IE 浏览器，只支持 IE10 及以上 */
.box {
  width: 300px;
  height: 300px;
  display: grid;
}
.content {
  justify-self: center;
  align-self: center;
  
  // 或者下面两句
  word-break: break-all;
  margin:auto;
}
```

**flex+margin布局**

```css
.box {
  width: 300px;
  height: 300px;
  display: flex;
}
.content {
   /* 可以理解为子元素被四周的 margin “挤” 到了中间 */
  margin: auto；
}
```

**vertical-align + ::after伪元素**

```css
/* 水平方向很好理解。垂直方向，可以理解为 ::after 把 content 往下拉到了中间 适用于行内块元素 */
.box {
  width: 300px;
  height: 300px;
  text-align: center;
}
.box::after {
  content: '';
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
```

**vertical-align + ::before伪元素**

```css
/* `font-size: 0;` 的神秘之处在于，可以消除标签之间的间隙。另外，因为伪元素搭配的，都是最基础的 CSS 写法，所以不存在兼容性的风险。 只适用于img */
.box {
  width: 300px;
  height: 300px;
  text-align: center;
  font-size: 0;
}
.box::before {
  content: '';
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.content {
  vertical-align: middle;
}
```

**writing-mode**

```css
/* 这个方法可以改变文字的显示方向，比如让文字的显示变为垂直方向 */
.box {
  width: 300px;
  height: 300px;
  writing-mode: vertical-lr;
  text-align: center;
}
.content {
  writing-mode: horizontal-tb;
  display: inline-block;
  width: 100%;
}
...
<div class="box">
   <div class="content">
       <span>这碗又大又圆，这面又长又宽</span>
   </div>
</div>
```

- 定宽高

1、绝对定位方法：确定了当前div的宽度，margin值为当前div宽度一半的负值

```css
div{
    width:600px;
    height: 600px;
    background:red;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-300px;
    margin-top:-300px;
}
```

2、绝对定位方法：绝对定位下top left right bottom 都设置0

```css
div{
    width: 600px;
    height: 600px;
    background: red;
    position:absolute;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

### 一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度问题怎么解决？

方案一： `.content { height: calc(100%-100px); }`

方案二：`.container { position:relative; } .content { position: absolute; top: 100px; bottom: 0; }`

方案三：`.container { display:flex; flex-direction:column; } .content { flex:1; }`

### 对 Flex 布局(ie10以下不支持)

Flex 是 FlexibleBox 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 Flex 布局。行内元素也可以使用 Flex 布局。注意，设为 Flex 布局以后，**子元素的 float、clear 和 vertical-align 属性将失效**。采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿水平主轴排列。

以下 6 个属性设置在**容器上**：

- flex-direction 属性决定主轴的方向（即项目的排列方向）。
- flex-wrap 属性定义，如果一条轴线排不下，如何换行。
- flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content 属性定义了项目在主轴上的对齐方式。
- align-items 属性定义项目在交叉轴上如何对齐。
- align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```text
flex-direction 决定主轴的排列方式
- row（默认值）：主轴为水平方向，起点在左端
- row-reverse:主轴为水平方向，起点在右端
- column:主轴为垂直方向，起点在上沿
- column-reverse:主轴为垂直方向，起点在下沿

justify-content 定义盒子在主轴上的对齐方式
- flex-start 起点对齐
- flex-end 终点对齐
- center 居中对齐
- space-around 平均分布
- space-between 贴边均分

align-items  定义盒子在侧轴上对齐方式
- flex-start 起点对齐
- flex-end 终点对齐
- center 居中对齐
- stretch 子盒子高度会拉伸和父盒子一样高
- baseline 盒子第一行文字基线对齐
```

flex-wrap

- nowrap 不换行
- wrap 换行，第一行在上方
- wrap-reverse 换行，第一行在下方

flex-flow flex-direction和flex-wrap的简写形式

- flex-flow：`<flex-direction>` || `<flex-wrap>`
以下 6 个属性设置在**项目上**：

- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex 属性是 flex-grow，flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

**简单来说：**

flex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。一个容器默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用 flex-direction 来指定主轴的方向。可以使用 justify-content 来指定元素在主轴上的排列方式，使用 align-items 来指定元素在交叉轴上的排列方式。还可以使用 flex-wrap 来规定当一行排列不下时的换行方式。对于容器中的项目，可以使用 order 属性来指定项目的排列顺序，还可以使用 flex-grow 来指定当排列空间有剩余的时候，项目的放大比例，还可以使用 flex-shrink 来指定当排列空间不足时，项目的缩小比例。

### 移动端适配

自适应和响应式

自适应：根据不同的设备屏幕大小来自动调整尺寸、大小
响应式：会随着屏幕的实时变动而自动调整，是一种更强的自适应

- 流式布局（百分比布局+固定）
- 响应式开发（媒体查询、rem）
- 弹性布局（flex）

### 网页重绘与回流（重排）

`重绘`：一个元素的外观发生改变触发的浏览器行为。如颜色、visibility等

`回流`：一种更明显的改变，渲染树需要重新计算。如dom树结构发生变化、更改dom大小、获取某些属性、调整浏览器窗口大小等会触发

**如何减少回流与重绘**

- 使用translate代替top/left,translate只会进行重绘，减少一次回流
- opacity代替visibility，opacity重绘效率比visibility高
- 使用className,一次性添加所有样式，少用style
- 不在for循环中处理获取性操作
- display：none离线处理
- 复杂的动画绝对定位脱离文档流，否则会影响父元素及其后续元素频繁的回流
- 避免使用table

## 定位与浮动

### 什么是浮动？清除浮动的方式

CSS 浮动（Floating）是一种布局技术，通过将元素从正常的文档流中脱离出来，并使其向左或向右浮动，使元素能够在页面中左右排列或环绕其他元素

**浮动元素引起的问题**

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素会跟随其后
- 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

**清除浮动的方式如下：**

- 额外标签法：通过在浮动元素的末尾添加一个空的标签`<div style="clear:both"></div>`
- `overflow`属性清除 触发BFC形成独立容器（子盒子大于父盒子不要用，因为本身overflow的本质是溢出隐藏）
- 给父级 div 设置`height`属性
- 伪元素

```css
.clearfix::after{
  /*  content:"." 里面尽量跟一个小点，或者其他，尽量不要为空，否则再firefox 7.0前的版本会有生成空格。 */
  content: '.';
  height: 0;
  display: block; /*插入伪元素是行内元素，要转化为块级元素*/
  /* clear属性有三个值,left,right,both,left表示清除本元素左边浮动元素自己的影响,right表示清除本元素右边浮动元素对自己的影响,both表示清除两边浮动元素对自己的影响,一般我们使用both */
  visiblity: hidden;/*content有内容，将元素隐藏*/
  clear: both; 
}
.clearfix {*zoom: 1;}   /* 由于IE6-7不支持::after，使用 zoom:1触发 hasLayout */
```

- 使用before和after双伪元素清除浮动

```css
.clearfix:before,.clearfix:after { 
  content:"";
  display:table;
}
.clearfix:after {
  clear:both;
}
.clearfix {
  *zoom:1;/*ie6-7*/
}
```

### 使用 clear 属性清除浮动的原理？

使用 clear 属性清除浮动，其语法如下：

```css
clear:none|left|right|both
```

如果单看字面意思，clear:left 是“清除左浮动”，clear:right 是“清除右浮动”，实际上，这种解释是有问题的，因为浮动一直还在，并没有清除。

官方对 clear 属性解释：“**元素盒子的边不能和前面的浮动元素相邻**”，对元素设置 clear 属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。

还需要注意 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“**前面的**”3 个字，也就是 clear 属性对“后面的”浮动元素是不闻不问的。考虑到 float 属性要么是 left，要么是 right，不可能同时存在，同时由于 clear 属性对“后面的”浮动元素不闻不问，因此，当 clear:left 有效的时候，clear:right 必定无效，也就是此时 clear:left 等同于设置 clear:both；同样地，clear:right 如果有效也是等同于设置 clear:both。由此可见，clear:left 和 clear:right 这两个声明就没有任何使用的价值，至少在 CSS 世界中是如此，直接使用 clear:both 吧。

一般使用伪元素的方式清除浮动：

```css
.clear::after{
  content:'';
  display: block;
  clear:both;
}
```

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 display 属性值的原因。

### 元素的层叠顺序

层叠顺序，英文称作 stacking order，表示元素发生层叠时有着特定的垂直显示顺序。下面是盒模型的层叠规则：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c87e2339bd74997a75f2a1e1fc1e7a7~tplv-k3u1fbpfcp-zoom-1.image)

对于上图，由上到下分别是：

（1）背景和边框：建立当前层叠上下文元素的背景和边框。

（2）负的 z-index：当前层叠上下文中，z-index 属性值为负的元素。

（3）块级盒：文档流内非行内级非定位后代元素。

（4）浮动盒：非定位浮动元素。

（5）行内盒：文档流内行内级非定位后代元素。

（6）z-index:0：层叠级数为 0 的定位元素。

（7）正 z-index：z-index 属性值为正的定位元素。

**注意:** 当定位元素 z-index:auto，生成盒在当前层叠上下文中的层级为 0，不会建立新的层叠上下文，除非是根元素。

### position 的属性有哪些，区别是什么

position 有以下属性值：

| 属性值   | 概述                                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的一个父元素进行定位。元素的位置通过 left、top、right、bottom 属性进行规定。                          |
| relative | 生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过 left、top、right、bottom 属性进行规定。                                          |
| fixed    | 生成绝对定位的元素，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式。 |
| static   | 默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列。  |
| inherit  | 规定从父元素继承 position 属性的值                                                                                                              |

前面三者的定位方式如下：

- **relative：** 元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/613e300f4ab44c308f2bee4b70dcbe5b~tplv-k3u1fbpfcp-zoom-1.image)

**fixed：** 元素的定位是相对于 window （或者 iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb84440542824fe284ec12a088981a27~tplv-k3u1fbpfcp-zoom-1.image)

**absolute：** 元素的定位相对于前两者要复杂许多。如果为 absolute 设置了 top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position:relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。如下两个图所示：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2db2260dc870453ca47a2f3fddcd6d0b~tplv-k3u1fbpfcp-zoom-1.image)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cac09ab5a2e541d4aa119a511291c2ad~tplv-k3u1fbpfcp-zoom-1.image)

### **display、float、position 的关系**

（1）首先判断 display 属性是否为 none，如果为 none，则 position 和 float 属性的值不影响元素最后的表现。

（2）然后判断 position 的值是否为 absolute 或者 fixed，如果是，则 float 属性失效，并且 display 的值应该被设置为 table 或者 block，具体转换需要看初始转换值。

（3）如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none，如果不是，则 display 的值则按上面的规则转换。注意，如果 position 的值为 relative 并且 float 属性的值存在，则 relative 相对于浮动后的最终位置定位。

（4）如果 float 的值为 none，则判断元素是否为根元素，如果是根元素则 display 属性按照上面的规则转换，如果不是，则保持指定的 display 属性值不变。

总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。

### absolute 与 fixed 共同点与不同点

**共同点：**

- 改变行内元素的呈现方式，将 display 置为 inline-block
- 使元素脱离普通文档流，不再占据文档物理空间
- 覆盖非定位文档元素

**不同点：**

- absolute 与 fixed 的根元素不同，absolute 的根元素可以设置，fixed 根元素是浏览器。
- 在有滚动条的页面中，absolute 会跟着父元素进行移动，fixed 固定在页面的具体位置。

### 对 sticky 定位的理解---了解即可

sticky 英文字面意思是粘贴，所以可以把它称之为粘性定位。语法：**position: sticky;** 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;** ，它会固定在目标位置。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## 场景应用

### 实现一个三角形

CSS 绘制三角形主要用到的是 border 属性，总体的原则就是通过上下左右边框来控制三角形的方向，用边框的宽度比来控制三角形的角度。3个方向透明，一个方向有背景色就行

```css
/* 1.采用的是均分原理 */
div{
 width: 0;
 height: 0;
 border-left: 100px solid transparent;
 border-right: 100px solid transparent;
 border-bottom: 150px solid #232323;
 }
 /* 2.隐藏上，左，右三条边，颜色设定为（transparent） */
 div{
    width: 0;
    height: 0;
    border-width: 200px;
    border-style: solid;
    border-color: transparent transparent pink transparent; 
 }
 
```

### 实现一个扇形

用 CSS 实现扇形的思路和三角形基本一致，就是多了一个圆角的样式，实现一个 90° 的扇形：

```css
div{
    border: 100px solid transparent;
    width: 0;
    height: 0;
    border-radius: 100px;
    border-top-color: red;
}
```

![img](<https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a9b97e4f89e4322b5fe05171aeda950~tplv-k3u1fbpfcp-zoom-1.image>)

### 实现一个宽高自适应的正方形

- 利用 vw 来实现：

```css
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```

- 利用元素的 margin/padding 百分比是相对父元素 width 的性质来实现：

```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```

- 利用子元素的 margin-top 的值来实现：

```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

### 画一条 0.5px 的线

- **采用 transform: scale()的方式**，该方法用来定义元素的 2D 缩放转换：

```css
transform: scale(0.5,0.5);
```

- **采用 meta viewport 的方式**

```html
<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
```

这样就能缩放到原来的 0.5 倍，如果是 1px 那么就会变成 0.5px。viewport 只针对于移动端，只在移动端上才能看到效果

### 设置小于 12px 的字体

在谷歌下 css 设置字体大小为 12px 及以下时，显示都是一样大小，都是默认 12px。

**解决办法：**

- 使用 Webkit 的内核的-webkit-text-size-adjust 的私有 CSS 属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用。
- 使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...

```css
.shrink {
    -webkit-transform: scale(0.8);
    -o-transform: scale(1);
    display: inilne-block;
}
```

- 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

### 如何解决 1px 问题？

1px 问题指的是：在一些 `Retina屏幕` 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

```text
window.devicePixelRatio = 设备的物理像素 / CSS像素。
```

打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 `devicePixelRatio` 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是 2：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24476bc9a57344d3bb378fc924c5fcc7~tplv-k3u1fbpfcp-zoom-1.image)

这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。

**解决****1px 问题的三种思路：**

#### 思路一：直接写 0.5px

如果之前 1px 的样式这样写：

```css
border:1px solid #333
```

可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：

```html
<div id="container" data-device={{window.devicePixelRatio}}></div>
```

然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为 2 的情况：

```css
#container[data-device="2"] {
  border:0.5px solid #333
}
```

直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要 8 及以上的版本，安卓系统则直接不兼容。

#### 思路二：伪元素先放大后缩小

这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。

思路是**先放大、后缩小：**** 在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的****宽和高都设置为目标元素的两倍，border 值设为 1px。**** 接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一****，间接地实现了 0.5px 的效果。**

代码如下：

```css
#container[data-device="2"] {
    position: relative;
}
#container[data-device="2"]::after{
      position:absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      content:"";
      transform: scale(0.5);
      transform-origin: left top;
      box-sizing: border-box;
      border: 1px solid #333;
    }
}
```

#### 思路三：viewport 缩放来解决

这个思路就是对 meta 标签里几个关键属性下手：

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

这里针对像素比为 2 的页面，把整个页面缩放为了原来的 1/2 大小。这样，本来占用 2 个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```css
const scale = 1 / window.devicePixelRatio;
/* 这里 metaEl 指的是 meta 标签对应的 Dom */
metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
```

这样解决了，但这样做的副作用也很大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。

### Tailwind CSS

Tailwind CSS 是一个流行的CSS框架，它提供了一组可复用的样式类，用于快速构建现代化的用户界面。与传统的CSS框架相比，Tailwind CSS 的设计理念更加注重原子化和可组合性。

Tailwind CSS 的特点包括：

原子化类：Tailwind CSS 提供了大量的原子化样式类，每个类都代表一个具体的样式属性，如颜色、字体大小、边距、宽度等。通过组合这些类，可以快速创建出所需的样式效果。

高度可定制：Tailwind CSS 允许开发人员通过配置文件自定义样式类的名称、样式属性和值，以适应特定的项目需求。这使得开发人员可以轻松地定制和扩展样式库，而不必受限于预设的样式。

响应式设计：Tailwind CSS 提供了一套用于处理响应式设计的样式类，使得在不同的屏幕尺寸下，能够轻松地调整和布局页面元素。

快速开发：由于Tailwind CSS 提供了丰富的样式类，开发人员可以快速构建用户界面，无需编写自定义的CSS代码。这有助于加快开发速度，提高效率。

风格一致性：通过使用Tailwind CSS，开发人员可以遵循统一的设计系统和样式规范，以确保项目中的元素具有一致的外观和交互效果。

总体而言，Tailwind CSS 提供了一种灵活和高度可定制的方法来构建现代化的用户界面，使得开发人员能够更快速地创建和维护样式丰富的网站和应用程序。
