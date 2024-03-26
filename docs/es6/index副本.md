[es6文章](https://juejin.cn/post/6844903959283367950#heading-58)
本文整理出来的笔记都是书中的精华内容，囊括了整个`ES6体系`的所有特性，非常方便大家重新认识`全部ES6特性`。半小时的阅读就可对`ES6`有一个全面的了解，可认为是一本`ES6特性小字典`，收藏后可随时查阅。即使看不完也要拉到本文末尾喔，有个大彩蛋，嘻嘻！

![ES6缩略](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/884480848cbd481c9f4d98a3fcd5ae7c~tplv-k3u1fbpfcp-zoom-1.image)

## 修正

**ES6**是`ECMA`为`JavaScript`制定的第6个标准版本，相关历史可查看此章节[《ES6-ECMAScript6简介》](https://link.juejin.cn?target=https%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fintro "https://es6.ruanyifeng.com/#docs/intro")。

标准委员会最终决定，标准在每年6月正式发布并作为当年的正式版本，接下来的时间里就在此版本的基础上进行改动，直到下一年6月草案就自然变成新一年的版本，这样一来就无需以前的版本号，只要用年份标记即可。`ECMAscript 2015`是在`2015年6月`发布ES6的第一个版本。以此类推，`ECMAscript 2016`是ES6的第二个版本、 `ECMAscript 2017`是ES6的第三个版本。**ES6**既是一个历史名词也是一个泛指，含义是`5.1版本`以后的`JavaScript下一代标准`，目前涵盖了`ES2015`、`ES2016`、`ES2017`、`ES2018`、`ES2019`、`ES2020`。

所以有些文章上提到的`ES7`(实质上是`ES2016`)、`ES8`(实质上是`ES2017`)、`ES9`(实质上是`ES2018`)、`ES10`(实质上是`ES2019`)、`ES11`(实质上是`ES2020`)，实质上都是一些不规范的概念。从ES1到ES6，每个标准都是花了好几年甚至十多年才制定下来，你一个ES6到ES7，ES7到ES8，才用了一年，按照这样的定义下去，那不是很快就ES20了。用正确的概念来说ES6目前涵盖了**ES2015**、**ES2016**、**ES2017**、**ES2018**、**ES2019**、**ES2020**。

![ES6组成](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b75786b0dd0a4eaaa7d763b3fd617c90~tplv-k3u1fbpfcp-zoom-1.image)

## ES2015

![ES2015](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62581990c18c43e1b6de85736ffc53b8~tplv-k3u1fbpfcp-zoom-1.image)

## 主要内容

- **表达式**：声明、解构赋值
- **内置对象**：字符串扩展、数值扩展、对象扩展、数组扩展、函数扩展、正则扩展、Symbol、Set、Map、Proxy、Reflect
- **语句与运算**：Class、Module、Iterator
- **异步编程**：Promise、Generator、Async

## 表达式

### 声明

- **const命令**：声明常量
- **let命令**：声明变量

> 作用

- 作用域

  - **全局作用域**
  - **函数作用域**：`function() {}`
  - **块级作用域**：必须有`{}`

- 作用范围

  - `var命令`在全局代码中执行
  - `const命令`和`let命令`只能在代码块中执行

- 赋值使用

  - `const命令`声明常量后必须立马赋值
  - `let命令`声明变量后可立马赋值或使用时赋值

- 声明方法：`var`、`const`、`let`、`function`、`class`、`import`

> 重点难点

- 块级作用域 变量只在`let和const`命令所在的代码块内有效
- 不允许重复声明
- 未定义就使用会报错：`const命令`和`let命令`不存在变量提升
- 暂时性死区：在代码块内使用`const命令`和`let命令`声明变量之前，该变量都不可用

`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

- **共享内存和原子操作**：由全局对象`SharedArrayBuffer`和`Atomics`实现，将数据存储在一块共享内存空间中，这些数据可在`JS主线程`和`web-worker线程`之间共享
- **globalThis**：作为顶层对象，指向全局环境下的`this`

  - Browser：顶层对象是`window`
  - Node：顶层对象是`global`
  - WebWorker：顶层对象是`self`
  - 以上三者：通用顶层对象是`globalThis`
- **do表达式**：封装块级作用域的操作，返回内部最后执行表达式的值(`do{}`)
- **throw表达式**：直接使用`throw new Error()`，无需`()`或`{}`包括
- **!#命令**：指定脚本执行器(写在文件首行)

### 解构赋值

- **字符串解构**：`const [a, b, c, d, e] = "hello"`

- **数值解构**：`const { toString: s } = 123`

- **布尔解构**：`const { toString: b } = true`

- **对象解构**

  - 形式：`const { x, y } = { x: 1, y: 2 }`
  - 默认：`const { x, y = 2 } = { x: 1 }`
  - 改名：`const { x, y: z } = { x: 1, y: 2 }`

- **数组解构**

  - 规则：数据结构具有`Iterator接口`可采用数组形式的解构赋值
  - 形式：`const [x, y] = [1, 2]`
  - 默认：`const [x, y = 2] = [1]`

- **函数参数解构**

  - 数组解构：`function Func([x = 0, y = 1]) {}`
  - 对象解构：`function Func({ x = 0, y = 1 } = {}) {}`

> 应用场景

- 交换变量值：`[x, y] = [y, x]`
- 返回函数多个值：`const [x, y, z] = Func()`
- 定义函数参数：`Func([1, 2])`
- 提取JSON数据：`const { name, version } = packageJson`
- 定义函数参数默认值：`function Func({ x = 1, y = 2 } = {}) {}`
- 遍历Map结构：`for (let [k, v] of Map) {}`
- 输入模块指定属性和方法：`const { readFile, writeFile } = require("fs")`

> 重点难点

- 匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值
- 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
- 解构默认值生效条件：属性值严格等于`undefined`
- 解构遵循匹配模式
- 解构不成功时变量的值等于`undefined`
- `undefined`和`null`无法转为对象，因此无法进行解构

## 内置对象

### 字符串扩展

- **Unicode表示法**：`大括号包含`表示Unicode字符(`\u{0xXX}`或`\u{0XXX}`)
- **字符串遍历**：可通过`for-of`遍历字符串
- **字符串模板**：可单行可多行可插入变量的增强版字符串
- **标签模板**：函数参数的特殊调用
- **String.raw()** ：返回把字符串所有变量替换且对斜杠进行转义的结果
- **String.fromCodePoint()** ：返回码点对应字符
- **codePointAt()** ：返回字符对应码点(`String.fromCodePoint()`的逆操作)
- **normalize()** ：把字符的不同表示方法统一为同样形式，返回`新字符串`(Unicode正规化)
- **repeat()** ：把字符串重复n次，返回`新字符串`
- **matchAll()** ：返回正则表达式在字符串的所有匹配
- **includes()** ：是否存在指定字符串
- **startsWith()** ：是否存在字符串头部指定字符串
- **endsWith()** ：是否存在字符串尾部指定字符串
- **padStart()** ：把指定字符串填充到字符串头部，返回新字符串
- **padEnd()** ：把指定字符串填充到字符串尾部，返回新字符串
- **放松对标签模板里字符串转义的限制**：遇到不合法的字符串转义返回`undefined`，并且从`raw`上可获取原字符串
- **直接输入U+2028和U+2029**：字符串可直接输入`行分隔符`和`段分隔符`
- **JSON.stringify()改造**：可返回不符合UTF-8标准的字符串
- **trimStart()** ：消除字符串头部空格，返回新字符串
- **trimEnd()** ：消除字符串尾部空格，返回新字符串

> 重点难点

- 以上扩展方法均可作用于由`4个字节储存`的`Unicode字符`上

### 数值扩展

- **二进制表示法**：`0b或0B开头`表示二进制(`0bXX`或`0BXX`)
- **八进制表示法**：`0o或0O开头`表示二进制(`0oXX`或`0OXX`)
- **Number.EPSILON**：数值最小精度
- **Number.MIN_SAFE_INTEGER**：最小安全数值(`-2^53`)
- **Number.MAX_SAFE_INTEGER**：最大安全数值(`2^53`)
- **Number.parseInt()** ：返回转换值的整数部分
- **Number.parseFloat()** ：返回转换值的浮点数部分
- **Number.isFinite()** ：是否为有限数值
- **Number.isNaN()** ：是否为NaN
- **Number.isInteger()** ：是否为整数
- **Number.isSafeInteger()** ：是否在数值安全范围内
- **Math.trunc()** ：返回数值整数部分
- **Math.sign()** ：返回数值类型(`正数1`、`负数-1`、`零0`)
- **Math.cbrt()** ：返回数值立方根
- **Math.clz32()** ：返回数值的32位无符号整数形式
- **Math.imul()** ：返回两个数值相乘
- **Math.fround()** ：返回数值的32位单精度浮点数形式
- **Math.hypot()** ：返回所有数值平方和的平方根
- **Math.expm1()** ：返回`e^n - 1`
- **Math.log1p()** ：返回`1 + n`的自然对数(`Math.log(1 + n)`)
- **Math.log10()** ：返回以10为底的n的对数
- **Math.log2()** ：返回以2为底的n的对数
- **Math.sinh()** ：返回n的双曲正弦
- **Math.cosh()** ：返回n的双曲余弦
- **Math.tanh()** ：返回n的双曲正切
- **Math.asinh()** ：返回n的反双曲正弦
- **Math.acosh()** ：返回n的反双曲余弦
- **Math.atanh()** ：返回n的反双曲正切
- **指数运算符(**)** ：数值求幂(相当于`Math.pow()`)
- **BigInt**：任何位数的整数(新增的数据类型，使用`n`结尾)

  - **BigInt()** ：转换普通数值为BigInt类型
  - **BigInt.asUintN()** ：转换BigInt为0到2n-1之间对应的值
  - **BigInt.asIntN()** ：转换BigInt为-2n-1 到2n-1-1
  - **BigInt.parseInt()** ：近似于`Number.parseInt()`，将一个字符串转换成指定进制的BigInt类型

    > 重点难点

  - BigInt同样可使用各种进制表示，都要加上后缀
  - BigInt与普通整数是两种值，它们之间并不相等
  - typeof运算符对于BigInt类型的数据返回`bigint`
- **数值分隔符(_)** ：使用`_`作为千分位分隔符(增加数值的可读性)
- **Math.signbit()** ：返回数值符号是否设置

### 对象扩展

- **简洁表示法**：直接写入变量和函数作为对象的属性和方法(`{ prop, method() {} }`)

- **属性名表达式**：字面量定义对象时使用`[]`定义键(`[prop]`，不能与上同时使用)

- **方法的name属性**：返回方法函数名

  - 取值函数(getter)和存值函数(setter)：`get/set 函数名`(属性的描述对象在`get`和`set`上)
  - bind返回的函数：`bound 函数名`
  - Function构造函数返回的函数实例：`anonymous`

- **属性的可枚举性和遍历**：描述对象的`enumerable`

- **super关键字**：指向当前对象的原型对象(只能用在对象的简写方法中`method() {}`)

- **Object.is()** ：对比两值是否相等

- **Object.assign()** ：合并对象(浅拷贝)，返回原对象

- **Object.getPrototypeOf()** ：返回对象的原型对象

- **Object.setPrototypeOf()** ：设置对象的原型对象

- ****proto**** ：返回或设置对象的原型对象
- **Object.getOwnPropertyDescriptors()** ：返回对象所有自身属性(非继承属性)的描述对象
- **Object.values()** ：返回以值组成的数组
- **Object.entries()** ：返回以键和值组成的数组
- **扩展运算符(...)** ：转换对象为用逗号分隔的参数序列(`{ ...obj }`，相当于`rest/spread参数`的逆运算)
- **Object.fromEntries()** ：返回以键和值组成的对象(`Object.entries()`的逆操作)
- **链判断操作符(?.)** ：是否存在对象属性(不存在返回`undefined`且不再往下执行)

  - 对象属性：`obj?.prop`、`obj?.[expr]`
  - 函数调用：`func?.(...args)`

- **空判断操作符(??)** ：是否值为`undefined`或`null`，是则使用默认值

> 扩展应用

- 克隆对象：`const obj = { __proto__: Object.getPrototypeOf(obj1), ...obj1 }`
- 合并对象：`const obj = { ...obj1, ...obj2 }`
- 转换字符串为对象：`{ ..."hello" }`
- 转换数组为对象：`{ ...[1, 2] }`
- 与对象解构赋值结合：`const { x, ...rest/spread } = { x: 1, y: 2, z: 3 }`(不能复制继承自原型对象的属性)
- 修改现有对象部分属性：`const obj = { x: 1, ...{ x: 2 } }`

> 属性遍历

- 描述：`自身`、`可继承`、`可枚举`、`非枚举`、`Symbol`

- 遍历

  - `for-in`：遍历对象`自身可继承可枚举`属性
  - `Object.keys()`：返回对象`自身可枚举`属性键组成的数组
  - `Object.getOwnPropertyNames()`：返回对象`自身非Symbol`属性键组成的数组
  - `Object.getOwnPropertySymbols()`：返回对象`自身Symbol`属性键组成的数组
  - `Reflect.ownKeys()`：返回对象`自身全部`属性键组成的数组

- 规则

  - 首先遍历所有数值键，按照数值升序排列
  - 其次遍历所有字符串键，按照加入时间升序排列
  - 最后遍历所有Symbol键，按照加入时间升序排列

### 数组扩展

- **扩展运算符(...)** ：转换数组为用逗号分隔的参数序列(`[...arr]`，相当于`rest/spread参数`的逆运算)

- **Array.from()** ：转换具有`Iterator接口`的数据结构为真正数组，返回新数组

  - 类数组对象：`包含length的对象`、`Arguments对象`、`NodeList对象`
  - 可遍历对象：`String`、`Set结构`、`Map结构`、`Generator函数`

- **Array.of()** ：转换一组值为真正数组，返回新数组

- **copyWithin()** ：把指定位置的成员复制到其他位置，返回原数组

- **find()** ：返回第一个符合条件的成员

- **findIndex()** ：返回第一个符合条件的成员索引值

- **fill()** ：根据指定值填充整个数组，返回原数组

- **keys()** ：返回以索引值为遍历器的对象

- **values()** ：返回以属性值为遍历器的对象

- **entries()** ：返回以索引值和属性值为遍历器的对象

- **数组空位**：ES6明确将数组空位转为`undefined`(空位处理规不一，建议避免出现)
- **includes()** ：是否存在指定成员
- **sort()稳定性**：排序关键字相同的项目其排序前后的顺序不变，默认为`稳定`
- **flat()** ：扁平化数组，返回新数组
- **flatMap()** ：映射且扁平化数组，返回新数组(只能展开一层数组)

> 扩展应用

- 克隆数组：`const arr = [...arr1]`
- 合并数组：`const arr = [...arr1, ...arr2]`
- 拼接数组：`arr.push(...arr1)`
- 代替apply：`Math.max.apply(null, [x, y])` => `Math.max(...[x, y])`
- 转换字符串为数组：`[..."hello"]`
- 转换类数组对象为数组：`[...Arguments, ...NodeList]`
- 转换可遍历对象为数组：`[...String, ...Set, ...Map, ...Generator]`
- 与数组解构赋值结合：`const [x, ...rest/spread] = [1, 2, 3]`
- 计算Unicode字符长度：`Array.from("hello").length` => `[..."hello"].length`

> 重点难点

- 使用`keys()`、`values()`、`entries()`返回的遍历器对象，可用`for-of`自动遍历或`next()`手动遍历

### 函数扩展

- **参数默认值**：为函数参数指定默认值

  - 形式：`function Func(x = 1, y = 2) {}`

  - 参数赋值：惰性求值(函数调用后才求值)

  - 参数位置：尾参数

  - 参数作用域：函数作用域

  - 声明方式：默认声明，不能用`const`或`let`再次声明

  - length：返回没有指定默认值的参数个数

  - 与解构赋值默认值结合：`function Func({ x = 1, y = 2 } = {}) {}`

  - 应用

    - 指定某个参数不得省略，省略即抛出错误：`function Func(x = throwMissing()) {}`
    - 将参数默认值设为`undefined`，表明此参数可省略：`Func(undefined, 1)`

- **rest/spread参数(...)** ：返回函数多余参数

  - 形式：以数组的形式存在，之后不能再有其他参数
  - 作用：代替`Arguments对象`
  - length：返回没有指定默认值的参数个数但不包括`rest/spread参数`

- **严格模式**：在严格条件下运行JS

  - 应用：只要函数参数使用默认值、解构赋值、扩展运算符，那么函数内部就不能显式设定为严格模式

- **name属性**：返回函数的函数名

  - 将匿名函数赋值给变量：`空字符串`(**ES5**)、`变量名`(**ES6**)
  - 将具名函数赋值给变量：`函数名`(**ES5和ES6**)
  - bind返回的函数：`bound 函数名`(**ES5和ES6**)
  - Function构造函数返回的函数实例：`anonymous`(**ES5和ES6**)

- **箭头函数(=>)** ：函数简写

  - 无参数：`() => {}`

  - 单个参数：`x => {}`

  - 多个参数：`(x, y) => {}`

  - 解构参数：`({x, y}) => {}`

  - 嵌套使用：部署管道机制

  - this指向固定化

    - 并非因为内部有绑定`this`的机制，而是根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`
    - 因为没有`this`，因此不能用作构造函数

- **尾调用优化**：只保留内层函数的调用帧

  - 尾调用

    - 定义：某个函数的最后一步是调用另一个函数
    - 形式：`function f(x) { return g(x); }`

  - 尾递归

    - 定义：函数尾调用自身
    - 作用：只要使用尾递归就不会发生栈溢出，相对节省内存
    - 实现：把所有用到的内部变量改写成函数的参数并使用参数默认值
- **函数参数尾逗号**：允许函数最后一个参数有尾逗号
- **toString()改造**：返回函数原始代码(与编码一致)
- **catch()参数可省略**：`catch()`中的参数可省略
- **函数部分执行**：复用函数功能(`?`表示单个参数占位符，`...`表示多个参数占位符)

- **管道操作符(|>)** ：把左边表达式的值传入右边的函数进行求值(`f(x)` => `x |> f`)

- **绑定运算符(::)** ：函数绑定(左边是对象右边是函数，取代`bind`、`apply`、`call`调用)

  - bind：`bar.bind(foo)` => `foo::bar`
  - apply：`bar.apply(foo, arguments)` => `foo::bar(...arguments)`

> 箭头函数误区

- 函数体内的`this`是`定义时所在的对象`而不是`使用时所在的对象`
- 可让`this`指向固定化，这种特性很有利于封装回调函数
- 不可当作`构造函数`，因此箭头函数不可使用`new命令`
- 不可使用`yield命令`，因此箭头函数不能用作`Generator函数`
- 不可使用`Arguments对象`，此对象在函数体内不存在(可用`rest/spread参数`代替)
- 返回对象时必须在对象外面加上括号

### 正则扩展

- **变更RegExp构造函数入参**：允许首参数为`正则对象`，尾参数为`正则修饰符`(返回的正则表达式会忽略原正则表达式的修饰符)

- **正则方法调用变更**：字符串对象的`match()`、`replace()`、`search()`、`split()`内部调用转为调用`RegExp`实例对应的`RegExp.prototype[Symbol.方法]`

- **u修饰符**：Unicode模式修饰符，正确处理大于`\uFFFF`的`Unicode字符`

  - `点字符`(.)
  - `Unicode表示法`
  - `量词`
  - `预定义模式`
  - `i修饰符`
  - `转义`

- **y修饰符**：粘连修饰符，确保匹配必须从剩余的第一个位置开始全局匹配(与`g修饰符`作用类似)

- **unicode**：是否设置`u修饰符`

- **sticky**：是否设置`y修饰符`

- **flags**：返回正则表达式的修饰符
- **s修饰符**：dotAll模式修饰符，使`.`匹配任意单个字符(`dotAll模式`)

- **dotAll**：是否设置`s修饰符`

- **后行断言**：`x`只有在`y`后才匹配

- **后行否定断言**：`x`只有不在`y`后才匹配

- **Unicode属性转义**：匹配符合`Unicode某种属性`的所有字符

  - 正向匹配：`\p{PropRule}`
  - 反向匹配：`\P{PropRule}`
  - 限制：`\p{...}`和`\P{...}`只对`Unicode字符`有效，使用时需加上`u修饰符`

- **具名组匹配**：为每组匹配指定名字(`?<GroupName>`)

  - 形式：`str.exec().groups.GroupName`

  - 解构赋值替换

    - 声明：`const time = "2017-09-11"`、`const regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u`
    - 匹配：`time.replace(regexp, "$<day>/$<month>/$<year>")`
- **matchAll()** ：返回所有匹配的遍历器

> 重点难点

- `y修饰符`隐含头部匹配标志`^`
- 单单一个`y修饰符`对`match()`只能返回第一个匹配，必须与`g修饰符`联用才能返回所有匹配

### Realm

- 定义：提供`沙箱功能`，允许隔离代码，防止被隔离的代码拿到全局对象
- 声明：`new Realm().global`

### Symbol

- 定义：`Symbol`作为原始数据类型的一种，表示独一无二的值，之前，对象的键以字符串的形式存在，极易引发键名冲突问题，而`Symbol`的出现正是解决了这个痛点。
- 声明：`const s = Symbol(str)   入参：字符串(可选)`

- 方法

  - **Symbol()** ：创建以参数作为描述的`Symbol值`(不登记在全局环境)
  - **Symbol.for()** ：创建以参数作为描述的`Symbol值`，如存在此参数则返回原有的`Symbol值`(先搜索全局注册表，没有后创建，登记在全局注册表中)
  - **Symbol.keyFor()** ：返回已登记的`Symbol值`的描述(只能返回`Symbol.for()`的`key`)

- 遍历对象时是否返回Symbol

  - **object.keys()**: 返回所有属性非symbol类型的私有属性
  - **Object.getOwnPropertySymbols()** ：返回对象中所有用作属性名的`Symbol值`的数组
  - **reflect.ownKeys()**: 返回所有属性（普通属性和symbol属性）
- 内置symbol

  - **Symbol.description**：返回`Symbol值`的描述
  - **Symbol.hasInstance**：指向一个内部方法，当其他对象使用`instanceof运算符`判断是否为此对象的实例时会调用此方法

    ```js
    // arr instanceof fn 是true还是false,如果修改了原型还想为false怎么办？重写hasInstance
        class Fn{ 
            constructor() { 
                this.x=Symbol.for('x')
            }
            // 2.修改了原型还想为false
            // 当用instance判断原型的时候，会先调Symbol.hasInstance这个方法
            // 有这个方法执行这个方法传给obj，没有才会按原型查找
            // 所以我们可以把Symbol.hasInstance重写
            //obj instanceof Constructor => Constructor[Symbol.hasInstance] (obj)
            static[Symbol.hasInstance] (obj) {
                return obj.x && obj.x === Symbol.for('x')
            } 
        }
        let f = new Fn() 
        console.log(f instanceof Fn) //肯定为true 

        let arr=[10,20,30]
        // 1. 修改数组的原型为Fn的原型 会变成true
        Object.setPrototypeOf(arr, Fn.prototype) //相当于arr.proto__=== Fn.prototype 
        console.log(arr instanceof Fn) ; //true       
    ```

  - **Symbol.iterator**：指向一个默认遍历器方法，当实例对象执行`for-of`时会调用指定的默认遍历器

    说说for-of原理， 如何使对象支持for-of

  - **Symbol.toPrimitive**：指向一个函数，当实例对象被转为原始类型的值时会返回此对象对应的原始类型值

    ```js
    // 面试题（有很多方案，有重写toString（），重写valueOf（），Vue数据劫持）
        // 对象==数字 
        // @1 把对象默认转换为数字 首先看对象[Symbol.toPrimitive]  
        // @2 这个属性，有这属性方法，则按照这个处理 没有则看对象.value0f()，验证是否是原始值类型 
        // @3 如果不是原始值类型则对象.toString() 变为字符串 
        // @4 把字符串变为数字 
        var a= {i: 0 }
        a[Symbol.toPrimitive] = function(hint) { 
            //hint：'default''string''number' 
            return ++this.i
        }
        if(a==1 && a==2 && a==3){ 
            console.log('OK') 
        }
    ```

  - **Symbol.toStringTag**：指向一个函数，当实例对象被`Object.prototype.toString()`调用时其返回值会出现在`toString()`返回的字符串之中表示对象的类型

    ```js
    // 面试题： 将'[objectobject]'变成'[object fn]'

    // Object.prototype.toString.call([value])
    // +[value][Symbol.toStringTag]
    //＋调用［value］内置的［［class］］

    class Fn {}
    Fn.prototype[Symbol.toStringTag]="Fn"
    let f = new Fn
    console.log(Object.prototype.toString.call(f)); //"[object Fn]"
    ```

  - **Symbol.isConcatSpreadable**：指向一个布尔，定义对象用于`Array.prototype.concat()`时是否可展开
  - **Symbol.species**：指向一个构造函数，当实例对象使用自身构造函数时会调用指定的构造函数
  - **Symbol.match**：指向一个函数，当实例对象被`String.prototype.match()`调用时会重新定义`match()`的行为
  - **Symbol.replace**：指向一个函数，当实例对象被`String.prototype.replace()`调用时会重新定义`replace()`的行为
  - **Symbol.search**：指向一个函数，当实例对象被`String.prototype.search()`调用时会重新定义`search()`的行为
  - **Symbol.split**：指向一个函数，当实例对象被`String.prototype.split()`调用时会重新定义`split()`的行为

  - **Symbol.unscopables**：指向一个对象，指定使用`with`时哪些属性会被`with环境`排除

> 应用场景

- 唯一化对象属性名：属性名属于Symbol类型，可保证不会与其他属性名产生冲突
- 消除魔术字符串：在代码中多次出现且与代码形成强耦合的某一个具体的字符串或数值
- redux／vuex公共管理状态管理的时候，派发的行为标识可以基于Symbol类型进行宏管理
- 遍历属性名：无法通过`for-in`、`for-of`、`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回，只能通过`Object.getOwnPropertySymbols`返回
- 启用模块的Singleton模式：调用一个类在任何时候返回同一个实例(`window`和`global`)，使用`Symbol.for()`来模拟全局的`Singleton模式`

> 重点难点

- `Symbol()`生成一个原始类型的值不是对象，因此`Symbol()`前不能使用`new命令`
- `Symbol()`参数表示对当前`Symbol值`的描述，相同参数的`Symbol()`返回值不相等
- `Symbol值`不能与其他类型的值进行运算
- `Symbol值`可通过`String()`或`toString()`显式转为字符串
- `Symbol值`作为对象属性名时，此属性是公开属性，但不是私有属性
- `Symbol值`作为对象属性名时，只能用方括号运算符(`[]`)读取，不能用点运算符(`.`)读取
- `Symbol值`作为对象属性名时，不会被常规方法遍历得到，可利用此特性为对象定义`非私有但又只用于内部的方法`

### Set

`Set`

- 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值

- 声明：`const set = new Set(arr)`

- 入参：具有`Iterator接口`的数据结构

- 属性

  - **constructor**：构造函数，返回Set
  - **size**：返回实例成员总数

- 方法

  - **add()** ：添加值，返回实例
  - **delete()** ：删除值，返回布尔
  - **has()** ：检查值，返回布尔
  - **clear()** ：清除所有成员
  - **keys()** ：返回以属性值为遍历器的对象
  - **values()** ：返回以属性值为遍历器的对象
  - **entries()** ：返回以属性值和属性值为遍历器的对象
  - **forEach()** ：使用回调函数遍历每个成员

> 应用场景

- 去重字符串：`[...new Set(str)].join("")`

- 去重数组：`[...new Set(arr)]`或`Array.from(new Set(arr))`

- 集合数组

  - 声明：`const a = new Set(arr1)`、`const b = new Set(arr2)`
  - 并集：`new Set([...a, ...b])`
  - 交集：`new Set([...a].filter(v => b.has(v)))`
  - 差集：`new Set([...a].filter(v => !b.has(v)))`

- 映射集合

  - 声明：`let set = new Set(arr)`
  - 映射：`set = new Set([...set].map(v => v * 2))`或`set = new Set(Array.from(set, v => v * 2))`

> 重点难点

- 遍历顺序：插入顺序
- 没有键只有值，可认为键和值两值相等
- 添加多个`NaN`时，只会存在一个`NaN`
- 添加相同的对象时，会认为是不同的对象
- 添加值时不会发生类型转换(`5 !== "5"`)
- `keys()`和`values()`的行为完全一致，`entries()`返回的遍历器同时包括键和值且两值相等

`WeakSet`

- 定义：和Set结构类似，成员值只能是对象

- 声明：`const set = new WeakSet(arr)`

- 入参：具有`Iterator接口`的数据结构

- 属性

  - **constructor**：构造函数，返回WeakSet

- 方法

  - **add()** ：添加值，返回实例
  - **delete()** ：删除值，返回布尔
  - **has()** ：检查值，返回布尔

> 应用场景

- 储存DOM节点：DOM节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏
- 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在`WeakSet结构`中的引用就会自动消

> 重点难点

- 成员都是`弱引用`，垃圾回收机制不考虑`WeakSet结构`对此成员的引用
- 成员不适合引用，它会随时消失，因此ES6规定`WeakSet结构不可遍历`
- 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于`WeakSet结构`中

### Map

`Map`

- 定义：类似于对象的数据结构，成员键是任何类型的值

- 声明：`const set = new Map(arr)`

- 入参：具有`Iterator接口`且每个成员都是一个双元素数组的数据结构

- 属性

  - **constructor**：构造函数，返回Map
  - **size**：返回实例成员总数

- 方法

  - **get()** ：返回键值对
  - **set()** ：添加键值对，返回实例
  - **delete()** ：删除键值对，返回布尔
  - **has()** ：检查键值对，返回布尔
  - **clear()** ：清除所有成员
  - **keys()** ：返回以键为遍历器的对象
  - **values()** ：返回以值为遍历器的对象
  - **entries()** ：返回以键和值为遍历器的对象
  - **forEach()** ：使用回调函数遍历每个成员

> 重点难点

- 遍历顺序：插入顺序
- 对同一个键多次赋值，后面的值将覆盖前面的值
- 对同一个对象的引用，被视为一个键
- 对同样值的两个实例，被视为两个键
- 键跟内存地址绑定，只要内存地址不一样就视为两个键
- 添加多个以`NaN`作为键时，只会存在一个以`NaN`作为键的值
- `Object结构`提供`字符串—值`的对应，`Map结构`提供`值—值`的对应
`WeakMap`

- 定义：和Map结构类似，成员键只能是对象

- 声明：`const set = new WeakMap(arr)`

- 入参：具有`Iterator接口`且每个成员都是一个双元素数组的数据结构

- 属性

  - **constructor**：构造函数，返回WeakMap

- 方法

  - **get()** ：返回键值对
  - **set()** ：添加键值对，返回实例
  - **delete()** ：删除键值对，返回布尔
  - **has()** ：检查键值对，返回布尔

> 应用场景

- 储存DOM节点：DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏
- 部署私有属性：内部属性是实例的弱引用，删除实例时它们也随之消失，不会造成内存泄漏

> 重点难点

- 成员键都是`弱引用`，垃圾回收机制不考虑`WeakMap结构`对此成员键的引用
- 成员键不适合引用，它会随时消失，因此ES6规定`WeakMap结构不可遍历`
- 其他对象不再引用成员键时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于`WeakMap结构`中
- 一旦不再需要，成员会自动消失，不用手动删除引用
- 弱引用的`只是键而不是值`，值依然是正常引用
- 即使在外部消除了成员键的引用，内部的成员值依然存在

### Proxy

- 定义：修改某些操作的默认行为

- 声明：`const proxy = new Proxy(target, handler)`

- 入参

  - **target**：拦截的目标对象
  - **handler**：定制拦截行为

- 方法

  - **Proxy.revocable()** ：返回可取消的Proxy实例(返回`{ proxy, revoke }`，通过revoke()取消代理)

- 拦截方式

  - **get()** ：拦截对象属性读取
  - **set()** ：拦截对象属性设置，返回布尔
  - **has()** ：拦截对象属性检查`k in obj`，返回布尔
  - **deleteProperty()** ：拦截对象属性删除`delete obj[k]`，返回布尔
  - **defineProperty()** ：拦截对象属性定义`Object.defineProperty()`、`Object.defineProperties()`，返回布尔
  - **ownKeys()** ：拦截对象属性遍历`for-in`、`Object.keys()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`，返回数组
  - **getOwnPropertyDescriptor()** ：拦截对象属性描述读取`Object.getOwnPropertyDescriptor()`，返回对象
  - **getPrototypeOf()** ：拦截对象原型读取`instanceof`、`Object.getPrototypeOf()`、`Object.prototype.__proto__`、`Object.prototype.isPrototypeOf()`、`Reflect.getPrototypeOf()`，返回对象
  - **setPrototypeOf()** ：拦截对象原型设置`Object.setPrototypeOf()`，返回布尔
  - **isExtensible()** ：拦截对象是否可扩展读取`Object.isExtensible()`，返回布尔
  - **preventExtensions()** ：拦截对象不可扩展设置`Object.preventExtensions()`，返回布尔
  - **apply()** ：拦截Proxy实例作为函数调用`proxy()`、`proxy.apply()`、`proxy.call()`
  - **construct()** ：拦截Proxy实例作为构造函数调用`new proxy()`

> 应用场景

- `Proxy.revocable()`：不允许直接访问对象，必须通过代理访问，一旦访问结束就收回代理权不允许再次访问
- `get()`：读取未知属性报错、读取数组负数索引的值、封装链式操作、生成DOM嵌套节点
- `set()`：数据绑定(Vue数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
- `has()`：隐藏内部属性不被发现、排除不符合属性条件的对象
- `deleteProperty()`：保护内部属性不被删除
- `defineProperty()`：阻止属性被外部定义
- `ownKeys()`：保护内部属性不被遍历

> 重点难点

- 要使`Proxy`起作用，必须针对`实例`进行操作，而不是针对`目标对象`进行操作
- 没有设置任何拦截时，等同于`直接通向原对象`
- 属性被定义为`不可读写/扩展/配置/枚举`时，使用拦截方法会报错
- 代理下的目标对象，内部`this`指向`Proxy代理`

### Reflect

- 定义：保持`Object方法`的默认行为

- 方法

  - **get()** ：返回对象属性
  - **set()** ：设置对象属性，返回布尔
  - **has()** ：检查对象属性，返回布尔
  - **deleteProperty()** ：删除对象属性，返回布尔
  - **defineProperty()** ：定义对象属性，返回布尔
  - **ownKeys()** ：遍历对象属性，返回数组(`Object.getOwnPropertyNames()`+`Object.getOwnPropertySymbols()`)
  - **getOwnPropertyDescriptor()** ：返回对象属性描述，返回对象
  - **getPrototypeOf()** ：返回对象原型，返回对象
  - **setPrototypeOf()** ：设置对象原型，返回布尔
  - **isExtensible()** ：返回对象是否可扩展，返回布尔
  - **preventExtensions()** ：设置对象不可扩展，返回布尔
  - **apply()** ：绑定this后执行指定函数
  - **construct()** ：调用构造函数创建实例

> 设计目的

- 将`Object`属于`语言内部的方法`放到`Reflect`上
- 将某些Object方法报错情况改成返回`false`
- 让`Object操作`变成`函数行为`
- `Proxy`与`Reflect`相辅相成

> 废弃方法

- `Object.defineProperty()` => `Reflect.defineProperty()`
- `Object.getOwnPropertyDescriptor()` => `Reflect.getOwnPropertyDescriptor()`

> 重点难点

- `Proxy方法`和`Reflect方法`一一对应
- `Proxy`和`Reflect`联合使用，前者负责`拦截赋值操作`，后者负责`完成赋值操作`

> 数据绑定：观察者模式

```js
const observerQueue = new Set();
const observe = fn => observerQueue.add(fn);
const observable = obj => new Proxy(obj, {
    set(tgt, key, val, receiver) {
        const result = Reflect.set(tgt, key, val, receiver);
        observerQueue.forEach(v => v());
        return result;
    }
});

const person = observable({ age: 25, name: "Yajun" });
const print = () => console.log(`${person.name} is ${person.age} years old`);
observe(print);
person.name = "Joway";
```

## 语句和运算

### Class

![微信截图_20221129220415.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83002b160ab34836a612be64ad442498~tplv-k3u1fbpfcp-watermark.image?)

- 定义：对一类具有共同特征的事物的抽象(构造函数语法糖)

- 原理：类本身指向构造函数，所有方法定义在`prototype`上，可看作构造函数的另一种写法(`Class === Class.prototype.constructor`)

- 方法和关键字

  - **constructor()** ：构造函数，`new命令`生成实例时自动调用
  - **extends**：继承父类
  - **super**：新建父类的`this`
  - **static**：定义静态属性方法
  - **get**：取值函数，拦截属性的取值行为
  - **set**：存值函数，拦截属性的存值行为

- 属性

  - ****proto**** ：`构造函数的继承`(总是指向`父类`)
  - ****proto**.**proto**** ：子类的原型的原型，即父类的原型(总是指向父类的`__proto__`)
  - **prototype.**proto**** ：`属性方法的继承`(总是指向父类的`prototype`)

- 静态属性：定义类完成后赋值属性，该属性`不会被实例继承`，只能通过类来调用

- 静态方法：使用`static`定义方法，该方法`不会被实例继承`，只能通过类来调用(方法中的`this`指向类，而不是实例)

- 继承

  - 实质

    - ES5实质：先创造子类实例的`this`，再将父类的属性方法添加到`this`上(`Parent.apply(this)`)
    - ES6实质：先将父类实例的属性方法加到`this`上(调用`super()`)，再用子类构造函数修改`this`

  - super

    - 作为函数调用：只能在构造函数中调用`super()`，内部`this`指向继承的`当前子类`(`super()`调用后才可在构造函数中使用`this`)
    - 作为对象调用：在`普通方法`中指向`父类的原型对象`，在`静态方法`中指向`父类`

  - 显示定义：使用`constructor() { super(); }`定义继承父类，没有书写则`显示定义`

  - 子类继承父类：子类使用父类的属性方法时，必须在构造函数中调用`super()`，否则得不到父类的`this`

    - 父类静态属性方法可被子类继承
    - 子类继承父类后，可从`super`上调用父类静态属性方法

- 实例：类相当于`实例的原型`，所有在类中定义的属性方法都会被实例继承

  - 显式指定属性方法：使用`this`指定到自身上(使用`Class.hasOwnProperty()`可检测到)
  - 隐式指定属性方法：直接声明定义在对象原型上(使用`Class.__proto__.hasOwnProperty()`可检测到)

- 表达式

  - 类表达式：`const Class = class {}`
  - name属性：返回紧跟`class`后的类名
  - 属性表达式：`[prop]`
  - Generator方法：`* mothod() {}`
  - Async方法：`async mothod() {}`

- this指向：解构实例属性或方法时会报错

  - 绑定this：`this.mothod = this.mothod.bind(this)`
  - 箭头函数：`this.mothod = () => this.mothod()`

- 属性定义位置

  - 定义在构造函数中并使用`this`指向
  - 定义在`类最顶层`

- **new.target**：确定构造函数是如何调用

> 原生构造函数

- **String()**
- **Number()**
- **Boolean()**
- **Array()**
- **Object()**
- **Function()**
- **Date()**
- **RegExp()**
- **Error()**

> 重点难点

- 在实例上调用方法，实质是调用原型上的方法
- `Object.assign()`可方便地一次向类添加多个方法(`Object.assign(Class.prototype, { ... })`)
- 类内部所有定义的方法是不可枚举的(`non-enumerable`)
- 构造函数默认返回实例对象(`this`)，可指定返回另一个对象
- 取值函数和存值函数设置在属性的`Descriptor对象`上
- 类不存在变量提升
- 利用`new.target === Class`写出不能独立使用必须继承后才能使用的类
- 子类继承父类后，`this`指向子类实例，通过`super`对某个属性赋值，赋值的属性会变成子类实例的属性
- 使用`super`时，必须显式指定是作为函数还是作为对象使用
- `extends`不仅可继承类还可继承原生的构造函数

> 私有属性方法

```js
const name = Symbol("name");
const print = Symbol("print");
class Person {
    constructor(age) {
        this[name] = "Bruce";
        this.age = age;
    }
    [print]() {
        console.log(`${this[name]} is ${this.age} years old`);
    }
}
```

> 继承混合类

```js
function CopyProperties(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            const desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}
function MixClass(...mixins) {
    class Mix {
        constructor() {
            for (const mixin of mixins) {
                CopyProperties(this, new mixin());
            }
        }
    }
    for (const mixin of mixins) {
        CopyProperties(Mix, mixin);
        CopyProperties(Mix.prototype, mixin.prototype);
    }
    return Mix;
}
class Student extends MixClass(Person, Kid) {}
```

`ES提案`

- **静态属性**：使用`static`定义属性，该属性`不会被实例继承`，只能通过类来调用
- **私有属性**：使用`#`定义属性，该属性只能在类内部访问
- **私有方法**：使用`#`定义方法，该方法只能在类内部访问
- **装饰器**：使用`@`注释或修改类和类方法

### Module

- 命令

  - **export**：规定模块对外接口

    - **默认导出**：`export default Person`(导入时可指定模块任意名称，无需知晓内部真实名称)
    - **单独导出**：`export const name = "Bruce"`
    - **按需导出**：`export { age, name, sex }`(推荐)
    - **改名导出**：`export { name as newName }`

  - **import**：导入模块内部功能

    - **默认导入**：`import Person from "person"`
    - **整体导入**：`import * as Person from "person"`
    - **按需导入**：`import { age, name, sex } from "person"`
    - **改名导入**：`import { name as newName } from "person"`
    - **自执导入**：`import "person"`
    - **复合导入**：`import Person, { name } from "person"`
    - **import()** ：动态导入(返回`Promise`)

      - 背景：`import命令`被JS引擎静态分析，先于模块内的其他语句执行，无法取代`require()`的动态加载功能，提案建议引入`import()`来代替`require()`
      - 位置：可在任何地方使用
      - 区别：`require()`是**同步加载**，`import()`是**异步加载**
      - 场景：按需加载、条件加载、模块路径动态化
    - **import.meta**：返回脚本元信息
  - **复合模式**：`export命令`和`import命令`结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量

    - **默认导入导出**：`export { default } from "person"`
    - **整体导入导出**：`export * from "person"`
    - **按需导入导出**：`export { age, name, sex } from "person"`
    - **改名导入导出**：`export { name as newName } from "person"`
    - **具名改默认导入导出**：`export { name as default } from "person"`
    - **默认改具名导入导出**：`export { default as name } from "person"`

- 继承：`默认导出`和`改名导出`结合使用可使模块具备继承性

- 设计思想：尽量地静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

- 严格模式：ES6模块自动采用严格模式(不管模块头部是否添加`use strict`)

> 模块方案

- **CommonJS**：用于服务器(动态化依赖)
- **AMD**：用于浏览器(动态化依赖)
- **CMD**：用于浏览器(动态化依赖)
- **UMD**：用于浏览器和服务器(动态化依赖)
- **ESM**：用于浏览器和服务器(静态化依赖)

> 加载方式

- **运行时加载**

  - 定义：整体加载模块生成一个对象，再从对象上获取需要的属性和方法进行加载(全部加载)
  - 影响：只有运行时才能得到这个对象，导致无法在编译时做静态优化

- **编译时加载**

  - 定义：直接从模块中获取需要的属性和方法进行加载(按需加载)
  - 影响：在编译时就完成模块加载，效率比其他方案高，但无法引用模块本身(**本身不是对象**)，可拓展JS高级语法(**宏和类型校验**)

> 加载实现

- **传统加载**：通过`<script>`进行同步或异步加载脚本

  - 同步加载：`<script src=""></script>`
  - Defer异步加载：`<script src="" defer></script>`(顺序加载，渲染完再执行)
  - Async异步加载：`<script src="" async></script>`(乱序加载，下载完就执行)

- **模块加载**：`<script type="module" src=""></script>`(默认是Defer异步加载)

> CommonJS和ESM的区别

- `CommonJS`输出`值的拷贝`，`ESM`输出`值的引用`

  - `CommonJS`一旦输出一个值，模块内部的变化就影响不到这个值
  - `ESM`是动态引用且不会缓存值，模块里的变量绑定其所在的模块，等到脚本真正执行时，再根据这个只读引用到被加载的那个模块里去取值

- `CommonJS`是运行时加载，`ESM`是编译时加载

  - `CommonJS`加载模块是对象(即`module.exports`)，该对象只有在脚本运行完才会生成
  - `ESM`加载模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

> Node加载

- 背景：`CommonJS`和`ESM`互不兼容，目前解决方案是将两者分开，采用各自的加载方案

- 区分：要求`ESM`采用`.mjs`后缀文件名

  - `require()`不能加载`.mjs文件`，只有`import命令`才可加载`.mjs文件`
  - `.mjs文件`里不能使用`require()`，必须使用`import命令`加载文件

- 驱动：`node --experimental-modules file.mjs`

- 限制：Node的`import命令`目前只支持加载本地模块(`file:协议`)，不支持加载远程模块

- 加载优先级

  - 脚本文件省略后缀名：依次尝试加载四个后缀名文件(`.mjs`、`.js`、`.json`、`node`)
  - 以上不存在：尝试加载`package.json`的`main字段`指定的脚本
  - 以上不存在：依次尝试加载名称为`index`四个后缀名文件(`.mjs`、`.js`、`.json`、`node`)
  - 以上不存在：报错

- 不存在的内部变量：`arguments`、`exports`、`module`、`require`、`this`、`__dirname`、`__filename`

- CommonJS加载ESM

  - 不能使用`require()`，只能使用`import()`

- ESM加载CommonJS

  - 自动将`module.exports`转化成`export default`
  - `CommonJS`输出缓存机制在`ESM`加载方式下依然有效
  - 采用`import命令`加载`CommonJS模块`时，不允许采用`按需导入`，应使用`默认导入`或`整体导入`

> 循环加载

- 定义：`脚本A`的执行依赖`脚本B`，而`脚本A`的执行又依赖`脚本B`

- 加载原理

  - CommonJS：`require()`首次加载脚本就会执行整个脚本，在内存里生成一个对象缓存下来，二次加载脚本时直接从缓存中获取
  - ESM：`import命令`加载变量不会被缓存，而是成为一个指向被加载模块的引用

- 循环加载

  - CommonJS：只输出已经执行的部分，还未执行的部分不会输出
  - ESM：需开发者自己保证真正取值时能够取到值(可把变量写成函数形式，函数具有提升作用)

> 重点难点

- ES6模块中，顶层`this`指向`undefined`，不应该在顶层代码使用`this`
- 一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取
- `export命令`输出的接口与其对应的值是`动态绑定关系`，即通过该接口可获取模块内部实时的值
- `import命令`大括号里的变量名必须与被导入模块对外接口的名称相同
- `import命令`输入的变量只读(本质是输入接口)，不允许在加载模块的脚本里改写接口
- `import命令`命令具有提升效果，会提升到整个模块的头部，首先执行
- 重复执行同一句`import语句`，只会执行一次
- `export default`命令只能使用一次
- `export default命令`导出的整体模块，在执行`import命令`时其后不能跟`大括号`
- `export default命令`本质是输出一个名为`default`的变量，后面不能跟`变量声明语句`
- `export default命令`本质是将后面的值赋给名为`default`的变量，可直接将值写在其后
- `export default命令`和`export {}命令`可同时存在，对应`复合导入`
- `export命令`和`import命令`可出现在模块任何位置，只要处于模块顶层即可，不能处于块级作用域
- `import()`加载模块成功后，此模块会作为一个对象，当作`then()`的参数，可使用`对象解构赋值`来获取输出接口
- 同时动态加载多个模块时，可使用`Promise.all()`和`import()`相结合来实现
- `import()`和结合`async/await`来书写同步操作的代码

> 单例模式：跨模块常量

```js
// 常量跨文件共享
// person.js
const NAME = "Bruce";
const AGE = 25;
const SEX = "male";
export { AGE, NAME, SEX };
```

```js
// file1.js
import { AGE } from "person";
console.log(AGE);
```

```js
// file2.js
import { AGE, NAME, SEX } from "person";
console.log(AGE, NAME, SEX);
```

> 默认导入互换整体导入

```js
import Person from "person";
console.log(Person.AGE);
```

```js
import * as Person from "person";
console.log(Person.default.AGE);
```

### 迭代器Iterator

- 定义：迭代不同的数据结构的内容

- 原理：创建一个指针指向首个成员，按照次序使用`next()`指向下一个成员，直接到结束位置(数据结构只要部署`Iterator接口`就可完成遍历操作)

- 作用

  - 为各种数据结构提供一个统一的简便的访问接口
  - 使得数据结构成员能够按某种次序排列
  - ES6创造了新的遍历命令`for-of`，`Iterator接口`主要供`for-of`消费

- 形式：`for-of`(自动去寻找Iterator接口)

- 数据结构

  - 集合：`Array`、`Object`、`Set`、`Map`
  - 原生具备接口的数据结构：`String`、`Array`、`Set`、`Map`、`TypedArray`、`Arguments`、`NodeList`

- 部署：默认部署在`Symbol.iterator`(具备此属性被认为`可遍历的iterable`)

- 遍历器对象

  - **next()** ：下一步操作，返回`{ done, value }`(必须部署)
  - **return()** ：`for-of`提前退出调用，返回`{ done: true }`
  - **throw()** ：不使用，配合`Generator函数`使用

> ForOf循环

- 定义：调用`Iterator接口`产生遍历器对象(`for-of`内部调用数据结构的`Symbol.iterator()`)

- 遍历字符串：`for-in`获取`索引`，`for-of`获取`值`(可识别32位UTF-16字符)

- 遍历数组：`for-in`获取`索引`，`for-of`获取`值`

- 遍历对象：`for-in`获取`键`，`for-of`需自行部署

- 遍历Set：`for-of`获取`值` => `for (const v of set)`

- 遍历Map：`for-of`获取`键值对` => `for (const [k, v] of map)`

- 遍历类数组：`包含length的对象`、`Arguments对象`、`NodeList对象`(无`Iterator接口的类数组`可用`Array.from()`转换)

- 计算生成数据结构：`Array`、`Set`、`Map`

  - **keys()** ：返回遍历器对象，遍历所有的键
  - **values()** ：返回遍历器对象，遍历所有的值
  - **entries()** ：返回遍历器对象，遍历所有的键值对

- 与`for-in`区别
  - `for-in`只遍历key值，会遍历出原型上的属性
  - 有着同`for-in`一样的简洁语法，但没有`for-in`那些缺点、
  - 不同于`forEach()`，它可与`break`、`continue`和`return`配合使用
  - 提供遍历所有数据结构的统一操作接口

> 应用场景

- 改写具有`Iterator接口`的数据结构的`Symbol.iterator`
- 解构赋值：对Set进行结构
- 扩展运算符：将部署`Iterator接口`的数据结构转为数组
- yield*：`yield*`后跟一个可遍历的数据结构，会调用其遍历器接口
- 接受数组作为参数的函数：`for-of`、`Array.from()`、`new Set()`、`new WeakSet()`、`new Map()`、`new WeakMap()`、`Promise.all()`、`Promise.race()`

>底层

```js
// for of 循环的开始，首先会调用数据结构的［Symbol.iterator］函数，这个函数是按照 Iterator 迭代器规范设计的
// 每一次循环都是执行依次 next 方法

let arr =[10, 20, 30, 40];

arr[Symbol.iterator] = function iterator(){ 
    let index=0,
        self=this
    return { 
        next(){
            if(index > self.length-1){
                return{ done:true, value: undefined };
            }
        return{done: false,value: self[index++]}; 
       } 
     }; 
};

for (let item of arr){ console.log(item); }
```

>使对象支持for-of

```js
    let obj = {
      name: "zhufeng",
      age: 12,
      0: 100,
      1: 200,
      [Symbol("AA")]: 300,
    };

    Object.prototype[Symbol.iterator] = function iterator() {
      let self = this,
        keys = Reflect.ownKeys(self),
        index = 0;
      return {
        next() {
          if (index > keys.length - 1) {
            return {
              done: true,
              value: undefined,
            };
          }
          // 只获取键值
          return {
            done: false,
            value: self[keys[index++]],
          };
          // 如果想获取键名和键值
          let key = keys[index++];
          return {
             done: false,
             value: {
               key,
               value: self[key],
             },
         };
        },
      };
    };
    
    for (let value of obj) {
      console.log(value);
    }
    // 如果想获取键名和键值
    for (let { key, value } of obj) {
      console.log(key, value);
    }
```

`ES2020`

- **for-in遍历顺序**：不同的引擎已就如何迭代属性达成一致，从而使行为标准化

## 异步编程

### 异步编程的实现方式

- **回调函数**: 使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- **Promise** : 使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
- **generator** : 它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
- **async 函数** : async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

### 对 Promise 的理解

`Promise` 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的数据，他的解决了回调函数编程存在的回调地狱的问题。promise内部一般会封装一个异步操作，比如ajax 文件读写等。

**三个状态**: `Pending`（进行中）、`fulfilled`（已完成）、`Rejected`（已拒绝）

创建promise时，状态就是 Pending，任务完成了状态就变成了 fulfilled、失败了就变成了Rejected

**Promise 的特点：**

- 对象的状态不受外界影响,只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变就不会再变，任何时候都可得到这个结果

**Promise 的缺点：**

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

`注意：` 在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

**总结:可以不看**

- 只有异步操作的结果可决定当前状态是哪一种，其他操作都无法改变这个状态
- 状态改变只有两种可能：从`pending`变为`resolved`、从`pending`变为`rejected`
- 一旦新建`Promise对象`就会立即执行，无法中途取消
- 不设置回调函数，内部抛错不会反应到外部
- 当处于`pending`时，无法得知目前进展到哪一个阶段
- 实例状态变为`resolved`或`rejected`时，会触发`then()`绑定的回调函数
- `resolve()`和`reject()`的执行总是晚于本轮循环的同步任务
- `then()`返回新实例，其后可再调用另一个`then()`
- `then()`运行中抛出错误会被`catch()`捕获
- `reject()`的作用等同于抛出错误
- 实例状态已变成`resolved`时，再抛出错误是无效的，不会被捕获，等于没有抛出
- 实例状态的错误具有`冒泡`性质，会一直向后传递直到被捕获为止，错误总是会被下一个`catch()`捕获
- 不要在`then()`里定义`rejected`状态的回调函数(不使用其第二参数)
- 建议使用`catch()`捕获错误，不要使用`then()`第二个参数捕获
- 没有使用`catch()`捕获错误，实例抛错不会传递到外层代码，即`不会有任何反应`
- 作为参数的实例定义了`catch()`，一旦被`rejected`并不会触发`Promise.all()`的`catch()`
- `Promise.reject()`的参数会原封不动地作为`rejected`的理由，变成后续方法的参数

### Promise 的基本用法

**创建 Promise 对象**

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value)
  } else {
    reject(error)
  }
})
```

一般情况下都会使用`new Promise()` 来创建 promise 对象，但是也可以使用`promise.resolve`和`promise.reject`这两个方法：

- `Promise.resolve`

```js
// Promise.resolve(value)的返回值也是一个 promise 对象，可以对返回值进行.then 调用

