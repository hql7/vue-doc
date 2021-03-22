# 表单输入绑定
你可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。  
`v-model`是一个语法糖，简单来说：当输入框内的输入值变化时，`v-model`绑定的变量值会自动变成输入框内的新值，而当用js给`v-model`绑定变量重新赋值后，页面上的输入框也会自动展示新的内容！

## 简单例子
```vue
<template>
  <div>
    <label>
      修改输入框的值，输入框通过v-model绑定的变量也会跟随变化
      <input v-model="message" />
    </label>
    <p>当前的输入框内容为：{{ message }}</p>
    <button @click="setMessageValue">
      点击使用js将message变量直接赋值为`hi, lilei`，输入框也会自动跟着变化
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      message: '',
    }
  },
  methods: {
    setMessageValue(){
      this.message = 'hi, lilei'
    }
  }
}
</script>
```
## 常用表单元素绑定练习

```vue
<template>
  <form @submit.prevent="onSubmit">
    <div>
      输入框：
      <input v-model="form.input" />
    </div>
    <div>
      单个多选框：
      <input v-model="form.checked" />
    </div>
    <div>
      多个多选框：
      <label>
        vue
        <input type="checkbox" value="vue" v-model="checkeds">
      </label>
      <label>
        react
        <input type="checkbox" value="react" v-model="checkeds">
      </label>
      <label>
        rxjs
        <input type="checkbox" value="rxjs" v-model="checkeds">
      </label>
    </div>
    <div>
      单选按钮：
      <label>
        vue
        <input type="radio" value="vue" v-model="picked">
      </label>
      <label>
        react
        <input type="radio" value="react" v-model="picked">
      </label>
    </div>
    <div>
      下拉框：
      <select v-model="form.selected">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>
    <button @click="onSubmit"></button>
  </form>
</template>

<script>
export default {
  data(){
    return {
      form: {
        input: '',
        checked: true,
        checkeds: ['vue', 'react'],
        picked: 'vue',
        selected: 'vue'
      },
    }
  },
  methods: {
    onSubmit(){
      console.log(this.form)
    }
  }
}
</script>
```
