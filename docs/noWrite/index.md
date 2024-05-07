
### 项目难点

- 通过预渲染页面实现秒开 对网络、包体积、缓存、图片针对性优化，整体性能提升
- 文件分片技术，解决大文件上传时的等待时间长、页面卡顿问题;
- 采用数据埋点采集行为数据，用以分析用户的习惯方便后续优化;
- 动态创建webwork，对大表格计算进行优化
- 由于数据量巨大(3000+)同时业务需要一页展示，导致页面卡顿问题(到底有多卡???js帧率，线程占用
耗时)，利用虚拟滚动解决卡顿问题(解决后什么水平??):
- 预加载数据: 你可以使用worker去提前加载和存储数据，这样你可以在需要的时候使用它们，提升速度
- 业务方向:做了一个ChromeExtension去解决运营的工作效率问题;
- 提效方向:一个插件，可以查看每个页面对应的工程项目的;
- 历史遗留方向:一些历史遗留问题，比如交互问题，流程阻塞问题等等
- 基于antd或者elementUl开发维护了组件库;
- 开发维护了Webpackplugin 或者loade
- 单页面应用Seo服务搭建落地，提升公司搜索引擎排名。并且推广到公司作为通用服务。参与多次双十一大促活动，保证整个导购系统的稳定;
- LowCode 系统，减少90%后台配置页面工作量。目前产出了400+应用，集成中合50+项目;
- 通过对JSBundle分析，进行了分包优化，公共包进行了客户端预加载。对分包后的核心业务JSBundle进行了择时预拉取，并且实现了一套静态资源预缓存机制。核心页面实现秒开，首屏加载时间居行业第一(领先爱奇艺、优酷)
- 使用access_token和refresh_token维持长期登录，并使用缓存和加锁对并发请求做进一步控制。
- 设计了一个支持大文件分片上传，断点续传，带有错误重试和并发控制的文件上传组件。
- 由于网页速度过慢优化以下问题:
降低请求量:合并资源、减少HTTP 请求数、gzip 压缩、webP;
加快请求速度:预解析DNS、并行加载、CDN 分发:
缓存:HTTP 协议缓存请求、离线数据缓存localStorage;
渲染:JS/CSS优化、加载顺序、服务端渲染:

### 专业技能

- 具备一定的Node开发能力，掌握Express koa 和Mongodb 的使用。
- 掌握同构框架 Nuxt.js 使用，了解同构框架实现原理:
- 具备小程序及uni-app跨端开发能力，拥有项目实操及上线经验;
- 具备微前端(qiankun)项目拆分实战经验:
- 熟悉常见的数据结构和算法，熟悉算法复杂度
- 熟悉CKEditor5的二次开发，能独立完成较复杂功能的设计和实现
- 熟悉低代码项目，主要负责渲染侧SDK的迭代和维护
- 熟悉页面性能优化、运维埋点监控，了解内存泄漏分析

### 工作经历

- 负责团队内前端工程化建设，前端相关CI/CD建设，前端性能监控及优化、完善日志体系、监控系统。
告警机制。
- 负责规范小组成员协作开发流程，通过eslintprettier规范代码开发风格，通过huskycommitizen进行git
提交规范管理。
- 推进落地团队研发规范，把控团队敏捷开发流程，跨团队沟通协作高效推动业务迭代
- 建设性能监控体系、稳定性日志看板，优化用户体验、快速发现定位问题
- 使用Menorepo及微前端进行项目重构，解决项目历史遗留问题

### 待写

web3
rust
codeium ai 免费
table live
github 那个 付费
MutationObserver

### FileReader

FileReader是JavaScript中的一个内置对象，它允许Web应用程序以异步方式读取本地文件内容，并将其用作数据源进行操作。它提供了一种在浏览器中处理文件的方法，通常与File对象一起使用。

FileReader对象的主要用途是读取File对象（通常是通过用户通过文件选择器选择的文件）的内容。它提供了几种方法和事件来管理文件读取的过程。

常见的使用场景包括：

文件预览：通过FileReader对象的readAsDataURL方法，可以将选定的文件读取为DataURL，从而可以在前端显示文件的预览图像或媒体内容。

文件上传：在用户选择文件后，可以使用FileReader对象读取文件的内容，并将其上传到服务器，以便进行文件的存储和处理。

文件处理：通过FileReader对象，可以读取文件的内容，并进行一系列的操作，如文件解析、数据提取、文本处理等。

使用FileReader对象的一般步骤如下：

创建FileReader对象：通过new FileReader()创建一个FileReader实例。

设置事件处理程序：使用FileReader对象的onload事件处理程序来处理文件读取完成后的操作。

选择文件：通过input元素的file类型的表单控件或拖放操作等方式，获取要读取的文件对象。

读取文件：调用FileReader对象的readAsDataURL、readAsText或readAsArrayBuffer等方法，根据需要选择适当的方法来读取文件内容。

处理文件数据：在onload事件处理程序中，可以获取读取的文件数据，进行相应的处理。

需要注意的是，由于FileReader是异步操作，因此需要使用事件处理程序来处理文件读取完成后的操作，以确保在文件读取完成之后再进行进一步的处理。

FileReader对象是Web API的一部分，它提供了在浏览器中处理文件的功能，为前端开发人员提供了更多的文件操作能力。

