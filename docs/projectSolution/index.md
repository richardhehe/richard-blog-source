## 项目解决方案

### 项目中 webpack 怎么配置的

在`vue.config.js`文件中使用`configureWebpack`(操作对象)或者`chainWebpak`(链式编程)节点的方式，定义`webpack`打包配置

- 配置`publicPath`项目路径
- 关闭生产环境`sourthmap`文件(productionSourceMap: false)
- 配置`devServer`代理，开启热更新，跨域等配置
- 配置别名(alias) `src改为@`等
- 因为 js 会动态的加载出 css，所以 js 文件包会比较大，抽离 css 代码
- 使用`cdn`引入第三方包,在`externals`申明的依赖包都不会被打包
- webpack 开启`gzip`压缩，要安装`compression-webpack-plugin`插件
- 配置去除生产环境`console.log`插件(uglifyjs-webpack-plugin)
- eslint 检查代码 配合 prettier 格式化

### 项目登录流程

**流程**

- 当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个**token**，拿到 token 之后（我会将这个 token 存储到 cookie 中，保证刷新页面后能记住用户登录状态

- 用户登录成功之后，我们会在路由全局钩子`router.beforeEach`中拦截路由，判断是否已获得 token，在获得 token 之后我们就要去获取用户的基本信息了（如用户权限，用户名等等信息）

- 拿到用户信息后，再调用接口获取权限路由信息，处理成路由表格式，通过 **router.addRoutes** 动态挂载这些路由

**参考**

只在本地存储了一个用户的 token，并没有存储别的用户信息（如用户权限，用户名，用户头像等）。为什么不把一些其它的用户信息也存一下？主要出于如下的考虑：

假设我把用户权限和用户名也存在了本地，但我这时候用另一台电脑登录修改了自己的用户名，之后再用这台存有之前用户信息的电脑登录，它默认会去读取本地 cookie 中的名字，并不会去拉去新的用户信息。

所以现在的策略是：页面会先从 cookie 中查看是否存有 token，没有，就走一遍上一部分的流程重新登录，如果有 token,就会把这个 token 返给后端去拉取 user_info，保证用户信息是最新的。 当然如果是做了单点登录得功能的话，用户信息存储在本地也是可以的。当你一台电脑登录时，另一台会被提下线，所以总会重新登录获取最新的内容。

token 有效期(Expires/Max-Age)都是 Session，就是当浏览器关闭了就丢失了。重新打开游览器都需要重新登录验证，后端也会在每周固定一个时间点重新刷新 token，让后台用户全部重新登录一次，确保后台用户不会因为电脑遗失或者其它原因被人随意使用账号。

### 权限方案

- 权限角色:管理员、运营、客服、其它等
- 权限粒度:页面、模块、功能、接口等
- 权限路径:菜单不显示，拒绝访问; 菜单显示，允许申请

**前端功能**

- 权限管理后台的 `CRUD` 页面
- 页面、模块、功能的权限控制
- 权限路径等权限控制

**路由/页面权限**

`前端方案`

前端方案会把所有路由值息在前端配置，用户根据角色过滤出路由表。比如把需要权限认证的路由配置一个路由表`asyncRoutes`，在需要认证其路由的`meta`中添加一个`roles`字段。根据用户角色筛选出有权限的路由，最后通过 `router.addRoutes (accessRoutes)`方式挂载有权限的路由

或者这种路由元信息(meta),通过 router.beforeEach()路由拦截的方式实现。

`后端方案`

后端方案会把所有页面路由信息存在数据库中，用户登录的时候根据其角色查询得到其能访问的所有页面路由信息返回给前端，前端将数据映射成路由表的格式，并合并不需要权限处理的路由，再通过`addRoutes`动态添加路由信息

`优缺点`

纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，就要修改前端代码重新打包部署有新的页面和角色需求；

服务端方案就不存在这个问题，通过专门的角色和权限管理页面 配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸

`使用后端方案`

思路： 是将所有的前端路由配置在后端，对于不同角色的用户，后端把路由列表吐给前端注册。

- constantRoutes： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
- asyncRoutes： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。

1. 用户登录获取用户信息后，根据其用户角色 id 查询角色拥有的路由权限信息
2. 前端将数据映射成路由表的格式(引入组件)，并合并不需要权限处理的路由
3. 通过 addRoutes 动态添加路由信息

**区块权限（区块/按钮/加密字段）**

`v-permission指令实现`

自定义的`v-permission`指令，相比于 `v-if` 性能会差一些，因为 `v-if` 生成 `vnode` 的时候会忽略对应节点，所以不会渲染；而 `v-permission` 大都是在元素被渲染之后，通过`removeChild(el)`删除元素的，或者`display：none`控制，会触发回流或重绘，所以性能会差一些。

`封装权限判断函数结合v-if实现`

如果使用 `v-if` 进行判断的话，`v-if` 还会杂糅一些业务上的权限决定它显不显示（比如状态的判断），会导致 `v-if` 变得很长，几乎不可读。而且项目中区块权限比较多，不可能一个一个进行判断控制，太麻烦，所以需要一个通用的方案进行控制，最好是脱离框架的，这样其它项目中也可以用。

`封装组件包裹`

```html
<Authority :value="RoleEnum.ADMIN">
  <a-button type="primary" block> 只有admin角色可见 </a-button>
</Authority>
```

`通用方案实现`