Promise.resolve(11).then(function (value) {
  console.log(value) // 打印出11
})
// resolve(11)代码中，会让 promise 对象进入确定(`resolve`状态)，
// 并将参数`11`传递给后面的`then`所指定的`onFulfilled` 函数
```

- `Promise.reject`

```js
Promise.reject(new Error(“我错了，请原谅俺！！”));
```

**promise 方法**

Promise 有五个常用的方法：then()、catch()、all()、race()、finally。下面就来看一下这些方法。

- `then()`

`then`方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为`resolved`时调用，第二个回调函数是 Promise 对象的状态变为`rejected`时调用。其中第二个参数可以省略。

`then`方法返回的是一个新的 Promise 实例（不是原来那个 Promise 实例）。因此可以采用链式写法，即`then`方法后面再调用另一个 then 方法。

```js
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  }
)
```

当要写有顺序的异步事件时，需要串行时，可以这样写：

```js
let promise = new Promise((resolve, reject) => {
  ajax('first').success(function (res) {
    resolve(res)
  })
})
promise
  .then((res) => {
    return new Promise((resovle, reject) => {
      ajax('second').success(function (res) {
        resolve(res)
      })
    })
  })
  .then((res) => {
    return new Promise((resovle, reject) => {
      ajax('second').success(function (res) {
        resolve(res)
      })
    })
  })
  .then((res) => {})
