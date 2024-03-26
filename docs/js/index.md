![JavaScript面试题.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59e524c3ccfd4f20ba96266f70829d10~tplv-k3u1fbpfcp-zoom-1.image)

## 一、数据类型

### JavaScript 有哪些数据类型，区别

JavaScript 中有 8 种数据类型，按照存储位置的不同分为两类：基本数据类型和引用数据类型。

- 基本数据类型：包括`String`、`Number`、`Boolean`、`Null`、`Undefined`和 `Symbol`（ES6 新增)、`BigInt`（ES6 新增)

  - 字符串：表示文本数据，使用单引号（'）或双引号（"）表示。
  - 数字：表示数值数据，包括整数和浮点数。
  - 布尔值：表示逻辑上的真或假，只有两个取值：true 和 false。
  - 空（Null）：表示一个空对象指针，意味着该变量不指向任何有效的对象。
  - 未定义（Undefined）：表示未初始化的变量或不存在的属性。
  - Symbol：表示唯一的标识符，是 ES6 新增的数据类型，主要用于对象属性名的定义。
  - BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

- 引用类型：包括`Object`、`Array`、`Function`

  - 对象：表示一组相关的数据和功能，可以包含多个属性和方法。
  - 数组：表示一组有序的数据，可以包含任意类型的数据，使用方括号（[ ]）表示。
  - 函数：表示一段可重复调用的代码块，使用 function 关键字定义，可以包含多个参数和代码块。

两种类型的区别在于**存储位置的不同：**

- 基本数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中的内存地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发者分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

### 数据类型检测的方式有哪些

**（1）typeof**

```javascript
console.log(typeof 2) // number
console.log(typeof true) // boolean
console.log(typeof 'str') // string
console.log(typeof []) // object
console.log(typeof function () {}) // function
console.log(typeof {}) // object
console.log(typeof undefined) // undefined
console.log(typeof null) // object
```

其中数组、对象、null 都会被判断为 `object`，其他判断都正确。可以用于判断`基本数据类型`和`function`

**（2）instanceof**

```javascript
console.log(2 instanceof Number) // false
console.log(true instanceof Boolean) // false
console.log('str' instanceof String) // false
// 不能判断undefind和null 会报错

console.log([] instanceof Array) // true
console.log(function () {} instanceof Function) // true
console.log({} instanceof Object) // true
```

可以看到，`instanceof`**只能正确判断引用数据类型**，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

**（3） constructor**

```javascript
console.log((2).constructor === Number) // true
console.log(true.constructor === Boolean) // true
console.log('str'.constructor === String) // true
console.log([].constructor === Array) // true
console.log(function () {}.constructor === Function) // true
console.log({}.constructor === Object) // true
// 判断 `null` 和 `undefined` 会直接报错。
```

`constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constructor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：

```javascript
function Fn() {}
Fn.prototype = new Array() // 改变原型
var f = new Fn()

console.log(f.constructor === Fn) // false
console.log(f.constructor === Array) // true
```

**（4）Object.prototype.toString.call()**

`Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型：

```js
function getType(target) {
  return Object.prototype.toString.call(target)
}
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6816dda154e54369aa98aeef1cebf220~tplv-k3u1fbpfcp-zoom-1.image)

稳健地判断 JavaScript 数据类型方式，可以符合预期的判断基本数据类型 String、Undefined 等，也可以判断 Array、Object 这些引用数据类型

`思考`

同样是检测对象 obj 调用 toString 方法，obj.toString()的结果和 Object.prototype.toString.call(obj)的结果不一样，这是为什么？

这是因为 toString 是 Object 的原型方法，而 Array、function 等**类型作为 Object 的实例，都重写了 toString 方法**。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串…），而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。

### 判断数组数据类型的方法

`根据构造函数判断（妈妈）`

- **instanceof**

判断一个实例是否属于某构造函数

```js
let arr = []
console.log(arr instanceof Array) // true
```

**缺点：** instanceof 底层原理是检测构造函数的 prototype 属性是否出现在某个实例的原型链上，如果实例的原型链发生变化，则无法做出正确判断。

```js
let arr = []
arr.__proto__ = function () {} // 改变原型
console.log(arr instanceof Array) // false
```

- **constructor**

实例的构造函数属性 constructor 指向构造函数本身。

```js
let arr = []
console.log(arr.constructor === Array) // true
```

**缺点：** 如果 arr 的 constructor 被修改，则无法做出正确判断。

```js
let arr = []
arr.constructor = function () {}
console.log(arr.constructor === Array) // false
```

`根据原型对象判断（爸爸）`

- **proto**

实例的 `__proto__` 指向构造函数的原型对象

```js
let arr = []
console.log(arr.__proto__ === Array.prototype) // true
```

**缺点：**   如果实例的原型链的被修改，则无法做出正确判断。

```js
let arr = []
arr.__proto__ = function () {}
console.log(arr.__proto__ === Array.prototype) // false
```

- **Object.getPrototypeOf()**

Object 自带的方法，获取某个对象所属的原型对象

```js
let arr = []
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true
```

**缺点：**   同上

- **Array.prototype.isPrototypeOf()**

Array 原型对象的方法，方法用于检查一个对象是否存在于另一个对象的原型链中

```js
let arr = []
console.log(Array.prototype.isPrototypeOf(arr)) // true
```

**缺点：**   同上

`根据 Object 的原型对象判断（祖先）`

- **Object.prototype.toString.call()**

Object 的原型对象上有一个 toString 方法，toString 方法默认被所有对象继承，返回 "`[object type]`" 字符串。但此方法经常被原型链上的同名方法覆盖，需要通过 Object.prototype.toString.call() 强行调用。

```js
let arr = []
console.log(Object.prototype.toString.call(arr) === '[object Array]') // true
```

这个类型就像胎记，一出生就刻在了身上，因此修改原型链不会对它造成任何影响。

```js
let arr = []
arr.__proto__ = function () {}
console.log(Object.prototype.toString.call(arr) === '[object Array]') // true
```

- **Array.isArray()**

ES6 新增的方法，专门用于数组类型判断，原理同上。

```js
let arr = []
console.log(Array.isArray(arr)) // true
```

修改原型链不会对它造成任何影响。

```js
let arr = []
arr.__proto__ = function () {}
console.log(Array.isArray(arr)) // true
```

**总结**

以上就是判断是否为数组的常用方法，相信不用说大家也看出来 **Array.isArray** 最好用、最靠谱了吧，还是 ES6 香！
  
### null 和 undefined 区别

- 都是基本数据类型，分别都只有一个值，`undefined` 和 `null`
- 变量被声明了，但没有赋值时，就等于`undefined`
- `null` : 一个空对象, 没有任何属性和方法，主要用于赋值给一些可能会返回对象的变量，作为初始化
- 使用 typeof 进行判断时，null 会返回 `'Object'`，这是一个历史遗留的问题。
- 在验证`null`时，一定要使用　`===` ，因为 `null == undefined`会判断成`true`
- `null`转换数值为 0，`undefinded`转换数值为 NAN

其实 null 不是对象，虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来

### typeof null 为什么是Object

这是由于历史遗留原因造成的。在 JavaScript 的早期版本中，为了表示空对象引用，使用了一个特殊的值 null。null 被认为是一个空对象指针，用于表示变量没有引用任何对象。这个结果的产生是因为在 JavaScript 的底层实现中，变量的类型信息存储在一个称为标记（tag）的位上。对于对象，标记位的值是 000，而对于 null 值，标记位的值也是 000，与对象相同。因此，当 typeof 运算符检测到标记位为 000 时，会返回 "object"。

所有值都存储在 32 位的单元中，js 在底层存储变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息。共有五种数据类型：

```javascript
000: object   - 当前存储的数据指向一个对象。
  1: 整数      - 当前存储的数据是一个 31 位的有符号整数。
