import * as esbuild from 'esbuild';
import { spawn } from 'node:child_process';
import { clientOptions, copyPublic, serverOptions } from './options.js';

const mode = 'development';
let child = null;
let stopping = false;
let restartQueue = Promise.resolve();

function startServer() {
  child = spawn(process.execPath, ['dist/server/index.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
  });

  child.on('exit', (code, signal) => {
    if (stopping || signal) return;
    console.error(`[dev] server exited (${code ?? 'null'})`);
  });
}

function restartServer() {
  restartQueue = restartQueue.then(async () => {
    if (stopping) return;
    if (child && child.exitCode === null && !child.killed) {
      await new Promise((resolve) => {
        child.once('exit', resolve);
        child.kill('SIGTERM');
      });
    }
    if (!stopping) startServer();
  });
  return restartQueue;
}

const clientContext = await esbuild.context({
  ...clientOptions(mode),
  plugins: [
    {
      name: 'log-client',
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length === 0) {
            console.log('[dev] client bundle updated');
          }
        });
      },
    },
  ],
});

const serverContext = await esbuild.context({
  ...serverOptions(mode),
  plugins: [
    {
      name: 'restart-server',
      setup(build) {
        build.onEnd(async (result) => {
          if (result.errors.length > 0) return;
          await copyPublic();
          console.log('[dev] server bundle updated');
          await restartServer();
        });
      },
    },
  ],
});

await esbuild.build(clientOptions(mode));
await copyPublic();
await Promise.all([clientContext.watch(), serverContext.watch()]);

async function shutdown() {
  if (stopping) return;
  stopping = true;
  await Promise.all([clientContext.dispose(), serverContext.dispose()]);
  if (child && child.exitCode === null) {
    child.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown();
});
process.on('SIGTERM', () => {
  shutdown();
});