```

那当要写的事件没有顺序或者关系时，还如何写呢？可以使用`all` 方法来解决。

- `catch()`

Promise 对象除了有 then 方法，还有一个 catch 方法，该方法相当于`then`方法的第二个参数，指向`reject`的回调函数。不过`catch`方法还有一个作用，就是在执行`resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入`catch`方法中。

```js
p.then(
  (data) => {
    console.log('resolved', data)
  },
  (err) => {
    console.log('rejected', err)
  }
)
p.then((data) => {
  console.log('resolved', data)
}).catch((err) => {
  console.log('rejected', err)
})
```

- `all()`

`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。遇到发送多个请求并根据请求顺序获取和使用数据的场景，就可以使用 Promise.all 来解决。

```javascript
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
Promise.all([promise1, promise2, promise3]).then((res) => {
  console.log(res)
  //结果为：[1,2,3]
})
```

调用`all`方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个 promise 对象`resolve`执行时的值。

- `race()`

`race`方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。

```js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       reject(1);
    },2000)
});
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(2);
    },1000)
});
let promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(3);
    },3000)
});
Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果：2
},rej=>{
    console.log(rej)};
)
```

那么`race`方法有什么实际作用呢？当要做一件事，超过多长时间就不做了，可以用这个方法来解决：

```js
Promise.race([promise1, timeOutPromise(5000)]).then((res) => {})
```

- `finally()`

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。存在同样的语句需要为成功和失败两种情况各写一次时，使用`finally`方法,则只需要写一次。

```js
// 不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，
// 都会执行`finally`方法指定的回调函数。
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