010: 浮点数   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
```

### intanceof 操作符的实现原理

instanceof 运算符用于判断构造函数的 prototype属性是否出现在实例的原型链中

- 首先获取被判断的实例的原型
- 然后获得构造函数的原型
- 通过循环判断实例的原型是否等于构造函数的原型，直到原型的原型为 null，因为原型链最终为 null

```javascript
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto)
  }
}
```

### string 有哪些原生方法？

- trim（),toUppercase(), tolowercase() split（）
- slice(start,end) end 不包括
- substring（start，end）end 不包括
- substr（start，length）
- replce（old，new）

### 数组有哪些原生方法？

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf()
- 迭代方法 every()、some()、filter()、map() 和 forEach() 方法
- 数组归并方法 reduce() 和 reduceRight() 方法

```text
- slice（）全部截取出来返回一个新数组
- slice（start）截取从start开始到最后
- slice（start，end）从start开始到end（不包括end）
- splice（start，deletecount删除个数）
- splice（start，delecount，items添加的元素）
```

### 为什么 0.1+0.2 !== 0.3，如何让其相等

在开发过程中遇到类似这样的问题：

```javascript
let n1 = 0.1,
  n2 = 0.2
console.log(n1 + n2) // 0.30000000000000004
```

这里得到的不是想要的结果，要想等于 0.3，就要把它进行转化：

```javascript
(n1 + n2).toFixed(1) // 注意，toFixed为四舍五入
```

**原因**

计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。0.1 的二进制是`0.0001100110011001100...`（1100 循环），0.2 的二进制是：`0.00110011001100...`（1100 循环），这两个数的二进制都是无限循环的数。那 JavaScript 是如何处理无限循环的二进制小数呢？

一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留 52 位，再加上前面的 1，其实就是保留 53 位有效数字，剩余的需要舍去，遵从“0 舍 1 入”的原则。

根据这个原则，0.1 和 0.2 的二进制数相加，再转化为十进制数就是：`0.30000000000000004`。

**如何实现 0.1+0.2=0.3 呢**

- 可以将浮点数转换为整数，进行精确计算，然后再将结果转回浮点数。
- 另外，也可以使用一些 JavaScript 库，如 decimal.js 和 big.js 来进行高精度计算。
- 对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了`Number.EPSILON`属性，而它的值就是 2-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为 0.1+0.2 ===0.3

```javascript
function numberepsilon(arg1, arg2) {
  return Math.abs(arg1 - arg2) < Number.EPSILON
}

console.log(numberepsilon(0.1 + 0.2, 0.3)) // true
```

### typeof NaN 的结果是什么？

NaN 指`不是一个数字`（not a number），NaN 是一个`警戒值`，用于指出数字类型中的错误情况，即执行数学运算没有成功，这是失败后返回的结果。

```javascript
typeof NaN // "number"
```

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，即 `x === x` 不成立）的值。而 `NaN !== NaN` 为 true。

### isNaN 和 Number.isNaN 函数的区别

都是 JavaScript 中用于检查一个值是否为 NaN 的函数

- `isNaN` 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。

```js
isNaN(value)
console.log(isNaN('hello')); // Output: true
```

- `Number.isNaN()`函数是在 ES6 中引入的，首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

```js
Number.isNaN(value)
console.log(Number.isNaN('hello')); // Output: false
console.log(Number.isNaN(NaN)); // Output: tru
```

### js 的数据类型的转换

在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值（调用 `Boolean()方法`）
- 转换为数字（调用 `Number()`、`parseInt()`和 `parseFloat()`方法和`正则+,-`）
- 转换为字符串（调用`toString()`或者 `String()`方法或者`拼接`）

### Object.is() 与 `===`与`==` 的区别

- 使用`==`进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用`===`进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 `Object.is(value1, value2)`来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的

### ==比较运算符的会隐式转换

当使用双等号（==）比较两个值时，如果这两个值的类型不同，JavaScript会尝试将它们转换成同一类型后再进行比较。这种转换被称为隐式类型转换

**转换规则：**

- 如果其中一个值是`Boolean`类型，另一个是非布尔值，那么它会被转换成`Number`类型。`false`会被转换成0，true会被转换成1。
- 如果其中一个值是`String`类型，另一个是`Number`类型，那么它会被转换成`Number`类型。如果字符串能够被解析成数值，则会被转换成相应的数值；否则会被转换成NaN
- 如果其中一个为`object`且另一个为 `string`或者`number`，则将对象通过 valueOf() 或 toString() 方法转换为相应的原始值
- 如果一个值是 `null` 或 `undefined`，它们可以互相等同
- 如果 == 两边都是对象比引用地址
- NAN 不等于任何，包括自己

### 其他值到字符串的转换规则？

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

### 其他值到数字值的转换规则？

- `Undefined` 类型的值转换为 `NaN`
- `Null` 类型的值转换为 `0`
- `Boolean` 类型的值，`true 转换为 1`，`false 转换为 0`
- `String` 类型的值转换如同使用 `Number()` 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- `Symbol` 类型的值不能转换为数字，会报错。
- `对象（包括数组`）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字

### 其他值到布尔类型的值的转换规则？

以下这些是假值：

- `undefined`
- `null`
- `false`
- `+0、-0 和 NaN`
- `空字符串""`

假值的布尔强制类型转换结果为 false，从逻辑上说，假值列表以外的都应该是真值。

### && 和 || 和 ! 运算符分别能做什么

- `&&` 叫逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。它采用短路来防止不必要的工作。
- `||` 叫逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。在支持 ES6 默认函数参数之前，它用于初始化函数中的默认参数值。
- `!` 运算符可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法。

### 什么是 JavaScript 中的包装类型？

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：

```javascript
const a = 'abc'
a.length // 3
a.toUpperCase() // "ABC"
```

在访问`'abc'.length`时，JavaScript 将`'abc'`在后台转换成`String('abc')`，然后再访问其`length`属性。

JavaScript 也可以使用`Object`函数显式地将基本类型转换为包装类型：

```javascript
var a = 'abc'
Object(a) // String {"abc"}
```

也可以使用`valueOf`方法将包装类型倒转成基本类型：

```javascript
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```

看看如下代码会打印出什么：

```javascript
var a = new Boolean(false)
if (!a) {
  console.log('Oops') // never runs
}
```

答案是什么都不会打印，因为虽然包裹的基本类型是`false`，但是`false`被包裹成包装类型后就成了对象，所以其非值为`false`，所以循环体中的内容不会运行。

### 为什么会有BigInt的提案？

JavaScript 中 Number.MAX_SAFE_INTEGER 表示最⼤安全数字，计算结果是 9007199254740991，即在这个数范围内不会出现精度丢失（⼩数除外）。但是⼀旦超过这个范围，js 就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅提出了 BigInt 来解决此问题。

```js
const a = BigInt(10); // 使用 BigInt 构造函数创建 BigInt
const b = 20n; // 使用后缀 n 创建 BigInt

