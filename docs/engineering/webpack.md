## 一、Git

### 1. git 和 svn 的区别

- git 和 svn 最大的区别在于 git 是分布式的，而 svn 是集中式的。因此我们不能再离线的情况下使用 svn。如果服务器出现问题，就没有办法使用 svn 来提交代码。
- svn 中的分支是整个版本库的复制的一份完整目录，而 git 的分支是指针指向某次提交，因此 git 的分支创建更加开销更小并且分支上的变化不会影响到其他人。svn 的分支变化会影响到所有的人。
- svn 的指令相对于 git 来说要简单一些，比 git 更容易上手。
- **GIT把内容按元数据方式存储，而SVN是按文件：** 因为git目录是处于个人机器上的一个克隆版的版本库，它拥有中心版本库上所有的东西，例如标签，分支，版本记录等。
- **GIT分支和SVN的分支不同：** svn会发生分支遗漏的情况，而git可以同一个工作目录下快速的在几个分支间切换，很容易发现未被合并的分支，简单而快捷的合并这些文件。
- **GIT没有一个全局的版本号，而SVN有**
- **GIT的内容完整性要优于SVN：** GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏

### 2. 经常使用的 git 命令？

```js
git init                     // 新建 git 代码库
git add                      // 添加指定文件到暂存区
git rm                       // 删除工作区文件，并且将这次删除放入暂存区
git commit -m [message]      // 提交暂存区到仓库区
git branch                   // 列出所有分支
git checkout -b [branch]     // 新建一个分支，并切换到该分支
git status                   // 显示有变更文件的状态

// 配置 Git
git config --global user.name "Your Name"     // 配置用户名
git config --global user.email "youremail@example.com"      // 配置用户邮箱
git config --global core.editor "vim"     // 配置默认文本编辑器
git config --list     // 查看当前 Git 配置信息

// 创建仓库
git init      // 创建一个新的本地仓库
git clone [url]     // 从远程仓库克隆代码到本地

// 本地修改
git add [file]      // 添加文件到暂存区
git add .     // 添加所有修改的文件到暂存区
git reset [file]      //从暂存区中移除文件，但不删除文件
git checkout -- [file]      //撤销对文件的修改（还原到最近一次提交的状态）
git commit -m "Commit message"      //提交所有暂存区的修改到本地仓库
git commit --amend      //修改最近一次提交的信息

// 分支管理
git branch      // 查看本地分支列表
git branch [name]     //创建一个新的分支
git checkout [name]     //切换到指定分支
git merge [name]      //将指定分支合并到当前分支
git branch -d [name]      //删除指定分支

// 远程操作
git remote add [name] [url]     //添加一个远程仓库
git remote -v     //查看远程仓库列表
git push [remote] [branch]      //将本地修改推送到远程仓库
git pull [remote] [branch]      //从远程仓库拉取最新代码到本地
git fetch [remote]      //从远程仓库拉取最新代码到本地，但不进行合并操作

// 查看状态
git status      //查看当前仓库状态
git log     //查看提交历史
git diff      //查看当前修改与最新提交之间的差异
git blame [file]      //查看文件每一行的修改记录
```

### 3. git pull 和 git fetch 的区别

- git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。
- git pull 会将远程仓库的变化下载下来，并和当前分支合并。

### 4. git rebase 和 git merge 的区别

git merge 和 git rebase 都是用于分支合并，关键**在** **commit 记录的处理上不同**：

- git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。
- git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。

## 二、Webpack

### webpack基本原理

`Webpack`是一个静态模块打包工具，它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。由于 `webpack`只能处理 JS 与 JSON 文件，所以需要通过一系列的 `loader` 和 `plugin` 对其他类型的文件进行处理供浏览器运行。它的原理主要分为以下几个步骤：

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- `确定入口`：根据配置中的 entry 找出所有的入口文件；
- `编译模块`：从入口文件出发，调用所有配置的 `Loader` 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### webpack五大核心概念

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范

**entry（入口）**

指示 `webpack` 应该使用哪个模块来作为构建其内部依赖图的开始，也就是Webpack 从哪个文件开始打包

- string：`"./src/index.js"`
    单入口，打包形成一个chunk，输出一个bundle文件，输出的文件名默认叫main.js。
- array：`["./src/index.js", "./src/index.html"]`
    多入口，打包形成一个chunk，输出一个bundle文件，一般用于HTML文件的HMR功能。
- object：`{index: "./src/index.js", add: "./src.add.js"}`
    多入口，有多少个入口文件就形成几个chunk，输出多少个bundle文件，文件名称是对象中的key

**output（输出）**

