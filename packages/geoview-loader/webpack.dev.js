/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/',
        },
        compress: true,
        open: true,
    },
};

module.exports = merge(common, config);
