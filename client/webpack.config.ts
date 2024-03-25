import 'webpack-dev-server';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from "./config/build/types/types";
import path from "path";

interface EnvVariables {
    mode: BuildMode,
    port: number
}

export default(env:EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html')
    }

    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths
    });
}