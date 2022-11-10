import { defineBuildConfig } from 'unbuild'
import analyzer from 'rollup-plugin-visualizer'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: [
    '@nuxt/types',
  ],
  clean: true,
  declaration: true, // comment this line, if you want to see a proper stat.html file after the build
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  hooks: {
    'rollup:options': (_, options) => {
      if (Array.isArray(options.plugins)) {
        options.plugins.push(
          analyzer({
            emitFile: true,
            gzipSize: true,
          }),
        )
      }
    },
  },
})
