export interface BuildPaths {
    html: string;
    output: string;
    entry: string;
    src: string;
    assets: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
}