const sum = a + b; // BigInt 之间的加法运算
console.log(sum); // 输出: 30n

const c = Number(a); // BigInt 转换为 Number
console.log(c); // 输出: 10

const d = String(b); // BigInt 转换为 String
console.log(d); // 输出: "20"
```

## 二、JavaScript 基础

### 常见的输出语句

- aleart
- confirm 确认弹框
- prompt 文本输入框
- document.write 在页面写一段内容 慎用
- console.log

### 声明变量的几种方式

- 声明变量同时赋值
- 先声明后赋值
- 同时声明多个变量
- 不声明直接赋值
- 不声明不赋值，直接使用（会报错）

### js 命名规则

- 使用数字、下划线、字母、$组成
- 不能使用数字开头
- 不能使用中横线
- 严格区分大小写
- 不能使用关键字和保留字

### 创建元素的方式

- `innerHtml()`

```js
const container = document.querySelector('.container')
container.innerHTML = '<div>22</div>'
```

- `document.createElement()`

```js
const div = document.createElement('div');
// 使用 appendChild() 方法、insertBefore() 方法或
// 其他操作 DOM 的方法将元素节点添加到文档中
```

- `document.write()`方法直接写入HTML标签和内容。这种方法简单，但是如果在页面加载完毕后使用，会覆盖原有的内容。

### 介绍 js 有哪些内置对象？

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般我们经常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() ,用来实例化对象的构造函数如 Date、Object、Number、date、String 等，还有提供数学计算的单体内置对象如 Math 对象。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 Object、Function、Boolean、Symbol、Error 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 Number、Math、Date

（5）字符串，用来表示和操作字符串的对象。

例如 String、RegExp

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 Map、Set、WeakMap、WeakSet

（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

（10）控制抽象对象

例如 Promise、Generator 等

（11）反射

例如 Reflect、Proxy

（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

（13）WebAssembly

（14）其他

例如 arguments

### JavaScript 变量提升

JavaScript 中的变量提升（Hoisting）是指在代码执行之前，JavaScript 引擎会先进行代码解析，将声明的变量和函数提升到作用域的顶部。也就是说，它们在代码执行之前都已经存在于作用域中，可以被访问，不会报错。

需要注意的是，变量提升只是将变量和函数声明提升到作用域顶部，而不是将它们的赋值也提升了。因此，在变量提升阶段，变量的值是 undefined，函数的函数体并没有被执行。

**提升原因**

- 有利于管理和组织代码：变量提升使得变量可以在声明之前使用，开发者可以在代码的任何位置使用变量，而不必担心变量是否已经声明。变量提升可以使代码更具可读性和可维护性，通过将相关的函数和变量放在一起，可以更清晰地表达代码的意图。

- 作用域的一致性：变量提升确保了在作用域内的所有代码都可以访问相同的变量和函数。这消除了在编写代码时由于变量位置的限制导致的一些不必要的问题。

尽管变量提升为开发者提供了灵活性和方便性，但也需要注意它可能导致的混淆和错误。因此，在编写代码时，建议始终在作用域的顶部明确声明变量和函数，以增加代码的可读性和可维护性。

**预解析变量提升的规则**

- 把 var 声明的变量提升到当前作用域的最前面，不会提升赋值
- 把函数声明提升到当前作用域最前面
- 如果函数同名，后者覆盖前者
- 函数和变量同名，函数优先

### 递归函数

自己直接或间接的调用自己（一定要留出口，不然就死循环了）

```js
function Sum(n) {
  if (n === 1) {
    return
  }
  return Sum(n - 1) + n
}
Sum(100)
```

### 浅拷贝和深拷贝

[读这一篇文章就行](https://juejin.cn/post/6844903929705136141)

**浅拷贝**：浅拷贝是指复制对象的属性值，如果属性值是基本数据类型，则复制其实际的值，如果属性值是引用数据类型，则复制其引用地址，更改源对象的引用数据类型的属性值，新对象引用类型的值也会发生变化

- `Object.assign()`: 将一个或多个源对象的所有可枚举属性复制到目标对象，并返回目标对象
- `展开运算符...`: 使用扩展运算符可以将一个数组或对象展开，然后复制到另一个对象中
- `手写浅拷贝`
- `函数库lodash的_.clone方法`
- `数组使用Array.prototype.concat()`: 将多个数组合并为一个数组
- `数组使用Array.prototype.slice()`

  `Object.assign()`和`展开运算符...`如果对象的属性值为基础类型，对于拷贝的那个属性值而言就是深拷贝。如果对象的属性值为引用类型，对于拷贝的那个值就是浅拷贝的 

  ```js
  function clone(target) {
    let cloneTarget = {}
    for (const key in target) {
      cloneTarget[key] = target[key]
    }
    return cloneTarget
  }
  ```

**深拷贝**：而深拷贝则会递归复制所有的子对象和子数组，修改新对象不会影响原对象

- `JSON.parse(JSON.stringify())`

  注意，该方法的局限性

  - 不能存放函数或者 Undefined，否则会丢失函数或者 Undefined
  - 不要存放时间对象，否则会变成字符串形式
  - 不能存放 RegExp、Error 对象，否则会变成空对象
  - 不能存放 NaN、Infinity、-Infinity，否则会变成 null
  - 使用这种方法时，需要注意原始对象中可能包含的不可序列化数据类型，如函数、正则表达式等。

- `函数库Loadsh.cloneDeep()方法`
- `手写递归`

  ```js
  function clone(target) {
    if (typeof target === 'object') {
      let cloneTarget = {} // 不考虑数组
      let cloneTarget = Array.isArray(target) ? [] : {} // 考虑数组
      for (const key in target) {
        cloneTarget[key] = clone(target[key])
      }
      return cloneTarget
    } else {
      return target
    }
  }
  ```

### 页面传参出现过乱码如何解决

当页面传参出现乱码时，通常是因为编码方式不匹配导致的。例如，你正在使用 UTF-8 编码，但是接收方使用了其他编码方式，如 GBK 或 ISO-8859-1，这就会导致传递的参数出现乱码

- 确认编码方式：首先，你需要确定正在使用的编码方式。你可以通过查看 HTML 头部或使用开发者工具来确定页面的编码方式。
- 统一编码方式：确保发送和接收参数的两个页面使用相同的编码方式。最好都使用 UTF-8 编码，因为它是最常用的编码方式，并支持所有 Unicode 字符。
- 编码参数：使用 JavaScript 的 encodeURIComponent() 函数对参数进行编码，decodeURIComponent() 函数对接收到的参数进行解码
  
```js
let param = encodeURIComponent("你好"); // "%E4%BD%A0%E5%A5%BD"

