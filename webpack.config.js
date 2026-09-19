import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'development',

    entry: './src/app.js',

    output: {
        clean: true,
    },

    devServer: {
        static: {
            directory: './dist',
        },
        open: true,
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
