# 事件处理
vue中使用`v-on`来绑定dom事件，通常使用简写`@`

## 简单例子
```vue
<template>
  <div>
    <button @click="handleClick">点击事件：{{num}}</button>
    // 表单提交事件
    <form @submit="handleSubmit">
      // change事件
      <select @change="handleChange">
        <option value="vue">vue</option>
        <option value="react">react</option>
        <option value="rxjs">rxjs</option>
      </select>
      // 按键事件
      <input @keyup.enter="handleKeyup" />
    </form>
    // 鼠标事件
    <div :style="{width: '600px', height: '100px'}" @mouseMove="handleMouseMove">
      鼠标移动事件
    <div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: 0,
      location:{
        x:0,
        y:0
      }
    }
  },
  // 函数在html模板中调用时，可以带括号可以不带括号，在script中调用时必须带括号
  // 当在html模板中调用，带括号时，括号内的传什么，在下面函数参数内就接收到什么
  // 当在html模板中调用，不带括号时，在下面函数参数内接收到dom节点的element
  // 当在vue组件上调用时，在下面的函数参数内接收到子组件内 `emit` 函数返回的参数
  methods: {
    handleClick(e){
      this.num++
      console.log(e)
    },
    handleMouseMove(e){
      this.location = {
        x: e.clientX,
        y: e.clientY,
      }
      console.log(e)
    },
    handleSubmit(e){
      console.log(e)
    },
    handleChange(e){
      console.log(e)
    },
    handleKeyup(){
      console.log(e)
    }
  }
}
</script>
```
## 内联处理器中的方法
有时候在html模板内绑定的方法依旧可能需要在函数调用时传递参数
```vue
<template>
  <div>
    <button @click="handleClick(6)">带参数的点击事件</button>
    <button @click="handleClick(num)">以变量为参数的点击事件</button>
    <label>
      带参数的change事件，可以用`$event`继续拿到默认element
      <input @change="handleChange($event, 'hi')" />
    </label>
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
    handleClick(num){
      console.log(num)
    },
    handleChange(e, msg){
      console.log(e, msg)
    }
  }
}
</script>
```
## 事件修饰符
处理阻止冒泡、阻止默认提交事件、快捷绑定某个键的按键事件等
```vue
  <template>
  <!-- 阻止单击事件继续传播 -->
  <a @click.stop="doThis"></a>
  <!-- 阻止默认提交事件 -->
  <form @submit.prevent="onSubmit"></form>
  <!-- 修饰符可以串联 -->
  <a @click.stop.prevent="doThat"></a>
  <!-- 只有修饰符，不绑定事件-->
  <form @submit.prevent></form>
  <!-- 点击事件将只会触发一次 -->
  <a @click.once="doThis"></a>
  <!-- 只有在 `key` 是 `Enter` 时调用 `submit()` -->
  <input @keyup.enter="submit">
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div @click.capture="doThis">...</div>
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div @click.self="doThat">...</div>
<template>
```