let param = decodeURIComponent("%E4%BD%A0%E5%A5%BD"); // "你好"
```

- 在 URL 中使用 BASE64 编码：如果你需要将参数添加到 URL 中，你可以使用 BASE64 编码对参数进行编码，以确保传递参数时不会出现乱码

```js
let param = btoa("你好"); // "5L2g5aW9"
let url = "http://example.com?param=" + param; // "http://example.com?param=5L2g5aW9"
```

### 对象和数组遍历的方法

![JS遍历方法.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8272b1968fc427799487799b2ff5d2d~tplv-k3u1fbpfcp-zoom-1.image)

### 传参序列化

```js
export function login(paramsList) {
  return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
  })
}
```

但是有时候后端要求 Content-Type 必须以 application/x-www-form-urlencoded 形式，那么通过上面传递的参数，后端是收不到的，我们必须对参数数据进行所谓的序列化处理才行，让它以普通表单形式(键值对)发送到后端，而不是 json 形式

```js
export function loginAPI(paramsList) {
  return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      },
    ],
  })
}
```

**用 qs 模块来序列化参数**
我们也能通过第三方依赖来序列化参数，就更加方便简洁，下载 qs 模块。

```js
npm install qs
```

```js
// user.js
import qs from 'qs'
export function loginAPI(paramsList) {
  return myAxios({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data)
      },
    ],
  })
}
```

### 什么是 DOM 和 BOM？

**DOM** 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

**BOM** 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局） 对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对 象的子对象。

- dom：document.getelementByid、createElement、appendChild insertBefore setAttribute
- bom:open location history settimeout focus

### new 操作符的实现原理

**new 操作符的执行过程：**

- 首先创建了一个新的空对象
- this 指向这个对象（会执行构造函数的代码，为这个新对象添加属性）
- 绑定原型，将实列 this 的原型指向构造函数的 prototype
- 判断构造函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

![微信截图_20221129211808.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84de0bdeea1a44c6b870c79156af09f6~tplv-k3u1fbpfcp-watermark.image?)

### JavaScript 脚本延迟加载的方式

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

- **defer 属性：** 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同时进行，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- **async 属性：** 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- **动态创建 DOM 方式：** 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
- **使用 setTimeout 延迟方法：** 设置一个定时器来延迟加载 js 脚本文件
- **让 JS 最后加载：** 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

### JavaScript 类数组对象的定义？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

**为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?**

`arguments`是一个对象，它的属性是从 0 开始依次递增的数字，还有`callee`和`length`等属性，与数组相似；但是它却没有数组常见的方法属性，如`forEach`, `reduce`等，所以叫它们类数组。

常见的类数组转换为数组的方法有这样几种：

（1）通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike)
```

（2）通过 call 调用数组的 splice 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0)
```

（3）通过 apply 调用数组的 concat 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike)
```

（4）通过 Array.from 方法来实现转换

```js
Array.from(arrayLike)
```

（5）使用展开运算符将类数组转化成数组

```js
function foo() {
  const arrArgs = [...arguments]
  arrArgs.forEach((a) => console.log(a))
}
```

### for...in 和 for...of 的区别

都是遍历数据结构的循环语句，但它们的用法和适用场景有所不同。

**for...in**

- 通常用于遍历对象的键，包括自身属性和继承属性（原型链上的所有可枚举属性），所以性能非常差。如果只遍历自己的属性，可以用`obj.hasOwnProperty()`来判断是否是自己的属性

```js
// 定义一个父级对象
const parent = {
  name: "张三",
  say() {
    console.log(this.name);
  },
};
// 以parent为原型,定义一个子级对象
const son = Object.create(parent);
son.age = 19;
// 遍历子级对象的属性
for (const key in son) {
  console.log(key); // 输出 age name say
}
```

```js
for (const key in son) {
  if (son.hasOwnProperty(key)) {
    console.log(key); // 输出 age
  }
}
```

- 循环不保证对象属性的顺序，如果键名都是字符串，那么顺序没问题，这也是我们大多数的使用情况，要是出现其他类型的键名，顺序可能就有问题了

```js
const obj = {
  name: "张三",
  age: 18,
  say() {
    console.log(this.name);
  },
  2: "数字2",
}
for (const key in obj) {
  console.log(key); // 2 name age say
}
```

**for...of**

- 遍历获对象的值，只能用来遍历部署了`iterator`接口的迭代器对象，如遍历数组、字符串、类数组对象、Set、Map 以及 Generator 对象，遍历普通对象会报错

为了避免 for...in 循环的一些缺点，可以考虑使用其他遍历方式，例如 for...of 循环、Object.keys()、Object.values()、Object.entries() 等方法来遍历对象属性。这些方法提供了更可控和可预测的遍历方式，且不受到继承属性和属性遍历顺序的影响。

### 如何使用 for...of 遍历普通对象

- 借助Object.keys()、Object.values()、Object.entries()，它们都可以返回一个数组，数组也是迭代器对象

