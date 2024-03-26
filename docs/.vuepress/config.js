import { defaultTheme } from 'vuepress'

export default {
  title: '',
  description: '啥也没得说',
  base: '/richard-blog/',
  theme: defaultTheme({
    navbar: [
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      {
        text: 'JS',
        link: '/js/',
        children: [
          {
            text: 'JS基础',
            link: '/js/index.md'
            // 该元素将一直处于激活状态
            // activeMatch: '/',
          },
          {
            text: '设计模式',
            link: '/js/设计模式.md',
            // 该元素在当前路由路径是 /foo/ 开头时激活
            // 支持正则表达式
            activeMatch: '^/js/设计模式'
          },
          {
            text: '数据结构和算法',
            link: '/js/数据结构和算法.md',
            // 该元素在当前路由路径是 /foo/ 开头时激活
            // 支持正则表达式
            activeMatch: '^/js/数据结构和算法'
          }
        ]
      },
      { text: 'ES6', link: '/es6/' },
      { text: 'VUE2', link: '/vue2/' },
      { text: 'VUE3', link: '/vue3/' },
      { text: '浏览器', link: '/browser/' },
      { text: '计算机网络', link: '/computerNetwork/' },
      { text: '性能优化', link: '/performance/' },
      { text: '手写代码', link: '/writeCode/' },
      // { text: '代码输出', link: '/代码输出/' },
      { text: '小程序', link: '/wxsp/' },
      { text: '工程化和性能优化', link: '/engineering/' },
      { text: '学习路线', link: '/studyRoute/' },
      { text: '项目', link: '/projectSolution/' },
      { text: '待写', link: '/noWrite/' },
      { text: '前端监控', link: '/jiankong/' }
    ],
    sidebar: 'auto'
    // sidebar: {
    //   '/performance/': [
    //     {
    //       text: '性能优化',
    //       collapsible: true,
    //       children: [
    //         '/performance/index.md'
    //       ],
    //     },
    //   ],

    //   '/html/': [{children: ['']}],
    //   '/css/': [{children: ['']}],
    //   '/js/': [{children: ['']}],
    //   '/es6/': [{children: ['']}],
    //   '/vue2/': [{children: ['']}],
    //   '/vue3/': [{children: ['']}],
    //   '/browser/': [{children: ['']}],
    //   '/computerNetwork/': [{children: ['']}],
    //   '/writeCode/': [{children: ['']}],
    //   '/wxsp/': [{children: ['']}],
    //   '/engineering/': [{children: ['']}],
    //   '/studyRoute/': [{children: ['']}],
    //   '/projectSolution/': [{children: ['']}],
    //   '/noWrite/': [{children: ['']}],
    // },
  })
}
