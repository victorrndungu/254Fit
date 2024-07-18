const path = require('path');

module.exports = {
    entry: {
        signup: './src/signup.js',
        signin: './src/signin.js',
         profile: './src/profile.js',
           homepage: './src/homepage.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    mode: 'development',
};
