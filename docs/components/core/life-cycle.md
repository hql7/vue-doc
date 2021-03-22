# 生命周期

你可以简单理解为，生命周期是一个.vue文件从进入，到离开中间的执行过程中触发的一系列的、有先后循序的回调函数。  
其中大部分生命周期函数只会在.vue文件进入到离开执行一次。

## 先看生命周期图示
![vue生命周期](../../images/lifecycle.png)
## 简单描述
这些个先后触发的钩子函数即是一个.vue文件从出生（进入）到死亡（离开）各个阶段。
可以简单描述为：
- beforeCreate --- 创建前 --- dom、变量、方法、计算函数等均不能访问
  - 可以做一些载入loading等
- created --- 创建完成 --- dom尚未挂载，data、props、computed、methods等均可访问 --- `常用`
  - 一般在这里进行一进页面就需要发出的请求或一些js逻辑操作。
- beforeMount --- 挂载前 --- dom已经初始化，但未挂载
- mounted --- 挂载完成 --- dom已挂载 --- `略常用`
  - 如有必要，可进行一些dom操作
  - 不能保证子孙组件dom也挂载完成，如真要操作dom且是子孙组件的dom，可以写在`this.nextTick(() => {})`方法内
- beforeUpdate --- 更新前
  - data中的状态已更新，但视图未显示新数据
  - 此函数中再次修改数据不会再触发更新
- updated --- 更新完成
  - 更新完成，界面显示新数据
  - 再次修改数据会重新触发 beforeUpdate->updated 
  - 上面两个生命周期函数会在数据变动时触发，一个.vue文件一生可以触发多次，其他生命周期函数只会触发一次。
- beforeDestroy --- 实例销毁前 --- `略常用`
  - 可以移除绑定监听、时间调用等
- destroyed 实例销毁完成 
  - .vue文件离开前最后触发的函数。

## 用法示例
```vue
<template>
  <div>
    Hello, {{name }}
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
    }
  },
  created(){
    // 适合发出请求
    this.name = 'created'
  },
  mounted(){
    // 适合需要操作dom
    this.name = 'mounted';
    // 确保子孙组件
    this.$nextTick(() => {
      this.name = 'nextTick'
    })
  }
}
</script>
```