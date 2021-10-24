/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  reactStrictMode: true,
  cssModules: true,
  analyzeBrowser: false,
  images: {
    domains: ['avatars.githubusercontent.com']
  },
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'server',
      analyzerHost: '0.0.0.0',
    },
    browser: {
      analyzerMode: process.env.ENV === 'production' ? 'static' : 'server',
      reportFilename: path.resolve(__dirname, './static/report.html'),
      analyzerHost: '0.0.0.0',
    },
  },
  cssLoaderOptions: {
    localIdentName: '[local]__[hash:base64:5]',
  },
  sassLoaderOptions: {
    outputStyle: 'compressed',
  },
  progressBar: {
    profile: false
  },
  webpack(config, options) {

    // config.module.rules.push({
    //   test: /\.(png|svg|eot|otf|ttf|woff|woff2)(\?\S*)?$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 3000,
    //       publicPath: '/_next/static',
    //       outputPath: 'static/',
    //     },
    //   },
    // });

    config.module.rules.forEach(rule => {
      if (rule.test && (rule.test.toString().includes('.scss') || rule.test.toString().includes('.css'))) {
        rule.rules = rule.use.map(useRule => {
          if (typeof useRule === 'string') {
            return {
              loader: useRule,
            };
          }
          if (useRule.loader.startsWith('css-loader')) {
            return {
              oneOf: [
                {
                  test: /\.global\.scss$/,
                  loader: useRule.loader,
                  options: {
                    ...useRule.options,
                    modules: false,
                  },
                },
                {
                  test: /\.css$/,
                  loader: useRule.loader,
                  options: {
                    ...useRule.options,
                    modules: false,
                  },
                },
                {
                  loader: useRule.loader,
                  options: useRule.options,
                },
              ],
            };
          }
          return useRule;
        });
        // eslint-disable-next-line no-param-reassign
        delete rule.use;
      }
    });

    return config;
  }
}