- `Promise.try()` ：不想区分是否同步异步函数，包装函数为实例，使用then()指定下一步流程，使用catch()捕获错误
- `Promise.allSettled()` ：将多个实例包装成一个新实例，返回全部实例状态变更后的状态数组(齐变更再返回)
- `Promise.any()` ：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)

### 生成器Generator

- 定义：封装多个内部状态的异步编程解决方案
- 声明：`function* Func() {}`
- 特点:
  - `function`关键字与函数名之间有一个星号
  - 函数体内部使用`yield`表达式，定义不同的内部状态
  - 调用`Generator函数`(该函数不执行)返回指向内部状态的指针对象(也就是`遍历器对象（Iterator Object）`不是运行结果)
  - 执行`Generator 函数`会返回一个迭代器对象，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。

- 方法

  - **next()** ：使指针移向下一个状态，返回`{ done, value }`,入参数会被当作上一个`yield`表达式的返回值
  - **return()** ：返回指定值且终结遍历`Generator函数`，返回`{ done: true, value: 入参 }`
  - **throw()** ：在`Generator函数`体外抛出错误，在`Generator函数`体内捕获错误，返回自定义的`new Errow()`

- yield命令：声明内部状态的值(`return`声明结束返回的值)

  - 遇到`yield命令`就暂停执行后面的操作，并将其后表达式的值作为返回对象的`value`
  - 下次调用`next()`时，再继续往下执行直到遇到下一个`yield命令`
  - 没有再遇到`yield命令`就一直运行到`Generator函数`结束，直到遇到`return语句`为止并将其后表达式的值作为返回对象的`value`
  - `Generator函数`没有`return语句`则返回对象的`value`为`undefined`