负责设计项目的权限控制方案，封装了一个通用的 sdk 针对页面、区块、按钮、加密字段等不同的权限粒度分别进行控制，解决不同角色的权限问题

1. 与后端沟通设计一个表结构，存储每个区块的`module_name`、哪些角色`roles`可以看、模块类型`type`(1: button, 2: 普通区块， 3：加密字段)
2. 每次页面加载得时候执行 `sdk`，获取当前页面所有的区块 `name`
3. 然后判断有没有权限，没有权限就设置为 `display：none`
4. 并通过 `MutationObserver` 监听页面 dom 的变化，有动态渲染的 dom 的变化会再执行 sdk

**注意**

在某些情况下，使用 v-permission 将没有效果。例如:Element-UI 的 Tab 组件或 el-table-column 等动态渲染 dom 的场景。你只能用 v-if 来做。

### 大文件上传方案

在上传小文件时，分片上传和普通上传的效果体验并不大，但是在上传大文件时，普通的一次性上传会存在以下缺点

- 文件上传时间较长，会长时间持续占用服务器的连接端口
- 如果断网或者页面不小心关闭，已上传的文件会全部丢失，需要重新上传

**分片上传的优点**

分片上传指的是将大文件分成多个小块进行上传，利用浏览器支持并发请求的特性，并发的上传文件，加快文件的上传速度，并且在上传失败时可以只重新上传失败的那一部分，而不需要重新上传整个文件

**实现流程**

`分片上传`

- 获取 `file` 对象，通过内置对象 `FileReader` 的 `readAsArrayBuffer` 将 file 文件读取成 `ArrayBuffer`
- 先用 `spark-md5.js` 插件计算文件 `ArrayBuffer` 的 `hash` 值( `spark-md5` 已经算是比较快的一个计算 hash 值的库了)

```js
  // 获取文件的hash
  const changeBuffer = (file) => {
    return new Promise((resolve) => {
      let fileReader = new FileReader() // FileReader异步方式来读取文件的内容
      fileReader.readAsArrayBuffer(file) // readAsArrayBuffer  以ArrayBuffer形式读取文件内容
      fileReader.onload = (ev) => {
        let buffer = ev.target.result,
          spark = new SparkMD5.ArrayBuffer(),
          HASH,
          suffix
        spark.append(buffer) // 可以是字符串或 ArrayBuffer。
        HASH = spark.end()
        suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1]
        resolve({
          buffer,
          HASH,
          suffix,
          filename: `${HASH}.${suffix}`,
        })
      }
    })
```

- 文件 `file` 对象是 `blob` 对象的子类，`blob` 对象包含一个 `slice` 方法，可以对文件进行拆分，所以通过 `file.slice` 方法对大文件进行切割。
- 按照固定大小(比如: 每个分片 `1M`)进行切片，如果分片数量太多，可以使用固定数量，不固定大小的方式进行分片
- 通过 `while` 循环不断的切片，将所有的分片保存在数组中，分片名称为`hash_index(分割时的下标).suffix`

```js
// 实现文件切片处理 「固定数量 & 固定大小」
let max = 1024 * 1024 * 100, // 100kb
  count = Math.ceil(file.size / max),
  index = 0,
  chunks = []
if (count > 100) {
  // 限制切片数量最多100个
  max = file.size / 100
  count = 100
}
while (index < count) {
  chunks.push({
    file: file.slice(index * max, (index + 1) * max),
    filename: `${HASH}_${index + 1}.${suffix}`,
  })
  index++
}
```

- 切片完成后，调用后端`分片上传接口`，循环得将每个分片上传到服务器，后端会将上传的分片保存在临时目录
- 所有的分片都上传完成后，调用后端`合并分片接口`，将文件 `hash` 值传给后端，后端会将所有的分片合并成一个文件，并删除临时目录的分片

`断点续传`和`秒传`

断点续传应用于如果出现断网或者意外刷新页面的情况

- 后端会提供一个`检查文件接口`，我们在点击上传文件的时候会先调用这个接口
- 如果文件已经上传过，但是没传完，将已经完成上传的分片数组返回给前端，前端在进行分片上传的时候，会对每个分片进行判断，如果已经上传过了，就跳过这个分片
- 如果文件已经上传过，并且上传完成，告诉客户端不需要再传，`实现秒传`
- 如果没有上传过，就正常上传分片

`并发限制`

- 不同浏览器在同一域名下并发请求数量限制在 `2-8` 个。当超过这个限制就会等待，以谷歌为例，浏览器并发请求设置在 6 个
- 由于大文件切片过多，一次发送很多个 `HTTP` 请求，如果实际的接口响应时间很慢，同时请求大量接口，对于后面 `pending` 的接口而言，存在超时风险。
- 控制并发请求数量。以谷歌为例，每次只发起 `3-6` 个请求，每当 6 个请求中有一个请求完成后，就添加一个请求
- 维护一个并发数组限制最大数量为 6 个，通过 `promise.race` 来运行这个数组，每次跑完一个任务，就再 `push` 一个任务，保持这个数组并发量一直是6个，实现并发限制的功能

