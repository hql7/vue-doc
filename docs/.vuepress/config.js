module.exports = {
  title: 'VUE快速入门',
  description: '一个react风格的vue文档，让新手同学能够快速独立负责一个vue项目而不是只学会一些知识点',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: 'vue官方文档', link: 'https://cn.vuejs.org/' },
      { text: 'GitHub', link: 'https://github.com/hql7' },
    ],
    sidebar: {
      '/components/': [
        {
          title: '核心概念',
          children: [
            'core/hello-world',
            'core/rendering-elements',
            'core/life-cycle',
            'core/computed-watcher',
            'core/conditional-rendering',
            'core/list',
            'core/handling-events',
            'core/form-bind',
            'core/components',
          ]
        },
        {
          title: '高级指引',
          children: [
            'higher/components',
            'higher/router',
            'higher/store',
          ]
        },
      ],
    }
  },
}