- yield*命令：在一个`Generator函数`里执行另一个`Generator函数`(后随具有`Iterator接口`的数据结构)

- 遍历：通过`for-of`自动调用`next()`

- 作为对象属性

  - 全写：`const obj = { method: function*() {} }`
  - 简写：`const obj = { * method() {} }`

- 上下文：执行产生的`上下文环境`一旦遇到`yield命令`就会暂时退出堆栈(但并不消失)，所有变量和对象会冻结在`当前状态`，等到对它执行`next()`时，这个`上下文环境`又会重新加入调用栈，冻结的变量和对象恢复执行

> 方法异同

- 相同点：`next()`、`throw()`、`return()`本质上是同一件事，作用都是让函数恢复执行且使用不同的语句替换`yield命令`

- 不同点

  - **next()** ：将`yield命令`替换成一个`值`
  - **return()** ：将`yield命令`替换成一个`return语句`
  - **throw()** ：将`yield命令`替换成一个`throw语句`

> 应用场景

- 异步操作同步化表达
- 控制流管理
- 为对象部署Iterator接口：把`Generator函数`赋值给对象的`Symbol.iterator`，从而使该对象具有`Iterator接口`
- 作为具有Iterator接口的数据结构

> 重点难点

- 每次调用`next()`，指针就从`函数头部`或`上次停下的位置`开始执行，直到遇到下一个`yield命令`或`return语句`为止
- 函数内部可不用`yield命令`，但会变成单纯的`暂缓执行函数`(还是需要`next()`触发)
- `yield命令`是暂停执行的标记，`next()`是恢复执行的操作
- `yield命令`用在另一个表达式中必须放在`圆括号`里
- `yield命令`用作函数参数或放在赋值表达式的右边，可不加`圆括号`
- `yield命令`本身没有返回值，可认为是返回`undefined`
- `yield命令表达式`为惰性求值，等`next()`执行到此才求值
- 函数调用后生成遍历器对象，此对象的`Symbol.iterator`是此对象本身
- 在函数运行的不同阶段，通过`next()`从外部向内部注入不同的值，从而调整函数行为
- 首个`next()`用来启动遍历器对象，后续才可传递参数
- 想首次调用`next()`时就能输入值，可在函数外面再包一层
- 一旦`next()`返回对象的`done`为`true`，`for-of`遍历会中止且不包含该返回对象
- 函数内部部署`try-finally`且正在执行`try`，那么`return()`会导致立刻进入`finally`，执行完`finally`以后整个函数才会结束
- 函数内部没有部署`try-catch`，`throw()`抛错将被外部`try-catch`捕获
- `throw()`抛错要被内部捕获，前提是必须`至少执行过一次next()`
- `throw()`被捕获以后，会附带执行下一条`yield命令`
- 函数还未开始执行，这时`throw()`抛错只可能抛出在函数外部

