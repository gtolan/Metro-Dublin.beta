const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const appConfig =  require('./app.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');

// const lazyloadCSS = new ExtractTextPlugin('./src/styles/above-fold-inline.css');


// file types & file links
const resource = {
    // js: { somejs: '//cdn/bootstrap/bootstrap.min.js' },
    css: { bootstrap: '/style.css' },
    mob: { mobile: '/mobile.css' },
    desk: { desktop: '/desktop.css' },
    img: { 'the-girl': '//cdn/img/the-girl.jpg' }
}

const tpl = {
    img: '<img src="%s">',
    css: '<link rel="stylesheet" type="text/css" href="%s" inline>',
    mob: '<link rel="stylesheet" type="text/css" href="%s" media="screen and (max-width: 900px)">',
    desk: '<link rel="stylesheet" type="text/css" href="%s" media="screen and (min-width: 900px)">',
    js: '<script type="text/javascript" src="%s"></script>'
}

// Webpack Configuration
const config = {

    // Entry
    entry:{ app: ['./src/js/index.js', './src/styles/main.scss'],
    },
    // Output
    mode: "production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Loaders
    module : {
        rules : [
            {
                test: /\.s?[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"

                ]
            }
            ,
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    // Plugins
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
            // filename: "[name].css",
            // chunkFilename: "[id].css"
        }),

        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:[
                    autoprefixer()
                ]
            }
        }),

        new htmlWebpackPlugin({
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'description': appConfig.description,
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                // Will generate: <meta name="theme-color" content="#4285f4">
            },
            title: appConfig.appName,
            myPageHeader: 'Hello World',
            template: './src/index.html',
            filename: 'index.html',
            hash: false
        }),


        new HtmlReplaceWebpackPlugin([
            {
                pattern: 'foo',
                replacement: '`foo` has been replaced with `bar`'
            },
            {
                pattern: '@@title',
                replacement: 'html replace webpack plugin'
            },
            {
                pattern: '@@lang',
                replacement: appConfig.language
            },
            {
                pattern: /(<!--\s*|@@)(css|js|img|mob|desk):([\w-\/]+)(\s*-->)?/g,
                replacement: function(match, $1, type, file, $4, index, input) {
                    // those formal parameters could be:
                    // match: <-- css:bootstrap-->
                    // type: css
                    // file: bootstrap
                    // Then fetch css link from some resource object
                    // var url = resources['css']['bootstrap']

                    var url = resource[type][file]

                    // $1==='@@' <--EQ--> $4===undefined
                    return $4 == undefined ? url : tpl[type].replace('%s', url)
                }
            }
        ])

    ]
    // OPTIONAL
    // Reload On File Change
    // watch: true,
    // Development Tools (Map Errors To Source File)

};
// Exports
module.exports = config;