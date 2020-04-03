require('ts-node/register')

const { configure } = require('japa')
configure({
  files: [
    // 'test/**/*.spec.ts',
    'test/kernel.spec.ts',
    // 'test/manifest.spec.ts',
  ],
})