指示 Webpack 打包完的文件输出到哪里去，如何命名等

```js
output:{
  filename: "js/[name].js",
  path: resolve(__dirname, "dist"), // 输出文件目录（将来所有资源输出的公共目录）
  publicPath: '/', // 所有资源引入的公共路径前缀，一般用于生产环境下，所有引入的资源都加入此前缀
  chunkFilename: "js/[name]_chunk.js", // 打包其他资源时使用此命名，若不配置此项，则使用filename命名
}
```

**loader（加载器）**

webpack 本身只能处理 js、json 等资源，其他资源需要借助 `loader` 才能解析。它本身是一个函数，接收原文件作为参数，返回转换的结果。loader 一般以 `xxx-loader` 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如css-loader

**plugins（插件）**

扩展 Webpack 的功能，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

**mode（模式）**

主要由两种模式：开发模式：`development` 和生产模式：`production`

- 开发依赖：帮助程序员加工代码的库，都是开发依赖
- 生产依赖：帮助程序员实现功能效果的库，都是生产依赖

### loader和plugin的作用

**loader**

`Loader`用于处理`Webpack`中不同类型的文件，例如JavaScript、CSS、图片等。Webpack默认只能处理JavaScript文件，而对于其他类型的文件，需要使用相应的loader进行处理。Loader是一个函数或者一个模块，它可以将一个文件作为输入，经过处理后返回一个新的文件。

在Webpack中，loader通过配置文件中的module.rules来定义。一个rule由三个部分组成：

- test：用于匹配需要处理的文件，通常使用正则表达式来定义
- use：定义需要使用的loader，可以是一个或多个loader，按照从后往前的顺序依次执行
- options：loader的配置选项，通常以对象的形式定义

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}
```

**plugin**

主要是扩展 `webpack` 的功能，例如代码压缩、文件输出等。站在代码逻辑的角度就是：webpack 在编译代码过程中，会触发一系列 Tapable 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了

一个Plugin通常是一个JavaScript对象，它包含一个或多个钩子函数。在Webpack配置文件中，可以通过plugins字段来定义需要使用的Plugin。例如，使用UglifyJsPlugin来压缩代码可以定义如下：

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}
```

### wepack基础配置

