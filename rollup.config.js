import babel from 'rollup-plugin-babel'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import server from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

const isDev = process.env.ENV === 'development'
const format = process.env.FORMAT

const config = {
  input: 'src/main.js', // 要打包的文件入口
  output: { // 文件输出配置
    file: `dist/bundle.${format}.js`, // 打包后输出的文件路径（包含文件名）
    format, // 文件的输出格式(cjs是代表CommonJS规范，是Node.js的官方模块化规范，其他常见的格式有amd、umd、es、iife)
    name: 'bundleName' // 包的全局变量名称，使用umd或iife格式必须提供，该变量将作为全局变量挂在windows下
  },
  plugins: [ // 使用插件
    ts(), // 编译
    node(), // 使用第三方库（从node_modules中加载模块）
    cjs(), // 将第三方库转化为ES6版本
    babel({
      exclude: 'node_modules/**' // 排除node_modules文件夹下，只编译我们自己的源码
    })
  ]
}

if (isDev) {
  config.plugins.concat([
    livereload(), // 热更新
    server({ // 开启本地服务器
      open: true,
      port: 1111,
      contentBase: ''
    })
  ])
} else {
  config.output.file = `dist/bundle.${format}.min.js` // 修改打包文件名
  config.plugins.push(terser()) // 压缩代码
}

export default config