### blob

Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

### FormData

### 数据结构和算法

### 可视化

### 低代码

### 微前端

### React

### node  

### web3

HTTP是建立在传输层TCP协议上的应用层协议，在TCP层面上存在长链接和短连接的区别。
所谓长链接就是在客户端与服务器端简历TCP连接上可以连续发送数据包，但需要双方发送心跳检查包来维持这个链接。
短连接就是当客户端需要向服务器发送请求时，会在网络层IP协议之上建立一次链接，当请求发送并收到响应后，则断开此链接。

HTTP1.0时默认使用短连接。

HTTP1.1时默认使用长链接，但是长链接存在并发数，如果请求过多仍旧需要等待。常用的做法是将域名进行拆分，对小图标进行合并。

HTTP2.0之后便可以在一个TCP链接上请求多个资源，分割成更小的帧请求的性能再次提成。

RQ4：哪些阶段可以优化？
优化DNS查询：DNS预解析
优化TCP连接：可以通过请求头keep-alive来优化。
优化HTTP响应报文：通过CDN和Gzip压缩。

css解析规则？JavaScript异步？event loop？重绘回流？都没写呢。。。

关键渲染路径（Critical Rendering Path）是指浏览器在渲染页面时必须执行的一系列步骤，以将HTML、CSS和JavaScript转换为可视化的页面内容。优化关键渲染路径可以提高页面加载和渲染速度，改善用户体验。

减少网络请求：通过合并和压缩文件、使用资源合并工具、使用缓存等方式减少网络请求的数量和大小。

延迟加载非关键资源：将非关键资源，如图片、JavaScript等，在页面初次渲染时延迟加载，以减少阻塞关键资源的加载。

最小化CSS和JavaScript：优化CSS和JavaScript代码，减少文件大小和执行时间，以加快解析和执行速度。

使用异步加载脚本：将非关键的JavaScript脚本使用异步加载方式，避免阻塞页面渲染。

使用CSS Sprites和图像压缩：将多个小图标合并成一张大图，并使用CSS Sprites技术显示，减少HTTP请求次数。同时使用图像压缩技术减小图像文件的大小。

避免强制同步布局：避免频繁的读取和修改布局属性，因为这会导致浏览器触发强制同步布局，影响渲染性能。

使用缓存：合理设置缓存策略，让浏览器缓存常用资源，减少重复加载。

优化关键资源的加载顺序：将关键资源（如CSS和JavaScript）放在HTML文档的头部，使其尽早加载，加快页面首次渲染。

通过优化关键渲染路径，可以加快页面加载速度，提升用户体验，减少页面的渲染延迟

### 编程语言有哪些

**Python**

- 优点：易学易用，语法简洁清晰，生态好。丰富的第三方库和工具支持，因此在工作中很适合拿python来编写
一些小的工具。现在小学生都开始学ptyhon了，证明python的重要性。
- 缺点：python作为一名解释执行的动态语言，相对于一些其他编译型语言，运行效率太低了，甚至可以比C++慢100倍。所以它并不是企业开发的推荐语言，只能当作工具来使用。
- 应用场景：文件处理/表格处理脚本来提高效率，还是爬虫、大数据、数据分析、ai的好助手。

**C**

- 优点：够底层，底层到所有的操作系统都是它实现的。学C的过程中，能够让我们了解更多系统底层的概念。
- 缺点：
- 应用场景：开发操作系统、底层软硬件、各种嵌入式系统等等

**C++**

- 优点：把C语言艹了，在C语言的基础上增加了一些能力和思想。比如经典的面向对象编程，没有对象就new一个对象，让开发者有更好的体验，能够提高代码的重用和开发效率。本身就是C语言的超集，所以性能也非常高。可以被嵌入任何现代处理器中，几乎所有操作系统都支持C/C++，跨平台性非常好。
- 缺点：
- 应用场景：游戏开发、系统软件、嵌入式系统、图形界面应用等。后台开发、桌面程序、编程语言、框架类库等。比如java就是C++开发的，还有图像、音视频处理等计算密集型任务、3D引擎都是C++的主场。

**Java**

- 优点：使用范围最为广泛的高级语言；高级在哪呢? 代码好懂，功能丰富，成熟稳定。写出来的程序
可以被跑在多个不同的操作系统中。但真正促使java被推向神坛的，成为内卷之王的，是他丰富的应用场景
和生态。后端、桌面程序、安卓、app、物联网、大数据，但凡能想到的东西，JAVA都有现成的
开发工具和方便的类库框架。就是让你写更少的代码，更快的完成开发。但凡学java时，人类可能
遇到的问题，在网上都能搜到解决方案，正好符合企业的需求。
- 缺点：相对较繁琐，较大的内存占用。
- 应用场景：企业级应用开发、Android 应用开发、大型分布式系统、后端开发等。

**C#**

- 优点：.Net是一个框架运行环境，C#是运行在其上的编程语言之一。此外还有VB .Net，如今C#在国内流行度一般。
- 缺点：跨平台能力差。
- 应用场景：游戏、VR、ar、开发平台、unity等主要使用的编程语言。所以近几年也不会被淘汰。

**JavaScript**

