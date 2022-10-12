## Vue3 比 Vue2 有什么优势？
* 性能更好
* 体积更小
* 更好的ts支持
* 更好的代码组织
* 更好的逻辑抽离
* 更多新功能

<a id="lifecycle"></a>

## 描述Vue3生命周期

### Options API 生命周期
* beforeDestory 改为 beforeUnmount
* destroyed 改为 unmounted
* 其他沿用Vue2生命周期

```vue
<template>
  <p>生命周期</p>
</template>

<script>
export default {
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount')    
  },
  mounted(){
    console.log('mounted')    
  },
  beforeUpdate(){
    console.log('beforeUpdate') 
  },
  updated(){
    console.log('updated')    
  },
  beforeUnmount(){
    console.log('beforeUnmount')      
  },
  unmounted(){
    console.log('unmounted')      
  }
}
</script>
```

### Composition API 生命周期

```vue
<template>
  <p>生命周期</p>
</template>

<script>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'
export default {
  // 等于 beforeCreate 和 created
  setup(){
    console.log('setup')

    onBeforeMount(()=>{
      console.log('onBeforeMount') 
    })

    onMounted(()=>{
      console.log('onMounted') 
    })

    onBeforeUpdate(()=>{
      console.log('onBeforeUpdate') 
    })

    onUpdated(()=>{
      console.log('onUpdated') 
    })

    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount') 
    })

    onUnmounted(()=>{
      console.log('onUnmounted') 
    })
  }
}
</script>
```
## 如何理解 Composition API 和 Options API

### Composition API 带来了什么？
* 更好的代码组织
* 更好的逻辑复用
* 更好的类型推导

### Composition API 和 Options API 如何选择？
* 不建议共用，会引起混乱
* 小型项目、业务逻辑简单，用Options API
* 中大型项目、逻辑复杂，用Composition API

### 别误解 Composition API
* Composition API 属于高阶技巧，不是基础必会。
* Composition API 是为了解决复杂业务逻辑而设计的。
* Composition API 就像Hooks在React中的地位。

## 如何理解 ref toRef 和 toRefs

### ref 
* 生成值类型的响应式数据
* 可用于模板和reactive
* 通过 .value 修改值

### toRef
* 针对一个响应式对象（reactive 封装）的prop
* 创建一个ref,具有响应式
* 两者保持引用关系

### toRefs 
* 将响应式对象（reactive 封装）转换为普通对象
* 对象的每个prop都是对应的ref
* 两者保持引用关系

### 最佳使用方式
* 用reactive 做对象的响应式，用ref做值类型响应式
* setup 中返回 toRefs(state), 或者toRef(state,'xxx')
* ref的变量命名都用xxxRef
* 合成函数返回响应式对象时，使用toRefs

### 为何需要ref?
* 返回值类型，会丢失响应式
* 如在setup、computed、合成函数、都有可能返回值类型
* Vue如不定义ref,用户将自造ref,反而混乱

### 为何需要.value?
* ref 是一个对象（不丢失响应式），value存储值
* 通过.value属性的get和set实现响应式
* 用于模板、reactive时，不需要.value,其他情况都需要

### 为何需要 toRef 和 toRefs
* 初衷：不丢失响应式的情况下，把对象数据 分解/扩散
* 前提：针对的是响应式对象(reactive 封装的) 非普通对象
* 注意：不创造响应式，而是延续响应式

## Vue3升级了那些重要功能？
### createApp
```js
// vue2.x
const app = new Vue({/* 选项 */})

Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

// vue3
const app = Vue.createApp({/* 选项 */})

app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)
```
### emits 属性
![emits 属性](/emits.png)

