const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const appConfig =  require('./app.config.js')

require("babel-register");

// file types & file links
const resource = {
    js: { bootstrap: '//cdn/bootstrap/bootstrap.min.js' },
    css: { bootstrap: '//cdn/bootstrap/bootstrap.min.css' },
    img: { 'the-girl': '//cdn/img/the-girl.jpg' }
}

const tpl = {
    img: '<img src="%s">',
    css: '<link rel="stylesheet" type="text/css" href="%s">',
    js: '<script type="text/javascript" src="%s"></script>'
}

// Webpack Configuration
const config = {

    // Entry
    entry: './src/js/removed-types/app.js',
    // Output
    // mode: "development",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js',
    },
    // Loaders
    module: {
        rules : [
            // JavaScript/JSX Files
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // CSS Files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    // Plugins
    plugins: [
        new htmlWebpackPlugin({
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
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
                pattern: /(<!--\s*|@@)(css|js|img):([\w-\/]+)(\s*-->)?/g,
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