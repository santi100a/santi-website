const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point of your application
  mode: 'production',
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, '.'), // Output directory
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Test for .ts and .tsx files
        use: 'ts-loader', // Use ts-loader to transpile TypeScript
        exclude: /node_modules/, // Exclude node_modules
      },
      {
        test: /\.css$/, // Test for .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },
  devtool: 'source-map', // Source maps for debugging
  devServer: {
//  contentBase: path.join(__dirname, 'dist'), // Dev server content base
    compress: true, // Enable gzip compression
    port: 9000, // Dev server port
  },
  plugins: [
    new HTMLWebpackPlugin({ template: 'template/index.html', favicon: 'template/favicon.ico' })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true,
          },
        },
      }),
    ],
  },
};