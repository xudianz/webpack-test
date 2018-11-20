## 使用webpack
  初始化package.json --npm init --
1. 全局安装(不推荐，每个人的版本不一样)
  npm install webpack -g
2. 本地安装
  npm install webpack webpack-cli -D
## webpack.config.js
#  entry
  字符串 --- 单页应用
  数组 ----- 两个不关联的文件一起打包
  {} ------- 多页应用 --多个html-webpack-plugin 配置chunks

## 直接允许webpack
  会执行node_modules文件夹.bin下的webpack.cmd
  npx webpack (node 8.5+)
  npx 检测有没有webpack，如果有则执行，没有则先安装
## 配置开发服务器
  npm install webpack-dev-server -D
  配置package.json中的scripts(eg:{ "start: "webpack-dev-server" })
  配置webpack.config.js中的devServer
## 配置loader
# postcss-loader autoprefixer


## 配置插件
# html-webpack-plugin
  template 模板路径
  title 修改模板中的title内容 <%=htmlWebpackPlugin.options.title%> ejs语法
  filename
  hash 打包后的html link和script有哈希字符串 清缓存
  chunks 多页应用，打包后的html引入的js资源 ==> chunks: ['index']
# clean-webpack-plugin
  清除之前打包的文件
  new CleanWebpackPlugin(['./dist'])
# webpack.HotModuleReplacementPlugin
  开启热更新   devServer: {hot: true}
  监听的文件(index.js) 里加上
  if (module.hot) {
    module.hot.accept()
  }
## extract-text-webpack-plugin@next +  webpack4.0+ 抽离样式
  抽离样式到一个css文件里 通过css文件的方式来引用 link标签引入
  =====> 防止js文件中的css内容过于庞大
  disable为true，插件不起作用，设置fallback: 'style-loader'

  抽离后css文件后，修改样式文件，不会热更新
  --->
  const cssExtract = new ExtractTextWebpackPlugin({
    disable: true
  })
  use: cssExtract.extract({
    fallback: 'style-loader'
  })
  --->
  上线时，再抽离

  该插件被mini-css-extract-plugin代替 webpack4.0+
## purifycss-webpack
  You should use it with the extract-text-webpack-plugin
  净化css 不打包 没用到的css
  npm install purifycss-webpack purify-css glob -D
  purifycss-webpack 必须放在html-webpack-plugin后面

  new HtmlWebpackPlugin({
    template: 'src/index.html',
    title: 'webpack',
    hash: true
  }),
  new purifycss-webpack({
    paths: glob.sync(path.resolve('src/*html'))
  })
## copy-webpack-plugin
  复制文件到目标目录
  new CopyWebpackPlugin([
    {
      from: './src/doc',
      to: 'doc'
    }
  ])