- 优点：用于前端开发的脚本语言，广泛支持于浏览器环境，支持面向对象和函数式编程。
- 缺点：较松散的类型系统和一些奇怪的语言特性。
- 应用场景：网页开发、前端框架（如React、Angular、Vue.js）开发、服务器端开发（使用Node.js）、小程序。

**PHP**

曾经热火朝天的php，它有一个美称：php是世界上最好的语言。现在php虽然未被淘汰，但却在走向衰落，不再受到大公司的青睐。为啥呢？以前PC时代拿php开发个网站，弱类型队吧，开发起来贼快贼爽，java写5天，php1天搞定。但现在呢，时代不同了，互联网的产品形态逐渐向移动端倾斜，而不再是传统网站，php虽然也能做后台，但是性能实在太低了。而且随这java和其他编程语言的发展，他们的开发效率上来了，假设都能花同样的时间完成开发，谁还会选择性能更低的php呢。

**Go语言**

全称golang，谷歌的孩子。主要用于区块链和后端服务器应用。语法简单、天然支持高并发、性能贼高。很适合开发主流的云原生应用，像大名鼎鼎的 docker容器，b站都是用go语言开发的。再加上国内生态越来越好，用go去开发应用的成本也大大降低。同等时间开发出一个性能更高的应用不香吗？像字节跳动还有腾讯等互联网大厂早都开始拥抱go了

**SQL**

数据库查询语言，可以从数据库中查找和操作数据。除了程序员现在很多产品经理也开始学Sql

**linux和shell**

脚本编程语言，和ptyhon类似，把它当作工具学习就好了

**Ruby**

- 优点：简洁优雅的语法，强调开发者的幸福感，具有强大的元编程能力。
- 缺点：相对较慢，较大的内存占用。
- 应用场景：Web 开发、脚本开发、快速原型开发。

**Swift**

优点：易学易用，安全可靠，拥有现代化的语法和强大的性能。
缺点：较短的发展历史，相对较少的第三方库支持。
应用场景：iOS 和 macOS 应用开发。

**Rust**

优点：安全、并发、高效，具有内存安全和线程安全的保证。
缺点：相对较陌生的语法和较小的开发社区。
应用场景：系统级编程、嵌入式系统、网络服务等

### 微前端方案

- Single-spa:

描述： Single-spa 是一个 JavaScript 前端微服务框架，允许你将多个单页应用集成到一个整体应用中。
优势： 灵活性高，支持多框架和独立部署。

- qiankun:

描述： qiankun 是基于 Single-spa 的微前端解决方案，由蚂蚁金服开发和维护。
优势： 集成了一些特定的蚂蚁金服技术栈的优势，支持 HTML Entry 和预加载等特性。
乾坤（icestark）:

描述： 乾坤（icestark）是由飞冰团队提供的微前端解决方案，支持多框架和无缝集成。
优势： 提供了一些飞冰团队自家产品的特性，并有一些定制化的功能。
Module Federation:

描述： Module Federation 是 Webpack 5 引入的一项功能，它允许你在不同的应用程序中动态加载远程模块。
优势： 高度灵活性，可以使用现有的模块系统进行开发。
微前端框架（Mooa）:

描述： Mooa 是一个专为微前端设计的框架，支持 Angular、Vue、React 等主流框架。
优势： 提供了一套完整的微前端解决方案，支持独立运行和集成部署。
SystemJS:

描述： SystemJS 是一个模块加载器，支持动态加载和懒加载。
优势： 可以与其他工具和框架结合使用，提供了一些基础的微前端支持。

### 无界微前端

### pnpm

软链接和硬链接（链接到pnpm 的仓库，安装过的依赖如vue，都会在仓库中存一份，这样多个项目安装相同的依赖，就会直接链接到仓库中，不用下载）

可以把公共的提到单独的文件中

pnpm 是一个 JavaScript 项目的包管理工具，与其他常见的包管理工具（如 npm 和 Yarn）相比，它具有一些独特的优势。以下是一些 pnpm 的主要优势：

磁盘空间优势： pnpm 使用一种符号链接的方式来共享依赖项，而不是像 npm 和 Yarn 那样在每个项目中复制依赖项。这可以大大减少项目所占用的磁盘空间，尤其是当有多个项目使用相同版本的依赖项时。

安装速度： 由于 pnpm 共享依赖项并使用硬链接，因此安装速度通常比其他包管理工具更快。只有当特定项目需要特定版本的依赖项时，pnpm 才会下载和安装。

缓存机制： pnpm 使用一个全局的缓存，将依赖项存储在一个地方，以便在不同项目之间共享。这样可以显著减少下载和安装时间，并减少对网络的依赖。

原子操作： pnpm 在安装和卸载依赖项时采用原子操作。这意味着如果安装或卸载失败，系统将回滚到之前的状态，确保不会留下不一致或损坏的状态。

更好的本地开发支持： pnpm 允许通过硬链接直接链接本地依赖项，这对于本地包的开发和测试非常有用。这意味着您对本地包的更改会立即反映在依赖该包的项目中。

版本号解析： pnpm 使用了一种更简化的版本号解析，这使得更容易理解和管理依赖项的版本。

单一存储库： pnpm 有一个单一的存储库，用于存储所有依赖项的不同版本，而不是像 npm 那样在每个项目中都有一个 node_modules 文件夹。这样可以减少存储重复，并更有效地管理依赖项。

### swc

