const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'development',
  /*output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },*/
  /*plugins: [
    new CopyPlugin({
      patterns: [
        { from: "", to: "" },
        { from: "", to: "" },
      ],
    }),
  ],*/
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            //plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
}