[webpack配置](https://zhuquanyu.gitee.io/webpack_docs_static/intro/)
[webpack基础配置](https://mp.weixin.qq.com/s/vYBuO2lOw0k2dBKx9Uy0yw)
[webpack优化](https://mp.weixin.qq.com/s/COzqLGzEOhMlU9MeYAD_6g)
[webpack规范搭建](https://mp.weixin.qq.com/s/PJKLUrWegvUwbl5mE4oUeA)
[wepack5](https://juejin.cn/post/6996816316875161637#heading-49)
[webpack5](https://juejin.cn/post/7023242274876162084#heading-37)

- 配置entry入口和output输出路径

```js
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true, // 自动将上次打包目录资源清空
  }
```

- 处理css资源：配置`use: ["style-loader", "css-loader", "less-loader"]`
  - `less-loader`：负责将 Less 文件编译成 Css 文件
  - `css-loader`：负责将 Css 文件编译成 Webpack 能识别的模块
  - `style-loader`： 会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容
  - sass-loader：负责将 Sass 文件编译成 css 文件
  - sass：sass-loader 依赖 sass 进行编译
  - stylus-loader：负责将 Styl 文件编译成 Css 文件
  
  `提取css文件`:Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式。这样对于网站来说，会出现闪屏现象，用户体验不好。我们应该是单独的 Css 文件，通过 link 标签加载性能才好

  ```js
  npm i mini-css-extract-plugin -D

  use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]

  // 提取css成单独文件
  new MiniCssExtractPlugin({
    // 定义输出文件名和目录
    filename: "static/css/main.css",
  })
  ```

  `css兼容性处理`： `npm i postcss-loader postcss postcss-preset-env -D`

  `css压缩`：`npm i css-minimizer-webpack-plugin -D`

- 处理图片资源： `Webpack4` 处理图片资源通过 `file-loader` 和 `url-loader` 进行处理，`Webpack5`已经将两个Loader功能内置到Webpack。配置`asset`即可处理图片资源

```js
 {
    test: /\.(png|jpe?g|gif|webp)$/,
    type: "asset",
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024 // 小于10kb的图片会被base64处理 
        // 优点：减少请求数量,以 data URI 形式内置到 js 中  缺点：体积变得更大
      }
    }
  }
```

- 处理字体图标资源和其他资源(视频音频等)

```js
{
  test: /\.(ttf|woff2?|map4|map3|avi)$/,
  type: "asset/resource",
  generator: {
    filename: "static/media/[hash:8][ext][query]",
  }
}
```

- 处理js资源，Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法
  - 我们先完成 Eslint，检测代码格式无误后
  - 在由 Babel 做代码兼容性处理

  ```js
  npm i babel-loader @babel/core @babel/preset-env -D

  {
    test: /\.js$/,
    exclude: /node_modules/, // 排除node_modules代码不编译
    loader: "babel-loader",
  }
  ```

- 处理Html资源，会自动引入js文件

```js
npm i html-webpack-plugin -D

new HtmlWebpackPlugin({
  // 以 public/index.html 为模板创建文件
  // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
  template: path.resolve(__dirname, "public/index.html"),
})
```

- 处理vue文件
  - vue：Vue开发所需的依赖
  - vue-loader：解析.vue文件的loader
  - vue-template-compiler：解析vue中模板的工具
  - @vue/babel-preset-jsx：支持解析vue中的jsx语法

- 配置自动化编译，代码都会在内存中自动编译打包

```js
npm i webpack-dev-server -D

// 开发服务器
devServer: {
  host: "localhost", // 启动服务器域名
  port: "3000", // 启动服务器端口号
  open: true, // 是否自动打开浏览器
}
```

- 配置路径别名

```js
module.exports = {
  // 刚才的代码...
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
      tools: '~/tools'
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue'],
  },
}
```

- 配置开发环境和生产环境
  - webpack.base.js：两个环境共用配置
    - 入口，输出配置
    - 各种文件的处理
    - 进度条展示
    - 路径别名
  - webpack.dev.js：开发环境独有配置
    - webpack-dev-server
    - 不同的source-map模式
    - 不同的环境变量
  - webpack.prod.js：生产环境独有配置
    - 不同的source-map模式
    - 不同的环境变量

### webpack5优化

#### 构建速度

- **HotModuleReplacement（HMR/热模块替换）**

  开发时我们修改了其中一个模块代码，`Webpack` 默认会将所有模块全部重新打包编译，速度很慢。使用`HotModuleReplacement`让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。

- **OneOf**

  打包时每个文件都会经过所有 loader 处理，虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍。比较慢。使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。

  ```js
   module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
        ]
      }
    }
  ```

- **配置Include/Exclude缩减范围**

  配置include/exclude缩小Loader对文件的搜索范围，好处是避免不必要的转译。node_modules目录的体积这么大，那得增加多少时间成本去检索所有文件啊？include/exclude通常在各大Loader里配置

  ```js
    module: {
        rules: [{
            exclude: /node_modules/,
            include: /src/,
            test: /\.js$/,
            use: "babel-loader"
        }]
    }
  ```

- **cache缓存副本**

  有了`cache`后，`dll`和`cache-loader`都不需要了

  第一种：每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，再次编译时只编译修改过的文件

  ```js
  export default {
      // ...
      module: {
          rules: [{
              // ...
              test: /\.js$/,
              use: [{
                  loader: "babel-loader",
                  options: { cacheDirectory: true }
              }]
          }]
      },
      plugins: [
          new EslintPlugin({ cache: true })
      ]
  }
  ```

  第二种：配置 webpack 持久化缓存`type: 'filesystem'`, 可以设置为memory或filesystem，来缓存构建过程中的中间结果，大幅提升二次构建速度、打包速度，当构建突然中断，二次进行构建时，可以直接从缓存中拉取，可提速 90% 左右。

- **Thread-loader多进程打包**

  `happypack`webpack5已经弃用

  我们想要继续提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少。而对 js 文件处理主要就是 `eslint` 、`babel`、`Terser`(webpack默认压缩js的) 三个工具，所以我们要提升它们的运行速度

  Thread-loader是Webpack中一个用于多进程打包的Loader，它可以将某个Loader的执行过程放到一个单独的worker池中运行，从而加速打包过程。使用 `Thread` 多进程获取cpu多个核心处理 eslint 和 babel 任务，速度更快。使用方法是将`thread-loader`放在比较费时间的loader。

  `注意`: 每个进程启动都有开销的(大约600ms)，所以我们只有在后期项目比较大的情况下才会使用多进程

- **区分source-map类型**

  `source-map`的作用是：source-map 是一种映射关系，可以将编译后的代码映射回原始代码，以方便在开发和调试过程中定位问题。在开发环境和生产环境中都可以使用 source-map。它的体积不容小觑，所以对于不同环境设置不同的类型是很有必要的

    - 开发模式：devtool: eval-cheap-module-source-map
      - 本地开发首次打包慢点没关系，因为 `eval` 缓存的原因，rebuild 会很快
      - 开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 `cheap`
      - 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 `module`

    - 生产模式：不要sourcemap或者`devtool: source-map`
      - 优点：包含行/列映射
      - 缺点：打包编译速度更慢

- **优化resolve配置**

  `resolve`用来配置 webpack 如何解析模块，可通过优化 resolve 配置来覆盖默认配置项，减少解析范围。
  alias 可以创建别名、extensions 表示需要解析的文件类型列表、modules 表示 webpack 解析模块时需要解析的目录等

- **区分环境**

  在开发过程中，切忌在开发环境使用生产环境才会用到的工具，如在开发环境下，应该排除 `[fullhash]`/`[chunkhash]`/`[contenthash]` 等工具。

  同样，在生产环境，也应该避免使用开发环境才会用到的工具，如 webpack-dev-server 等插件。
  
#### 优化打包体积

- **打包体积分析**

  借助插件webpack-bundle-analyzer分析文件的体积大小、各模块依赖关系，找出无用的依赖并卸载

- **代码压缩**

  - js代码压缩：webpack5 自带最新的 terser-webpack-plugin， 并默认就开启了多进程和缓存，无需手动安装
  - css代码压缩： CSS代码压缩使用css-minimizer-webpack-plugin，会清除无用的 CSS 代码，压缩和优化 CSS

- **图片压缩**
  
  使用 `image-minimizer-webpack-plugin`插件对项目中图片进行压缩，体积更小，请求速度更快。（如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）小于10kb的图片 转base64 这样体积不会大很多，但是可以减少请求次数

- **开启Gzip压缩**
  
  开启 gzip 压缩都可以大大减小资源传输的大小，提高应用性能。使用webpack插件compression-webpack-plugin，当 Webpack 打包完成后，会生成对应的 gzip 压缩文件，浏览器在请求资源时，如果支持 gzip 压缩，会自动请求对应的 gzip 压缩文件。（需要nginx开启 gzip_static on）。只要看响应头部（Response headers）中 有没有Content-Encoding: gzip这个属性即可，有代表有开启gzip压缩。

- **按需引入组件库**

  像 element-ui 这种组件库可以按需引入。使用babel-plugin-import插件。这个插件可以自动将组件库中的组件按需导入，可以大大减小打包后的文件大小（修改.babelrc）

- **使用CDN服务**

  我们公司使用的腾讯CDN，第三方依赖使用CDN引入，externals 是用来告诉打包工具哪些模块是外部依赖，应该在运行时从外部获取而不是打包进 bundle 中

- **开启Tree Shaking**

  移除 JavaScript 中的没有使用上的代码，当打包的`mode`为`production`时，`webpack5`自动开启`tree-shaking`进行优化

  开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。这样将整个库都打包进来，体积就太大了。使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。

- **Scope Hoisting**

  在 JavaScript 中，还有“变量提升”和“函数提升”，JavaScript 会将变量和函数的声明提升到当前作用域顶部，而“作用域提升”也类似，webpack 将引入到 JS 文件“提升到”它的引入者的顶部

  Scope Hoisting的主要目的是减少由于模块化导致的JavaScript文件数量，减少代码中的重复引用，从而减少打包后文件的体积，提高应用程序的加载速度。当打包的`mode`为`production`时，`webpack5`自动开启`Scope Hoisting`进行优化。由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效

  在没有Scope Hoisting的情况下，Webpack会将每个模块的代码都封装在一个函数中，并通过require来调用这个函数。这种方式会导致打包后的代码体积变得非常庞大，因为每个模块的代码都需要包装在一个函数内部，这样就会导致大量的重复代码。

  Scope Hoisting通过将模块的代码合并到一个函数内部，消除重复代码，从而减少了打包后的代码体积，提高了应用程序的加载速度。这个技术可以在Webpack中通过设置optimization.scopeHoisting来开启，从而实现对应用程序的性能优化。

- **去除babel生成的辅助代码**

  Babel 编译时为的每个文件都插入了辅助代码，使代码体积过大！Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。你可以将这些辅助代码作为一个独立模块，来避免重复引入。

  引入`@babel/plugin-transform-runtime`插件: 禁用了 Babel 自动对每个文件的 runtime 注入，使所有辅助代码从插件这里引用，从而体积更小

- **IgnorePlugin**

  IgnorePlugin 是用来忽略特定的模块，不被打包进最终的 bundle 中。

  在某些情况下，某些模块虽然被引用了，但实际上并不需要被打包，例如一些 polyfill 库、一些大型的依赖库等等。这时可以使用 IgnorePlugin 将这些模块忽略掉，从而减小 bundle 的体积，提高加载速度。比如monet的语言文件

- **source-map**

  生产环境可以选择不打包source-map或者选择一些轻量的source-map

#### 优化代码运行性能

- **代码分割 Code Split**

   打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

   使用 `splitChunks`配置对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，达到需要使用时才加载该资源，不用时不加载资源。这也是路由懒加载的实现方式

- **Preload / Prefetch**

  使用`import` 动态导入来进行按需加载，加载速度有限制，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
  
   `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。它们的问题：兼容性较差

- **合理使用hash值应对缓存**

   使用 `contenthash` 能对输出资源文件进行命名，这样才能保证在上线后，改过的文件需要更新hash值，而没改过的文件依然保持原本的hash值，浏览器访问时没有改变的文件会命中缓存，从而达到性能优化的目

  ```js
  // webpack.base.js

  output: {
    path: path.resolve(__dirname, '../dist'),
    // 给js文件加上 contenthash
    filename: 'js/chunk-[contenthash].js',
    clean: true,
  },
  ```

- **Core-js**

   我们使用 `babel` 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。它能将 ES6 的一些语法进行编译转换，比如箭头函数、扩展运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

   `core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill`。使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。

- **PWA离线处理**

   开发 Web App 项目，项目一旦处于网络离线情况，就没法访问了。我们希望给项目提供离线体验。使用 `PWA` 能让代码离线也能访问，从而提升用户体验。内部通过 Service Workers 技术实现的

- **小图转base64**

  样可以减少用户的http网络请求次数，提高用户的体验。webpack5中url-loader已被废弃，改用asset-module

## Vite

### vite是什么

[文章](https://juejin.cn/post/7064853960636989454)

`定义`: `Vite`是面向现代浏览器的前端构建工具，在尤雨溪开发`Vue3.0`的时候诞生。类似于`Webpack`+ `Webpack-dev-server`。其主要利用浏览器`ESM`特性导入组织代码，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。生产中利用`Rollup`作为打包工具，号称下一代的前端构建工具。

`Vite`有如下特点：

- 快速的冷启动: `No Bundle` + `esbuild` 预构建
- 即时的模块热更新: 基于`ESM`的`HMR`，同时利用浏览器缓存策略提升速度
- 真正的按需加载: 利用浏览器`ESM`支持，实现真正的按需加载

`Vite`其核心原理是利用浏览器现在已经支持`ES6`的`import`,碰见`import`就会发送一个`HTTP`请求去加载文件，`Vite`启动一个 `koa` 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以`ESM`格式返回返回给浏览器。`Vite`整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的`webpack`开发编译速度快出许多！

### webpack打包和vite的区别

**webpack**

- `webpack启动`：传统的打包工具如`Webpack`是先解析依赖、打包构建再启动开发服务器，`Dev Server` 必须等待所有模块构建完成，当我们修改了 `bundle`模块中的一个子模块， 整个 `bundle` 文件都会重新打包然后输出。项目应用越大，启动时间越长。
- `Webpack HMR 热更新`的反应速度比较慢。Webpack 的热更新会以当前修改的文件为入口重新 build 打包，所有涉及到的依赖也都会被重新加载一次。虽然webpack 也采用的是局部热更新并且是有缓存机制的，但是还是需要重新打包所以很大的代码项目是真的有卡顿的现象
- webpack使用的是 node.js 去实现的，而 vite 使用的是esbuild预构建依赖。而es build使用Go编写的，比 node.js 编写的打包器预构建依赖快 10-100 倍。

**vite打包**

- `快速冷启动`：vite主要遵循的是使用ESM(Es modules模块)的规范来执行代码，由于现代浏览器基本上都支持了ESM规范，所以在开发阶段并不需要将代码打包编译成es5模块即可在浏览器上运行。我们只需要从入口文件出发， 在遇到对应的 `import` 语句时，将对应的模块加载到浏览器中就可以了。因此，这种不需要打包的特性，也是vite的速度能够如此快速的原因。
- `按需打包`：当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂，模块越多vite的优势越明显。
- `在HMR（模块热替换）`: 当改动一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高
- webpack 在全过程依赖 babel-loader 处理代码, vite 在开发过程中使用 `esbuild 构建`。esbuild 是一个新的代码构建工具，其构建依赖于 go，并且利用了 paralleljs 高并行的优势，构建速度非常疯狂，当然圈粉的速度也很疯狂
- `打包到生产环境`，vite使用传统的`rollup`进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的时ES Module，因此在代码中不可以使用CommonJS
- `对现代的浏览器支持性比较好`，传统的浏览器可以通过官方提供的 @vite/plugin-legacy 插件支持。

- [官方插件](https://link.juejin.cn?target=https%3A%2F%2Fvitejs.dev%2Fplugins%2F%23official-plugins "https://vitejs.dev/plugins/#official-plugins")
共有四个，
  - `@vitejs/plugin-vue` 用以处理 vue 文件，将文件中的 template、style 和 script 分析成三个部分
  - `@vitejs/plugin-vue-jsx` 用以处理 vue 中的 jsx，与 react 不同的是，vue 中的 jsx 插件，具有 v-modal、v-slots 等 vue 特有的属性
  - `@vitejs/plugin-react-refresh`通过比对更改，为 react 提供更快的局部更新
  - `@vitejs/plugin-legacy` 在 esbuild 构建之后再经过一层 @babel/preset-env，用来兼容不支持 ESM 或 ie11 的旧版浏览器

### vite优化策略

由于vite打包是让浏览器一个个模块去加载的，因此，就很容易存在http请求的瀑布流问题（浏览器并发一次最多6个请求）。此次，vite内部为了解决这个问题，主要采取了3个方案。

1. 预打包，确保每个依赖只对应一个请求/文件。比如lodash。此处可以参考 [github.com/vitejs/vite…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Fblob%2Fmain%2Fpackages%2Fvite%2Fsrc%2Fnode%2Foptimizer%2FesbuildDepPlugin.ts%23L73 "https://github.com/vitejs/vite/blob/main/packages/vite/src/node/optimizer/esbuildDepPlugin.ts#L73")
1. 代码分割code split。可以借助rollup内置的 `manualChunks` 来实现。
1. Etag 304状态码，让浏览器在重复加载的时候直接使用浏览器缓存。

### vite 局限

- vite 与webpack 相比，毕竟出道时间有点短，它的生态还不是不完善。webpack最牛之处就在于 loader 和 plugin 非常丰富。
- vite 打包项目时，目前使用的是 Rollup，对 CSS和代码分割不是很友好。
- vite 刚兴起不久，生态系统还不够完善，建议大家在创建工作项目的时候还是使用 webpack 。自己的项目可以使用 vite

## npm

### npm pnpm yarn 之间的区别

**npm**：`Node.js`的默认包管理器，与Node.js一起安装

**Yarn**：`Facebook` 开发的另一种包管理器，旨在解决 npm 的一些性能和安全性问题。yarn 在性能方面相对于 npm 有所提升，它引入了并行安装和缓存机制，提高了依赖包的安装速度。此外，yarn 还引入了一个锁定文件（lockfile）来确保依赖的版本一致性。

**pnpm**：它与 npm 相比具有更高的性能和更低的磁盘占用。pnpm 使用了符号链接和硬链接的方式来共享依赖，从而避免了重复的依赖下载和存储。这使得多个项目可以共享相同的依赖，减少了磁盘空间的占用。

**cnpm**：淘宝 NPM，使用 cnpm 可以通过淘宝的镜像加速包的下载速度

区别

- 性能：`Yarn` 和 `pnpm` 在安装速度和依赖解析方面通常比 `npm` 更快。它们使用了不同的算法和缓存机制，能够更高效地处理依赖关系。`npm`需要先下载包，再进行安装。`yarn`可以并行下载和安装依赖包。`pnpm`安装速度非常快，因为它使用硬链接存储依赖项。

- 磁盘空间：`npm` 默认会在每个项目中存储依赖的副本，因此在大型项目中可能会占用较多的磁盘空间。而 `Yarn` 和 `pnpm` 使用了共享依赖的机制，它不会重复存储相同版本的模块，可以减少磁盘空间的占用。

- 锁定机制：`Yarn` 和 `pnpm` 支持锁定依赖的版本，以确保在不同的环境中安装相同的软件包版本，从而提高构建的可重复性和稳定性。npm 从 npm 5 版本开始引入了 package-lock.json 文件来实现类似的版本锁定机制。

- 生态系统：`npm` 作为最早和最常用的包管理器之一，具有庞大的生态系统，拥有数量庞大的开源软件包供开发者使用。Yarn 和 pnpm 基本上可以与 npm 的生态系统兼容，并可以使用相同的软件包

综合来看，选择使用哪种包管理工具取决于项目需求、团队偏好和个人偏好

### npx是什么

npx是一个工具，npm v5.2.0引入的一条命令（npx），它的作用是临时安装并执行一个 Node.js 模块。npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装

例如： 使用create-react-app创建一个react项目

老方法：

```js
npm install -g create-react-app
create-react-app my-app
```

npx方式：

```js
npx create-react-app my-app
```

这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。

### package.json文件的作用

package.json 文件是一个重要的配置文件，它定义了项目的依赖关系、脚本命令和元数据信息，对于项目的开发、构建和部署等方面起到关键的作用。开发者需要维护和更新 package.json 文件，以保证项目的正常运行和开发流程的顺利进行。

**版本号**

版本号由三部分组成:major.minor.patch，主版本号.次版本号.修补版本号。

我们安装一些依赖包的时候，版本号前面都会带^或者~的符号

- `~`会四配最新的小版本依赖包，出如`~1.2.3`会品所有`1.2.x`版本，但是不包括`1.3.0`
- `^`会匹配最新的大版本依赖包，比如`^1.2.3`会匹配所有`1.x.x`的包，包括`1.3.0`，但是不包括`2.0.0`
- `*`安装最新版本的依赖包，比如`*1.2.3`会匹配`x.x.x`;

### package-lock.json文件的作用

`package-lock.json` 文件是 `npm 5+` 版本引入的一种锁定依赖版本的机制。当我们在一个项目中`npm install`时候，会自动生成一个`package-lock.json`文件。记录了项目的一些信息和所依赖的模块。这样在每次安装都会出现相同的结果，不管你在什么机器上面或什么时候安装。当我们下次再`npm install`时候，npm发现如果项目中有`package-lock.ison`文件，会根据`package-lock.ison`里的内容来处理和安装依赖而不再根据`package.json`

**作用:**

锁定依赖版本：package-lock.json 文件记录了项目中所有直接和间接依赖的精确版本号。当运行 npm install 安装依赖时，npm 会根据该文件确保安装的依赖版本与之前一致，从而保证在不同环境中得到相同的依赖树。这样可以提高构建的可重复性和稳定性，避免意外的依赖更新引发的问题。

提高安装速度：package-lock.json 文件中包含了每个依赖的下载地址和哈希值，npm 在安装依赖时可以直接使用这些信息从缓存中获取已下载的包，而无需重新下载。这样可以减少网络请求和下载时间，提高安装速度。

确保安全性：package-lock.json 文件还记录了每个依赖包的完整性校验信息，包括其下载源、哈希值等。这样可以确保依赖包的完整性，避免被恶意篡改或注入恶意代码

### npm script dev原理

在npm run dev的时候，首先会去项目的package.json文件里找scripts 里找对应的 dev，然后执行 dev 的命令。例如启动vue项目 npm run serve的时候，实际上就是执行了vue-cli-service serve 这条命令。

为什么不直接执行`vue-cli-service serve`命令呢？

- 因为直接执行`vue-cli-service serve`，会报错，因为操作系统中没有存在`vue-cli-service`这一条指令

为什么执行`npm run dev`的时候，也就是相当于执行了`vue-cli-service serve` ，为什么这样它就能成功？

- 我们在npm install 安装依赖是，会在`node_modules/.bin/` 目录中创建好`vue-cli-service` 为名的几个可执行文件。

- `.bin` 目录不是任何一个 npm 包。目录下的文件，表示一个个软链接，打开文件可以看到文件顶部写着 `#!/bin/sh` ，表示这是一个脚本。

- 所以当使用 `npm run dev` 执行 `vue-cli-service serve` 时，虽然没有安装 `vue-cli-service`的全局命令，但是 npm 会到 `./node_modules/.bin` 中找到 `vue-cli-service` 文件作为脚本来执行，则相当于执行了 `./node_modules/.bin/vue-cli-service serve`。

既然`.bin` 目录下的文件表示软连接，那这个bin目录下的那些软连接文件是哪里来的呢？它又是怎么知道这条软连接是执行哪里的呢？

- bin目录下的那些软连接存在于项目最外层的**package-lock.json**文件中。

- 从 package-lock.json 中可知，当我们`npm install` 整个新建的vue项目的时候，npm 将 bin/vue-cli-service.js 作为 bin 声明了。

- 所以在 `npm install` 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，而 npm 还会自动把node_modules/.bin加入$PATH，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。

- 也就是说，npm install 的时候，npm 就帮我们把这种软连接配置好了，其实这种软连接相当于一种映射，执行npm run dev 的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行。

可以 node node_modules/.bin/xx 来跑，可以 npx xx 来跑，最常用的还是 npm scripts，通过 npm run xx 来跑

### Monorepo是什么

`Monorepo`（单一代码库）是一种软件开发的组织结构模式，它将多个相关的项目或模块放置在同一个版本控制库（例如Git仓库）中。这与传统的多个独立仓库相对应。

Monorepo 的主要特点包括：

**项目结构的组织**：在 Monorepo 中，可以使用文件夹和子目录的方式组织不同的项目或模块。每个项目或模块可以独立于其他项目存在，但它们共享同一份代码库。重复的代码可以集中管理，避免了重复编写和维护的工作。

**统一构建和部署**：在 Monorepo 中，所有项目或模块都使用相同的构建和部署过程。这使得项目之间的协作和整合更加容易。开发者可以在单个操作中构建和部署所有相关的项目。

**共享依赖管理**：Monorepo 可以使用统一的依赖管理机制，确保各个项目或模块使用相同的依赖版本，减少依赖的重复安装和更新。可以使用工具（如 Yarn Workspaces、Lerna、pnpm 等）来管理共享依赖的安装、更新和版本控制。

**跨项目协作和重构**：Monorepo 使得不同项目之间的协作更加紧密，开发者可以更容易地修改和重构跨项目的共享代码。这样可以加快开发速度，提高团队的协同工作效率。

需要注意的是，Monorepo 并不适用于所有项目，它更适合于大型或复杂的项目，以及具有强关联性的项目集合。在选择是否使用 Monorepo 时，需要综合考虑团队规模、项目复杂度等情况

## 其他

### vue.config.js配置

`configureWebpack`原生配置方式，配置的结果将会被 webpack-merge 合并入最终的 webpack 配置。

`chainWebpack`链式配置方式，vue-cli内部是使用webpack-chain这个插件来维护webpack配置的，因为能更细粒度的控制其内部配置，因此也是官方比较推荐的一个方式。

**去除国际化语言文件**

有的插件存在较多的 locale file (国际化语言文件)，在实际使用时，只引入项目中需要的语言文件即可，比如moment: 用webpack自带的IgnorePlugin插件

```js
// main.js
import 'moment/locale/zh-cn'

//webpack
new webpack.IgnorePlugin(/\.\/locale/,/moment/)
```

**前端开启gzip**

服务器开启nginx后,代码经过压缩就会小很多,但是如果我们打包后的代码没有压缩过,那就是服务端来负责压缩,自然会拖慢服务端加载速度,我们应该在webpack中开启压缩

```js
npm install compression-webpack-plugin -D

plugins: [ 
// 压缩代码 
new CompressionPlugin({ 
    test: /\.js$|\.html$|.\css/, // 匹配文件名 
    threshold: 10240, // 对超过10k的数据压缩 
    deleteOriginalAssets: false // true 不删除源文件 false 删除源文件 
}) ]
```

**去除console.log**

去除警告现在为webpack默认插件 `TerserWebpackPlugin`

```js
const TerserPlugin = require("terser-webpack-plugin");
new TerserPlugin({ 
    terserOptions: { 
        compress: { 
        warnings: false, 
        drop_console: true, 
        drop_debugger: true, 
        pure_funcs: ['console.log'] 
        } 
    } 
})
```

**第三方UI库改为按需加载**

```js
npm install babel-plugin-component -D
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```

**增加编译进度条**

```js
//webpack.common.js
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  plugins: [
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
};
```

**打包分析文件**

```js
//webpack.prod.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

plugins:[
    new BundleAnalyzerPlugin()
]
```

**svg-sprite-loader**

将svg图片以雪碧图的方式在项目中加载

### 自己实现vue-cli步骤

**基本搭建**

- 出入口文件配置
- 通过loader和plugin处理js、css、html、图片、字体图标等资源
- babel和eslint的配置
- vue文件的打包
- 路径别名的配置
- webpack-dev-server的配置
- 环境区分
- 环境变量的设置
- source-map的配置
- 构建进度条的显示

**基本优化**

- 构建速度的优化
- 体积的优化
- 运行性能优化

**基本规范**

- eslint
- prettier
- husky
- stylelint

### Babel的原理是什么

babel 的转译过程也分为三个阶段，这三步具体是：

- **解析 Parse**: 将代码解析⽣成抽象语法树（AST），即词法分析与语法分析的过程；
- **转换 Transform**: 对于 AST 进⾏变换⼀系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进⾏遍历，在此过程中进⾏添加、更新及移除等操作；
- **⽣成 Generate**: 将变换后的 AST 再转换为 JS 代码, 使⽤到的模块是 babel-generator。

### vite 是如何解析用户配置的 .env 的

我们在项目开发过程中，会使用一些 环境变量， webpack 通过 全局注册到 process.env 上， vite 通过读取env配置文件， 挂载到 import.meta.xxx上， 我们现在调试 vite 源码，学习整个过程
