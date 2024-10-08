const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        Root: paths.srcDir,
        store: paths.storeDir,
        modules: paths.modulesDir,
        common: paths.commonDir,
        config: paths.configDir,
        factory: paths.factoryDir,
        theme: paths.themeDir
      },
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'React Adventure Development',
        favicon: './public/favicon.ico',
        template: './public/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        'process.env.IS_PRODUCTION': isProduction,
        'process.env.BUILD_TYPE': JSON.stringify(env.BUILD_TYPE)
      })
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|jpeg|webp|gif|svg|m4a|mp3|wav|aac)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]?[hash]'
              }
            }
          ]
        }
      ]
    },
    devServer: {
      host: 'localhost',
      port: 8080,
      static: './build',
      hot: true,
      historyApiFallback: true,
      client: {
        overlay: false
      }
    }
  };
};
