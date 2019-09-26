const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const Config = {
    entry: {
        main: './src/app.js',
        socket_processing: './src/assets/js/socket-processing.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    mode: 'none',

    // optimization: {
    //     minimizer: [new UglifyJsPlugin()],
    // },

    plugins: [
        new CopyWebpackPlugin([
            {
              from: './src/index.html',
              to: path.resolve(__dirname, 'public')
            },
            {
              from: './src/assets',
              to: path.resolve(__dirname, 'public')
            }
        ])
    ],
};

module.exports = Config;