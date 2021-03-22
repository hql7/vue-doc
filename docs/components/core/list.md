# 列表渲染
我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items `形式的特殊语法，其中 `items` 是源数据数组，而 `item `则是被迭代的数组元素的别名。
## 简单例子
当你遇到一个List或者一个select下拉框，通常我们不会一行一行代码将所有选项都敲出来，事实上你也无法得知具体有列表中多少条数据，因此vue提供了列表渲染来解决这个问题，它看起来像是在dom结构中写了一个for循环：
```vue
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id"> {{ item.name }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {id:'1', name: '学习js'}
        {id:'2', name: '学习vue'}
        {id:'3', name: '整个牛项目'}
      ]
    }
  }
}
</script>
```
页面上会显示出来一个ul列表。  
> 还记得上节`元素渲染`讲的两种数据绑定形式吗？ 冒号+属性`:key="item.id"`和双花括号 {{`item.name`}}

## 在v-for里使用对象
不常见的用法
```vue
<template>
  <div>
    <ul>
      <li v-for="value in object" :key="value"> {{ value }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      object: {
        name: 'LiLei',
        age: 27,
        lover:'HanMeimei'
      }
    }
  }
}
</script>
```
## for循换的数据源处理
很多时候我们接收到的后台api数据都会是一个列表的形成，v-for也是vue中使用频率最高的一个核心概念之一。  
但我们平时仍会遇到自己需要加工处理列表数据的问题，这时候我们只需要在生命周期或函数方法中正常的使用js操作即可，页面渲染的部分vue会帮我们处理：
```vue
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
    <ul>
      <li v-for="item in myList" :key="item.id">
        im {{item.name}}, and i like {{item.lover}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [],
      myList: []
    }
  },
  create(){
    setTimeout(() => {
      // 假设我们这里模拟与后台通信并获取数据
      this.list = [
        {id:'1', name: '学习js'}
        {id:'2', name: '学习vue'}
        {id:'3', name: '整个牛项目'}
      ]
      // 或者假设我们需要对后台返回的数据做一些自己的处理: 如给每个数据增加一个time字段，值为当前时间戳
      const newList = [
        {id:'1', name: '学习js'}
        {id:'2', name: '学习vue'}
        {id:'3', name: '整个牛项目'}
      ]
      this.list = newList.map(i=>{
        i.time = +new Date()
      })
    },1500)

    // 或者我们对自己创建的一个变量要做逻辑处理
    this.myList.push({
      id:'1',
      name: 'lilei',
      lover: 'hanmeimei'
    })
  }
}
</script>

```
在v-for循环中, `item in list`中的item可以自行命名，就像日常写js for循环中的i，里面可以拿到当前i的数据，并按需求使用两种数据绑定方式进行处理。

这里需要注意的一点是：为了vue循环生成dom节点的准确性和高性能，必须在for循环中使用`:key=""`，通常是绑定后端数据的id字段，或者其他唯一标识，切记不要使用索引`index`，这将削弱vue的对比算法性能。

## 用在下拉框内的循环
```vue
<template>
  <div>
    <select>
      <option v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {id:'1', name: '学习js'}
        {id:'2', name: '学习vue'}
        {id:'3', name: '整个牛项目'}
      ]
    }
  }
}
</script>
```
## v-if 和 v-for 一起使用
当v-for和v-if一起使用时，v-for具有更高的优先级，这表明v-if将在循环中的每一条元素上都进行一次判断。正常情况下，我们并不推荐这样做。

当我们需要整体判断这个for循环该不该出现时，我们可以将v-if提高到v-for循环的父节点上：
```vue
<template>
  <div>
    <select v-if="list.length">
      <option v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</option>
    </select>
  </div>
</template>
```
当我们需要根据条件只渲染list中满足条件的那些成员时，我们可以这样做：
> 在list中只保留符合条件的数据，或需要源数据的情况下，创建一个新变量来收集符合条件的成员
```vue
<template>
  <div>
    <h3>未完成的任务有：</h3>
    <ul>
      <li v-for="item in unfinishedList" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {id:'1', name: '学习js', done: true}
        {id:'2', name: '学习vue', done: false}
        {id:'3', name: '整个牛项目', done: false}
      ],
      unfinishedList:[]
    }
  },
  create(){
    // 可以新建个变量，筛选出符合条件的成员
    this.unfinishedList = this.list.filter(i => !i.done)
  }
}
</script>
```
> 或者使用计算函数
```vue
<template>
  <div>
    <h3>未完成的任务有：</h3>
    <ul>
      <li v-for="item in unfinishedList" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {id:'1', name: '学习js', done: true}
        {id:'2', name: '学习vue', done: false}
        {id:'3', name: '整个牛项目', done: false}
      ],
    }
  },
  computed: {
    unfinishedList(){
      return this.list.filter(i => !i.done)
    }
  }
}
</script>
```