# hello world

最简易的Vue示例如下

```js
<template>
  <div id="app">
    <h3>hello world</h3>
  </div>
</template>
```
它将在页面展示一个“hello world”的标题。
当然这一步并不需要你手动再重复一遍，为了形成一个完整、普通vue项目的整体概念，这里需要你使用`wl-cli`脚手架创建一个极简的vue项目模板。当然，如果你已经使用vuecli创建了一个项目，那稍微调整即可继续贴合后续的学习路线。

> 安装w-cli
```js
npm i wl-cli -g

wl init myApp
```
根据提示选则`simple-template`模板下载，然后等待生成一个简洁的vue项目工程

> 或者你也可以使用vue-cli来创建一个vue项目，可能这需要你有更多一点的相关知识。

## 预备知识

这里默认你接触过前端，只是没接触过或者没真正用vue独立开发过项目，因此你需要具备一定前端基础认知和编辑器及终端的使用。