> 首次next()可传值

```js
function Wrapper(func) {
    return function(...args) {
        const generator = func(...args);
        generator.next();
        return generator;
    }
}
const print = Wrapper(function*() {
    console.log(`First Input: ${yield}`);
    return "done";
});
print().next("hello");
```

### async/await 的理解

使异步函数以同步函数的形式书写，是`Generator` 的语法糖，它是为优化 then 链而开发出来的。async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。语法上强制规定 await 只能出现在 asnyc 函数中，先来看看 async 函数返回了什么：

```js
async function testAsy() {
  return 'hello world'
}
let result = testAsy()
console.log(result)
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1526a88417f140f7abb98959ec25d82b~tplv-k3u1fbpfcp-zoom-1.image)

所以，async 函数返回的是一个 Promise 对象。async 函数会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。

原理：将`Generator函数`和自动执行器`spawn`包装在一个函数里

形式：将`Generator函数`的`*`替换成`async`，将`yield`替换成`await`

错误捕获：将`await命令Promise对象`放到`try-catch`中(可放多个)

异步迭代器(for-await-of) ：循环等待每个`Promise对象`变为`resolved状态`才进入下一步

```js
    (async() =>{
        let obj={}
        obj[Symbol.asyncIterator] = async function* (){
            //console.Log(' 1 STAR') ;
            yield func1()
            // console .Log(' 2 STAR') ;
            yield func2()
            // console .log(' 3 STAR') ;
            yield func3()
        }
    })()
    for await(let x of obj) {
        console.log(x)
    }
