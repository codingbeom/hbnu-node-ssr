import * as esbuild from 'esbuild';
import { clientOptions, copyPublic, serverOptions } from './options.js';

await copyPublic();
await Promise.all([
  esbuild.build(clientOptions('production')),
  esbuild.build(serverOptions('production')),
]);

console.log('build complete → dist/');
