/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config({
  path:'./.env'
})
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
  }
}
