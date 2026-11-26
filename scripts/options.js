import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function clientOptions(mode) {
  const dev = mode === 'development';
  return {
    absWorkingDir: root,
    entryPoints: {
      client: 'src/client/entry.jsx',
      styles: 'src/client/styles.css',
    },
    bundle: true,
    format: 'esm',
    outdir: 'dist/client',
    jsx: 'automatic',
    platform: 'browser',
    target: ['es2022'],
    sourcemap: true,
    minify: !dev,
    legalComments: 'none',
    define: {
      'process.env.NODE_ENV': dev ? '"development"' : '"production"',
    },
  };
}

export function serverOptions(mode) {
  const dev = mode === 'development';
  return {
    absWorkingDir: root,
    entryPoints: ['src/server/index.js'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: 'dist/server/index.js',
    jsx: 'automatic',
    packages: 'external',
    sourcemap: true,
    minify: false,
    legalComments: 'none',
    target: 'node20',
    define: {
      'process.env.NODE_ENV': dev ? '"development"' : '"production"',
    },
  };
}

export async function copyPublic() {
  const source = path.join(root, 'public');
  const destination = path.join(root, 'dist', 'public');
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true });
}
