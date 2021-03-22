# 元素渲染

.vue文件通常由三部分组成，分别是template，script，style分别对应普通html文件的html，script，style。在不做文件抽离的情况下是最接近前端初学者入门时的代码结构，本教程就以这种最简单的代码结构来开启后续的代码教程。

## 将一个元素渲染为DOM
假设下面是一个普通的.vue文件
```vue
<template>
  <div>
    Hello, {{name}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Lilei'
    }
  }
}
</script>
```
我们已经成功创建了第一个 Vue 应用！上面那段代码会在页面上会展示出 " Hello, Lilei " 。
在`data`函数内return出来的变量，可以在`template`元素中使用双花括号来绑定，这是vue在后面做了大量工作，现在数据和 DOM 已经被建立了关联。  

### 除了文本插值，我们还可以像这样来绑定元素 attribute：
```vue
<template>
  <div :title="message">
    Hello, {{name}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Lilei',
      message: 'hi, 这里是一条提示性信息'
    }
  }
}
</script>
```
在`template`模板内的dom元素上，可以使用冒号+属性名的方式来绑定一个属性变量，这是vue指令v-bind的简写。

### 这里有几个概念性的问题
1. Html节点写在一个`<template></template>`标签内，并且vue2.x版本只允许`<template></template>`标签下紧跟一个DOM节点，如果你有多个节点，那么你应该在外面包一层`<div></div>`来确保`<template></template>`标签下只有一个根节点！  
2. secipt代码写在`<script>`内，并且由一个`export default {}`来包裹着.vue的代码实例。其中`data`字段是声明本vue文件变量的地方，并且其必须是一个函数，函数内返回一个变量对象集合。

## 更新已渲染的元素
```vue
<template>
  <div :title="message">
    Hello, {{name}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Lilei',
      message: 'hi, 这里是一条提示性信息'
    }
  },
  create(){
    setTimeout(() => {
      this.name = "Hanmeimei";
      this.message = "哈，你终于看到我了";
    }, 1000)
  }
}
</script>
```
上面这段代码是使用一个定时器，将data里的name字段，在一秒钟后由`Lilei`改为`Hanmeimei`。  
注意我们不再和 HTML 直接交互了。一个 Vue 应用会将其挂载到一个 DOM 元素上，我们只在vue实例内做逻辑操作，vue会帮我们自动将其更新到DOM上。  
在`export default {}`中，this都指向此.vue文件的vue实例，因此你可以在里面使用`this.xxx`拿到你定义的`变量、props、方法函数、计算函数等等`；  
并且如上述代码所示：普通变量的修改更新只需`this.变量名 = 新的变量值`即可。

> 这里涉及到一个生命周期的知识：`create(){}`函数，此知识会在后续`生命周期`一节讲到

### 小知识：vue只更新它需要更新的部分
打开F12可以看到，我们写的1秒钟后更换名字的代码，vue只更换了里面的内容，而没有重新生成外面的`<div></div>`节点；  
同样的，当你的vue文件已经很大很复杂之后，vue仍能从中找到需要更新的那一部分而不是全部重新生成。一定时日后，你可以自行深入双向数据绑定的原理及其性能实现。

## 在html模板内使用表达式
通常我们在script内处理js逻辑部分，在template处理dom结构，但有时候你也许仍想在html模板中使用js表达式来简化操作。  
更多时候我们可以通过函数或者计算函数就能很方便又合理的进行处理，当然具体那种方式还需要你根据实际情况来权衡。
```vue
<template>
  <div>
    Hello, {{name ? name : 'han mei mei'}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Lilei',
    }
  },
}
</script>
```

## 添加一点样式
```vue
<template>
  <div class="hello">
    Hello, {{name}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: 'Lilei'
    }
  }
}
</script>

<style>
.hello {
  color: red;
}
</style>
```
同普通html项目一样，在`<style></style>`标签内完成你的样式即可。