底层是rust写的，性能比js强很多倍，引入swx-loader 打包更快

### npm 发包

### 预加载 requestIdleCallback

```js
//60FPS
//1000 /60=16.666666666666668
//一帧就是16.6ms
//1.处理用户的事件，就是event 例如 click，input change 等。
//2.执行定时器任务

//3.执行 requestAnimationFrame
//4.执行dom 的回流与重绘
//5.计算更新图层的绘制指令
//6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback
、I
//第二种情况
//第二种情况是没有任务执行浏览器会有50ms空闲时间，这个时间段也会执行
requestIdleCallback(function(deadline){
  console.log(deadline.timeRemaining())
})

//react相关人员调研 requestIdlecallback 有机会是20ms执行的 polyfi1]//react16 postMessage + requestAnimationFrame
//setTimeout 0是4ms
//react18 Messagechannel 实现了requestIdleCallback 的polyfil]let fport1,port2}= new MessageChannel()
//onmessage 隐试开启start
port1.onmessage = function(e){
console.log('收到了port2的消息',e)
}
port2.onmessage = function(e){
console.log('收到了port2的消息'e)
}

port1.postMessage('hello')
port2.postMessage('word')
```

### 专业技能

- 熟练掌握前端基础知识 HTML、Javascript、CSS 等
- 对页面重构以及 CSS 领域相关有全面且深入细致的研究与产出
- 对Web 动画（CSS3动画、Javascript动画、SVG动画）有大量研究及实践
- 熟练使用Webpack、Vite 等构建打包工具，对前端工程化有过深入了解及实践
- 熟悉模块化，熟悉 npm、yarn、pnpm 包管理器
- 熟悉 Nodejs 开发，并且熟练使用 express 和koa，熟悉 MySQL数据库的操作和使用
- 熟悉 Linux 系统常用命令，熟练使用 Git 进行版本控制和代码托管
- 了解 Webpack 基础配置，了解Webpack 打包原理，了解性能优化手段
- 了解 Docker 和现代 DevOps - CI/CD 的工作流程
- . 运用Chat-GPT,copilot等AI工具进行协助开发。

### 工作内容

### 项目难点

- 涉及大文件导入上传，等待时间过长，用户体验差
- 列表上万条数据渲染，地图车辆图标过万，导致渲染页面卡顿
- 首屏加载速度慢，部分页面JS体积大加载慢
- 负责复杂表单开发，解决组件渲染卡顿问题
- 通过对JSBundle 分析，进行了分包优化，公共包进行了客户端预加载。对分包后的核心业务JSBundle 进行了择时预拉取，并且实现了一套静态资源预缓存机制。
核心页面实现秒开，首屏加载时闯居行业第一（领先爱奇艺、优酷）。
- 抽离通用组件，对全局弹窗，表单校验，单选按钮，时间选择等公共组件进行封装，提高代码复用率，并发布到公司内网的npm
- 实现文件上传前端直接与 OSS 进行通信。
- 当任务列表超出一定数量时，改用虚拟滚动列表，避免 DOM 过多造成渲染卡顿
- .发现并优化项目中存在的性能问题，进行以下几个方面优化，缓存优化，网络加载，业务架构，渲染优化。
- 设计了项目架构的错误监控体系，比如错误边界
- 采用crypto-js中的MD5，AES进行加密

## 林三心面试

### 如何技术选型考虑

- 生态，
- 跨平台
- 扩展性
- 团队维护，社区活跃度
- 兼容性
- 综合自己的项目情况

### 组件库是怎么维护的

- 独立的项目
- 参考element-ui的架构，和构建方式
- 如果发npm包，每次更改就得发包？这样不是每次都要更新版本号？
- 调试怎么调的呢？把所有组件放在一个页面进行调试的？不太好，通用组件还行，业务组件怎么办，npm link也比较麻烦
- 如果不和其他团队共享，为什么不用monorepo呢？这样通用组件和业务组件都方便调试，现在组件库都是流行pnpm+monorepo模式

### 如果有新组员进来，如何提高他们的开发效率

- 项目文档，项目整体架构图
- 制定开发规范、eslint代码检查修复
- 可配置化

### webpack插件编写

### 二次封装 localStorage 考虑那些问题？

