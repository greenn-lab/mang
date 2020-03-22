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
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 3000
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'mang.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        // eslint-disable-next-line global-require
        const TerserPlugin = require('terser-webpack-plugin')
        new TerserPlugin({ /* your config */ }).apply(compiler)
      }
    ]
  }
}