```

顶层Await：允许在模块的顶层独立使用`await命令`(借用`await`解决模块异步加载的问题)

**Async对Generator改进**

- 内置执行器：`async`函数执行与普通函数一样，不像`Generator`函数，需要调用`next`方法，或使用`co`模块才能真正执行
- 语意化更清晰：`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。
- 适用性更广：`co`模块约定，`yield`命令后面只能是 Thunk 函数或 Promise 对象，而`async`函数的`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
- 返回值是Promise：`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

**重点难点**

- `await`只能在`async`函数中使用，不然会报错
- 在`Async`函数中，`await`规定了异步操作只能一个一个排队执行，从而达到**用同步方式，执行异步操作**的效果
- `await`后面最好是接`Promise`，虽然接其他值也能达到`排队`效果
- `Async`函数返回的是一个`Promise`对象，有无值看有无return值,可使用`.then()`添加回调函数,内部`return返回值`会成为后续`then()`的出参
- 内部抛出错误会导致返回的Promise对象变为`rejected状态`，被`catch()`接收到
- 返回的Promise对象必须等到内部所有`await命令Promise对象`执行完才会发生状态改变，除非遇到`return语句`或`抛出错误`
- 任何一个`await命令Promise对象`变为`rejected状态`，整个`Async函数`都会中断执行
- 希望即使前一个异步操作失败也不要中断后面的异步操作
  - 将`await命令Promise对象`放到`try-catch`中
  - `await命令Promise对象`跟一个`catch()`
- `await命令Promise对象`可能变为`rejected状态`，最好把其放到`try-catch`中
- 多个`await命令Promise对象`若不存在继发关系，最好让它们同时触发
- 数组使用`forEach()`执行`async/await`会失效，可使用`for-of`和`Promise.all()`代替
- 可保留运行堆栈，函数上下文随着`Async函数`的执行而存在，执行完成就消失

### await 到底在等啥？

await 表达式的运算结果取决于它等的是什么。

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

```js
function getSomething() {
  return 'something'
}
async function testAsync() {
  return Promise.resolve('hello async')
}
async function test() {
  const v1 = await getSomething()
  const v2 = await testAsync()
  console.log(v1, v2)
}
test()
```

### async/await 对比 Promise 的优势

- 代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调⽤也会带来额外的阅读负担
- Promise 传递中间值⾮常麻烦，⽽ async/await ⼏乎是同步的写法，⾮常优雅
- 错误处理友好，async/await 可以⽤成熟的 try/catch，Promise 的错误捕获⾮常冗余
- 调试友好，Promise 的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个.then 代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then 代码块，因为调试器只能跟踪同步代码的每⼀步。

### 三种方案比较

后三种方案都是为解决传统的回调函数而提出的，所以它们相对于回调函数的优势不言而喻。而`async/await`又是`Generator`函数的语法糖。

- Promise的内部错误使用`try catch`捕获不到，只能只用`then`的第二个回调或`catch`来捕获，而`async/await`的错误可以用`try catch`捕获
- `Promise`一旦新建就会立即执行，不会阻塞后面的代码，而`async`函数中await后面是Promise对象会阻塞后面的代码。
- `async`函数会隐式地返回一个`promise`，该`promise`的`reosolve`值就是函数return的值。
- 使用`async`函数可以让代码更加简洁，不需要像`Promise`一样需要调用`then`方法来获取返回值，不需要写匿名函数处理`Promise`的resolve值，也不需要定义多余的data变量，还避免了嵌套代码。

## 二、ES6

### 1. let、const、var的区别

**（1）块级作用域：** var 声明的变量具有函数作用域或全局作用域，而 let 和 const 声明的变量具有块级作用域。块级作用域指的是由花括号 {} 包围的任何代码块（例如，if 语句、循环或函数）内部声明的变量只在该代码块内部可用。这意味着，使用 let 或 const 声明的变量在其声明的代码块之外是不可访问的。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** 使用 var 声明的变量会被提升到作用域顶部。这意味着可以在变量声明之前使用该变量。但是，使用 let 或 const 声明的变量不会被提升到作用域顶部，因此在声明之前使用该变量会导致错误。

**（3）重复声明：** var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（4）初始值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（5）指针指向：** let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

**（6）给全局添加属性：** 浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

### 2. const对象的属性可以修改吗

const保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

### 3. 如果new一个箭头函数的会怎么样

箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。

new操作符的实现步骤如下：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）
3. 指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
4. 返回新的对象

所以，上面的第二、三步，箭头函数都是没有办法执行的。

### 4. 箭头函数与普通函数的区别

**（1）箭头函数比普通函数更加简洁**

- 如果没有参数，就直接写一个空括号即可
- 如果只有一个参数，可以省去参数的括号
- 如果有多个参数，用逗号分割
- 如果函数体的返回值只有一句，可以省略大括号
- 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常见的就是调用一个函数：

```javascript
let fn = () => void doesNotReturn();
```

**（2）箭头函数没有自己的this**

箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。

**（3）箭头函数继承来的this指向永远不会改变**

```javascript
var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function(){
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};
obj.a();    // 'OBJ'
obj.b();    // 'GLOBAL'
new obj.a()  // undefined
new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```

对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

**（4）call()、apply()、bind()等方法不能改变箭头函数中this的指向**

```javascript
var id = 'Global';
let fun1 = () => {
    console.log(this.id)
};
fun1();                     // 'Global'
fun1.call({id: 'Obj'});     // 'Global'
fun1.apply({id: 'Obj'});    // 'Global'
fun1.bind({id: 'Obj'})();   // 'Global'
```

**（5）箭头函数不能作为构造函数使用**

构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

**（6）箭头函数没有自己的arguments**

箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。

**（7）箭头函数没有prototype**

**（8）箭头函数不能用作Generator函数，不能使用yeild关键字**

### 5. 箭头函数的**this**指向哪⾥？

箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于⾃⼰的this，它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。

可以⽤Babel理解⼀下箭头函数:

