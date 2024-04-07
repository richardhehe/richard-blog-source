# prettier

## 初始化

`pnpm i prettier -D`安装之后，工程目录下新建`.prettierrc.js`配置文件以及`.prettierignore`忽略文件，这样就相当于告诉我们的工程我们使用了`prettier`，之后执行`prettier`格式化命令时即按照配置进行格式化，如`npx prettier. --write`格式化所有文件。

`prettier` 隐式忽略`node_modules`，并不需要将其添加到`.prettierignore`中

## .prettierrc.js

配置就比较简单直观了，都是一条一条具体的格式化规则，如下配置中基本都是默认值：

```js
//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
  printWidth: 80, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: 'preserve', //不知道怎么翻译
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
}
```

## vscode中的使用

安装prettier的vscode插件，安装之后我们可以右键需要进行格式化的文件然后选择prettier进行格式化。

自动化：

ctrl + shift + p打开搜索栏搜索settings.json配置文件，项目内生成.vscode文件夹，在其下的settings.json中新增配置：

```json
{
 // 设置全部语言的默认格式化程序为prettier
 "editor.defaultFormatter": "esbenp.prettier-vscode",
 // 设置特定语言的默认格式化程序为prettier
 //   "[javascript]": {
 //     "editor.defaultFormatter": "esbenp.prettier-vscode"
 //   },
 // 设置全部语言在保存时自动格式化
 "editor.formatOnSave": true
 // 设置特定语言在保存时自动格式化
 //   "[javascript]": {
 //     "editor.formatOnSave": true
 //   }
}
```

## eslint && prettier

### 解决eslint与prettier在代码格式上的冲突

因为eslint本身也具备对代码格式的控制与检查能力，所以不可避免可能会与prettier的代码格式冲突，比如eslint配置rules中对缩进的要求为2并在不满足时报错，

`.eslint.cjs：`

```js
rules: {
    indent: ['error', 2],
},
```

`.prettierrc.cjs：`

```js
module.exports = {
      tabWidth: 6, //缩进长度
};
```

那么我们在执行npx prettier . --write后进行eslint代码检查eslint .就会把所有缩进问题进行报错，检查不通过。

解决方案很简单——思路就是把prettier的规则复写进eslint中，并对原本eslint中的格式配置进行覆盖，这样就做到了eslint的格式化检查与prettier的格式化行为统一。

用社区的轮子即可：

```shell
pnpm install -D eslint-config-prettier
```

```js
// 在 .eslintrc.* 文件里面的 extends 字段最后添加一行：
{
  "extends": [
    ...,
    "已经配置的规则",
+   "prettier",
  ]
}
```

extends的值为数组，后面的数组项会继承和覆盖前面的配置，所以完成了prettier规则对eslint规则的扩充和覆盖。

### 省略prettier格式化命令，eslint进行格式化与检查一步到位

完成上述操作本质是做到了 ESLint 会按照 Prettier 的规则做相关校验，也就是说先执行Prettier格式化后再执行eslint检查不会因为格式问题冲突而报错，但是还是需要运行 Prettier 命令来进行格式化。为了避免多此一举，社区也提供了整合上面两步的方案：在使用 eslint --fix（eslint错误修复） 时候，实际使用 Prettier 来替代 ESLint 的格式化功能。操作如下：

```shell
# 安装eslint-plugin-prettier
pnpm install -D eslint-plugin-prettier
```

```js
// 在 .eslintrc.* 文件里面的 extends 字段最后再添加一行：
{
  "extends": [
    ...,
    "已经配置的规则",
+   "plugin:prettier/recommended"
  ],
  "rules": {
+   "prettier/prettier": "error",
  }
}

```

这个时候运行 `eslint --fix` 实际使用的是 `Prettier` 去格式化文件。在`rules`中添加`"prettier/prettier": "error"`，用意是编写代码时不符合`prettier`格式规范的编码`eslint`直接自动报错（结合vscode的eslint插件实时报错的能力）。
当然直接执行`eslint --fix`会没有反应，原因是`eslint`命令缺少目标文件，可以用`--ext [文件拓展名,[文件拓展名]]`的形式指定需要进行eslint修复以及检查的文件，比如react + ts项目中：

```shell
eslint . --fix --ext ts,tsx --report-unused-disable-directives --max-warnings 0
```

表示进行eslint检查的同时进行自动修复（--fix），针对的文件是以ts、tsx为拓展名的（--ext ts,tsx），还有一些错误打印相关的要求（--report-unused-disable-directives），代码执行不退出的可以容忍的警告数量为0。

### 覆盖vscode本地格式化配置（代码格式层面协作统一）

由于每个人本地的 `VS Code` 代码格式化配置不拘一格，在实际的项目开发中，多多少少会因为格式化问题产生争议。因此需要有一个统一的规范覆盖本地配置，`editorconfig for vs code`承担起了这个作用，只要在项目工程的根目录文件夹下添加`.editorconfig`文件，那么这个文件声明的代码规范规则能覆盖编辑器默认的代码规范规则，从而实现统一的规范标准。

一般我们都用prettier进行代码格式化，在vscode中Prettier读取配置的优先级即：

Prettier 配置文件，比如`.prettierrc` 、`.prettier.config.js`。
`.editorconfig`文件，用于覆盖用户/工作区设置。

.editorconfig举例：

```bash
root = true                         # 根目录的配置文件，编辑器会由当前目录向上查找，如果找到 `roor = true` 的文件，则不再查找
​
[*]
indent_style = space                # 空格缩进,可选"space"、"tab"
indent_size = 4                     # 缩进空格为4个
end_of_line = lf                    # 结尾换行符，可选"lf"、"cr"、"crlf"
charset = utf-8                     # 文件编码是 utf-8
trim_trailing_whitespace = true     # 不保留行末的空格
insert_final_newline = true         # 文件末尾添加一个空行
curly_bracket_next_line = false     # 大括号不另起一行
spaces_around_operators = true      # 运算符两遍都有空格
indent_brace_style = 1tbs           # 条件语句格式是 1tbs
​
[*.js]                              # 对所有的 js 文件生效
quote_type = single                 # 字符串使用单引号
​
[*.{html,less,css,json}]            # 对所有 html, less, css, json 文件生效
quote_type = double                 # 字符串使用双引号
​
[package.json]                      # 对 package.json 生效
indent_size = 4                   # 使用2个空格缩进
```
