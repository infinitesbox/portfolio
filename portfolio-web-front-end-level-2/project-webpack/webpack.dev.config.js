const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        'App': './src/app/App.js',
        'index': './src/app/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: '[name]',
            type: 'global',
            export: 'default',
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: '/',
        },
        compress: true,
        port: 9000,
        open: true,
        hot: false,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    resolve: {
        alias: {
            'components': path.resolve(__dirname, './src/components'),
            'app': path.resolve(__dirname, './src/app'),
        },
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-loader',
                        options: {
                            variable: 'data',
                            esModule: false, // other wise "require" in does not work .ejs
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/app/page/view/index.ejs',
            filename: 'index.html',
            scriptLoading: 'blocking',
        })
    ],
};