```js
const obj = {
  name: "张三",
  age: 19,
};
for (const key of Object.keys(obj)) {
  console.log(key);
}
for (const key of Object.values(obj)) {
  console.log(key);
}
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

- 给普通对象添加一个[Symbol.iterator]属性，实现一个迭代器，并指向这个迭代器即可。

```js
//方法一：
var obj = {
  a: 1,
  b: 2,
  c: 3,
}

obj[Symbol.iterator] = function () {
  var keys = Object.keys(this)
  var count = 0
  return {
    next() {
      if (count < keys.length) {
        return { value: obj[keys[count++]], done: false }
      } else {
        return { value: undefined, done: true }
      }
    },
  }
}
for (var k of obj) {
  console.log(k)
}

// 方法二 Generator函数
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
obj[Symbol.iterator] = function* () {
  var keys = Object.keys(obj)
  for (var k of keys) {
    yield [k, obj[k]]
  }
}

for (var [k, v] of obj) {
  console.log(k, v)
}
```

### 如何跳出 forEach 循环

接收一个函数作为参数，并对数组中的每个元素依次调用该函数，但是它本身并没有提供跳出循环的功能，因为它是一种函数式编程的方式，是对每个元素进行操作，而不是对整个数组进行操作。

- 使用try catch抛出异常的方式跳出循环。这种方法比较暴力，不推荐使用。
- 使用return或return false来跳过当前元素的执行。这种方法相当于continue，只能跳过本次循环，不能终止所有循环。
- 使用其他的迭代方法，如some、every、find等，它们可以根据回调函数的返回值来决定是否继续循环。
- 使用普通的for循环或者for…of循环，它们可以使用break或continue来控制循环。

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

- WeakMap 只接受对象作为键名（null除外）
- 内存管理： WeakMap 是弱引用的，它不会阻止键对象被垃圾回收。当键对象没有被其他引用持有时，它会被自动从 WeakMap 中移除，释放对应的内存。这使得 WeakMap 适合用于在对象上存储额外的数据，而不会导致对象本身无法被垃圾回收。
- WeakMap不能迭代，也没有Map的size属性和clear方法

总结来说，Map 是通用的键值对集合，适用于需要存储和操作任意类型的键和值的场景。而 WeakMap 是一种特殊的 Map，适用于需要与对象关联的附加数据，且不干扰对象的垃圾回收的场景。

### 对AJAX的理解，实现一个AJAX请求

AJAX 是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

**创建 AJAX 请求的步骤**

```js
const SERVER_URL = '/server'
// 1. 创建一个 XMLHttpRequest 对象
let xhr = new XMLHttpRequest()
// 2. 在这个对象上使用 open 方法创建一个 HTTP 请求，参数是请求的方法、请求的地址、是否异步和用户的认证信息
xhr.open('GET', url, true)
// 3. 在发起请求前，可以为这个对象添加一些信息和监听函数
// 3.1 设置状态监听函数
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response)
  } else {
    console.error(this.statusText)
  }
}
// 3.2 设置请求失败时的监听函数
xhr.onerror = function () {
  console.error(this.statusText)
}
// 3.3 设置请求头信息
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')
// 4. 发送 Http 请求
xhr.send(null)
```

### ajax、axios、fetch 的区别

**（1）AJAX**

Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML），是指一种创建交互式[网页](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%E7%BD%91%E9%A1%B5)应用的网页开发技术。它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如下：

- 本身是针对 MVC 编程，不符合前端 MVVM 的浪潮
- 基于原生 XHR 开发，XHR 本身的架构不清晰
- 不符合关注分离（Separation of Concerns）的原则
- 配置和调用方式非常混乱，而且基于事件的异步模型不友好。

**（2）Fetch**

fetch 号称是 AJAX 的替代品，是在 ES6 出现的，使用了 ES6 中的 promise 对象。Fetch 是基于 promise 设计的。Fetch 的代码结构比起 ajax 简单多。**fetch 不是 ajax 的进一步封装，而是原生 js，没有使用 XMLHttpRequest 对象**。

fetch 的优点：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 更加底层，提供的 API 丰富（request, response）
- 脱离了 XHR，是 ES 规范里新的实现方式

fetch 的缺点：

- fetch 只对网络请求报错，对 400，500 都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
- fetch 默认不会带 cookie，需要添加配置项： fetch(url, {credentials: 'include'})
- fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- fetch 没有办法原生监测请求的进度，而 XHR 可以

**（3）Axios**

Axios 是一种基于 Promise 封装的 HTTP 客户端，其特点如下：

- 浏览器端发起 XMLHttpRequests 请求
- node 端发起 http 请求
- 支持 Promise API
- 监听请求和返回
- 对请求和返回进行转化
- 取消请求
- 自动转换 json 数据
- 客户端支持抵御 XSRF 攻击

### 对 JSON 的理解

JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，

- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
- JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。

### 常用的正则表达式有哪些

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g

// （5）用户名正则
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/
```

### use strict 是什么意思

严格模式是 ECMAScript 5 引入的一种更严格的 JavaScript 解析和执行模式，通过在脚本或函数的开头添加 "use strict" 指令，可以将相应的代码段置于严格模式下。通过使用严格模式，可以避免一些常见的 JavaScript 错误，并提供更严格的代码约束，有助于编写更可靠、安全的 JavaScript 代码。

**特点**

- 变量必须先声明后使用：在严格模式下，变量必须使用 var、let 或 const 关键字进行声明，否则会抛出错误。
- 禁止删除变量、函数和函数参数：严格模式下，使用 delete 关键字删除变量、函数和函数参数会引发错误。
- 禁止使用未声明的变量：格模式下，使用未声明的变量会引发错误。
- 函数中的 this 值为 undefined：在严格模式下，函数内部的 this 值为 undefined，而不是指向全局对象。
- 禁止重复的函数参数名：在严格模式下，函数参数名不能重复，重复参数会导致语法错误。
- 禁止使用 with 语句。

### 强类型语言和弱类型语言的区别

**强类型语言**

- 强类型语言要求变量在使用前必须`先定义其类型`，并且类型一旦确定后就`不能随意改变`。
- 在强类型语言中，编译器或解释器会严格检查变量的类型，并在类型不匹配时给出错误提示。
- 强类型语言提供了更严格的类型检查和类型转换规则，以保证程序的类型安全性和一致性。
- Java 和 C++等语言都是强制类型定义的

**弱类型语言**