### 生命周期
[点我跳转到：描述Vue3生命周期](#lifecycle)

### 多事件
```vue
<!-- 在 methods 里定义 one two 两个函数 -->
<button @click="one($event), two($event)">Submit</button>
```
### Fragment
![Fragment](/fragment.png)

### 移除.sync
![移除.sync](/sync.png)

### 异步组件的写法
![异步组件的写法](/async-components.png)

### 移除filter
![移除filter](/filter.png)

### Teleport
![Teleport](/teleport.png)

### Suspense
![Suspense](/suspense.png)

### Composition API
![Composition API](/composition-api.png)

## Composition API 如何实现逻辑复用？

* 抽离逻辑代码到一个函数
* 函数命名约定为 useXxxx格式（React Hooks也是）
* 在setup中引用 useXxxx 函数

### 示例如下：
![composition-api-1](/composition-api-1.png)
![composition-api-2](/composition-api-2.png)

## Proxy 实现响应式
* 深度监听，性能更好
* 可监听 新增/删除属性
* 可监听数组变化
* Proxy 能规避 Object.defineProperty 的问题
* Proxy 无法监听所有浏览器，无法 polyfill
### 示例：
```js
  // 创建响应式
  function reactive (target = {}) {
    // 不是对象或者数组，则返回
    if (typeof target !== "object" || target == null) return target;

    // 代理配置
    const proxyConf = {
      get (target, key, receiver) {
        // 只处理本身（非原型的）属性
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
          console.log('get', key); // 监听
        }

        const result = Reflect.get(target, key, receiver);

        // 深度监听
        return reactive(result);
      },

      set (target, key, val, receiver) {
        // 重复的数据，不处理
        if (val === target[key]) {
          return true
        }
        const ownKeys = Reflect.ownKeys(target)
        if (ownKeys.includes(key)) {
          console.log('已有的key', key);
        } else {
          console.log('新增的key', key);
        }
        const result = Reflect.set(target, key, val, receiver)
        console.log('set', key, val);
        return result; // 是否设置成功
      },
      deleteProperty (target, key) {
        const result = Reflect.deleteProperty(target, key)
        console.log('delete property', key);
        return result; // 是否删除成功
      }
    };

    // 生成代理对象
    const observed = new Proxy(target, proxyConf);
    return observed
  }

  // 测试数据
  const data = {
    name: '前端小菜鸟吖',
    age: 24,
    info: {
      city: '深圳  '
    }
  }
  const proxyData = reactive(data)
```

## v-model 参数的用法？

**父组件**

![v-model1](/v-model1.png)

**子组件**

![v-model2](/v-model2.png)

## watch 和 watchEffect 的区别
* 两者都可监听data属性变化
* watch 需要明确监听哪个属性
* watchEffect 会根据其中的属性，自动监听其变化

## setup 中如何获取组件实例?
* 在setup 和其他Composition API 中没有this
* 可通过 getCurrentInstance 获取当前实例
* 若通过 Options API 可照常使用this

## Vue3为何比Vue2快？

**Proxy 响应式**

**PatchFlag**
* 编译模板时，动态节点做标记
* 标记，分为不同的类型，如 TEXT PROPS
* diff 算法时，可以区分静态节点，以及不同类型的动态节点

**hoistStatic**
* 将静态节点定义，提升到父作用域，缓存起来
* 多个相邻的静态节点，会被合并起来
* 典型的拿空间换时间的优化策略

**cacheHandler**
* 将使用到的方法放在一个变量缓存起来
* 典型的拿空间换时间的优化策略

**SSR优化**
* 静态节点直接输出，绕过了vdom
* 动态节点，还是需要动态渲染

**tree-shaking**
* 编译时，根据不同的情况 引入不同的API

## Vite 是什么？
* 一个前端打包工具，Vue作者发起的项目
* 借助Vue的影响力，发展较快，和webpack竞争

### Vite为何启动快？
* 开发环境使用Es6 Model,无需打包 ———— 非常快
* 生产环境使用rollup,并不会快很多

## Composition API 和 React Hooks对比
* 前者 setup 只会被调用一次，而后者函数会被多次调用
* 前者无需 useMemo useCallback,因为 setup 只调用一次
* 前者 reactive + ref 比后者 useState,要难理解

