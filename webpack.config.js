const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: 'babel-loader' 
            },
            {
            test:/\.(s*)css$/,
            use:['style-loader','css-loader', 'sass-loader']

            },
            {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
              },
        ]
    },
  
    plugins: [
        new HtmlWebpackPlugin({
                template:'./src/index.html'
            }),
            // new MiniCssExtractPlugin({
            //          filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            //       chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            //         })
    ]
}