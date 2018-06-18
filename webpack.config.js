const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const museUiThemePath = path.join(__dirname, 'node_modules', 'muse-ui', 'src/styles/themes/variables/default.less');
module.exports = {
    entry: {
        service_worker: './src/service_worker/index.js',
        app: './src/app/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        // the target directory for all output files

        filename: '[name].js',
        // the file name template for all entry chunks

        publicPath: '/assets/'
        // the url to the output directory resolved relative to the HTML page

    },

    module: {
        // configuration regarding modules

        rules: [
            // rules for modules (configure loaders, parser options, etc)
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                museUiTheme: `"${path.join(__dirname, 'node_modules', 'muse-ui', 'src/styles/themes/variables/default.less')}"`
                            }
                        }
                    }
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                // other vue-loader options go here
                }
            },
            {
                test: /\.(js)?$/,
                include: [
                    path.resolve(__dirname, 'src/service_worker'),
                    path.resolve(__dirname, 'src/app')
                ],
                exclude: [
                ],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                //  - Use RegExp only in test and for filename matching
                //  - Use arrays of absolute paths in include and exclude
                //  - Try to avoid exclude and prefer include

                loader: 'babel-loader',
                // the loader which should be applied, it'll be resolved relative to the context
                // -loader suffix is no longer optional in webpack2 for clarity reasons

                options: { 
                    presets: ['env']
                },
                // options for the loader

            }
        ]
    },

    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        modules: [
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        // directories where to look for modules

        extensions: ['.js', '.vue', '.json', '.css'],
        // extensions that are used

        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'muse-components': 'muse-ui/src'
        }

    },

    devtool: 'source-map',
    // enhance debugging by adding  meta info for the browser devtools

    context: __dirname,
    // the home directory for webpack
    // the entry and module.rules.loader option is resolved relative to this directory

    target: 'web',
    // the environment in which the bundle should run
    // changed chunk loading behavior and available modules

    plugins: [
        new VueLoaderPlugin(),
    ],
    mode: 'development'
}