- 弱类型语言相对于强类型语言更宽松，变量的类型可以在运行时自动推断或隐式转换。
- 在弱类型语言中，变量的类型可以根据赋值操作或上下文的需要而随意改变，无需显式地声明或定义类型。
- 弱类型语言对类型的检查较为宽松，允许进行隐式的类型转换，但可能会导致一些意外的行为或错误。
- JavaScript 是弱类型定义的，可以将字符串'12'和整数 3 进行连接得到字符串'123'，在相加的时候会进行强制类型转换。

两者对比：强类型语言在速度上可能略逊色于弱类型语言，但是强类型语言带来的严谨性可以有效地帮助避免许多错误。

### 解释性语言和编译型语言的区别

- 解释性语言的代码是逐行解释执行的，而编译型语言的代码是事先编译成可执行的机器码。
- 解释性语言不需要事先的编译步骤，可以直接运行，而编译型语言需要先进行编译。
- 解释性语言的执行过程边解释边执行，即时得到结果，而编译型语言的执行是一次性执行编译后的机器码。

JavaScript、Python 等属于解释型语言，C、C++等属于编译型语言。

### JS对URL进行编码有哪些方式

**encodeURI()**

- encodeURI 方法用于对完整的 URL 进行编码，将所有非 ASCII 字符转换为它们的十六进制表示。
- 只会编码空格（ %20 表示）不会对某些保留字符进行编码，如 /、?、& 等，因为它们在 URL 中具有特殊含义
- `decodeURI()`这个方法用来解码

**encodeURIComponent()**

- 用来编码 URL 中的查询参数或片段标识符，将所有非 ASCII 字符转换为它们的十六进制表示
- encodeURIComponent 方法会编码所有特殊字符 包括保留字符 /、?、& 等。
- `decodeURIComponent()`用来解码

```js
const url = 'https://www.example.com/path with spaces?query=Hello World&param=Some Value';

// 使用 encodeURI 对整个 URL 进行编码
const encodedURL = encodeURI(url);
console.log(encodedURL);
// 输出：https://www.example.com/path%20with%20spaces?query=Hello%20World&param=Some%20Value

// 使用 encodeURIComponent 对查询字符串进行编码
const encodedQuery = encodeURIComponent(url);
console.log(encodedQuery);
// 输出：https%3A%2F%2Fwww.example.com%2Fpath%20with%20spaces%3Fquery%3DHello%20World%26param%3DSome%20Value
```

**escape**

- 用于对字符串进行编码，escape方法将特殊字符转换为十六进制转义序列，如 %20 表示空格
- escape 方法编码除了字母、数字和以下字符之外的所有字符：@*/+-%_
- unescape()这个方法用来将使用 escape() 方法编码的字符串解码
- 注意，escape 方法已经被废弃，并不建议在新的代码中使用。


## 三、原型与原型链

### 对原型、原型链的理解

**原型**

- JavaScript 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，`构造函数.prototype`就是`显示原型`
- `构造函数.prototype.constructor`指向构造函数本身
- 使用构造函数创建一个实例，`实例.__proto__`就是隐式原型，它和`构造函数.prototype`指向同一个对象。所以`实例.__proto__` === `构造函数.prototype`。构造函数的所有实例都可以访问这个原型对象上的属性和方法

**原型链**

- 当访问一个对象的属性或方法时，首先查找对象自身有没有这个属性，如果有直接返回，如果没有查找隐式原型`__proto__`上的属性
- 如果原型上没有，就去查找原型的原型，一直查到  `Object`  内置对象为止(`原型链的尽头Object.prototype.__proto__ === null`)，这条查找的路径就是`原型链`
- 如果最后也没找到，就是 undefined

`用途`

- 数据共享，节约内存
- 实现属性方法的继承，简化代码，实现代码重用

**js 获取原型的方法**

- `p.__proto__`：现在浏览器中都实现了 `__proto__` 属性来访问，但是不推荐，因为它不是规范中规定的
- `p.constructor.prototype`
- `Object.getPrototypeOf(p)`： 推荐

**其他相关 api**

- `hasOwnProperty()`：判断属性属于自身还是原型链
- `isPrototypeOf()`: 用于检测某个对象的 prototype 是不是检测对象的原型

### 原型修改、重写

```javascript
function Person(name) {
  this.name = name
}
// 修改原型
Person.prototype.getName = function () {}
var p = new Person('hello')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true
// 重写原型
Person.prototype = {
  getName: function () {},
}
var p = new Person('hello')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // false
```

可以看到修改原型的时候 p 的构造函数不是指向 Person 了，因为直接给 Person 的原型对象直接用对象赋值时，它的构造函数指向的了根构造函数 Object，所以这时候`p.constructor === Object` ，而不是`p.constructor === Person`。要想成立，就要用 constructor 指回来：

```javascript
Person.prototype = {
  getName: function () {},
}
var p = new Person('hello')
p.constructor = Person
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true
```

### 原型链指向

```javascript
p.__proto__ // Person.prototype
Person.prototype.__proto__ // Object.prototype
p.__proto__.__proto__ //Object.prototype
p.__proto__.constructor.prototype.__proto__ // Object.prototype
Person.prototype.constructor.prototype.__proto__ // Object.prototype
p1.__proto__.constructor // Person
Person.prototype.constructor // Person
```

```javascript
p.__proto__ // Person.prototype
Person.prototype.__proto__ // Object.prototype
p.__proto__.__proto__ //Object.prototype
p.__proto__.constructor.prototype.__proto__ // Object.prototype
Person.prototype.constructor.prototype.__proto__ // Object.prototype
p1.__proto__.constructor // Person
Person.prototype.constructor // Person
```

## 四、执行上下文/作用域链/闭包

### 对闭包的理解

`函数内部能够访问到其外部作用域中的变量的能力`，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过内部函数访问外部函数的局部变量，变量不会被垃圾回收机制回收。其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。

 **特性：**

  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收(造成内存泄漏)

**用途**

- `创建私有变量`: 变量就不会暴露在全局作用域中，从而实现了私有变量的效果
- `可以保留变量的状态`： 闭包可以保存变量状态，即使变量所在的函数已经执行完毕。这种机制使得闭包可以用来实现一些异步编程的场景，比如定时器、事件处理等。

**缺点**是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露

**场景**：防抖节流，计数器等

比如，函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。

```javascript
function A() {
  let a = 1
  window.B = function () {
    console.log(a)
  }
}
A()
B() // 1
```

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。经典面试题：循环中使用闭包解决 var 定义函数的问题

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。解决办法有三种：

- 第一种是使用闭包的方式

