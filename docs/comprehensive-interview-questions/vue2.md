## v-if 和 v-show 的区别

* v-show 通过 Css display 控制显示和隐藏。
* v-if 组件真正的渲染和销毁，而不是显示和隐藏。
* 频繁切换显示状态用v-show,否则用v-if。

## 为何在v-for中用key?

* 必须用key,且不能是 index 和 random。
* diff 算法中通过 tag 和 key 来判断，是否是相同节点。
* 减少渲染次数，提高渲染性能。 

##  v-if 与 v-for 为什么不建议一起使用
`v-for` 和 `v-if` 不要在同一个标签中使用,因为解析时先解析 `v-for` 再解析 `v-if`，如果同时使用那么每次循环一遍都要进行一次if判断，造成了不必要的性能开销。正确的做法是将 `v-if` 移动至容器元素上 (比如 ul、ol)或者外面包一层 `template` 即可。

## computed 和 watch 的区别

* `computed` 支持缓存，当依赖的数据发生改变才会重新计算，如果一个数据依赖于其他数据，那么可以把这个数据设计为计算属性。
`watch` 不支持缓存，只要监听的数据发生变化就会触发相应的操作，如果需要在某个数据发生变化时做一些事情，可以使用 `watch`。

* `computed` 不支持异步，当 `computed` 内有异步操作时是无法监听数据变化的；`watch` 支持异步操作。

* `computed` 属性的属性值是一函数，函数返回值为属性的属性值，`computed` 中每个属性都可以设置`set`与`get`方法。`watch` 监听的数据必须是`data`中声明过或父组件传递过来的`props`中的数据，当数据变化时，触发监听器。

## Vue 组件如何通讯(常见)

* 父子组件 props 和 this.$emit
* 自定义事件 event.$on event.$off event.$emit
* Vuex

## 描述组件渲染和更新的过程

### 初次渲染
* 解析模板为 render 函数 (或在开发环境已完成，如：vue-loader)。
* 触发响应式，监听 data 属性 `getter` 和 `setter`。
* 执行 render 函数，生成 vnode，patch(elem,vnode)

### 更新过程

* 修改 data, 触发 setter （此前在 getter 中已被监听）。
* 重新执行 render 函数，生成 newVnode。
* patch(vnode,newVnode)。

### 异步渲染
* 回顾$nextTick。
* 汇总 data 的修改，一次性更新视图。
* 减少 DOM 操作次数，提高性能。

## 双向数据绑定 v-model 的实现原理

* input 元素的value = this.name。
* 绑定 input 事件this.name = $event.target.value。
* data 更新触发 re-render。

## 对MVVM的理解

我们都知道，MVVM 可以拆分为 M（Model），V(View) 和 VM（ViewModel）。

其核心就是数据响应式系统，开发者在开发应用的时候，只需要通过模板将数据和视图绑定起来之后，后续通过事件监听修改数据，视图会自动更新，而底层的操作对于开发者来说实际上是不关心的。这样的设计使得开发成本和维护成本都显著降低，让开发者可以专注业务逻辑的开发，而不用关心当数据改变，应该如何更新视图。

## 为何组件 data 必须是一个函数 ？

在vue中一个组件可能会被其他的组件引用，为了防止多个组件实例对象之间共用一个data，产生数据污染。将data定义成一个函数，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响initData时会将其作为工厂函数都会返回全新data对象。 

## ajax 请求应该放在哪个生命周期？
mounted,因为js是单线程的，ajax是异步获取数据，放在 mounted 之前没有用，只会让逻辑更加混乱。

## 什么是 VDOM ?

* 用 js 模拟DOM结构（vnode）。
* 新旧 vnode 对比，得出最小的更新范围，最后更新 DOM。
* 数据驱动视图的模式下，能有效控制 DOM操作。

## 多个组件有相同的逻辑，如何抽离？

* mixin
* 以及mixin的一些缺点

