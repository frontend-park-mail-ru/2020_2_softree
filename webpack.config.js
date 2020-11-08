const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()];
    }

    return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = extra => {
    const loaders = [
        'style-loader',
        'css-loader',
        // {
        // loader: MiniCssExtractPlugin.loader,
        // options: {
        // hmr: isDev,
        // reloadAll: true,
        // },
        // },
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime'],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(),
        },
    ];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/src/images/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ];

    return base;
};

module.exports = {
    context: path.resolve(__dirname, 'public/src'),
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'public/src/main.js'),
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: optimization(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: isDev,
        historyApiFallback: true,
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.csv$/,
                use: ['csv-loader'],
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
};