```javascript
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

在上述代码中，首先使用了立即执行函数将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的。

- 第二种就是使用 `setTimeout` 的第三个参数，这个参数会被当成 `timer` 函数的参数传入。

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

- 第三种就是使用 `let` 定义 `i` 了来解决问题了，这个也是最为推荐的方式

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

### 执行上下文

执行上下文是用来描述了 JavaScript 代码在运行时的执行环境和状态。在执行JS 代码之前，需要先解析代码把即变量声明、函数声明、作用域链和this信息先拿出来，创建一个全局执行上下文环境，添加到执行上下文栈中，然后才开始正式的执行程序。

**执行上下文**

`全局执行上下文:` 在 JavaScript 代码执行之初，会创建一个全局执行上下文。全局执行上下文是默认的最外层执行上下文，它包含了全局作用域中的变量和函数，并且在整个代码执行过程中都存在。

`函数执行上下文:`每当调用一个函数时，都会创建一个对应的函数执行上下文。函数执行上下文包含了函数内部的变量、函数参数、函数作用域链等信息。当函数执行完毕后，对应的函数执行上下文会从执行上下文栈中被移除。

`执行上下文栈`： 也称为调用栈，用于管理执行上下文的创建和销毁顺序。当前正在执行的执行上下文位于栈顶，执行完毕后被移除，然后下一个执行上下文开始执行。

当 JavaScript 执行代码时，首先遇到全局代码，会创建一个`全局执行上下文并且压入执行栈中`，每当遇到一个函数调用，就会`为该函数创建一个新的执行上下文并压入栈顶`，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。

### 对作用域、作用域链的理解

**作用域**

是指代码中变量和函数可访问的范围，JavaScript中有两种作用域：全局作用域和函数作用域

- 全局作用域: 在代码的任何地方都可以访问的变量或函数，全局作用域只要页面不卸载，就一直存在，不释放。
- 函数作用域: 函数内部定义的变量或函数，只能在该函数内部访问，当函数调用结束时，这个作用域就释放了

**作用域链**

作用域链是指在当前作用域中查找变量或函数时，JavaScript会沿着嵌套的函数作用域逐级向外查找，直到找到对应的变量或函数。作用域链的顶端是全局作用域，如果在全局作用域中也找不到变量或函数，则会抛出`xxx is not defined`的错误。

**作用域链的作用**

保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链来解决变量访问的问题

### 对 this 对象的理解

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

- `函数调用模式:` 当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象 window
- `方法调用模式:` 如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- `构造函数调用模式:` 如果一个函数用 new 调用时，this 指向实例。
- `apply、call 和 bind 调用模式:` 这三个方法都可以显示的指定调用函数的 this 指向。

**this 指向**

- 普通函数中 this 指向 window
- 构造函数中 this 指向实例化对象
- 箭头函数中没有 this，如果输出 this，就会输出箭头函数定义时所在的作用域中的 this
- 对象中 this 指向本身
- 计时器中 this 指向 window
- 事件处理函数中，this 指向触发事件的对象
- call、apply、bind 可以改变函数的 this 指向(call)

### call、apply、bind的区别

call、apply 和 bind 是 JavaScript 中用于改变函数执行上下文（即函数内部的 this 值）的方法

call 和 apply 方法用于立即改变函数的执行上下文，并执行函数，它们的区别在于参数传递方式，call 是参数列表，apply是参数数组。bind 方法返回一个新函数，延迟执行原函数，并将指定的上下文绑定到新函数中

`call（参数一，参数二....后面是参数列表）`

- 第一个参数：this 指向的参数，没有参数就是普通调用
- 伪数组转真数组：arguments = Array.prototype.slice.call(arguments)

`apply(参数1，[num1,num2....])`

- 方法和 call 一样，区别是后面是参数数组，call 是参数列表
- 求数组最小值：var min = Math.min.apply(null,arr)

`bind`

- function.bind(obj, arg1, arg2, ...)
- bind 方法返回一个新函数，延迟执行原函数，并将指定的上下文绑定到新函数中

```js
// 使用 bind 方法创建一个新函数，并将 person 对象作为执行上下文
const boundGreet = greet.bind(person);
// 自己调用新函数
boundGreet();
```

## 五、面向对象

### 对象创建的方式有哪些？

[文章]([https://](https://xxxgitone.github.io/2017/06/10/JavaScript%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E4%B8%83%E7%A7%8D%E6%96%B9%E5%BC%8F/))

`1.直接对象字面量/内置构造函数`

```js
const obj = {
  name: 'dz',
  age: 23,
}

const obj = new Object()
obj.name = name
obj.age = age
// 优点： 简单、快捷，适合创建小型对象
// 缺点： 创建多个类似的对象，需要写大量重复的代码 代码冗余
```

`3.工厂模式`

```js
function Person(name, age) {
  const obj = {}
  obj.name = name
  obj.age = age
  return obj
}

const person = Person('dz', 23)
const person1 = Person('dz1', 24)
console.log(person instanceof Person) // -> false
console.log(person1.__proto__ == person.__proto_) // -> false
```

主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。`缺点`创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

`4.构造函数`

```js
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayname = () => {
    console.log(this.name)
  }
}

const p1 = new Person('dz', 23)
const p2 = new Person('dz1', 24)
console.log(p1 instanceof Person, p2 instanceof Person) // --> true true
```

构造函数模式相对于工厂模式的`优点`是，所创建的对象和构造函数建立起了联系，因此可以通过原型来识别对象的类型。`缺点` 构造函数的每个方法都要在每个实例上重新创建一次，浪费内存

`5.原型模式`

```js
function Person(name, age) {
  Person.prototype.name = name
  Person.prototype.age = age
  Person.prototype.likes = ['apple', 'banana', 'watermelon']
  Person.prototype.sayname = () => {
    console.log(this.name)
  }
}
const p1 = new Person('dz', 23)
const p2 = new Person('dz1', 24)

p1.likes.pop() // -> 删除 watermelon
console.log(p1.name == p2.name) // -> true,  p2的属性覆盖了p1的属性
console.log(p1.likes) // -> ['apple', 'banana']
console.log(p2.likes) // -> ['apple', 'banana']
```

因为通过构造函数创建的所有实例都能共享原型上的属性和方法。因此可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说`优点`: 解决了函数对象的复用问题。`缺点`： 一个是没有办法通过传入参数来初始化值，所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

`6.组合模式(构造函数模式+原型模式)`

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayname = () => {
  console.log(this.name)
}

const p1 = new Person('dz', 23)
const p2 = new Person('dz1', 24)
console.log(p1.name, p2.name) // dz dz1
```

这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此可以组合使用这两种模式，`通过构造函数来初始化对象的属性`，`通过原型对象来实现函数方法的复用`。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

---

**后面是高级模式**

`7.动态原型模式`