[参考文章](https://juejin.cn/post/7327157426297536527)

- 注意命名，防止污染

比如我现在一个域名下有两个子项目：A项目、B项目

且这两个项目都需要存储 userInfo，那要怎么防止这两组数据互相污染呢？所以需要注意命名，在存储的时候加上对应的项目名前缀，或者其他标识符，保证这组数据是唯一的

```js
const PROJECT_NAME = 'test-project'
localStorage.setItem(
  `${PROJECT_NAME}_userInfo`,
  JSON.stringify({ name: 'lsx' })
)
```

- 注意版本，迭代防范

请看一个例子，假如我们存储一段信息，类型是 string

```js
// 存数据
const set = () => {
  const info = get()
  if (!info) {
    localStorage.setItem(
      `${PROJECT_NAME}_info`,
      'info_string'
    )
  }
}

// 取数据
const get = () => {
  const info = localStorage.getItem(
    `${PROJECT_NAME}_info`
  )
  return info
}
```

然后项目上线了一段时间，但是这个时候，突然决定要换成 object 类型了，这时候对应的存取方法也变了

```js
// 存数据
const set = () => {
  const info = get()
  if (!info) {
    localStorage.setItem(
      `${PROJECT_NAME}_info`,
      JSON.stringify({ name: 'lsx' })
    )
  }
}

// 取数据
const get = () => {
  const info = localStorage.getItem(
    `${PROJECT_NAME}_info`
  )
  return JSON.parse(info)
}
```

但是这样其实是有隐患的，因为项目已经上线了一段时间，有些用户已经存过这个数据了，且存的是 string 类型，但是新版本上线之后，取数据却用了 object 的方式去取数据，这就导致了JSON.parse(字符串)会报错，影响正常的业务逻辑~

所以最好是加一个版本号，或者做一下错误兼容，这样就能避免了~

```js
const PROJECT_NAME = 'test-project'
// 每次升级时改变版本号，规则自己定
const VERSION = 1

// 存数据
localStorage.setItem(
  `${PROJECT_NAME}_userInfo_${VERSION}`,
  JSON.stringify({ name: 'lsx' })
)

// 取数据
localStorage.getItem(
  `${PROJECT_NAME}_userInfo_${VERSION}`
)
```

- 时效性，私密性

时效性，那就是给存进去的数据加一个时效，过了某个时间，这个数据就时效了，方法就是每次存数据进去的时候，加一个时间戳

有一些数据我们不得不存在 localStorage 中，但是又不想被用户看到，这时候就需要进行加密了（加密规则自己定

- 兼容 SSR

SSR 就是服务端渲染，是在服务端运行代码，拼接成一个页面，发送到浏览器去展示出来，所以在服务端是使用不了 localStorage 的，因为不是浏览器环境，所以你像封装一个比较通用的 localStorage，得兼顾 SSR 的情况

```js
// 在 SSR 中使用对象替代 localStorage
const SSRStorage = {
  map: {},
  setItem(v) {
    this.map[key] = v
  },
  getItem(key) {
    return this.map[key]
  }
}
let storage = null
// 判断环境
if (!window) {
  storage = SSRStorage
} else {
  storage = window.localStorage
}
```

- 类型猜测逻辑

有的人就说了，可以把 JSON.parse、JSON.stringify 写在 useLocalStorage 中，但是这个方案只是针对 Object 而已，但是数据类型其实有多种：number、string、object、set、map、date 等等，你直接写在里面，不太合理，你得兼顾所有的数据类型才行！！

### 判断对象是否有循环引用

在JavaScript中，判断一个对象是否存在循环引用是一个相对复杂的问题。循环引用意味着对象的属性直接或间接地引用了对象本身，形成一个闭环。由于JavaScript的垃圾回收机制通常能够处理这些循环引用，所以这个问题在大多数应用程序中并不常见。但在某些情况下，例如当你需要序列化对象或进行某些特定的性能优化时，了解对象是否存在循环引用可能很重要。

要检测循环引用，你可以使用弱映射（WeakMap）或弱集合（WeakSet）来跟踪已经访问过的对象。下面是一个简单的示例，使用深度优先搜索（DFS）算法和WeakSet来检测循环引用：

```js
function hasCircularReference(obj, visited = new WeakSet()) {  
  // 如果对象不是对象或数组，则没有循环引用  
  if (typeof obj !== 'object' || obj === null) {  
    return false;  
  }  
  
  // 如果对象已经被访问过，说明存在循环引用  
  if (visited.has(obj)) {  
    return true;  
  }  
  
  // 将对象添加到已访问集合中  
  visited.add(obj);  
  
  // 递归检查对象的所有属性  
  for (const key in obj) {  
    if (obj.hasOwnProperty(key)) {  
      const value = obj[key];  
      if (hasCircularReference(value, visited)) {  
        return true;  
      }  
    }  
  }  
  
  // 如果没有找到循环引用，则从已访问集合中移除对象  
  visited.delete(obj);  
  return false;  
}  
  
// 示例用法  
const a = {};  
const b = { a };  
a.b = b; // 创建循环引用  
  
console.log(hasCircularReference(a)); // 输出: true  
  
const c = {}; // 没有循环引用  
console.log(hasCircularReference(c)); // 输出: false
```

这个hasCircularReference函数使用了一个visited集合来跟踪已经访问过的对象。在递归遍历对象的属性时，如果遇到一个已经被访问过的对象，那么就说明存在循环引用。注意，我们使用WeakSet而不是普通的Set，因为WeakSet中的对象不会被阻止被垃圾回收，这可以避免在检测循环引用时引入内存泄漏问题。

需要注意的是，这个算法只能检测到直接的循环引用，即对象直接引用了自己或通过一系列引用最终回到了自己。如果循环引用是通过更复杂的结构（例如通过函数闭包或全局变量）建立的，那么这个算法可能无法检测到。此外，这个算法也不能处理共享引用的情况，即多个对象引用同一个对象，但不形成闭环

### git 命令

### 前端负责人怎么做的

- 按照项目经理的待开发任务 进行细分工作内容，排期，并跟踪工作进度
- 制定规范文档
- 提高开发效率，工程化

### 工程化怎么做的

- 代码相关的，eslint gitcommit规范
- 微前端
- 组件库
- webpack

### 微前端的原理

- 与ifram对比
- 隔离原理
- 基座

### 单点登录

cookie+同样的一级域名就可以了

### import.meta.env和process.env的区别

import.meta.env 和 process.env 都是用于在 JavaScript 中获取环境变量的方式，但它们之间有一些关键的区别：

作用域：

import.meta.env 是 ES Modules（ECMAScript 模块）的一部分，因此只能在模块范围内使用。它提供了关于模块的环境信息。
process.env 是 Node.js 的全局对象，在整个 Node.js 应用程序中都可以使用，包括 CommonJS 模块和全局作用域。
用途：

import.meta.env 主要用于前端开发，特别是在构建工具和打包工具中。它可以用来获取构建时的环境变量，比如在 webpack、Rollup、Vite 等工具中使用。
process.env 主要用于后端开发，尤其是在 Node.js 应用程序中。它可以用来获取应用程序运行时的环境变量，比如配置数据库连接、API 密钥等。
数据类型：

import.meta.env 中的环境变量是字符串类型，需要根据需要进行类型转换。
process.env 中的环境变量也是字符串类型，但通常会包含更多类型的值，比如整数、布尔值等，这取决于环境变量的配置方式。
使用方法：

在 ES Modules 中，可以直接使用 import.meta.env 访问环境变量，例如 import.meta.env.NODE_ENV。
在 Node.js 应用程序中，可以直接使用 process.env 访问环境变量，例如 process.env.NODE_ENV。
总的来说，import.meta.env 和 process.env 都是用于获取环境变量的重要工具，但它们适用于不同的应用场景和环境。import.meta.env 主要用于前端开发和模块化环境，而 process.env 主要用于后端开发和整个 Node.js 应用程序。

## Intersection Observer

[参考](https://juejin.cn/post/7296058491289501696#heading-0)

也可以使用`IntersectionObserver`替换监听scroll事件。

`IntersectionObserver`可以监听目标元素是否出现在可视区域内，并异步触发监听回调，不随着目标元素的滚动而触发，性能消耗极低。

`const myObserver = new IntersectionObserver(callback, options);`

构造函数的返回值是一个 观察器实例 。
IntersectionObserver 接收两个参数

- callback： 可见性发生变化时触发的回调函数
- options： 配置对象（可选，不传时会使用默认配置）

IntersectionObserver 构造函数 返回观察器实例，实例携带四个方法：

- observe：开始监听目标元素
- unobserve：停止监听目标元素
- disconnect：关闭观察器
- takeRecords：返回所有观察目标的 IntersectionObserverEntry 对象数组

```js
const myObserver = new IntersectionObserver(() => {
  console.log('交叉了')
}, {
  root: null, // 交叉的父元素， 默认为null，视口
  rootMargin: , // 交叉视口的边界值
  threshould: , // 0 - 1 ，为0时，刚好交叉，为1时，全部包含在视口中

});
// 开始监听
myObserver.observe(document.querySelector(".scrollerFooter"));
// 关闭观察器
 myObserver.disconnect();
```

### 前端跨标签页通信的方案

在前端实现跨标签页通信的方案有几种，常见的包括：

使用LocalStorage或SessionStorage：

将数据存储在LocalStorage或SessionStorage中，不同标签页可以共享同一份存储数据。当一个标签页修改存储的数据时，其他标签页可以监听Storage事件来实时获取数据变化。
使用BroadcastChannel API：

BroadcastChannel API允许在同一浏览器内的不同标签页之间建立通信通道，可以发送和接收消息。通过BroadcastChannel发送的消息将在所有订阅了相同通道的标签页中被接收到。
使用PostMessage API：

PostMessage API允许在不同窗口、标签页或iframe之间发送消息，实现跨源通信。你可以通过调用window.postMessage方法来发送消息，同时在接收方窗口监听message事件来接收消息。
使用SharedWorker：

SharedWorker是一种在多个浏览器上下文之间共享的Web Worker。可以将SharedWorker作为中间层，在不同标签页之间传递消息。
使用WebSocket：

WebSocket是一种在浏览器和服务器之间进行全双工通信的协议。可以通过建立WebSocket连接，在不同标签页之间传递消息。
选择哪种方案取决于具体的需求和场景。LocalStorage和SessionStorage简单易用，但是性能可能不如其他方案。BroadcastChannel和PostMessage适用于同一浏览器内不同标签页之间的通信，而WebSocket则适用于不同设备或浏览器之间的通信。

### React Native、Weex和Flutter比较，选择哪个跨平台框架？

性能

***

React Native：

React Native通过构建原生组件等技术，可以优化性能，使应用程序更加流畅。此外，React Native还使用一些先进的技术，例如异步渲染和预加载组件等，以确保应用程序的性能。

在对比测试中，React Native的性能表现出色，在CPU资源几乎不占用的情况下可以展现出相当流畅的滚动效果，根据我们的实际测试数据，我们发现React Native的性能优于Weex，略逊于Flutter。总结来说，如果您需要一个高性能和高质量的跨平台应用程序，React Native可以是一个不错的选择，特别是用于需要较高交互性、较高渲染性能的场景，例如在线视频应用和游戏开发等。

Weex：

Weex采取了一种不同的方法来优化性能，这种方法是将组件放置在独立的线程中以进行渲染。这种方法可以确保应用程序的整体流畅性，并且可以轻松处理大量UI元素。同时，Weex还具有自适应能力，可以根据设备的不同进行性能优化，这使得它在处理大量UI元素时也可以保持高效的性能。

虽然Weex的流行度不及React Native和Flutter，但它在一些情况下甚至可以比其他框架表现更好。例如，阿里巴巴使用Weex来构建其阿里旅行应用程序，该应用程序在UI性能方面得到了高度认可。另外，独立开发者也可以使用Weex来开发公共组件和小型应用程序，因为它可以轻松地跨越Android和iOS。

Flutter：

Flutter具有非常优秀的性能表现和强大的动画库和抗锯齿技术，使得应用程序的界面非常平滑。特别是对于采用动态UI和动画等元素的应用程序，Flutter可以实现高性能和高效率。

Flutter还拥有自己的渲染引擎和高效的GPU加速技术，可以控制渲染流，提高页面的渲染速度。在对比测试中，Flutter的内存消耗和启动时间也非常优秀，在许多情况下可以实现实时渲染。这使得Flutter在一些场景中甚至可以优于其他框架。

开发效率

***

React Native：

React Native的开发效率主要表现在快速开发跨平台应用上。这一点得益于其活跃的社区和大量的预构建组件，其中大部分组件都已经完成了代码编写和调试工作，开发人员只需要调用它们即可减少自己的工作量。此外，React Native还提供了很多开发工具和插件，如Reactotron，可以帮助开发人员更加方便地进行调试和开发，显著提高生产力。

Weex：

Weex的开发效率非常高，这主要得益于其使用Vue.js作为框架。这样开发人员可以在熟悉的技术栈下快速构建跨平台应用，并且可以在不同平台之间共享代码，这样可以大大减少开发时间和成本。此外，Weex运行在浏览器中，配合友好的调试工具，可以帮助开发人员快速发现和解决问题，这也是Weex受欢迎的一个重要因素。

Flutter：

Flutter具有热重载功能和Dart语言的特性，这使得开发人员可以在不重启应用程序的情况下即时查看代码更改的效果，并可以快速迭代和调试应用程序。同时，Flutter将视图和业务逻辑分离，使得开发人员可以专注于业务逻辑的开发，从而提升开发效率。

社区生态

React Native：

React Native拥有一个庞大的社区，由众多独立开发者和公司组成，提供了很多插件和工具来支持开发者使用该框架。此外，React Native的文档和在线教程非常详尽，让开发人员能够快速上手，轻松使用该框架。同时，该框架还拥有一个活跃的社区和开发团队，能够及时修复Bug和更新版本。

Weex：

Weex社区生态虽然相对较小，但是也有很多贡献者，他们为Weex开发了各种插件和模板，这些插件和模板可以帮助开发人员更快地开发出高质量的应用程序。此外，Weex还提供了官方文档和在线教程，以帮助开发人员更好地了解和学习Weex的使用方法。这些资源可以帮助开发人员更快地上手Weex，提高开发效率。

Flutter：

Flutter作为一个Google支持的框架，有着一个庞大的社区和活跃的贡献者，这为开发者提供了强大的支持。此外，Flutter拥有充足的文档和在线教程，可帮助开发者有效地使用该框架。对于开发者遇到的问题，Flutter还有一套完善的反馈机制和问题解决途径，可以帮助开发者快速解决问题。

使用场景

***

React Native：

React Native是一种适合于构建UI重的原生应用程序的框架，它可以帮助开发人员快速迭代和实时渲染应用程序。现如今，React Native已经被Facebook、Instagram、Bloomberg等公司采用，这些公司的应用程序需要高效的UI渲染和快速的迭代。使用React Native，开发人员可以使用JavaScript编写应用程序，而不必学习Objective-C或Swift等原生语言。这使得React Native成为一种非常流行的框架，特别是对于那些想要快速构建跨平台应用程序的开发人员来说。

Weex：

Weex是一个非常适合用于复杂的Pixel Perfect UI的框架，因为它可以提供在各种平台上完全一致的像素布局和自适应设计。这使得开发人员可以更便捷地开发适配不同平台的应用程序，并且确保应用程序在各个平台上的用户体验一致。因此，许多大型公司如淘宝、天猫、美团等都已经开始使用Weex来构建他们的跨平台应用程序，从而加快了应用程序的开发和部署时间，并提升了用户体验。

Flutter：

Flutter适合于快速构建高质量、高效、高性能的应用程序。它具有自己的渲染引擎Skia和响应式编程框架，这使得大多数UI更新无需重新渲染整个UI视图，提高了应用程序的运行效率和性能。

系统适配性

***

React Native：

React Native的组件可以在多个平台上运行，并且可以与原生组件进行交互。这意味着开发人员可以使用React Native来构建具有很好系统适配性的应用程序，而无需为每个平台单独编写代码。此外，React Native还提供了许多内置的组件和API，使开发人员能够快速构建高质量的应用程序。

Weex：

Weex基于WebView渲染，因此可以便捷地实现跨平台UI界面。但是，由于使用WebView进行渲染，Weex可能会在某些系统上遭遇性能问题和兼容性问题，这是由于WebView本身的限制和不同系统之间的差异导致的。因此，在使用Weex时，需要考虑这些问题，并根据具体情况进行优化和调整。

Flutter：

Flutter使用自己的渲染引擎进行渲染，从而使得Flutter能够在不同的系统和平台上运行，并且能够适应不同的硬件和软件环境。此外，Flutter还提供了丰富的API和工具，开发者可以利用这些API和工具轻松地针对具体的平台进行适配和优化。这些API和工具包括：Flutter Widgets、Flutter Engine、Flutter Framework、Flutter SDK等等。通过这些工具，开发者可以创建出高度定制化的应用程序，并且能够在不同的平台上实现良好的性能和用户体验。

总结：综合来看，React Native、Weex和Flutter都具有自身的优点和缺点。React Native具有很好的系统适配性和开发效率，Weex可以实现完美的Pixel Perfect设计，Flutter则具有优秀的性能和高效的开发方式。选择适合自己的跨平台框架需要结合自己的需求和项目特点进行综合考虑。但不管你选择哪一种框架，都需要注意它们的生态系统，这将直接关系到开发者之间的交流和知识传递。希望在本文的帮助下，你能够更好地选择合适的框架来开发您的跨平台应用程序。

### 前端跨平台框架

前端跨平台框架是指可以用一套代码同时构建多个平台（如Web、iOS、Android等）应用的框架或工具。以下是一些常见的前端跨平台框架：

React Native：
React Native 是由 Facebook 推出的基于 React 的跨平台移动应用开发框架，可以使用 JavaScript 和 React 的语法来开发 iOS 和 Android 应用。
Flutter：
Flutter 是由 Google 推出的跨平台移动应用开发框架，使用 Dart 语言编写，具有高性能和自定义UI的特点，可以同时构建 iOS、Android 和 Web 应用。
Ionic：
Ionic 是一个基于 Web 技术的跨平台移动应用开发框架，使用 HTML、CSS 和 JavaScript（通常配合 Angular、React 或 Vue.js）来构建移动应用，支持 iOS、Android 和 Web。
Cordova（也称为 PhoneGap）：
Cordova 是一个将 Web 应用打包成原生应用的工具，使用 HTML、CSS 和 JavaScript 编写应用，并通过 Cordova 提供的插件访问设备功能，支持 iOS、Android 等平台。
NativeScript：
NativeScript 是一个基于 JavaScript 的跨平台移动应用开发框架，使用 NativeScript 可以使用 JavaScript 或 TypeScript 构建原生移动应用，支持 iOS、Android 和 Web。
Vue Native：
Vue Native 是基于 Vue.js 和 React Native 的跨平台移动应用开发框架，允许开发者使用 Vue.js 的语法和组件开发移动应用，支持 iOS 和 Android。
Weex：
Weex 是由阿里巴巴开发的跨平台移动应用开发框架，支持使用 Vue.js 或原生 JavaScript 来构建移动应用，可以同时运行在 iOS、Android 和 Web 平台。
这些框架和工具各有特点，开发者可以根据自己的喜好、项目需求和技术栈选择合适的跨平台框架来开发移动应用。

### 多端跨平台框架(要是各平台小程序)

可以开发小程序和 H5 应用的框架主要有以下几种：

uni-app：

uni-app 是一个基于 Vue.js 的跨平台应用开发框架，可以使用 Vue.js 的语法和组件来开发移动应用、Web 应用和各种小程序（如微信小程序、支付宝小程序、百度小程序、头条/抖音小程序等）。uni-app 提供了一套代码，可以编译生成不同平台的应用。

Taro：

Taro 是一个多端统一开发框架，支持使用 React、Vue 或原生 JavaScript/TypeScript 编写代码，并能编译生成小程序、H5、React Native 等多个平台的应用。Taro 提供了一套组件和 API，使得开发者可以在不同平台下进行开发和部署。

MPVue：

MPVue 是一个基于 Vue.js 的小程序开发框架，使用 Vue.js 的语法和组件开发小程序应用。MPVue 可以在小程序中使用 Vue.js 的特性，并支持编译生成 H5 应用。

Wepy：

Wepy 是一个类似 Vue.js 的小程序组件化开发框架，可以使用类 Vue.js 的语法开发小程序应用。Wepy 提供了组件化、模块化等特性，并且支持生成 H5 应用。

Remax：

Remax 是一个 React 开发小程序的框架，支持使用 React 的语法和组件开发小程序应用，并能编译生成小程序、H5 应用以及其他平台的应用。
这些框架都提供了一套代码，可以同时适配小程序和 H5 平台，使得开发者可以更加高效地开发和部署应用。选择合适的框架取决于开发者的技术栈、项目需求以及对应用跨平台性的要求。

### scss和sass

### reduce

```js
const arr = [1,2,3,4,5]
```

`arr.reduce(callback, [initValue])`

- 如果传了初始值，callback就会执行5次
- 如果没传初始值，callback就会执行4次，会把第0项当为初始值，callback会从第一项开始执行

```js
const result = arr.reduce(function(prev, item, index) => {
  return prev+item
})
```

对于纯数字求和来说，传不传初始值结果都是15，但是对于复杂数据，不传初始值就会有问题：例如

```js
const arr = [
  {id:1, name: 'zs', age: 18},
  {id:2, name: 'zs', age: 19},
  {id:3, name: 'zs', age: 120}
]

// 这种就必须传初始值了
const result = arr.reduce((prev, item) => {
  return prev + item.age
},0)
```

### js大数运算