```js
// 控制并发和断点续传
const uploadFileChunks = async function (list) {
  if (list.length === 0) {
    // 说明所有任务都完成，请求合并切片
    mergeChunks()
    return
  }
  const pool = []
  maxReq = 6 // 最大并发量
  finish = 0
  failList = []
  for (let i = 0; i < list.length; i++) {
    // 已经上传的无需在上传 这儿没弄
    let fm = new FormData()
    fm.append('file', list[i].file)
    fm.append('filename', list[i].filename)
    const task = instance.post('/upload_chunk', fm)

    task
      .then((data) => {
        const idx = pool.findIndex((t) => t === task)
        pool.splice(idx, 1)
      })
      .catch(() => {
        failList.push(list[i])
      })
      .finally(() => {
        finish++
        if (finish === list.length) {
          uploadFileChunks(failList)
        }
      })
    pool.push(task)
    if (pool.length === maxReq) {
      console.log(maxReq)
      await Promise.race(pool)
    }
  }
}
```

**后端需要提供三个接口**

- 检查文件接口：接收参数-文件的 hash 值
- 上传文件接口-接收参数- formData 类型的 file，filename 等其他
- 合并文件分片接口：接收参数-文件的 hash 值，合并文件分片，并告知前端上传成功
- 切片后 150m 视频大约 40s 左右

**创建 webwork 处理 hash 和加密计算**

1. 创建一个名为 `worker.js` 的文件，用于定义 `Web Worker` 的逻辑，通过监听 `message` 事件来接收主线程发送的消息，并通过 `postMessage()` 方法将结果发送回主线程。在该文件中，可以使用 `SparkMD5` 或其他适合的库来进行哈希和加密计算

```js
// worker.js

// self 当前 worker 的全局 scope（值取决于你创建的 worker 类型）。
self.addEventListener('message', function(event) {
  // 接收主线程传递的数据
  var data = event.data;
  // 进行哈希和加密计算
  // 这里以 SparkMD5 为例
  var spark = new SparkMD5();
  spark.append(data);
  var hash = spark.end();
  // 将计算结果发送回主线程
  self.postMessage(hash);
});
```

1. 在主线程的 JavaScript 代码中，可以通过 new Worker() 方法创建一个 Web Worker 实例，使用 `postMessage()` 方法向 Worker 发送数据，通过监听 `message` 事件来接收 `Worker` 返回的消息

```js
// 主线程代码
// 创建 Web Worker 实例
var worker = new Worker('worker.js');

// 监听 Worker 返回的结果
worker.addEventListener('message', function(event) {
  var hash = event.data;
  // 处理哈希计算的结果
  console.log('计算结果:', hash);
});
// 向 Worker 发送数据，触发计算
var data = 'example data';
worker.postMessage(data);
```

需要注意的是，Web Worker 在浏览器中运行时会在一个单独的线程中，并且有一些限制，例如无法直接访问 DOM 和某些浏览器 API。另外，由于 Web Worker 是在浏览器环境中运行的，所以需要在支持 Web Worker 的浏览器中才能正常使用。

### 加密算法有哪些

- 对称加密：采用对称密码编码技术，加/解密使用相同密钥进行，效率较高。常见对称加密有 AES、DES、3DES、Blowfish、IDEA、RC4、RC5、RC6 等，这里选用 AES 实现。对称加密的优点是速度快、加密效率高，缺点是密钥泄露之后，数据就会被破解。
- 非对称加密：使用公钥和私钥对数据进行加密和解密。常见的非对称加密算法包括 RSA、DSA、ECC 等。非对称加密的优点是算法强度复杂、安全性高，缺点是加密速度慢。
- 哈希加密：将数据转换为固定长度的哈希值，不可逆。常见的哈希加密算法包括 MD5、SHA-1、SHA-256 等。哈希加密的优点是加密速度快、不可逆，缺点是可能存在哈希碰撞。基于哈希算法的特性，其适用于该场景：被保护数据仅仅用作比较验证且不需要还原成明文形式。
- 消息摘要：消息摘要是将数据转换为固定长度的摘要，具有不可逆、完整性验证等特点。常见的消息摘要算法包括 HMAC、SHA-1、SHA-256 等。消息摘要的优点是安全性高、数据完整性可验证，缺点是无法恢复原始数据。

在实际应用中，常见的加密方式是混合使用多种加密算法。例如，在 HTTPS 协议中，会采用对称加密和非对称加密相结合的方式进行数据加密。前端加密的目的是为了保护数据在传输过程中的安全性，但是要注意加密算法的选择、密钥管理、加密强度等问题，以免加密失效或者被攻击者破解。

### 前端加密方案

