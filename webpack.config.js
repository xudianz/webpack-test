/**
 * 基于node的 遵循common.js的规范
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const cssExtract = new ExtractTextWebpackPlugin({
  filename: 'css/[name].[hash:8].css',
  disable: false
})
const lessExtract = new ExtractTextWebpackPlugin({
  filename: 'css/[name].[hash:8].less',
  disable: false
})
const PurifyCssWebpack = require('purifycss-webpack')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  // entry: ['./src/index.js', './src/a.js'],
  // entry: {
  //   index: './src/index.js',
  //   a: './src/a.js'
  // }, // 多入口，多出口
  output: {
    path: path.resolve(__dirname, './dist'),// 路径必须为绝对路径
    filename: 'build.[hash:8].js' // 单文件出口
    // filename: '[name].[hash:8].js' // 多出口 
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true, // 服务器压缩
    open: true, // 自动打开浏览器
    hot: true // 开启热更新
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssExtract.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: lessExtract.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/index.html',
    //   title: 'webpack',
    //   hash: true, // 清缓存
    //   // minify: {
    //   //   removeAttributeQuotes: true,
    //   //   collapseWhitespace: true
    //   // }
    //   chunks: ['index'] //index.html 引入 index.js
    // }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'webpack',
      hash: true
    }),
    new CleanWebpackPlugin(['./dist']), // 删除dist文件夹
    new webpack.HotModuleReplacementPlugin(), // 开启热更新
    // new ExtractTextWebpackPlugin({
    //   filename: 'css/index.css'
    // })
    cssExtract,
    lessExtract,
    new PurifyCssWebpack({
      paths: glob.sync(path.resolve('src/*.html'))
    }),// 剔除没用到的css
    new CopyWebpackPlugin([
      {
        from: './src/doc',
        to: 'doc'
      }
    ])
  ],  
  mode: 'development', // 默认production
  resolve: {} // 配置解析
}