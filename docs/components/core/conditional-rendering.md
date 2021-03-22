# 条件渲染
顾名思义：是根据一定条件来判断某段内容显示不显示。

我们的日常开发中，遇到某些内容显示隐藏切换弹出等是很普遍的事，在vue中，控制切换一个元素是否显示也相当简单：

## v-if
v-if是控制元素的`渲染`和`不渲染`
### 简单例子
```vue
<template>
  <div>
    <p v-if="num > 0">我被创建出来啦！</p>
  </div>
</template>
```
### 分组条件
控制多个兄弟节点显示隐藏，原理就是将显隐操作移到父级。假如你在加一层div作为他们的父级但无其他作用时，你可以使用`<template>`标签，它不会真正渲染成一个dom节点，可以节省一层dom结构。
```vue
<template>
  <div>
    <template v-if="num > 0"> 
      <p>我是第一段话</p>
      <p>我是第二段话</p>
    </template>
  </div>
</template>
```
### 多个条件
```vue
<template>
  <div>
    <p v-if="num > 5">我大于5</p>
    <p v-else-if="num >= 0">我0-5</p>
    <p v-else>我小于0</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: 3
    }
  }
}
</script>
```
### 用 `key` 管理可复用的元素
Vue 会尽可能高效地渲染元素，因此会尽量的复用元素。这可能会产生其他问题：
```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
动手试一下：两个input只有placeholder不同，你在Username输入的内容，切换成Email时依旧保留在输入框上！  
因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`，此时在dom元素添加key="不同的值"即可解决。

## v-show
v-show是控制元素的`显示`和`隐藏`
```vue
<template>
 <h1 v-show="num > 0">Hello!</h1>
</template>
```
> v-show不能用在`<template>`标签上，因为只是控制display，需要真实渲染；  
> v-show没有v-show-else之类的用法。
## v-if vs v-show
```vue
<template>
  <div>
    <p v-if="layout.if">我被创建出来啦！</p>
    <p v-show="layout.show">我被显示出来啦！</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      layout:{
        if: true,
        show: true
      }
    }
  }
}
</script>
```
此时你可以在页面上看到上面的两句消息。当你将`layout.if`和`layout.show`改为false时，上面的两句话就会消失。  
不同的是：`我被创建出来啦`这句话的内容和DOM节点都从html中移除了；  
而`我被显示出来啦！`这句话的内容和DOM节点只是被改为了`display: none;`。  
因此你知道：  
v-if是完全的移除和创建，每次都有重新创建和删除的开销。  
v-show是一直存在，不管用不用都占据着一定的开销。通常我们将不频繁变动的内容使用v-if，频繁变动的使用v-show。  
当然这只是一般情况，具体可以根据你项目的环境特性和自己的理解还酌情使用。  
另外：通过上面的描述隐藏了另一个信息：v-if每次都会重新走一遍生命周期，而v-show会在一开始走一遍生命周期，后面只是display隐藏显示的变化。


