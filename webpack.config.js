const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack           = require('webpack');

module.exports = {
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', './example/index.js'],
  },
  stats  : 'verbose',
  context: __dirname,
  output : {
    filename: 'bundle.js',
    path    : __dirname + '/build',
  },
  devtool  : 'source-map',
  devServer: {
    contentBase     : __dirname + '/example',
    disableHostCheck: true,
    host            : 'localhost',
    hot             : true,
    inline          : true,
    port            : 5050,
    stats           : 'errors-warnings',
  },
  module: {
    rules: [
      {
        test   : /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use    : ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/i,
        use : ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use : [
          {
            loader : 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test   : [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader : require.resolve('url-loader'),
        options: {
          limit: 10000,
          name : 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './example/index.html',
    }),
  ],
};
