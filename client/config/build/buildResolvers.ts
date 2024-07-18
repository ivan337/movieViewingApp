import path from 'path';

import { Configuration } from 'webpack';

import { BuildOptions } from './types/types';

export function buildResolvers(
  options: BuildOptions,
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  };
}
