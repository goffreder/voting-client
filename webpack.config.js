var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer?browsers=last 2 versions'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