```javascript
// ES6 
const obj = { 
  getArrow() { 
    return () => { 
      console.log(this === obj); 
    }; 
  } 
}
```

转化后：

```javascript
// ES5，由 Babel 转译
var obj = { 
   getArrow: function getArrow() { 
     var _this = this; 
     return function () { 
        console.log(_this === obj); 
     }; 
   } 
};
```

### 6. 扩展运算符的作用及使用场景

**（1）对象扩展运算符**

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```javascript
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法实际上等价于:

```javascript
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

`Object.assign`方法用于对象的合并，将源对象`（source）`的所有可枚举属性，复制到目标对象`（target）`。`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。(**如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**)。

同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```javascript
let bar = {a: 1, b: 2};
let baz = {...bar, ...{a:2, b: 4}};  // {a: 2, b: 4}
```

利用上述特性就可以很方便的修改对象的部分属性。在`redux`中的`reducer`函数规定必须是**一个纯函数**，`reducer`中的`state`对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

需要注意：**扩展运算符对****对象实例的拷贝属于浅拷贝**。

**（2）数组扩展运算符**

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```javascript
console.log(...[1, 2, 3])
// 1 2 3
console.log(...[1, [2, 3, 4], 5])
// 1 [2, 3, 4] 5
```

下面是数组的扩展运算符的应用：

- **将数组转换为参数序列**

```javascript
function add(x, y) {
  return x + y;
}
const numbers = [1, 2];
add(...numbers) // 3
```

- **复制数组**

```javascript
const arr1 = [1, 2];
const arr2 = [...arr1];
```

- **合并数组**

如果想在数组内合并数组，可以这样：

```javascript
const arr1 = ['two', 'three'];
const arr2 = ['one', ...arr1, 'four', 'five'];
// ["one", "two", "three", "four", "five"]
```

- **扩展运算符与解构赋值结合起来，用于生成数组**

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

需要注意：**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**

```javascript
const [...rest, last] = [1, 2, 3, 4, 5];         // 报错
const [first, ...rest, last] = [1, 2, 3, 4, 5];  // 报错
```

- **将字符串转为真正的数组**

```javascript
[...'hello']    // [ "h", "e", "l", "l", "o" ]
```

- **任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组**

比较常见的应用是可以将某些数据结构转为数组：

```javascript
// arguments对象
function foo() {
  const args = [...arguments];
}
```

用于替换`es5`中的`Array.prototype.slice.call(arguments)`写法。

- **使用**`Math`**函数获取数组中特定的值**

```javascript
const numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
Math.max(...numbers); // 9
```

### 7. Proxy 可以实现什么功能？

在 Vue3.0 中通过 `Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。

Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```javascript
let p = new Proxy(target, handler)
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 `set` 或者 `get` 函数。

下面来通过 `Proxy` 来实现一个数据响应式：

```javascript
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}
let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

在上述代码中，通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要在 `get` 中收集依赖，在 `set` 派发更新，之所以 Vue3.0 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。

### 8. 对对象与数组的解构的理解

解构是 ES6 提供的一种新的提取数据的模式，这种模式能够从对象或数组里有针对性地拿到想要的数值。

**1）数组的解构**

在解构数组时，以元素的位置为匹配条件来提取想要的数据的：

```javascript
const [a, b, c] = [1, 2, 3]
```

最终，a、b、c分别被赋予了数组第0、1、2个索引位的值：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8321cfa2baae4a7db3b735c3a3f760c0~tplv-k3u1fbpfcp-zoom-1.image)

数组里的0、1、2索引位的元素值，精准地被映射到了左侧的第0、1、2个变量里去，这就是数组解构的工作模式。还可以通过给左侧变量数组设置空占位的方式，实现对数组中某几个元素的精准提取：

```javascript
const [a,,c] = [1,2,3]
```

通过把中间位留空，可以顺利地把数组第一位和最后一位的值赋给 a、c 两个变量：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd59f519d89c46969f4857e765e8c84e~tplv-k3u1fbpfcp-zoom-1.image)

**2）对象的解构**

对象解构比数组结构稍微复杂一些，也更显强大。在解构对象时，是以属性的名称为匹配条件，来提取想要的数据的。现在定义一个对象：

```javascript
const stu = {
  name: 'Bob',
  age: 24
}
```

假如想要解构它的两个自有属性，可以这样：

```javascript
const { name, age } = stu
```

这样就得到了 name 和 age 两个和 stu 平级的变量：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cbcd9112a154da18f74fbb32b83c575~tplv-k3u1fbpfcp-zoom-1.image)

注意，对象解构严格以属性名作为定位依据，所以就算调换了 name 和 age 的位置，结果也是一样的：

```javascript
const { age, name } = stu
```

### 9. **如何提取高度嵌套的对象里的指定属性？**

有时会遇到一些嵌套程度非常深的对象：

```javascript
const school = {
   classes: {
      stu: {
         name: 'Bob',
         age: 24,
      }
   }
}
```

像此处的 name 这个变量，嵌套了四层，此时如果仍然尝试老方法来提取它：

```javascript
const { name } = school
```

显然是不奏效的，因为 school 这个对象本身是没有 name 这个属性的，name 位于 school 对象的“儿子的儿子”对象里面。要想把 name 提取出来，一种比较笨的方法是逐层解构：

```javascript
const { classes } = school
const { stu } = classes
const { name } = stu
name // 'Bob'
```

但是还有一种更标准的做法，可以用一行代码来解决这个问题：

```javascript
const { classes: { stu: { name } }} = school
       
console.log(name)  // 'Bob'
```

可以在解构出来的变量名右侧，通过冒号+{目标属性名}这种形式，进一步解构它，一直解构到拿到目标数据为止。

### 10. 对 rest 参数的理解

扩展运算符被用在函数形参上时，**它还可以把一个分离的参数序列整合成一个数组**：

```javascript
function mutiple(...args) {
  let result = 1;
  for (var val of args) {
    result *= val;
  }
  return result;
}
mutiple(1, 2, 3, 4) // 24
```

这里，传入 mutiple 的是四个分离的参数，但是如果在 mutiple 函数里尝试输出 args 的值，会发现它是一个数组：

```javascript
function mutiple(...args) {
  console.log(args)
}
mutiple(1, 2, 3, 4) // [1, 2, 3, 4]
```

这就是 … rest运算符的又一层威力了，它可以把函数的多个入参收敛进一个数组里。这一点**经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。**

### 11. ES6中模板语法与字符串处理

ES6 提出了“模板语法”的概念。在 ES6 以前，拼接字符串是很麻烦的事情：

```javascript
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = 'my name is ' + name + ', I work as a ' + career + ', I love ' + hobby[0] + ' and ' + hobby[1]
```

仅仅几个变量，写了这么多加号，还要时刻小心里面的空格和标点符号有没有跟错地方。但是有了模板字符串，拼接难度直线下降：

```javascript
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = `my name is ${name}, I work as a ${career} I love ${hobby[0]} and ${hobby[1]}`
```

字符串不仅更容易拼了，也更易读了，代码整体的质量都变高了。这就是模板字符串的第一个优势——允许用${}的方式嵌入变量。但这还不是问题的关键，模板字符串的关键优势有两个：

- 在模板字符串中，空格、缩进、换行都会被保留
- 模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算

基于第一点，可以在模板字符串里无障碍地直接写 html 代码：

```javascript
let list = `
    <ul>
        <li>列表项1</li>
        <li>列表项2</li>
    </ul>
`;
console.log(message); // 正确输出，不存在报错
```

基于第二点，可以把一些简单的计算和调用丢进 ${} 来做：

```javascript
function add(a, b) {
  const finalString = `${a} + ${b} = ${a+b}`
  console.log(finalString)
}
add(1, 2) // 输出 '1 + 2 = 3'
```

除了模板语法外， ES6中还新增了一系列的字符串方法用于提升开发效率：

- **存在性判定**：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 indexOf > -1 来做。现在 ES6 提供了三个方法：includes、startsWith、endsWith，它们都会返回一个布尔值来告诉你是否存在。

  - **includes**：判断字符串与子串的包含关系：

    ```javascript
    const son = 'haha' 
    const father = 'xixi haha hehe'
    father.includes(son) // true
    ```

  - **startsWith**：判断字符串是否以某个/某串字符开头：

    ```javascript
    const father = 'xixi haha hehe'
    father.startsWith('haha') // false
    father.startsWith('xixi') // true
    ```

  - **endsWith**：判断字符串是否以某个/某串字符结尾：

    ```javascript
    const father = 'xixi haha hehe'
    father.endsWith('hehe') // true
    ```

  - **自动重复**：可以使用 repeat 方法来使同一个字符串输出多次（被连续复制多次）：

    ```javascript
    const sourceCode = 'repeat for 3 times;'
    const repeated = sourceCode.repeat(3) 
    console.log(repeated) // repeat for 3 times;repeat for 3 times;repeat for 3 times;
    ```

### 对模块化的理解

模块化是一种组织代码的方法，通过将代码分为可重用、可组合的模块，可以更好地管理代码的复杂性，并提高代码的可维护性和可扩展性。

在现代的 JavaScript 中，有多种模块化方案可供选择，如 CommonJS、AMD、ES6 模块等。其中，ES6 模块已经成为官方标准，被广泛应用于现代前端开发中。

- commonJS：它主要用于 Node.js 应用程序的模块化，其特点是同步加载，模块加载时会阻塞后面的代码执行，不能用于浏览器端的 JavaScript，通过require和module.exports实现同步加载模块

服务端一般采用同步加载文件，也就是说需要某个模块，服务端便停下来，等待它加载再执行。
而浏览器端需要保证效率，需要采用异步加载，这就需要一个预处理，提亲将所需要的文件并行加载好。

- AMD：采用异步的方式加载模块，模块不影响它后面语句的运行，通过define和require实现异步加载模。目前有两个 js 库实现了 AMD 规范，require.js,curl.js.

- ES6模块化
异步加载，能够实现页面的快速加载，使用 import 和 export 关键字进行模块导入和导出，支持静态分析，能够在编译时确定依赖关系，可以进行代码优化和减少网络请求，而 CommonJS 和 AMD 则需要在运行时动态加载模块，不能进行静态分析和优化
