import { viteBundler } from '@vuepress/bundler-vite'

import { defaultTheme } from '@vuepress/theme-default'

import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '',
  description: '啥也没得说',
  base: '/richard-blog/',
  bundler: viteBundler(),

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
          },
          {
            text: '设计模式',
            link: '/js/设计模式.md'
          },
          {
            text: '数据结构和算法',
            link: '/js/数据结构和算法.md'
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
      {
        text: '工程化',
        link: '/engineering/',
        children: [
          {
            text: '代码规范',
            children: [
              {
                text: 'eslint',
                link: '/engineering/standard/eslint.md'
              },
              {
                text: 'prettier',
                link: '/engineering/standard/prettier.md'
              },
              {
                text: '规范搭建',
                link: '/engineering/standard/规范搭建.md'
              },
              {
                text: '语法规范',
                link: '/engineering/standard/语法规范.md'
              }
            ]
          },
          {
            text: '项目构建',
            children: [
              {
                text: 'webpack',
                link: '/engineering/webpack.md'
              }
            ]
          }
        ]
      },
      { text: '学习路线', link: '/studyRoute/' },
      { text: '项目', link: '/projectSolution/' },
      { text: '待写', link: '/noWrite/' },
      { text: '前端监控', link: '/jiankong/' }
    ],
    sidebar: 'auto'
    // sidebar: {
    //   '/html/': [
    //     {
    //       text: 'HTML',
    //       children: ['/html/']
    //     }
    //   ],
    //   '/css/': [
    //     {
    //       text: 'CSS',
    //       children: ['/css/']
    //     }
    //   ],
    //   '/engineering/': [
    //     {
    //       text: '代码规范',
    //       children: ['/engineering/eslint.md', '/engineering/prettier.md']
    //     },
    //     {
    //       text: '项目构建',
    //       children: ['/engineering/webpack.md']
    //     }
    //   ]
    // }
  })
})
