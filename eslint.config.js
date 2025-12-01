import antfu from '@antfu/eslint-config'
// @ts-ignore -- no types for this plugin
import drizzle from 'eslint-plugin-drizzle'

export default antfu(
  {
    react: true,
    nextjs: true,
    formatters: true,
    rules: {
      'ts/consistent-type-definitions': ['error', 'interface'],
      'node/no-process-env': ['error'],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md'],
        },
      ],
    },
    plugins: [
      {
        drizzle: drizzle.configs.recommended,
      },
    ],
  },
)
