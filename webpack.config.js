const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/Mang.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 3000
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mang.js'
  }
}
