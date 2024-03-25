import webpack from "webpack"
import {buildServer} from "./buildServer"
import {buildResolvers} from "./buildResolvers"
import {buildLoaders} from "./buildLoaders"
import {buildPlugins} from "./buildPlugins"
import {BuildOptions} from "./types/types"

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options

    const isDev = mode === 'development'

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[hash].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildServer(options) : undefined
    }
}