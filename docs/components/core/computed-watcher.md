# 计算属性 & 方法 & 侦听器

尽管有时候模板内的表达式非常便利，但它的设计初衷是用于简单计算，复杂的判断及逻辑会破坏代码的简洁性。而使用函数计算并返回值的方式，则会出现多个地方需要同一个逻辑计算时，重复调用函数计算多次的情况。  
为此，计算属性的优势就显现出来了：它像一个特殊的函数，可以处理复杂逻辑，且缓存计算结果多次调用也无碍。

所以对于任何复杂逻辑，都应考虑使用计算属性。

## 计算属性（计算函数）
计算属性内创建一个个函数，并且函数应该有一个返回值。计算函数的调用和变量类似：在html模板中用双花括号包裹即可，在export default内的其他地方用this.函数名调用，不要带括号。  
另外不可直接对计算函数赋值。
### 普通例子
```vue
<template>
  <div>
    <!-- 模板内使用表达式 -->
    <p>{{num + 2}}</p>
    <!-- 在dom模板中和使用普通变量类似-->
    <p>计算属性：{{ myNum }}</p>
    <p v-if="myNum === 2021">计算函数 myNum 的 值为：2021</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: 0,
    }
  },
  computed: {
    myNum(){
      if(num < 0){
        return num * 10
      } 
      if(num > 0){
        return num + 8
      }
      return 2021
    }
  },
  created(){
    // 在生命周期中，或者在其他函数中调用计算函数，方式和调用变量类似
    const doubleMyNum = this.myNum * 2;
    console.log(doubleMyNum)
  }
}
</script>
```
## 方法（普通函数）
在vue中，使用js函数的方式也很简单。在methods对象中声明函数，然后在其他地方调用即可。  
```vue
<template>
  <div>
    <p>普通函数：{{ myNum() }}</p>
    <p v-if="myNum() === 2021">计算函数 myNum 的 值为：2021</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: 0,
    }
  },
  methods: {
    myNum(){
      if(num < 0){
        return num * 10
      } 
      if(num > 0){
        return num + 8
      }
      return 2021
    },
    getRemoteData(path){
      fetch(path).then(res => {
        // 处理成功逻辑
        console.log(res)
      }).catch(err => {
        // 处理失败逻辑
        console.log(err)
      })
    }
  },
  created(){
    // 调用普通函数，需要带括号
    const doubleMyNum = this.myNum() * 2;
    console.log(doubleMyNum)
    // 假设发出一个请求函数
    this.getRemoteData('http://example.com/movies.json');
  }
}
</script>
```
可以看出普通函数和上面计算函数写法的略微差异：在script调用中需要带括号、可以处理任何逻辑不一定非要返回值等。
## 计算属性 vs 方法
你可能注意到：上面计算函数和普通函数都能达到同样的显示效果，但是计算函数内部会进行响应式依赖缓存，只有在相关依赖变化时才会重新求值，而且变化后只在第一次进行计算，多次调用会立即返回计算好的缓存值。而用普通函数，当你的函数在html模板内或script内进入调用栈时才会进行计算，且用几次从头计算几次。  
即：依赖变化后自动计算、只计算一次、后续调用立即返回计算好的值 *`VS`* 什么时候用什么时候计算，用多少次从头计算多少次。  
因此计算函数和普通函数的应用场景你应该有了一定的了解。

## 侦听器
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
### 简单例子
vue中，在methods对象中声明函数，然后在其他地方调用即可。  
```vue
<template>
  <div>
    <input type="number" v-model="num" />
  </div>
</template>

<script>
const jsonPath = 'http://example.com/movies.json';
export default {
  data(){
    return {
      num: 0,
    }
  },
  created(){
    // 假设发出一个初始请求函数
    this.getRemoteData();
  },
  watch: {
    // 我们可以监听data、props内的变量，监听谁watch函数以谁命名即可
    // 甚至可以监听计算函数（因为计算函数会返回类似于一个需要计算的变量）
    num(newValue, oldValue){
      // 监听到数据变化，新值为：newValue，旧值为oldValue
      // 假设每当我们监听的数据变动我们都需要重新发出请求或做一些其他逻辑变动
      this.getRemoteData()
    }
  },
  methods: {
    getRemoteData(){
      const formPath = `${jsonPath}?page=${this.num}`
      fetch(formPath).then(res => {
        // 处理成功逻辑
        console.log(res)
      }).catch(err => {
        // 处理失败逻辑
        console.log(err)
      })
    }
  },
}
</script>
```
使用 `watch` 选项允许我们执行异步操作 (请求一个 API 接口)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。也适用于执行需要开销较大的操作。

## 计算属性 vs 侦听属性
Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：***侦听属性***。当你有一些数据需要随着其他数据的变动而变动时，watch可能是一个选择，但是你可能会很容易滥用这个属性。看下面这个例子: 
```vue
<template>
  <div>
    <label>
      你的姓氏：
      <input type="text" v-model="lastName" />
    </label>
    <label>
      你的名字：
      <input type="text" v-model="firstName" />
    </label>
    <p>你的全名是：{{ fullName }}</p>
    <p>使用计算属性的方式，你的全名是：{{ cumpFullName }}</p>
  </div>
</template>

<script>
const jsonPath = 'http://example.com/movies.json';
export default {
  data(){
    return {
      lastName: 'Li',
      firstName: 'Lei',
      fullName: ''
    }
  },
  // 当姓氏或名字改变时，使用侦听属性的方式：
  watch: {
    lastName(value){
      this.fullName = value + this.firstName
    },
    firstName(value){
      this.fullName = this.lastName + value
    }
  },
  // 当姓氏或名字改变时，使用计算属性的方式：
  computed: {
    cumpFullName(){
      return this.lastName + this.firstName
    }
  },
}
</script>
```
对比下来，是不是计算函数简洁清晰许多？试想一下，假若一个数据需要依赖更多的其他数据，那监听属性是不是都无法下笔了。  