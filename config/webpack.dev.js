const path = require('path')

const uglify = require('uglifyjs-webpack-plugin') //js压缩 直接引入,无需安装
const htmlWebpackPlugin = require('html-webpack-plugin') //打包的时候自动再dist文件夹下面生成
const extractTextWebpackPlugin = require('extract-text-webpack-plugin') // 分离css的插件

var website = {
  publicPath: 'http://localhost:8888/' // 打包后相对路径变为绝对路径
  // 这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
  // publicPath: 'http://10.119.23.90:8888/' 
}

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    main2: './src/main2.js'
  },
  output: {
    path: path.resolve(__dirname,'../dist'), 
    filename: '[name].js',
    publicPath: website.publicPath // 处理静态文件路径
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // .babelrc中配置
          // options: {
          //   presets: ['es2015', 'react']
          // }
        }
      },
      {
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({ // 分离css
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader'}
          ]
        }),
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              outputPath: 'images/' // 打包后的图片放到 images文件夹下
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.less$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.scss$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new uglify(), // js压缩的插件
    new extractTextWebpackPlugin('css/index.css'), // css分离后的路径
    new htmlWebpackPlugin({
      minify: { // 压缩html文件
        removeAttributeQuotes: true // 去掉属性的双引号
      },
      hash: true, //为了开发中js有缓存效果，所以加入了hash, 有效避免缓存js
      template: './src/index.html' // 要打包的html模板路径和文件名称
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8888
  }
}