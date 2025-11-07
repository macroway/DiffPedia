/**
 * Wikipedia 页面类型标识常量
 * V0.6: 将硬编码的页面类型检查提取为常量
 */
export const WIKIPEDIA_PAGE_TYPES = {
  // 消歧义页面标识
  DISAMBIGUATION_INDICATORS: [
    'disambiguation',
    'list of',
    'may refer to',
  ],
  
  // 搜索结果页面标识
  SEARCH_RESULT_INDICATORS: [
    'search',
  ],
} as const

/**
 * 检查页面标题是否包含消歧义标识
 */
export function isDisambiguationPage(title: string): boolean {
  const titleLower = title.toLowerCase()
  return WIKIPEDIA_PAGE_TYPES.DISAMBIGUATION_INDICATORS.some(
    indicator => titleLower.includes(indicator)
  )
}

/**
 * 检查页面标题是否是搜索结果页面
 */
export function isSearchResultPage(title: string): boolean {
  const titleLower = title.toLowerCase()
  return WIKIPEDIA_PAGE_TYPES.SEARCH_RESULT_INDICATORS.some(
    indicator => titleLower.includes(indicator)
  )
}

/**
 * 检查段落内容是否包含消歧义标识
 */
export function hasDisambiguationContent(text: string): boolean {
  const textLower = text.toLowerCase()
  return WIKIPEDIA_PAGE_TYPES.DISAMBIGUATION_INDICATORS.some(
    indicator => textLower.includes(indicator)
  )
}
