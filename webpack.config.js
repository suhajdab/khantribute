const webpack = require("webpack")
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        keep_infinity: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: "source-map",
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "./dist/[name].css"
        })
    ],
    entry: {
        khantribute: [
            "./js/khantribute.js",
            "./css/style.scss"
        ]
    },
    output: {
        path: __dirname + "/",
        filename: "dist/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.(css|sass|scss)$/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, "node_modules")]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "js"),
            path.resolve(__dirname, "css"),
            path.resolve(__dirname, "img"),
            path.resolve(__dirname, "node_modules")
        ]
    }
};
