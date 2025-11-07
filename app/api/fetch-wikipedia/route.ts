import { type NextRequest, NextResponse } from "next/server"
import { parseWikipediaHTML } from "@/lib/content-parser"
import { cleanWikipediaHTML, combineCleanedContent } from "@/lib/content-cleaner"
import * as cheerio from "cheerio"
import { fetchWithProxy, isProxyConfigured } from "@/lib/proxy-config"
import { getCacheConfig, getFetchCacheOptions } from "@/lib/cache-config"