## 何时要使用异步组件？

* 加载大组件
* 路由异步加载

## 何时需要使用 keep-alive ?

* 缓存组件，不需要重复渲染
* 如多个静态 tab 页切换
* 优化性能 

## 何时需要使用 beforeDestory ?

* 解绑自定义事件
* 清除定时器
* 解绑自定义的 DOM 事件，如 window scroll 等。

## Vuex 中的 action 和 mutation 有何区别？
* action 中处理异步，mutation 不可以
* mutation 做原子操作
* action 可以整合多个 mutation

## Vue-router 常用的路由模式

* hash 默认
* H5 history (需要服务端支持)

## Vue 如何监听数组变化
* Object.defineProperty 不能监听数组变化
* 重新定义原型。重写 push pop 等方法，实现监听。
* Proxy 可以原生监听数组变化。

## Vue 为何是异步渲染，$nextTick有什么作用？
* 异步渲染（合并data修改），以提高渲染性能。
* $nextTick 在 DOM 更新完之后，触发回调。

## Vue 常见性能优化方式

* 合理使用 v-show 和 v-if
* 合理使用computed
* v-for时加key,以及避免和v-if同时使用
* 自定义事件、DOM事件及时销毁
* 合理使用异步组件
* 合理使用 keep-alive
* data 层级不要太深  

## 如何自己实现 v-model

```vue
<template>
  <input
    type="text"
    :value="text"
    @input="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  model: {
    prop: 'text',
    event: 'change',
  },
  props: {
    text: String,
  },
}
</script>

```

## 用 js 实现一个简单的 Vue 响应式


```js
  // 触发更新视图
  function updateView () {
    console.log('更新视图')
  }

  // 重新定义数组原型
  const oldArrayProperty = Array.prototype

  // 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
  const arrProto = Object.create(oldArrayProperty);

  ['push', 'pop', 'shift', 'unshift'].forEach(methodName => {
    arrProto[methodName] = function () {
      updateView() // 触发视图更新
      oldArrayProperty[methodName].call(this, ...arguments)
    }
  })

  // 重新定义属性，监听起来
  function defineReactive (target, key, value) {
    // 深度监听
    observe(value)

    // 核心 API
    Object.defineProperty(target, key, {
      get () {
        return value;
      },
      set (newValue) {
        if (newValue != value) {
          // 深度监听
          observe(newValue)

          // 设置新值
          value = newValue;

          // 更新视图
          updateView()
        }
      }
    })
  }


  function observe (target) {
    // 判断是否是对象或者数组
    if (typeof target !== "object" || target == null) return target;

    if (Array.isArray(target)) {
      target.__proto__ = arrProto
    }

    // 重新定义对象的各个属性
    for (let key in target) {
      defineReactive(target, key, target[key]);
    }
  }


  const data = {
    name: '前端小菜鸟吖',
    age: 24,
    nums: [1, 2, 3],
    info: {
      address: '深圳'
    }
  }
  // 监听数据
  observe(data)


  // 测试
  // data.name = '小饶'
  // data.age = 18
  // console.log('age', data.age);
  // data.x = '100' // 新增属性，监听不到 —— 所以有 Vue.set
  // delete data.name // 删除属性，监听不到 —— 所以有 Vue.delete
  // data.info.address = '北京' // 深度监听
  data.nums.push(4) // 监听数组
```
## 请用 vnode 描述一个 DOM 结构
```html
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size:20px">
    <li>a</li>
  </ul>
</div>
```
```js
 const VDOM = {
    tag: 'div',
    props: {
      id: 'div1',
      className: 'container',
    },
    children: [
      {
        tag: 'p',
        children: 'vdom'
      },
      {
        tag: 'ul',
        props: {
          style: 'font-size:20px'
        },
        children: [
          {
            tag: 'li',
            children: 'a'
          }
        ]
      }
    ]
  }
```