```js
function Person(name, age) {
  this.name = name
  this.age = age
  if (typeof this.sayname != 'function') {
    Person.prototype.sayname = () => {
      console.log(this.name)
    }
  }
}
const p1 = new Person('dz', 23)
console.log(p1.sayname) // -> dz
```

这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

`8.寄生构造函数`

```js
function SpecialArray() {
  var array = new Array()
  array.push.apply(array, arguments)
  array.toPipedString = function () {
    return this.join('|')
  }
  return array
}
var colors = new SpecialArray('red', 'green', 'pink')
alert(colors.toPipedString()) // red|green|pink
alert(colors instanceof SpecialArray) // false
```

这个模式，除了使用new操作符并把使用的包装函数叫做构造函数之外，和工厂模式几乎一样。构造函数如果不返回对象，默认也会返回一个新的对象，通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值

`9.稳妥构造函数模式`

先说稳妥二字, 别人定义了一个稳妥对象, 即没有公共属性, 而且其方法也 `不引用this对象`, 这种模式适应于一些安全环境中(禁止使用 this 和 new), 或防止数据被其他应用程序改动, 像下面这样：

```js
function Person(name, age, gender) {
  var obj = new Object()
  obj.sayName = function () {
    alert(name)
  }
  return obj
}
var person = Person('Stan', 0000, 'male') // 这里没有使用new操作符
person.sayName() // Stan
alert(person instanceof Person) // false
```

首先明白稳妥对象指的是没有公共属性，而且其方法也不引用this。稳妥对象最适合在一些安全环境中（这些环境会禁止使用this和new），或防止数据被其他应用程序改动时使用。稳妥构造函数模式和寄生模式类似，有两点不同:一是创建对象的实例方法不引用this，而是不使用new操作符调用构造函数。和寄生构造函数模式一样，这样创建出来的对象与构造函数之间没有什么关系，instanceof操作符对他们没有意义

`10. class`

```js
class Person {
  constructor(name, age) {
    // constructor构造函数
    this.name = name
    this.age = age
  }

  sayname() {
    //原型上的
    console.log(this.name)
  }
  static sayAge() {
    console.log(this.age)
  }
}

const per = new Person('dz', 23)
per.sayname() // -> dz
Person.sayAge() // 23
```

`constructor`是构造方法，类似构造函数, 定义这个方法里面的内容都是实例自身的属性和方法, 不会被其他实例共享, 而写在外面的`sayname`表示原型上的方法, 是会被`共享`的.

`static` 表示静态，加了 static 的函数`不会`挂载到`prototype` 上,而是挂载到 `class类` 上, 类似于:

```js
Promise.resolve(...)
Math.max(...)
```

### 对象继承的方式有哪些

- 原型链继承：通过将子类的原型指向父类的实例来实现继承。优点是简单易用，缺点是不能传递参数，且如果修改父类的实例属性会影响到所有子类的实例

```js
function Animal() { // 父类
    this.type = 'animal';
}
function Dog() { //子类
    this.name = 'dog';
}
Dog.prototype = new Animal();

var dog = new Dog();
console.log(dog.type); // 'animal'
```

- 借用构造函数继承：在子类的构造函数中调用父类构造函数，使用call或apply将父类实例属性复制到子类实例中。优点是可以传递参数，缺点是无法复用父类原型上的方法。

```js
function Animal(type) {
    this.type = type;
}

function Dog(name, type) {
    Animal.call(this, type);
    this.name = name;
}

var dog = new Dog('Tom', 'animal');
console.log(dog.name); // 'Tom'
console.log(dog.type); // 'animal'
```

- 组合继承：结合了原型链继承和构造函数继承的优点，先使用构造函数继承父类实例属性，然后将子类的原型指向父类的实例，这样子类就能够访问到父类原型上的方法。缺点是会调用两次父类构造函数，导致父类实例属性会被重复赋值。

```js
function Animal(type) {
    this.type = type;
}

Animal.prototype.say = function() {
    console.log('I am an', this.type);
}

function Dog(name, type) {
    Animal.call(this, type);
    this.name = name;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

var dog = new Dog('Tom', 'animal');
console.log(dog.name); // 'Tom'
console.log(dog.type); // 'animal'
dog.say(); // 'I am an animal'
```

- 原型式继承：通过浅复制一个已有对象的属性来创建一个新的对象，然后修改新对象的属性来实现继承。优点是可以快速创建一个新对象并复用已有对象的属性，缺点是共享了原型对象，如果修改了原型对象的属性，则所有继承自该对象的实例都会受到影响

```js
var animal = {
    type: 'animal',
    say: function() {
        console.log('I am an', this.type);
    }
}

var dog = Object.create(animal);
dog.name = 'Tom';
console.log(dog.name); // '
```

- 寄生式继承： 一种基于原型继承的编程模式，它的核心思想是创建一个新对象，并且在这个对象上增加需要的属性和方法，然后将这个对象返回。这个模式的优点在于可以避免直接修改父对象，同时也能够利用父对象的方法和属性，缺点则在于增加了对象层次，增加了系统的复杂性。

```js

// 父对象
var parent = {
  name: "parent",
  sayName: function() {
    console.log("My name is " + this.name);
  }
};

function createObject(parent) {
  // 创建一个新对象，以父对象为原型
  var obj = Object.create(parent);

  // 在新对象上增加一个新的方法
  obj.sayHello = function() {
    console.log("Hello!");
  };

  // 返回新对象
  return obj;
}

// 创建一个新对象，并且以parent为原型
var child = createObject(parent);

// 调用child对象的方法
child.sayHello(); // 输出 "Hello!"

// 调用parent对象的方法
child.sayName(); // 输出 "My name is parent"

```

- 寄生式组合继承: 结合了寄生式继承和组合继承的优点。它的核心思想是先使用组合继承方式，继承父对象的属性和方法，并且在新对象上增加需要的属性和方法，最后返回新对象。这个模式的优点在于避免了组合继承方式的缺点，同时又能够继承父对象的属性和方法，缺点则在于比较复杂，容易出错。

```js
// 父对象
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function() {
  console.log("My name is " + this.name);
};

// 子对象
function Dog(name) {
  // 继承父对象的属性
  Animal.call(this, name);
}

// 继承父对象的方法
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 在子对象上增加一个新的方法 bark
Dog.prototype.bark = function() {
  console.log(this.name + " barks.");
};

// 创建一个新对象
var myDog = new Dog("Fido");

// 调用 myDog 对象的方法
myDog.sayName(); // 输出 "My name is Fido"
myDog.bark(); // 输出 "Fido barks."

```
