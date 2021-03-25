const path = require("path")
// 引入html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 

module.exports = {

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      "chrome": '68',
                      "ie": 11,
                    },
                    "corejs": "3",
                    "useBuiltIns": "usage",
                  }
                ],
              ]
            }
          },
          "ts-loader"
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.less/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions"
                    }
                  ]
                ]
              }
            }
          },
          "less-loader",
        ]
      }
    ]
  },

  // 配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      // 自定义html配置
      // title: "Typescript-Demo",
      // 设置打包生成的html文件模版
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: [".js", ".ts"]
  }
}