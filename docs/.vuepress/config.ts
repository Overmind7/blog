import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

// import { searchPlugin } from '@vuepress/plugin-search'
// import { flexsearch } from 'vuepress-plugin-flexsearch-pro'

import { searchProPlugin } from "vuepress-plugin-search-pro"

import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
import { copyCodePlugin } from "vuepress-plugin-copy-code2"

import {cut} from "nodejs-jieba"
// import themeSidebar from 'vuepress-theme-sidebar'
// https://www.cnblogs.com/dingshaohua/p/17432484.html
// 自动边栏


module.exports= {
    base: "/blog/",
    lang: 'zh-CN',
    title: ' 个人学习资料 ',
    description: '这是我的第一个 VuePress 站点',
  //   head:
    theme: defaultTheme({
    // theme: themeSidebar({
        editLink: true,
        navbar: 
        [
        // NavbarItem
            {
                text: 'HOME',
                link: '/',
            },
        // NavbarGroup
            {
                text: 'AI',
                children: [
                    {
                        text: '常见视觉任务',
                        link: '/AI/backbone'
                    },
                    {
                        text: '3D',
                        link: '/AI/3D'
                    },
                    {
                        text: '生成模型',
                        link: '/AI/generate'
                    }
                ],
            },
            {
                text: '编程语言',
                children: [
                    {
                        text: 'C++',
                        link: '/编程语言/CPP'
                    },
                ],
            },

            {
                text:'计算机基础',
                children: [
                    {
                        text:'计算机网络',
                        link:'计算机基础/计算机网络'
                    },
                    {
                        text:'数据库',
                        link:'计算机基础/数据库'
                    },
                    {
                        text:'计算机组成原理',
                        link:'计算机基础/计算机组成原理'
                    },
                    {
                        text:'操作系统',
                        link:'计算机基础/操作系统'
                    }

                ]
            },

            {
                text: '工具',
                children: [
                    {
                        text: '在线公式编辑',
                        link: 'https://www.latexlive.com/##',
                    },
                ],
            },
            {
                text: '常用链接',
                children: [
                    {
                        text: '力扣',
                        link: 'https://leetcode.cn/problemset/all/',
                    },
                    {
                        text: '代码随想录',
                        link: 'https://programmercarl.com/',
                    },
                ]
        }   ,

        // 字符串 - 页面文件路径
        // '/bar/README.md',
        ],


        sidebarDepth: 2,
        sidebar: 
        {
            '/AI/3D': [
                {
                  text: '3D',
                  collapsible: true,
                  children: [ 
                    '/AI/3D/DMTet.md',
                    '/AI/3D/MeshCNN.md',
                    
                    ],
                },
            ],
            // '/AI/generate/diffusion': 
            '/AI/generate': 
            [
                {
                  text: '扩散模型',
                  collapsible: true,
                  children: [ 
                    '/AI/generate/diffusion/DDPM.md',
                    '/AI/generate/diffusion/SDE.md',


                    '/AI/generate/diffusion/StableDiffusion.md',

                    '/AI/generate/diffusion/PoseDiffusion.md',                    
                    ],
                },
                {
                    text: '对抗生成模型',
                    collapsible: true,
                    children: [ 
                      '/AI/generate/gan/GAN生成对抗模型.md',
                      '/AI/generate/gan/StyleGan.md',
                      '/AI/generate/gan/DragGan.md',
  
                      
                      ],
                },
                { text: '返回', link:'/AI/generate/README.md' },
            ],


            '/AI/backbone': 
            [
                { text: '数据集', 
                    collapsible: true,
                    children:[
                        '/AI/backbone/数据集.md',
                    ],
                },

                {
                    text: '激活函数/损失函数/评价指标',
                    collapsible: true,
                    children:[
                        '/AI/backbone/激活函数.md',
                        '/AI/backbone/损失函数.md',
                        '/AI/backbone/评价指标.md',

                    ],
                },


                {
                  text: '常见视觉任务',
                  collapsible: true,
                  children: [ 

                    '/AI/backbone/Swin_Transformer.md',
                    '/AI/backbone/TPS联合剪枝压缩.md',
                    '/AI/backbone/实例分割_mask_rcnn.md',
                    '/AI/backbone/InternImage.md',
                    '/AI/backbone/GCN.md',
                    '/AI/backbone/Vision_GNN.md',
                    '/AI/backbone/DETR.md',
                    
                    ],
                },
            ],

        },

        // 在线编辑设置
        repo: 'Overmind7/blog',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        // repoLabel: '查看源码',

        // 以下为可选的编辑链接选项

        // 假如你的文档仓库和项目本身不在一个仓库：
        // docsRepo: 'vuejs/vuepress',

        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',

        // 假如文档放在一个特定的分支下：
        docsBranch: 'main',

        // 默认是 false, 设置为 true 来启用
        editLinks: true,

        // 默认为 "Edit this page"
        editLinkText: '编辑此页面'

    }),


    // 插件配置
    plugins:[
        // searchPlugin({
        //     // 
        // }),
        // flexsearch(),
        searchProPlugin({
            // https://plugin-search-pro.vuejs.press/zh/guide.html
            // 配置选项

            indexContent: true,
            indexOptions: {
                // 使用 nodejs-jieba 进行分词
                tokenize: (text, fieldName) =>
                  fieldName === "id" ? [text] : cut(text, true),
              },
            customFields: [
                {
                    name: "author",
                    getter: (page) => page.frontmatter.author,
                    formatter: "作者：$content",
                },
                // {
                //     getter: (page) => page.frontmatter.tag,
                //     formatter: "Tag: $content",
                //   },
              ],

          }),


        mdEnhancePlugin({
            // https://plugin-md-enhance.vuejs.press/zh/guide/
            mathjax: true,
            katex: true,
            mermaid: true,
        }),


        copyCodePlugin({
            // 插件选项
          }),





    ],

}
