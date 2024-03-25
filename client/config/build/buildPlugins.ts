import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {Configuration} from "webpack"
import {BuildOptions} from "./types/types"

export function buildPlugins({paths, mode}: BuildOptions): Configuration['plugins'] {
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html
        })
    ]

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            })
        )

    }

    return plugins
}