[掘金](https://juejin.cn/post/7203743188774748217)

作为前端开发人员也应该尽量避免用户个人数据的明文传输，尽可能的降低信息泄露的风险。可能有人会说现在都用 HTTPS 了，数据在传输过程中是加密的，前端就不需要加密了。其实不然，可以在发送 HTTPS 请求之前，通过谷歌插件来捕获 HTTPS 请求中的个人信息。

本项目中主要对数据传输中的（密码，银行帐号等信息）进行AES+RSA 加密，对存储在本地的数据（如用户信息 ）等直接是用AES加密

**数据泄露方式**

- **中间人攻击**

中间人攻击是常见的攻击方式。大概的过程是中间人通过 DNS 欺骗等手段劫持了客户端与服务端的会话。客户端、服务端之间的信息都会经过中间人，中间人可以获取和转发两者的信息。在 HTTP 下，前端数据加密还是避免不了数据泄露，因为中间人可以伪造密钥。为了避免中间人攻击，一般采用 HTTPS 的形式传输。

- **谷歌插件**

HTTPS 虽然可以防止数据在网络传输过程中被劫持，但是在发送 HTTPS 之前，数据还是可以从谷歌插件中泄露出去。因为谷歌插件可以捕获 Network 中的所有请求，所以如果某些插件中有恶意的代码还是可以获取到用户信息的，下面为大家演示。

![alt](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2af98da401749c39bb80a9035fac701~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

所以光采用 HTTPS，一些敏感信息如果还是以明文的形式传输的话，也是不安全的。如果在 HTTPS 的基础上再进行数据的加密，那相对来说就更好了。

**实现方案**

- 方案一：如果用对称加密，那么服务端和客户端都必须知道密钥才行。那服务端势必要把密钥发送给客户端，这个过程中是不安全的，所以单单用对称加密行不通。
- 方案二：如果用非对称加密，客户端的数据通过公钥加密，服务端通过私钥解密，客户端发送数据实现加密没问题。客户端接受数据，需要服务端用公钥加密，然后客户端用私钥解密。所以这个方案需要两套公钥和私钥，需要在客户端和服务端各自生成自己的密钥

![alt](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52afe010eca447a68e060f1f5d6ea030~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 方案三：如果把对称加密和非对称加密相结合。客户端需要生成一个对称加密的密钥 1，传输内容与该密钥 1 进行对称加密传给服务端，并且把密钥 1 和公钥进行非对称加密，然后也传给服务端。服务端通过私钥把对称加密的密钥 1 解密出来，然后通过该密钥 1 解密出内容。以上是客户端到服务端的过程。如果是服务端要发数据到客户端，就需要把响应数据跟对称加密的密钥 1 进行加密，然后客户端接收到密文，通过客户端的密钥 1 进行解密，从而完成加密传输。

![alt](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edcf9ac463c04c588650b0ff242f1891~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

总结：以上只是列举了常见的加密方案。总的来看，方案二比较简单，但是需要维护两套公钥和私钥，当公钥变化的时候，必须通知对方，灵活性比较差。方案三相对方案二来说，密钥 1 随时可以变化，并且不需要通知服务端，相对来说灵活性、安全性好点并且方案三对内容是对称加密，当数据量大时，对称加密的速度会比非对称加密快。所以本文采用方案三给予代码实现。

**代码实现**

下面是具体的代码实现（以登录接口为例），主要的目的就是要把明文的个人信息转成密文传输。其中对称加密使用的是 AES，加密库：crypto-js，非对称加密使用的是 RSA，加密库：jsencrypt

### axiso 二次封装

- 配置 baseURL 和 timeout 超时时间
- 请求拦截器中设置 header 的 token
- 响应拦截器中对状态码进行处理

axios 封装，支持取消重复请求、请求失败重试、并发请求、拦截器等功能，解决了 token 校验及服务器异常处理的问题，并提升了开发效率

**取消请求**

[文章](https://juejin.cn/post/6955610207036801031)

`场景`

- 无效请求。（如单页应用中侧边栏菜单路由切换），组件mount后由于加载过慢，路由跳转后组件卸载，但是请求没有中断，当接口错误时，会在其他页面弹出错误提示。

进入某个页面，然后由于网速的原因，请求的接口迟迟不响应或是进入某个页面然后直接返回，但是请求还在继续着，等在某个页面浏览时，你要是做了全局的错误请求的拦截的话，你的请求因失败忽然弹出提示，便显得那么的不合时宜，明明当前页没有错误。那么怎样解决或优化请求呢。

解决思路： 发起请求 => 将请求存起来 => 路由变化 => 取消请求

对于浏览器环境来说，Axios 底层是利用 XMLHttpRequest 对象来发起 HTTP 请求。如果要取消请求的话，我们可以通过调用 XMLHttpRequest 对象上的 abort 方法来取消请求。

```js
// 请求拦截器中配置
service.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(cancel => {
      store.commit('addCancelToken', cancel)
    })
    return config
  }
)
```

```js
// Vuex
const state = {
  cancelTokenArr: []
}
const mutations = {
  addCancelToken(state, cancel) {
    state.cancelTokenArr.push(cancel)
  },
  clearCancelToken(state) {
    state.cancelTokenArr.forEach(c => {
      c()
    })
    state.cancelTokenArr = []
  }
}
```

```js
// 路由拦截器中
router.beforeEach((to, from, next) => {
  if(this.$store.state.cancelTokenArr.length) {
    store.commit('clearCancelToken')
  }
 next()
})
```

`cancelToken原理`

[文章](https://juejin.cn/post/6844903823383724045)

在理解axios的CancelToken之前，我们不妨想想，换做自己，如何去取消一个已经发出的http请求？毫无疑问，我们都会想到XMLHttpRequest原型上的方法abort，用它就可以终止请求了。

但，`axios` 内部是依靠 `promise` 实现的一套完整的发出请求-接收请求以及取消请求机制。我们都知道，promise只有三种状态，pending（等待），resolved（成功），rejected（失败）。promise本身并没有`取消`或说`终止`一说，也没有这种状态，也即一个已经从pending状态执行的promise只有成功或失败。那么，如何用同一个promise去取消自己呢？（其实自己取消不了自己的，除非包装变魔法旧瓶装新酒😈）
它的本质就是在解决如何取消一个已经执行的promise本身。

关键就在于处理怎样把resolve和reject暴露出去，做到之后某个时机做一个“取消的操作”，并让它影响现在正在执行的promise的状态。

```js
axios.get('/get/server', {
    cancelToken: token, 
    // 在发出请求时，config里需要配置一个属性cancelToken，它的值就是token。
    // 这个token实际上是个promise。在aixos内部，发出请求的时候，会去执行该token的promise的then方法，但是它目前的状态还是pending，依靠cancel（）方法才能把它变成成功态。
    // then方法成功执行，即会接着调用XMLHttpRequest原型上的方法abort，达到取消http请求的目的。
})
```

`不重要场景`

- 大文件上传实现进度的暂停、恢复。
- 重复请求。页面多个组件在mount时并发调用同一个接口，在第一个请求返回后，中断其他接口的调用（业务场景需要，如组件高度复用，不依赖公共api）。
- 竞态请求。页面定时轮询发起请求，上一个请求响应速度比下一个响应速度慢，则前者响应会覆盖后者，从而导致数据错乱。
- 快速连续点击一个按钮，如果这个按钮未进行控制，就会发出重复请求，假设该请求是生成订单，那么就有产生两张订单了，这是件可怕的事情。当然一般前端会对这个按钮进行状态处理控制，后端也会有一些幂等控制处理策略啥的，这是个假设场景，但也可能会发生的场景。
- 对于列表数据，可能有 tab 状态栏的频繁切换查询，如果请求响应很慢，也会产生重复请求。当然现在很多列表都会做缓存，如 Vue 中用 `<keep-alive />`

还有很多场景没有想到，针对每种场景，本质上就应该减少对服务器无效和多余的请求。

Axios 是一个基于 Promise 的 HTTP 客户端，同时支持浏览器和 Node.js 环境。对于浏览器环境来说，Axios 底层是利用 XMLHttpRequest 对象来发起 HTTP 请求。如果要取消请求的话，我们可以通过调用 XMLHttpRequest 对象上的 abort 方法来取消请求

当请求方式、请求 URL 地址和请求参数都一样时，我们就可以认为请求是一样的。因此在每次发起请求时，我们就可以根据当前请求的请求方式、请求 URL 地址和请求参数来生成一个唯一的 key。

在请求拦截器中进行拦截，为每个请求创建一个专属的 CancelToken，然后把 key 和 cancel 函数以键值对的形式保存到 Map 对象中，使用 Map 的好处是可以快速的判断是否有重复的请求。当出现重复请求的时候，我们就可以使用 cancel 函数来取消前面已经发出的请求，把当前请求信息添加到 pendingRequest 对象中。在取消请求之后，在响应拦截器中还需要把取消的请求从 pendingRequest 中移除

是的，尽管可以取消重复请求，只要网络还在连接，后端还是会一一收到所有的请求，该查库的查库，该创建的创建，只是重复请求返回的数据被前端取消了而已，前端只接受最后一次数据，渲染一次页面，所以这是前端的优化，哈哈

**请求失败自动重试**

接口请求后台异常时候，自动重新发起多次请求，直到达到所设次数

[文章](https://juejin.cn/post/6973812686584807432)

在响应拦截器上来实现请求重试功能，在 config 对象上设置重试次数和重试延时时间，当请求失败的时候，判断是否超过了重试次数，没有超过的话就重新发起请求，超过了就抛出异常

**请求接口数据缓存**

接口在设定时间内不会向后台获取数据，而是直接拿本地缓存

[文章](https://juejin.cn/post/6974902702400602148)

### canvas 图片压缩

**问题**

用户拍的现场施工图，图片体积过大（十M），图片上传一般不上传大体积图片，因为一些清晰度要求不高的场景，上传大体积图片意义不大且消耗资源。一是上传耗时比较长，二是增加了存储的开销，三是展示时消耗下载带宽，影响加载效率。 影响用户体验，所以有了前端进行图片压缩的需求。正常去情况下服务器会限制图片上传体积（正常2M）

**解决**

- 获取 `file` 对象，使用 `FileReader` 对象的 `readAsDataURL` 方法将图片读取 `Base64` 编码，赋值给 `imagfe.src`
- 通过 `canvas.getContext('2d')`创建 `canvas` 对象，通过 `drawImage`绘制图像
- 通过 `canvas.toDataURL(type, encoderOptions)`来压缩图片，`encoderOptions` 可以指定图片的质量（0 - 1）
- 将 `base64` 地址 转化回 `file` 文件(先通过辅助函数将 base64 转为 Blob 或者 ArrayBuffer，然后通过new File（）转为file文件)

另外，压缩图片会消耗一定的计算资源和时间，因此对于大型图片或需要大量压缩的场景，可以考虑将图片压缩的操作放在 Web Worker 中进行，以避免阻塞主线程。最后，记得在压缩图片之前，也可以先对图片进行一些优化操作，如裁剪、缩放、旋转等，以减小图片的尺寸和文件大小。

Vue-Cropper：Vue-Cropper 是基于 Vue.js 的图片裁剪组件，它具有简单易用的接口和功能，支持裁剪、旋转、缩放等操作，并提供了丰富的配置选项和事件回调。

- `FileReader()`: 可以异步读取存储在用户计算机上的文件
- `FileReader.readAsDataURL`: 方法会读取指定的 Blob 或 File 对象(base64)
- `FileReader.onload` 读取完毕之后的回调函数，返回读取的 base64
- `canvas` 可以通过这个标签上的属性来绘制图片并且可以实现压缩效果
- `canvas.getContext('2d')` 获得渲染上下文和它的 2d 绘画功能,返回 ctx 对象
- `ctx.drawImage(img,x,y,width,height)` 绘制图像 | x，y 对应的是坐标轴，width、height 绘制的图片大小
- `canvas.toDataUrl(type, encoderOptions)` 将 canvas 对象转为 base64 编码

```js
let input = document.getElementsByTagName('input')[0]

input.onchange = function (e) {
  const file = e.target.files[0]
  compressPic(file).then((resultFile) => {
    // formData.append('file', resultFile)
  })
}
function compressPic(file, encoderOtp = 0.6) { // 图片质量 图片质量0~1默认值0.92 
  return new Promise((resolve) => {
    // 1. 通过FileReader读取文件
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      // 2. 读取完毕之后获取图片的base64，赋值给image
      const imgBase64 = event.target.result
      const image = new Image()
      image.src = imgBase64

      // 3.图片加载完之后通过canvas压缩图片
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        // 3.1 绘制canvast图像
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        // 3.2 进行压缩 返回压缩后的base64地址
        const canvasURL = canvas.toDataURL(file.type, encoderOtp)

        // 再将base64转化为文件-----------------------------------------------------
        const buffer = atob(canvasURL.split(',')[1]) // atob() 对经过 base-64 编码的字符串进行解码
        // bufferArray 无符号位字节数组 相当于在内存中开辟length长度的字节空间
        let length = buffer.length
        const bufferArray = new Uint8Array(length)
        // 给新开辟的bufferArray赋值
        while (length--) {
          bufferArray[length] = buffer.charCodeAt(length)
        }
        // 将压缩后的文件通过resolve返回出去
        const resultFile = new File([bufferArray], file.name, { type: file.type })
        console.log(resultFile)
        resolve(resultFile)
      }
    }
  })
}
```

### 无痛刷新 token

[参考文章-看这个](https://juejin.cn/post/7289741611809587263)

登陆时后端返回两个 token，比如`access_token`过期时间设置 2 小时，`refresh_token`过期时间设置一周。当`access_token`过期的时候，用`refresh_token`去请求获取新的`access_token`，存储到 cookie

`方法一`

在请求发起前拦截每个请求，判断 token 的有效时间是否已经过期，若已过期，则将请求挂起，先刷新 token 后再继续请求。

- 优点： 在请求前拦截，能节省请求，省流量。
- 缺点： 需要后端额外提供一个 token 过期时间的字段；使用了本地时间判断，若本地时间被篡改，特别是本地时间比服务器时间慢时，拦截会失败。

`方法二`

在响应拦截里拦截返回后的数据。如果`401`token 过期，用`refreshToken`去请求新的 token

- 优点：不需额外的 token 过期字段，不需判断时间。
- 缺点： 会消耗多一次请求，耗流量。

### 扫码枪录入问题

[文章]([https://](https://blog.csdn.net/MichelleZhai/article/details/127667415))

扫码枪原理：每次使用扫码枪相当于执行了输入扫码的字符+回车enter事件。

扫码枪解析完条形码后，帮我们敲下了回车（这个是在扫码枪的说明书里，扫指定的条码配置的），所以要监听回车。如果不想让他自动敲回车，也可以监听输入内容的长度，比如 input输入内容的长度===13，然后向数组里push，再清空一下就可以了

**问题**

在中文输入法下，输入扫码的字符，相当于在敲拼音，这会导致显示结果和扫码内容不一致的情况。比如中通快递单号为：ZT103838237398

![alt](../img/shuru.webp)

**解决**

1. 一个div和一个type为password ，两者数据实时绑定
2. div覆盖在password上，设定一个伪类来实现div的闪烁光标
3. password的focus和blur方法中控制div的光标是否显示
4. div的不设宽度，促使光标紧随div内容后面

但是password和浏览器之间本身就有自动历史密码填充的提示交互，如果想要禁用这个提示，就要使用 readOnly这个属性

1. 默认readOnly为true
2. onFocus时放开，因为用户要输入内容，onBlur时关闭，此时防止弹窗提示
3. 往往在自动enter事件时会有接口请求动作，在这个动作之前关闭readOnly，禁用提示

### 项目上线部署

- 通过 node 创建 web 服务器
- 开启 gzip 压缩
- 配置 https 服务(后台做的)

1. 传统的 http 协议传输的数据都是明文,不安全
2. 采用 https 协议对传输的数据进行了加密处理,可以防止数据被中间人窃取,使用更安全

```text
配置:
申请SSL证书(https://freessl.org) 企业申请一般都是收费的
1.https://freessl.cn/官网(免费),输入要申请的域名并选择品牌
2.输入自己的邮箱并选择相关选项
3.验证DNS(在域名管理后台添加TXT记录)
4.验证通过后,下载SSL证书(full_chain.pem公钥,private.key私钥)
```

```js
// 在后台项目中导入证书
const https = require('https')
const fs = require('fs')
const option = {
  cert: fs.readFileSync('./full_chain.pem'),
  key: fs.readFileSync('./private.key'),
}
https.createSserver(options, app).listen(443)
```

- 使用 pm2 管理应用(关掉终端窗口,服务也不会关)

  1. 在服务器中安装: npm i pm2 -g
  2. 启动项目: pm2 start 脚本 --name 自定义名称
  3. 查看服务器上运行的项目: pm2 ls
  4. 重启项目 pm2 restart 自定义项目
  5. 停止项目 pm2 stop 自定义项目
  6. 删除项目 pm2 delete 自定义项目

### Vue 项目中 IE9+兼容性问题

**不支持 ES6**

```js
// 一、安装
npm i --save babel-polyfill

// 二、引入babel-polyfill的方式无非有以下2种
// 1.在main.js的顶部直接使用 import ‘babel-polyfill’
// 2.在vue.config.js中，直接在chainWebpack内添加以下代码

chainWebpack: config => {
    config.entry('main').add('babel-polyfill')
    config.entry.app = ['babel-polyfill', './src/main.js']
  }
// 三、在babel.config.js中设置entry

module.exports = {
  presets: [['@vue/app', { 'useBuiltIns': 'entry', polyfills: ['es6.promise', 'es6.symbol'] }]]

```

**Axios 不兼容**

最简单的方法下载 axios0.18.0 及以下版本

```js
npm install es6-promise

import promise from 'es6-promise'
promise.polyfill()
```

**IE9 中 cors 跨域无法携带请求头信息，开发时可用代理,生产用 nginx**

**URLSearchParams 未定义的问题，原来是 IE9 不支持**

```js
npm install qs
main.js全局引入`import qs from 'qs'
```

**`Number`  对象的  `parseInt`  和  `parseFloat`  方法**

```js
if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat
```

**display:flex 布局**

改用 position、float、display:inline-block

**条件注释法**

因为我是针对 IE9，所以我采用了 IE 浏览器专有的 Hack 方式：条件注释法。

```html
<head>
  // ...
  <!--[if lte IE 9]>
      <link href="./ie9/ie9.css" rel="stylesheet"></link>
      <script src="./ie9/ie9-oninput-polyfill.js" type="text/javascript"></script>
    <![endif]-->
</head>
```

**不能导出二进制文件流**

因为 ie9 一下不支持 new Blob，所以不能将二进制文件流转为文件下载。解决方法是让后台改接口，不要传二进制文件流过来，直接给前端传文件下载链接

**el-upload 无法使用**

el-upload 是无法使用的。我引入了能够兼容 ie9 的其他上传插件，当浏览器为 ie9 时就用自定义的上传组件，当非 ie9 时就保持原来的 el-upload 组件。vue-upload-component 替代 el-upload

cnpm install vue-upload-component --save

**使用 elementUI 的时候发现在 ie 上所有的字体图标都没了**

后来发现也是 ie 设置问题，在浏览器设置里有一项下载字体 设置为启用即可

**通用办法，有点欠打，判断浏览器版本**

当我们打开页面的时候，需要判断浏览器是谷歌，火狐还是 ie；

只要浏览器启用 JavaScript，navigator 对象就一定存在

```js
function IEVersion() {
  var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (d+.d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    } else {
      return 6 //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' //edge
  } else if (isIE11) {
    return 11 //IE11
  } else {
    return -1 //不是ie浏览器
  }
}
```

我们在 index.html 中写下判断是否是 ie 及 ie 版本号的方法，调用，如果是符合的版本号，我们就跳转到相应的页面 if (IEVersion() == 7 || IEVersion() == 8 || IEVersion() == 9) {       window.location.href = './downGoogle.html'; } 此时，当我们用 ie7,8,9 版本的浏览器访问页面的时候，会跳转到 downGoogle.html，

请注意，因为需要兼容 ie 的版本，这里请不要使用 es6 的语法，比如 const，let 等；

`下载`

downGoogle.html 页面，只需要用 a 标签，放上谷歌浏览器版本的服务器地址即可，

```html
<div class="main-content">
     
  <h2>很抱歉，您的浏览器版本太旧，请升级或者下载安装以下浏览器</h2>
     
  <p>windows</p>
     
  <ul>
           
    <li>            <a href="./83.0.4103.97_chrome32_stable_windows_installer.exe" download>谷歌浏览器32位</a>        </li>
           
    <li>            <a href="./83.0.4103.97_chrome64_stable_windows_installer.exe" download>谷歌浏览器64位</a>        </li>
       
  </ul>
</div>
```

这样，提示用户以及提供相应的浏览器下载，虽然在体验上有稍微影响，总体来说，解决了 ie8 以下最初不能浏览网页的问题

vue3.x 已经不兼容 ie 版本了，估计是维护成本太高。Babel 的 transpiled 和 polyfilled 都没办法支持 Proxy 的功能特性。ES6 是 ES5 的后浪，不是闹的。未来，类似这种过渡的页面在某些单位会依旧存在，直至老旧系统的更新迭代成为过去，届时，或许有另外一个‘ie’了吧

### 微前端方案

微前端借鉴了微服务的架构理念，将一个庞大的前端应用拆分为多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用联合为一个完整的应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活

ssr首先肯定才是唯一的正道，国内搞微前端除了整合老旧技术之外，一点屁用没有，不少公司为了kpi硬整微前端，搞了微前端本来就是为了解藕，又踏马要应用各种花里胡哨通信又给耦合回去了，真是吐

**微前端和iframe主要区别**

集成方式：微前端更关注将前端应用拆分为独立的部分，并通过技术手段将它们集成到一个完整的应用中。而 iframe 是一种在一个页面中嵌入另一个页面的方式。

通信和交互：微前端应用之间可以通过一些技术手段（如前端集成框架提供的机制、自定义事件、跨文档通信等）进行通信和交互。而 iframe 之间的通信相对较为复杂，需要使用 postMessage 方法或其他技术手段来进行跨文档通信。

样式和样式隔离：微前端应用可以通过一些技术手段实现样式的共享和隔离，使得不同应用之间的样式不会互相影响。而 iframe 通过隔离的文档环境，天然地提供了样式的隔离。

**方案**

前端集成框架：使用前端集成框架，如 single-spa、qiankun、Garfish、无界 等，来管理多个微前端应用的路由和生命周期。

Web Components：使用 Web Components 技术，如 Custom Elements 和 Shadow DOM，将应用封装成可复用的组件，并通过组合这些组件来构建完整的应用。

基座应用：创建一个基座应用，负责管理微前端应用的加载、路由和通信。微前端应用可以通过框架或库提供的机制将自己注册到基座应用中。

### 微前端 nginx 转发

微前端是一种软件架构模式，旨在将大型单体应用程序拆分为更小、更可管理的部分，这些部分可以独立开发、测试、部署和扩展。在微前端中，通常会有多个独立的前端应用程序共同运行在同一个页面上。使用Nginx作为微前端的部署方案是很常见的，下面是一种实现微前端架构的基本思路：

拆分前端应用： 将原本的大型前端应用拆分成独立的小型前端应用，每个应用负责自己特定的业务功能或页面。

制定路由策略： 确定如何将用户的请求路由到不同的前端应用程序。这可能包括基于路径的路由、基于子域名的路由或其他定制的路由策略。

Nginx配置： 在Nginx服务器上配置反向代理和路由规则，使其能够根据请求将流量转发到相应的前端应用程序。

静态资源管理： 确保每个前端应用程序的静态资源（如HTML、CSS、JavaScript文件等）能够被正确地加载和访问。

协同开发和部署： 确保团队能够独立开发和部署各自的前端应用程序，同时保证它们能够协同工作并共同组成完整的用户界面。

下面是一个简单的Nginx配置示例，用于实现微前端架构中的路由和反向代理：

```nginx
Copy code
server {
    listen 80;
    server_name example.com;

    location /app1 {
        proxy_pass http://localhost:3001;
        # 可以根据需求配置其他反向代理选项
    }

    location /app2 {
        proxy_pass http://localhost:3002;
        # 可以根据需求配置其他反向代理选项
    }

    # 其他路由规则...
}
```

在这个示例中，当用户访问example.com/app1时，Nginx会将请求转发到运行在本地的端口3001上的第一个前端应用程序；当用户访问example.com/app2时，Nginx会将请求转发到运行在本地的端口3002上的第二个前端应用程序。通过类似的配置，您可以实现更复杂的路由和反向代理策略，以满足您的微前端架构需求。

值得注意的是，微前端架构的实现可能会涉及到更多的方面，如跨应用状态管理、共享组件库、单点登录等。因此，在设计和实施微前端架构时，需要综合考虑各种因素，并根据具体情况进行调整和扩展。

### 公用组件/方法封装

- 首先，提供一个简单的分类，列出你曾经封装过的组件类型，比如表单组件、列表组件、弹窗组件、轮播组件等等。
- 对于每种组件类型，简单说明该组件的作用和特点，以及你封装该组件的目的和设计原则。
- 对于每个具体的组件，可以说明一下封装过程中遇到的问题和解决方法，如何保证组件的可复用性和扩展性，如何提高组件的性能和用户体验等等。
- 可以分享一下你在组件封装方面的思考和实践经验，比如如何提高代码的可读性和可维护性，如何应对不同场景下的需求变化，如何与团队成员协作，如何进行测试和调试等等。

**回答示例：**

我曾经封装过不少的组件，其中比较常见的有表单组件、列表组件、弹窗组件和轮播组件。对于表单组件来说，我封装的主要目的是为了提高表单输入的效率和减少代码的冗余。在设计过程中，我注重组件的灵活性和可扩展性，采用了 props 和 events 的方式进行参数传递和事件触发。对于列表组件来说，我注重的是组件的性能和用户体验，采用了虚拟滚动和分页加载等技术来提高列表的渲染效率和响应速度。在封装弹窗组件和轮播组件时，我考虑的是组件的复用性和扩展性，采用了插槽和插件的方式来实现组件的可定制化和功能扩展。

- Pagination 分页组件： Pagination 组件主要是基于 Element 的 el-pagination 进行了二次封装，并拓展了自动滚动的功能。
- 图片裁剪组件：基于 vue-cropper 的二次封装
- 吸顶组件： 使用传入 top 值，当滚动超过 top 值时，吸顶
- svg 组件封装：svg-icon 默认会读取其父级的 color fill: currentColor，改变父级的 color 或者直接改变 fill 的颜色即可。
- 大文件上传组件
- 富文本 tinymce

**公用方法**

- 校验手机号邮箱格式等的方法
- 加密公用方法
- 文件下载公用方法
- 格式化时间
- 扁平化数据转换
- 判断空的方法
- 对象拷贝

### SSR方案

### 消息推送

[参考文章](https://juejin.cn/post/7325730345840066612?searchId=202403141451388C8364F5A3B798804296)

### 前端监控
