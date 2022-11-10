import { Readable } from 'stream'
import { simpleSitemapAndIndex } from 'sitemap'
import { getDynamicRoutes } from './dynamic-routes'
import type { SitemapModuleParams, SitemapRoute } from './type'

export async function generateSitemap(params: SitemapModuleParams) {
  try {
    const dynamicRoutes = (await getDynamicRoutes(params)) || []
    const staticRoutes: SitemapRoute[] = await import(params.staticSitemapPath)
    await simpleSitemapAndIndex({
      limit: params.chunkSize,
      hostname: params.hostname,
      destinationDir: params.sitemapPath,
      gzip: false,
      sourceData: Readable.from([...dynamicRoutes, ...staticRoutes]),
    })
  }
  catch (e) {
    params.onError(e)
  }
}
