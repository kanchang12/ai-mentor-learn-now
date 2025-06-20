// supabase/functions/ai-services/index.ts
// ONE FILE FOR ALL AI SERVICES

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { service, ...params } = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Route to appropriate AI service
    switch (service) {
      case 'perplexity-chat':
        return await handlePerplexityChat(supabase, params)
      
      case 'perplexity-writing':
        return await handlePerplexityWriting(supabase, params)
      
      case 'leonardo-generate':
        return await handleLeonardoGenerate(supabase, params)
      
      case 'claude-analyze':
        return await handleClaudeAnalyze(supabase, params)
      
      default:
        return new Response(
          JSON.stringify({ error: `Unknown service: ${service}` }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }

  } catch (error) {
    console.error('Error in ai-services function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper function to get API key from database
async function getApiKey(supabase: any, keyName: string) {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('type', 'api_key')
    .eq('key', keyName)
    .single()

  if (error || !data?.value) {
    throw new Error(`${keyName} not configured. Please set it in the admin panel.`)
  }

  return data.value
}

// PERPLEXITY CHAT
async function handlePerplexityChat(supabase: any, params: any) {
  const { message } = params
  const apiKey = await getApiKey(supabase, 'PERPLEXITY_API_KEY')

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1000,
      temperature: 0.2
    }),
  })

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.status}`)
  }

  const data = await response.json()
  
  return new Response(
    JSON.stringify({ 
      response: data.choices[0].message.content,
      success: true 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// PERPLEXITY WRITING
async function handlePerplexityWriting(supabase: any, params: any) {
  const { prompt, writingType = 'general' } = params
  const apiKey = await getApiKey(supabase, 'PERPLEXITY_API_KEY')

  const writingPrompt = `As a professional ${writingType} writer, please help with: ${prompt}`

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'You are an expert writing assistant. Provide clear, well-structured, and engaging content.'
        },
        { role: 'user', content: writingPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.7
    }),
  })

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.status}`)
  }

  const data = await response.json()
  
  return new Response(
    JSON.stringify({ 
      response: data.choices[0].message.content,
      success: true,
      writingType: writingType
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// LEONARDO AI IMAGE GENERATION
async function handleLeonardoGenerate(supabase: any, params: any) {
  const { prompt, width = 1024, height = 1024, numImages = 1 } = params
  const apiKey = await getApiKey(supabase, 'LEONARDO_API_KEY')

  const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
      modelId: 'ac614f96-1082-45bf-be9d-757f2d31c174',
      width: width,
      height: height,
      num_images: numImages,
      guidance_scale: 7,
      num_inference_steps: 15,
      presetStyle: 'DYNAMIC'
    }),
  })

  if (!response.ok) {
    throw new Error(`Leonardo API error: ${response.status}`)
  }

  const data = await response.json()
  
  if (data.sdGenerationJob) {
    const generationId = data.sdGenerationJob.generationId
    
    // Poll for completion
    let attempts = 0
    const maxAttempts = 20
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const statusResponse = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
      })
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json()
        
        if (statusData.generations_by_pk?.status === 'COMPLETE') {
          return new Response(
            JSON.stringify({ 
              success: true,
              images: statusData.generations_by_pk.generated_images,
              generationId: generationId
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
      }
      
      attempts++
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        generationId: generationId,
        message: 'Image generation in progress. Check back in a moment.',
        status: 'processing'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  throw new Error('Failed to start image generation')
}

// CLAUDE AI ANALYSIS
async function handleClaudeAnalyze(supabase: any, params: any) {
  const { prompt, context = '' } = params
  const apiKey = await getApiKey(supabase, 'CLAUDE_API_KEY')

  const fullPrompt = context ? `Context: ${context}\n\nAnalyze: ${prompt}` : prompt

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'x-api-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  
  return new Response(
    JSON.stringify({ 
      response: data.content[0].text,
      success: true
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
