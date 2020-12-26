
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin({
                terserOptions: {
                    mangle: false,
                },
            }),
        ];
    }

    return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);

const cssLoaders = extra => {
    const loaders = ['style-loader', 'css-loader'];

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

    return loaders;
};

const fileLoaders = () => {
    const loaders = [
        {
            loader: 'file-loader',
            options: {
                limit: 8192,
                name() {
                    return isDev ? '[path][name].[ext]' : '[contenthash].[ext]';
                },
            },
        },
    ];

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
                    to: path.join(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'public/src/serviceWorker.js'),
                    to: path.join(__dirname, 'dist'),
                },
            ],
        }),
        new webpack.EnvironmentPlugin({
            SOFTREE_HOST: 'https://api.softree.group'
        })
    ];

    return base;
};

module.exports = {
    context: path.join(__dirname, 'public/src'),
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'public/src/main.js'),
    },
    output: {
        filename: filename('js'),
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.svg'],
        alias: {
            '@': path.join(__dirname, 'src'),
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
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: fileLoaders(),
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
};
