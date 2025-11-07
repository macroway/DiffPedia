/**
 * 客户端缓存配置工具
 * V0.6: 客户端版本的缓存配置
 */

export function getClientCacheOptions(): {
  cache: RequestCache
  headers?: Record<string, string>
} {
  // 客户端只能读取 NEXT_PUBLIC_ 开头的环境变量
  const disableCache = 
    process.env.NEXT_PUBLIC_DISABLE_CACHE === 'true' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === '1'
  
  const enableCache = 
    process.env.NEXT_PUBLIC_DISABLE_CACHE === 'false' ||
    process.env.NEXT_PUBLIC_DISABLE_CACHE === '0'
  
  if (enableCache) {
    return { cache: 'default' }
  }
  
  // 默认禁用缓存
  return {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  }
}
