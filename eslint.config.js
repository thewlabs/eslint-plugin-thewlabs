import thewlabs from 'eslint-config-thewlabs'
import { tsImport } from 'tsx/esm/api'

const local = await tsImport('./src/index.ts', import.meta.url).then(r => r.default)

export default thewlabs(
  {
    type: 'lib',
  },
  {
    ignores: ['vendor'],
  },
  {
    name: 'tests',
    files: ['**/*.test.ts'],
    rules: {
      // 'thewlabs/indent-unindent': 'error',
    },
  },
)
  // replace local config
  .onResolved((configs) => {
    configs.forEach((config) => {
      if (config?.plugins?.thewlabs) {
        config.plugins.thewlabs = local
      }
    })
  })
