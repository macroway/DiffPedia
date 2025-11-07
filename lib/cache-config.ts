/**
 * 缓存配置工具
 * V0.6: 统一管理缓存策略，支持环境变量控制
 */

/**
 * 获取缓存配置
 * 支持通过环境变量 DISABLE_CACHE 控制是否禁用缓存
 * 
 * @returns RequestCache 配置
 * - 'no-store': 禁用缓存（默认，确保数据实时性）
 * - 'default': 使用默认缓存策略
 */
export function getCacheConfig(): RequestCache {
  // 检查环境变量，支持多种格式
  const disableCache = 
    process.env.DISABLE_CACHE === 'true' ||
    process.env.DISABLE_CACHE === '1' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === 'true' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === '1'
  
  // 如果明确设置为 false，则启用缓存
  const enableCache = 
    process.env.DISABLE_CACHE === 'false' ||
    process.env.DISABLE_CACHE === '0' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === 'false' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === '0'
  
  // 默认禁用缓存（确保数据实时性）
  // 如果环境变量未设置，默认禁用缓存
  if (enableCache) {
    return 'default'
  }
  
  // 默认或明确设置为 true 时，禁用缓存
  return 'no-store'
}

/**
 * 获取 Cache-Control 头部配置
 * 
 * @returns Cache-Control 头部值
 */
export function getCacheControlHeader(): string {
  const cacheConfig = getCacheConfig()
  
  if (cacheConfig === 'no-store') {
    return 'no-cache, no-store, must-revalidate'
  }
  
  return 'public, max-age=3600' // 默认缓存 1 小时
}

/**
 * 获取 fetch 选项中的缓存配置
 * 
 * @returns 包含 cache 和 headers 的配置对象
 */
export function getFetchCacheOptions(): {
  cache: RequestCache
  headers?: Record<string, string>
} {
  const cache = getCacheConfig()
  const headers: Record<string, string> = {}
  
  if (cache === 'no-store') {
    headers['Cache-Control'] = getCacheControlHeader()
  }
  
  return {
    cache,
    ...(Object.keys(headers).length > 0 ? { headers } : {}),
  }
}
