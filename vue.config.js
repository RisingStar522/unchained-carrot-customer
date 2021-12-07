const svgToMiniDataURI = require('mini-svg-data-uri');
module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('svg');
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
            return {
                module: {
                    rules: [
                        {
                            test: /\.svg$/i,
                            use: [
                                {
                                    loader: 'svg-url-loader',
                                    options: {
                                        limit: 10000,
                                        generator: content =>
                                            svgToMiniDataURI(content.toString())
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
        } else {
            // mutate for development...
            return {
                module: {
                    rules: [
                        {
                            test: /\.svg$/i,
                            use: [
                                {
                                    loader: 'svg-url-loader',
                                    options: {
                                        limit: 10000,
                                        generator: content =>
                                            svgToMiniDataURI(content.toString())
                                    }
                                }
                            ]
                        }
                    ]
                },
                devServer: {
                    compress: true,
                    inline: true,
                    port: '3001',
                    allowedHosts: ['customer.unchainedcarrot.com']
                }
            };
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'img/icons/favicon-16x16.png',
            favicon16: 'img/icons/favicon-32x32.png'
        }
    }
};
