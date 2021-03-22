# 组件基础
每个.vue文件都是一个组件，有的是输出一个最小dom元素如按钮、有个是输出一个功能如弹出框、有的是输出一个路由视图（可以当做一个页面）如路由引入的.vue文件。

## 简单例子
新建一个button.vue文件
```vue
<template>
  <button>组件按钮</button>
</template>

<script>
export default {
  name: 'TheButton'
}
</script>
```
在另一个vue文件引入
```vue
<template>
  <button>按钮</button>
  引入的组件按钮：<my-button>
</template>

<script>
// 导入组件，路径一般是相对路径，组件名建议大驼峰，在template模板中写成小写字母横线连接的方式
import MyButton from "./button.vue"
export default {
  // 需要将组件注册进来才能使用
  components: { MyButton }
}
</script>
```
## 组件的复用
导入的组件可以在template内任意位置使用任意此，且互相隔离不会干扰！
丰富button.vue文件
```vue
<template>
  <button @click="handleClick">点我：{{ num }}</button>
</template>

<script>
export default {
  name: 'TheButton',
  data(){
    return {
      num: 0
    }
  },
  methods: {
    handleClick(){
      this.num++
    }
  }
}
</script>
```
在另一个vue文件引入。你会发现这个组件使用了三次，但是内部数据并不会互相干扰。
```vue
<template>
  <div>
    <my-button>
    <my-button>
    <my-button>
  </div>
</template>

<script>
// 导入组件，路径一般是相对路径，组件名建议大驼峰，在template模板中写成小写字母横线连接的方式
import MyButton from "./button.vue"
export default {
  // 需要将组件注册进来才能使用
  components: { MyButton }
}
</script>
```
## 通过 Prop 向子组件传递数据
button.vue文件：可以通过props拿到父组件传进来的参数，使用时和data内的变量一样仍然使用`this.变量名`。
```vue
<template>
  <button :class="className"> {{ title }} </button>
</template>

<script>
export default {
  name: 'TheButton',
  props: {
    className: {
      type: String // 要求字符串类型
    },
    title: {
      type: String,
      default: '登录' // 默认值
    }
  }
}
</script>
```
另一个.vue文件：
```vue
<template>
  <div>
    <my-button className="button-one" title="按钮一">
    <my-button :className="buttonTwo.className" :title="buttonTwo.title" >
  </div>
</template>

<script>
// 导入组件，路径一般是相对路径，组件名建议大驼峰，在template模板中写成小写字母横线连接的方式
import MyButton from "./button.vue"
export default {
  // 需要将组件注册进来才能使用
  components: { MyButton },
  data(){
    return {
      buttonTwo: {
        className: 'button-two',
        title: '按钮二'
      }
    }
  }
}
</script>
```
## 监听子组件事件
子组件通过`this.$emit()`抛出事件
```vue
<template>
  <button :class="className" @click="handleClick"> {{ title }} </button>
</template>

<script>
export default {
  name: 'TheButton',
  props: {
    className: {
      type: String // 要求字符串类型
    },
    title: {
      type: String,
      default: '登录' // 默认值
    }
  },
  methods: {
    handleClick(){
      // emit函数第一个字段是名称，随便起，后面可以跟n个参数
      this.$emit('myClick', this.title, 'hi')
    }
  }
}
</script>
```
另一个.vue文件：
```vue
<template>
  <div>
    // 注意，子组件emit方法的第一个参数是什么，在父组件就通过v-on（即@）来监听什么
    // 监听指向的函数不要带括号，否则难以接收子组件穿回来的值
    <my-button className="button-one" title="按钮一" @myClick="childClick" />
    <my-button :className="buttonTwo.className" :title="buttonTwo.title" @myClick="childClick" />
  </div>
</template>

<script>
// 导入组件，路径一般是相对路径，组件名建议大驼峰，在template模板中写成小写字母横线连接的方式
import MyButton from "./button.vue"
export default {
  // 需要将组件注册进来才能使用
  components: { MyButton },
  data(){
    return {
      buttonTwo: {
        className: 'button-two',
        title: '按钮二'
      }
    }
  },
  methods: {
    childClick(title, msg){
      // 子组件emit的第二到n个参数都可以在这里接收到
      console.log(title, msg)
    }
  }
}
</script>
```
## 通过插槽分发内容
插槽可以理解为在组件内开辟一块空地，其他使用此组件的地方都可以通过插槽来完全使用这片空地。
插槽和props各自有自身的使用场景：slot插槽通常用于接收`内容`：简单不变动的文字或复杂的模快等。
> 子组件：
```vue
<template>
  <button :class="className"> 
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TheButton',
  props: {
    className: {
      type: String // 要求字符串类型
    },
  }
}
</script>
```
> 父组件：
```vue
<template>
  <div>
    <my-button className="button-one">父组件的内容</my-button>
    <my-button :className="buttonTwo.className">通过slot插入子组件的内部</my-button>
  </div>
</template>

<script>
// 导入组件，路径一般是相对路径，组件名建议大驼峰，在template模板中写成小写字母横线连接的方式
import MyButton from "./button.vue"
export default {
  // 需要将组件注册进来才能使用
  components: { MyButton },
  data(){
    return {
      buttonTwo: {
        className: 'button-two',
        title: '按钮二'
      }
    }
  }
}
</script>
```