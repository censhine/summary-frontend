module.exports = {
    // 左上角网站标题
    title: '编程笔记',
    themeConfig: {
        displayAllHeaders: true,
        // 左侧目录 - 路由必须与文件名相同
        sidebar: [
            '/',  // 展示README.md
            '/ITERVIEW', // ITERVIEW.md
            '/README', // README.md
            '/ITERVIEW2',
            '/STUDY_SUMMARY'
        ],                     
        // 右上角导航 - 超链接跳转
    },
    // 自定义根路由
    base: '/docs/',
    // markdown 展示效果的相关配置
    markdown: {
        // 显示代码行号
        lineNumbers: true,
    },
    // 更改默认的Webpack配置
    // configureWebpack: {
    //     resolve: {
    //         // 配置文件路径别名
    //         alias: {
    //             '@': '/src'
    //         }
    //     }
    // }
}