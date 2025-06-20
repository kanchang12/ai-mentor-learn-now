// src/lib/supabase-interceptor.js
// CREATE THIS FILE ONLY

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const originalSupabase = createClient(supabaseUrl, supabaseAnonKey)

const FUNCTION_MAPPING = {
  'perplexity-chat': 'perplexity-chat',
  'perplexity-writing': 'perplexity-writing', 
  'leonardo-generate': 'leonardo-generate',
  'claude-analyze': 'claude-analyze',
  'perplexity-general': 'perplexity-chat',
  'perplexity-content': 'perplexity-writing'
}

const createFunctionInterceptor = (originalClient) => {
  return {
    invoke: async (functionName, options = {}) => {
      if (FUNCTION_MAPPING[functionName]) {
        const service = FUNCTION_MAPPING[functionName]
        const originalBody = options.body || {}
        
        const newOptions = {
          ...options,
          body: {
            service: service,
            ...originalBody
          }
        }
        
        return await originalClient.functions.invoke('ai-services', newOptions)
      }
      
      return await originalClient.functions.invoke(functionName, options)
    }
  }
}

const supabase = {
  ...originalSupabase,
  functions: createFunctionInterceptor(originalSupabase),
  auth: originalSupabase.auth,
  from: originalSupabase.from.bind(originalSupabase),
  storage: originalSupabase.storage,
  realtime: originalSupabase.realtime,
  channel: originalSupabase.channel.bind(originalSupabase)
}

export { supabase }
