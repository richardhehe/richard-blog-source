# eslint

## 作用

eslint本质就是一个内置有解析器的工具，它可以将项目代码解析成AST，然后根据AST抽象语法树分析出代码里存在的问题然后给出警告或者报错。eslint的初衷就是在代码编写阶段尽早得发现存在的错误；除了语法检查外，eslint也具有一定的代码格式化能力，但是不是其能力的重心（prettier在代码格式方面更加专业）

## 初始化

如果使用脚手架初始化项目，比如通过vite创建项目：pnpm create vite这样得到的项目模板都对eslint进行了初始化配置。

如果手动给项目配置eslint检查：

```Shell
# 全局安装eslint依赖
npm i eslint -g
​
# 给项目初始化eslint，包括安装devDependencies依赖 & 生成配置
eslint --init
```

经过问答之后生成eslint的配置文件.eslintrc.cjs

## 配置项

### parser & parserOptions

本身eslint的语法检查就是一个先对代码进行静态解析得到AST，然后再判断的过程。所以在eslint默认的解析器基础上，自然需要一些更高级的解析器来支持更新的语法以及语言，比如eslint的默认解析器是Espree，它只支持对es5的js进行解析，所以我们如果项目中使用了ts，Espree就不行了，自然需要用到更高级的（支持ts以及最新es版本的）解析器@typescript-eslint/parser。

```js
module.exports = {
    "parser": "@typescript-eslint/parser", // 使用@typescript-eslint/parser这个解析器进行语法解析
    // ...
}
```

通过parser我们指定了项目所使用的语法解析器，parserOptions就相当于给出解析器更详细的解析配置，比如如下配置，parserOptions就具体指定了@typescript-eslint/parser解析器应该支持最新版本的es标准`（"ecmaVersion": "latest"）`以及项目的模块化标准为`esModule（"sourceType": "module"）`

```js
module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
}
```

### globals & env

globals是定义全局变量，规定他们可不可以重写以及是否被禁用，env就是一组globals预设（一组打包的globals配置），如下配置：

```js
{
  "globals": {
    // 声明 jQuery 对象为全局变量
    "$": false, // true表示该变量为 writeable，而 false 表示 readonly, 即不可重写$
    "jQuery": false,
    "Promise": "off" // 禁用Promise
  },
  "env": {
    "es6": true // 启用es6这个预设，里面肯定包含了若干globals配置来对es6进行支持
   },
}
```

### rules & plugins & extends

rules就是具体的eslint进行语法检查所依据的规则；但是官方只提供了关于标准js的检查规则，所以需要plugins来拓展规则集合，比如针对用Vite创建的react + Ts的项目，就通过react-refresh这个plugin拓展了eslint的规则，但plugins中拓展的规则默认不开启，所以plugins要与rules配合使用来拓展eslint的功能；但是我们总不可能把所有规则一条一条的写在rules中，extends就相当于一组配置好的rules与plugins组合，解决了这个痛点。

rules中的规则优先级最高，会覆盖拓展以及插件中引入的规则。
一般来说规则的值有三个值，只需控制是开启还是关闭：

- off 或 0：关闭规则
- warn 或 1：开启规则，warn 级别的错误 (不会导致程序退出)
- error 或 2：开启规则，error级别的错误(当被触发的时候，程序会退出)

如"eqeqeq": "off"。有的规则有自己的属性，使用起来像这样："quotes": ["error", "double"]。具体内容查看规则文档。

### 文件级别的配置优先级

我们的项目中可以存在多个eslint配置文件，那么文件进行eslint检查时，文件所处位置向上直至文件系统的根目录路径上所有的eslint配置文件都会生效，但是越”靠近“文件的配置优先级越高（可以理解为高优先级规则覆盖低优先级规则）。
如下，source.js使用配置A，但是test.js使用配置B和配置A，但是配置B中的规则会覆盖掉A中相同的规则。

```css
your-project
├── .eslintrc  - eslint配置A
├── lib
│ └── source.js
└─┬ childFolder
  ├── .eslintrc - eslint配置B
  └── test.js
```

配置项`"root": true`可以阻止继续递归的查找比较远的根目录。
package.json中也可以对eslint进行配置，所以项目中文件的eslint配置文件可以总结为：

与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json` 文件
继续在父级目录寻找 `.eslintrc` 或 `package.json`文件，直到根目录（包括根目录）或直到发现一个有`"root": true`的配置。

### vscode中的使用

在vscode中安装eslint插件之后，无需在命令行中手动执行eslint命令即可在编码时实时提供eslint语法检查，而且也可以开启eslint的代码格式化功能，需要进行如下vscode配置

`ctrl + shift + p`打开搜索栏搜索`settings.json`配置文件，项目内生成`.vscode`文件夹，在其下的`settings.json`中新增配置：

```json
{
    "[typescriptreact]": {
        "editor.formatOnSave": true
    },
}
```

意为对tsx语言进行保存时格式化。

支持的语言：

```ini
javascript;
javascriptreact;
typescript;
typescriptreact;
json;
graphql;
```

### vue-cli5.0.8中的默认eslint配置

```js
module.exports = {
  root: true,
  // 指定了环境，这里是 Node.js 环境。这意味着 ESLint 会检查 JavaScript 代码，确保符合 Node.js 的环境。
  env: {
    node: true
  },
  // 继承其他规则，即预设的规则配置
  // 1. plugin:vue/essential 使用了 Vue.js 官方 ESLint 插件，包含了 Vue.js 开发时常见的规则
  // 2. 使用了 ESLint 官方的推荐规则
  // 3. 使用了 Prettier 插件的推荐规则，确保 ESLint 和 Prettier 协同工作
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    // 指定了解析器为 Babel 的 ESLint 解析器。这使得 ESLint 能够理解一些新的 JavaScript 语法特性，比如箭头函数、解构赋值等
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```
