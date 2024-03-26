[es6 文章](https://juejin.cn/post/6844903959283367950#heading-58)

## 主要内容

- **表达式**：声明、解构赋值
- **内置对象**：字符串扩展、数值扩展、对象扩展、数组扩展、函数扩展、正则扩展、Symbol、Set、Map、Proxy、Reflect
- **语句与运算**：Class、Module、Iterator
- **异步编程**：Promise、Generator、Async

## 表达式

### 声明

#### let、const、var 的区别

**（1）块级作用域：** var 声明的变量具有函数作用域或全局作用域，而 let 和 const 声明的变量具有块级作用域。块级作用域指的是由花括号 {} 包围的代码块（例如，if 语句、循环或函数），内部声明的变量只在该代码块内部可以访问。块级作用域解决了 ES5 中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** 使用 var 声明的变量会被提升到作用域顶部。这意味着可以在变量声明之前使用该变量。但是，使用 let 或 const 声明的变量不会被提升到作用域顶部，因此在声明之前使用该变量会导致错误。

**（3）重复声明：** var 声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const 和 let 不允许重复声明变量。

**（4）赋值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而 const 声明变量必须设置初始值。let 创建的变量是可以更改指针指向（可以重新赋值）。但 const 声明的变量是不允许改变指针的指向。

**（5）给全局添加属性：** 浏览器的全局对象是 window，Node 的全局对象是 global。var 声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是 let 和 const 不会。

### 解构赋值

是一种方便的语法，可以从`数组`、`对象`、`字符串`、`函数参数`中取值并赋值给变量

**应用场景**

- 函数参数的解构`Func({x, y})`
- 提取后台返回 JSON 数据`const { name, version } = packageJson`
- 返回函数多个值：`const [x, y, z] = Func()`
- 定义函数参数默认值：`function Func({ x = 1, y = 2 } = {}) {}`
- 遍历 Map 结构：`for (let [k, v] of Map) {}`
- 输入模块指定属性和方法：`const { readFile, writeFile } = require("fs")`
- 交换变量值：`[x, y] = [y, x]`

## 内置对象

### 字符串扩展

- **字符串遍历**：可通过`for-of`遍历字符串
- **字符串模板**：可单行可多行可插入变量的增强版字符串
- **includes()** ：是否存在指定字符串
- **startsWith()** ：是否存在字符串头部指定字符串
- **endsWith()** ：是否存在字符串尾部指定字符串

### 数值扩展

- **Number.parseInt()** ：返回转换值的整数部分
- **Number.parseFloat()** ：返回转换值的浮点数部分
- **Number.isNaN()** ：是否为 NaN
- **Number.isInteger()** ：是否为整数
- **BigInt**：任何位数的整数(新增的数据类型，使用`n`结尾)

### 对象扩展

- **简洁表示法**：直接写入变量和函数作为对象的属性和方法(`{ prop, method() {} }`)
- **属性名表达式**：字面量定义对象时使用`[]`定义键(`[prop]`，不能与上同时使用)
- **Object.is()** ：对比两值是否相等
- **Object.assign()** ：合并对象(浅拷贝)，返回原对象
- **Object.getPrototypeOf()** ：返回对象的原型对象
- **Object.setPrototypeOf()** ：设置对象的原型对象
- **Object.getOwnPropertyDescriptors()** ：返回对象所有自身属性(非继承属性)的描述对象
- **Object.keys()** ：返回以键组成的数组
- **Object.values()** ：返回以值组成的数组
- **Object.entries()** ：返回以键和值组成的数组
- **扩展运算符(...)** ：转换对象为用逗号分隔的参数序列(`{ ...obj }`，相当于`rest/spread参数`的逆运算)
- **链判断操作符(?.)** ：是否存在对象属性(不存在返回`undefined`且不再往下执行)
  - 对象属性：`obj?.prop`、`obj?.[expr]`
  - 函数调用：`func?.(...args)`
- **空判断操作符(??)** ：是否值为`undefined`或`null`，是则使用默认值
  - `const headerText = response.settings ?? 'Hello, world!'`

> 属性遍历

  - `for-in`：遍历对象`自身可继承可枚举`属性
  - `Object.keys()`：返回对象`自身可枚举`属性键组成的数组
  - `Object.getOwnPropertyNames()`：返回对象`自身非Symbol`属性键组成的数组
  - `Object.getOwnPropertySymbols()`：返回对象`自身Symbol`属性键组成的数组
  - `Reflect.ownKeys()`：返回对象`自身全部`属性键组成的数组

### 数组扩展

- **扩展运算符(...)** ：转换数组为用逗号分隔的参数序列(`[...arr]`，相当于`rest/spread参数`的逆运算)
- **Array.from()** ：用于从类数组对象或可迭代对象创建数组，返回新数组
  - 类数组对象：`包含length的对象`、`Arguments对象`、`NodeList对象`
  - 可遍历对象：`String`、`Set结构`、`Map结构`、`Generator函数`
- **Array.of()** ：转换一组值为真正数组，返回新数组
- **find()** ：返回第一个符合条件的成员
- **findIndex()** ：返回第一个符合条件的成员索引值
- **keys()** ：返回以索引值为遍历器的对象
- **values()** ：返回以属性值为遍历器的对象
- **entries()** ：返回以索引值和属性值为遍历器的对象
- **includes()** ：是否存在指定成员
- **flat()** ：扁平化数组，返回新数组
- **flatMap()** ：映射且扁平化数组，返回新数组(只能展开一层数组)

### 函数扩展

- **参数默认值**：为函数参数指定默认值
  - `function Func(x = 1, y = 2) {}`
  - 与解构赋值默认值结合：`function Func({ x = 1, y = 2 } = {}) {}`
- **箭头函数(=>)** ：函数简写
- **rest/spread参数(...)**：返回函数多余参数
- **管道操作符( |> )** ：把左边表达式的值传入右边的函数进行求值(`f(x)` => `x |> f`)
- **绑定运算符( :: )** ：函数绑定(左边是对象右边是函数，取代`bind`、`apply`、`call`调用)
  - bind：`bar.bind(foo)` => `foo::bar`
  - apply：`bar.apply(foo, arguments)` => `foo::bar(...arguments)`

> 箭头函数误区

- 函数体内的`this`是`定义时所在的对象`而不是`使用时所在的对象`
- 可让`this`指向固定化，这种特性很有利于封装回调函数
- 不可当作`构造函数`，因此箭头函数不可使用`new命令`
- 不可使用`yield命令`，因此箭头函数不能用作`Generator函数`
- 不可使用`Arguments对象`，此对象在函数体内不存在(可用`rest/spread参数`代替)
- 返回对象时必须在对象外面加上括号

### Set

`Set`

- 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
- 声明：`const set = new Set(arr)`
- 入参：具有`Iterator接口`的数据结构
- 属性
  - **constructor**：构造函数，返回 Set
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

### Set和weakSet的区别

- 可存储值的类型：Set 可以存储任意类型的值，包括基本类型和对象引用，而 WeakSet 只能存储对象引用。
- 对值的引用方式：Set 存储的值是强引用，即使没有其他变量引用这些值，它们仍然会存在于 Set 中。而 WeakSet 存储的值是弱引用，如果没有其他变量引用这些值，它们可能会被垃圾回收机制回收并从 WeakSet 中移除。这在某些情况下可以避免内存泄漏。
- 对象的可枚举性：Set 中的对象是可枚举的，可以通过迭代器或 forEach 方法访问。而 WeakSet 中的对象是不可枚举的，无法通过迭代器或 forEach 方法访问。
- 集合的大小计数：Set 具有 size 属性，可以获取集合的大小（元素的个数）。而 WeakSet 没有提供类似的属性或方法来获取集合的大小。

总的来说，Set 适用于存储任意类型的值，并且对值的引用是强引用，可以进行迭代和计数。而 WeakSet 适用于存储对象引用，并且对值的引用是弱引用，不能进行迭代和计数，通常用于需要临时存储对象引用的场景。

### Map

`Map`

- 定义：类似于对象的数据结构，成员键可以是任何类型的值，建立的是强引用关系，函数执行完毕后，被引用的对象内存不会被释放
- 声明：`const set = new Map(arr)`
- 入参：具有`Iterator接口`且每个成员都是一个双元素数组的数据结构
- 属性
  - **constructor**：构造函数，返回 Map
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

### Object 和 Map 和 WeakMap的区别

**Object和Map**

- Map是有序的键值对集合，Object 中的属性是无序的
- Map 的键可以是任意类型，包括函数、对象，Object 的键必须是 String 或是 Symbol
- Map 部署了迭代器接口的，可以使用for...of迭代，Object不能使用for...of
- Map 的性能更好，Map 不会像 Object 一样有原型链的存在，因此在存储大量数据时，Map 可能占用的内存更少

根据具体的使用场景和需求，你可以选择使用 Object 或 Map 来存储和操作数据。如果需要有序的键值对、键的类型灵活性以及更好的性能，可以考虑使用 Map。如果只需要简单的键值对存储，并且不需要关注顺序和键的类型，可以使用 Object。

```js
const map = new Map(); // 创建一个空的 Map 对象

const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3']
]); // 使用数组初始化 Map
```

**WeakMap**

WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

- 和 Map 结构类似，WeakMap 只接受对象作为键名（null除外）
- 内存管理： WeakMap 是弱引用的，它不会阻止键对象被垃圾回收。当键对象没有被其他引用持有时，它会被自动从 WeakMap 中移除，释放对应的内存。这使得 WeakMap 适合用于在对象上存储额外的数据，而不会导致对象本身无法被垃圾回收。
- WeakMap不能迭代，也没有Map的size属性和clear方法，原型上只有`get`、`Set`、`delete`、`has`方法

总结来说，Map 是通用的键值对集合，适用于需要存储和操作任意类型的键和值的场景。而 WeakMap 是一种特殊的 Map，适用于需要与对象关联的附加数据，且不干扰对象的垃圾回收的场景。

### Proxy

- 定义：使用proxy创建一个代理对象，内部有多种拦截方法，只要对代理对象进行操作，就能实现拦截并对源对象做出相应的操作
- 声明：`const proxy = new Proxy(target, handler)`
- 入参
  - **target**：拦截的目标对象
  - **handler**：定制拦截行为
- 13 种拦截方式
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
  - **apply()** ：拦截 Proxy 实例作为函数调用`proxy()`、`proxy.apply()`、`proxy.call()`
  - **construct()** ：拦截 Proxy 实例作为构造函数调用`new proxy()`

> 应用场景

- `Proxy.revocable()`：不允许直接访问对象，必须通过代理访问，一旦访问结束就收回代理权不允许再次访问
- `get()`：读取未知属性报错、读取数组负数索引的值、封装链式操作、生成 DOM 嵌套节点
- `set()`：数据绑定(Vue 数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
- `has()`：隐藏内部属性不被发现、排除不符合属性条件的对象
- `deleteProperty()`：保护内部属性不被删除
- `defineProperty()`：阻止属性被外部定义
- `ownKeys()`：保护内部属性不被遍历

### Reflect内置对象

`Reflect` 是javaScript的内置对象，它不是一个构造函数，将 `Object` 内部的静态方法放到 `Reflect` 上，而且提供了proxy13种内置的方法

**既然有了 Object 提供了这些方法，为什么还需要 Reflect 的呢？**

- 早期的ECMA规范中没有考虑到这么多，不知道如何设计对对象的操作更加的规范，所以将操作对象的API(静态方法（构造函数方法）和原型方法)放在了Object上。
- Object是一个构造函数，将这些API放到函数本身就不是很合理（虽然函数也是对象）。
- 还包含了一些 in ，delete操作符，使JavaScript看起来有点的奇怪。
- Object对象的方法中，大多返回目标对象，我们很难确认这种结果的返回是否说明方法的成功或者失败，而在Reflect对象中，返回布尔值，明确告诉我们结果的成功或失败。
- 基于上面的问题，Reflect 就是为了解决上面的一些列问题，是API设计看起来更加的规范
- 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上，让 `Object`操作都变成函数行为

**Proxy与Reflect相辅相成**

- `Proxy13种方法`和`Reflect13种方法`一一对应
- `Proxy`和`Reflect`联合使用，前者负责`拦截赋值操作`，后者负责`完成赋值操作`

### 为什么vue3中的Proxy一定要用Reflect

- `Reflect.set()` 方法中，它会有一个返回值，成功或者失败，而使用 Proxy 则并没有，这也就导致了我们无法得知是否修改成功了
- Reflect 可以指定访问对象属性时，属性访问器中的 this。如 Reflect.get(target, key, receiver)，在访问 target 的 key 属性时，若 key 是一个属性访问器，则该访问器中的 this 指向 receiver。就是去改变 this 的指向的，指向代理对象

## 语句和运算

### Class

使用 class 关键字定义一个类，通过类创建对象，这使得 JavaScript 更加面向对象(构造函数语法糖)

- 方法和关键字

  - **constructor()** ：类的构造函数，创建类的实例时自动调用。它用于初始化类的实例，并接受传递给类的参数。
  - **extends**：子类可以通过 extends 继承父类的属性和方法，并且还可以添加自己的属性和方法
  - **super**：在子类的构造函数中使用 `super()` 可以调用父类的构造函数，用于初始化子类的实例。这个调用必须放在子类构造函数的第一行
  - **static**：定义静态属性方法，静态方法是指定义在类上而不是实例上的方法。静态方法通过类名调用，而不是通过实例调用。静态方法常常用于实现与类本身相关的功能或工具函数。如`Array.isArray()`
  - **get**：取值函数，拦截属性的取值行为
  - **set**：存值函数，拦截属性的存值行为

```js
class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static getType() {
    return 'Animal'
  }

  get info() {
    return `${this.name} is ${this.age} years old.`
  }

  set age(age) {
    if (age < 0) {
      throw new Error('Age cannot be negative.')
    }
    this._age = age
  }

  get age() {
    return this._age
  }

  speak() {
    console.log(`${this.name} makes a noise.`)
  }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age)
    this.breed = breed
  }

  speak() {
    console.log(`${this.name} barks.`)
  }
}

const myDog = new Dog('Fido', 3, 'Golden Retriever')
console.log(myDog.info)
myDog.speak()
console.log(Dog.getType())
```

在这个例子中，Animal 是一个基类，它有构造函数、静态方法 getType、实例方法 speak、以及 getter 和 setter 方法。Dog 是 Animal 的子类，它继承了 Animal 的所有方法和属性，并且重写了 speak 方法。在创建 Dog 实例时，我们使用了 super 关键字来调用父类的构造函数，这样就可以在 Dog 中初始化基类的属性。

### 对模块化的理解

模块化是一种组织代码的方法，通过将代码分为可重用、可组合的模块，可以更好地管理代码的复杂性，并提高代码的可维护性和可扩展性。前端模块化的发展经历了以下几个阶段：

**模块化过程方案**

服务端一般采用同步加载文件，也就是说需要某个模块，服务端便停下来，等待它加载再执行。
而浏览器端需要保证效率，需要采用异步加载，这就需要一个预处理，提亲将所需要的文件并行加载好。

- **命名空间模式**：早期的前端开发中，由于缺乏模块化的机制，代码往往以全局变量和函数的形式存在，容易产生命名冲突和代码耦合。为了避免命名冲突，开发者使用命名空间来将相关的变量和函数封装在一个对象中，以减少全局污染。
- **文件模块模式**：随着前端项目规模的增大，开发者开始将代码分散到不同的文件中，每个文件对应一个模块，通过 `<script>` 标签按照一定的顺序引入文件，实现代码的模块化。这种方式需要手动管理文件的加载顺序和依赖关系，不够灵活和高效。

AMD 和 CommonJS：为了解决文件模块模式中的依赖管理问题，出现了两种主流的模块化规范：AMD 和 CommonJS

- **AMD**：主要用于浏览器端，采用异步的方式加载模块，通过 define 和 require 实现异步加载模。目前有两个 js 库实现了 AMD 规范，require.js、curl.js.
- **CommonJS**：用于服务器端，它主要用于 Node.js 应用程序的模块化，其特点是同步加载，模块加载时会阻塞后面的代码执行，不能用于浏览器端的 JavaScript，通过 require 和 module.exports 实现同步加载模块
- **CMD**：用于浏览器(动态化依赖)，是由国内的前端社区发起和推广的一种模块化规范，最常见的实现是 SeaJS。CMD 规范强调模块的就近依赖，模块的加载和执行是异步的，可以按需加载和执行模块。
- **UMD**：用于浏览器和服务器(动态化依赖)，是一种通用的模块化方案，兼容了 AMD 和 CommonJS 的写法。它能够在浏览器环境和 Node.js 环境中同时使用。UMD 的主要实现是 webpack。
- **ESM**：随着 ES6 的发布，官方引入了原生的模块化支持。用于浏览器和服务器(静态化依赖)，异步加载。使用 import 和 export 关键字进行模块导入和导出，支持静态分析，能够在编译时确定依赖关系，可以进行代码优化和减少网络请求，而 CommonJS 和 AMD 则需要在运行时动态加载模块，不能进行静态分析和优化。ES6 模块化在现代前端开发中逐渐取代了 AMD 和 CommonJS 成为主流的模块化方案。
- **打包工具的兴起**：为了解决模块化开发中的依赖管理、代码合并和压缩等问题，出现了许多前端打包工具，如 webpack、Rollup、Parcel 等。这些打包工具可以将模块化的代码进行静态分析和优化，将多个模块打包成一个或多个文件，提供了更高效和灵活的构建流程。

总的来说，前端模块化的发展经历了从命名空间模式到文件模块模式，再到 AMD、CommonJS 和 ES6 模块化的过程。ES6 模块化

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

      - 背景：`import命令`被 JS 引擎静态分析，先于模块内的其他语句执行，无法取代`require()`的动态加载功能，提案建议引入`import()`来代替`require()`
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

### 迭代器 Iterator

是一种用于遍历数据结构的通用接口，让开发者能够以相同的方式来遍历这些不同类型的数据集合。默认部署在`Symbol.iterator`(数据结构具备此属性就可以遍历)。ES6 中也提供了 for...of 语法糖，它可以直接遍历实现了 Iterator 接口的数据结构

**for-of遍历原理**

- for-of 会调用数据结构的 Symbol.iterator 方法返回一个迭代器对象
- Iterator 接口包含了一个 next()方法，每次调用 next()方法都会返回一个包含两个属性的对象，分别是 value 和 done，其中 value 属性表示当前遍历的元素的值，done 属性表示遍历是否结束
- 通过不断调用 next()方法，直到 done 属性为 true，就可以遍历整个数据集合。

**Iterator 提供了3个方法**

- next 方法用于返回迭代器对象的下一个值
- return 方法用于在迭代过程中提前退出迭代，并返回一个指定的值
- throw 方法用于在迭代过程中抛出一个异常

大多数数据结构默认都实现了 Iterator 接口，如：`String`、`Array`、`Set`、`Map`、`TypedArray`、`Arguments`、`NodeList`

```js
const arr = [1, 2, 3]
const iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // {value: 1, done: false}
console.log(iterator.next()) // {value: 2, done: false}
console.log(iterator.next()) // {value: 3, done: false}
console.log(iterator.next()) // {value: undefined, done: true}
```

## 异步编程

### 异步编程的实现方式

- **回调函数**: 使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- **Promise** : 使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
- **generator** : 它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
- **async 函数** : async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

### 对 Promise 的理解

`Promise` 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的数据，他的解决了回调函数编程存在的回调地狱的问题。promise 内部一般会封装一个异步操作，比如 ajax 文件读写等。

**三个状态**: `Pending`（进行中）、`fulfilled`（已完成）、`Rejected`（已拒绝）

创建 promise 时，状态就是 Pending，任务完成了状态就变成了 fulfilled、失败了就变成了 Rejected

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

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。可以在异步操作结束后调用这两个函数改变 Promise 实例的状态。

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

一般情况下都会使用`new Promise()` 来创建 promise 对象，但是也可以使用`Promise.resolve`和`Promise.reject`这两个方法：

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

**Promise 方法**

Promise 有五个常用的方法：then()、catch()、all()、race()、finally。下面就来看一下这些方法。

- `then()`

`then`方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为`resolved`时调用，第二个回调函数是 Promise 对象的状态变为`rejected`时调用。其中第二个参数可以省略。这个回调函数属于微任务，会在本轮事件循环的末尾执行

`then`方法返回的是一个新的 Promise 实例（不是原来那个 Promise 实例）。所以可以继续通过.then进行链式变成

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

`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。使用场景：并行执行多个异步任务：当需要同时执行多个异步任务，且在所有任务都完成后进行下一步操作时，可以使用 Promise.all 来等待所有异步任务完成。

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

`race`方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`

**场景**

并发控制

竞态条件（Race condition）处理：当需要多个异步操作中的任何一个完成后立即采取行动时，可以使用 Promise.race 来等待最快完成的异步操作。例如，如果你有多个数据源提供相同的数据，你可以同时从它们获取数据，然后使用 Promise.race 来等待最快返回的数据，并进行相应的处理。

超时处理：当需要在一定时间内获取异步操作的结果，如果超过了指定的时间仍未返回结果，可以使用 Promise.race 来等待先返回的结果或超时的结果。这样可以控制异步操作的执行时间，并做出相应的处理。

```js
Promise.race([promise1, timeOutPromise(5000)]).then((res) => {})
```

优先级控制：当有多个异步操作需要执行，但其中某些操作具有更高的优先级时，可以使用 Promise.race 来等待优先级较高的操作的结果，并忽略优先级较低的操作。

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

- `Promise.try()` ：不想区分是否同步异步函数，包装函数为实例，使用 then()指定下一步流程，使用 catch()捕获错误
- `Promise.allSettled()` ：将多个实例包装成一个新实例，返回全部实例状态变更后的状态数组(齐变更再返回)
- `Promise.any()` ：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(齐变更再返回)

### 生成器 Generator

**定义**：是一种特殊类型的函数，使用 function* 关键字进行定义。它可以通过 yield 关键字暂停函数的执行，通过next()方法继续函数的执行，然后生成一个可迭代的对象（Iterator）。Generator 可以用于实现异步编程、迭代器和状态机等多种应用场景。

```js
function* myGenerator() {
  yield 'Hello';
  yield 'Generator';
  return 'Done';
}
const gen = myGenerator();
console.log(gen.next()); // { value: 'Hello', done: false }
console.log(gen.next()); // { value: 'Generator', done: false }
console.log(gen.next()); // { value: 'Done', done: true }
```

myGenerator 函数是一个 Generator 函数，它使用 yield 关键字返回了三个值。通过调用 next 方法来遍历迭代器对象，可以依次访问每个值，最后一个 return 语句返回的值会作为最终的迭代器对象的 value 属性返回。

```js
function* fetchData(url) {
  try {
    const response = yield axios.get(url); // 发起异步请求
    console.log(response.data); // 处理请求成功的结果
  } catch (error) {
    console.error(error); // 处理请求失败的错误
  }
}

// 使用 Generator 函数
const dataFetcher = fetchData('https://api.example.com/data');
const iterator = dataFetcher.next();

// 执行迭代器
iterator.value.then(() => {
  dataFetcher.next();
});

```

> 应用场景

- 异步操作同步化表达
- 控制流管理
- 为对象部署 Iterator 接口：把`Generator函数`赋值给对象的`Symbol.iterator`，从而使该对象具有`Iterator接口`
- 作为具有 Iterator 接口的数据结构

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

### async/await 的理解

使用同步方式执行异步的操作，主要是为了解决promise.then链式调用不易阅读的问题。它是 `generator+promise` 
的语法糖，async 用于申明一个 function 是异步的，返回值是一个Promise对象，而 await(会阻塞代码运行) 用于等待一个异步方法执行完成。语法上强制规定 await 只能出现在 asnyc 函数中，先来看看 async 函数返回了什么：

```js
async function testAsy() {
  return 'hello world'
}
let result = testAsy()
console.log(result)
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1526a88417f140f7abb98959ec25d82b~tplv-k3u1fbpfcp-zoom-1.image)

所以，async 函数返回的是一个 Promise 对象。async 函数会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。

```js
async function fn() {
  const res1 = await request(5)
  const res2 = await request(res1)
  console.log(res2) // 2秒后输出 20
}
fn()
```

错误捕获：将`await命令Promise对象`放到`try-catch`中(可放多个)

异步迭代器(for-await-of) ：和for...of的区别，用于遍历`异步可迭代对象`，当然也可以遍历同步可迭代对象，但这样就失去了使用意义。循环等待每个`Promise对象`变为`resolved状态`才进入下一步

```js
function createAsyncIterable(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// 数组就是一个可迭代对象
const asyncIterable = [createAsyncIterable(2000), createAsyncIterable(1000), createAsyncIterable(3000)];

async function main() {
  for await (const item of asyncIterable) {
    console.log(item);
  }
}
main();
```

**重点难点**

- `await`只能在`async`函数中使用，不然会报错
- 在`Async`函数中，`await`规定了异步操作只能一个一个排队执行，从而达到`用同步方式，执行异步操作`的效果
- `await`后面最好是接`Promise`，虽然接其他值也能达到`排队`效果
- `Async`函数返回的是一个`Promise`对象，有无值看有无 return 值,可使用`.then()`添加回调函数,内部`return返回值`会成为后续`then()`的出参
- 内部抛出错误会导致返回的 Promise 对象变为`rejected状态`，被`catch()`接收到
- 返回的 Promise 对象必须等到内部所有`await命令Promise对象`执行完才会发生状态改变，除非遇到`return语句`或`抛出错误`
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
- `Promise`一旦新建就会立即执行，不会阻塞后面的代码，而`async`函数中 await 后面是 Promise 对象会阻塞后面的代码
