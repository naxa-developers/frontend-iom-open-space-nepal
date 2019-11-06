const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        // publicPath: '/'
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
    // devServer: {
    //     contentBase: path.join(__dirname, "public"),
    //     watchContentBase: true,
    //     publicPath: "/dist/",
    //     historyApiFallback: true,
    // },
  
    plugins: [
        new HtmlWebpackPlugin({
                template:'./src/index.html'
            })
       
                
            // "@babel/plugin-proposal-class-properties",
            // {
            //    "loose": true
            //  }
                
            // new MiniCssExtractPlugin({
            //          filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            //       chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            //         })
    ]
}