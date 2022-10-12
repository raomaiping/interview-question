module.exports = {
  title: '前端小菜鸟吖', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '前端小菜鸟吖 Javascript 算法 数据结构 面试题', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link',
      { rel: 'icon', href: 'https://q1.qlogo.cn/g?b=qq&nk=2582395486&s=640' },
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    logo: 'https://q1.qlogo.cn/g?b=qq&nk=2582395486&s=640', //网页顶端导航栏左上角的图标
    //顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '首页', link: '/' },
      {
        text: '综合面试题',
        link: '/comprehensive-interview-questions/vue2.md',
      },
      {
        text: '700道JS面试题',
        link: '/700-interview-questions/1-50.md',
      },

      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: '外链', //默认显示
        items: [
          { text: 'Github', link: 'https://github.com/raomaiping' },
          { text: '掘金', link: 'https://juejin.cn/user/588993965598407' },
        ],
      },
    ],

    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/700-interview-questions/': [
        {
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [['1-50.md', '1 ~ 50道']],
        },
      ],
      '/comprehensive-interview-questions/': [
        {
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['vue2.md', 'Vue2'],
            ['vue3.md', 'Vue3'],
          ],
        },
      ],
    },
  },
  base: '/interview-questions/',
  // markdown: {
  //   lineNumbers: true, // 显示行号
  // },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    '@vuepress/medium-zoom',
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: [
          'blackCat',
          'whiteCat',
          'haru1',
          'haru2',
          'haruto',
          'koharu',
          'izumi',
          'shizuku',
          'wanko',
          'miku',
          'z16',
        ],
      },
    ],
    [
      'copyright',
      {
        authorName: '前端小菜鸟吖 QQ：2582395486', // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
      },
    ],
    [
      'copy-copyright',
      {
        copyright: true,
        authorName: '前端小菜鸟吖 QQ：2582395486',
        tip: {
          content: '复制成功',
          title: '提示',
        },
        copyText: '复制代码',
      },
    ],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public',
      },
    },
  },
}
