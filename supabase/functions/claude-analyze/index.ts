
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    // Check for API key in Supabase secrets
    const apiKey = Deno.env.get('CLAUDE_API_KEY')

    if (!apiKey) {
      console.error('CLAUDE_API_KEY not found in Supabase secrets')
      return new Response(
        JSON.stringify({ 
          response: "Claude API key not configured in Supabase secrets. Please add CLAUDE_API_KEY to your Supabase Edge Function Secrets.",
          error: "API_KEY_MISSING"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Making request to Claude API...')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'x-api-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `You are a data analysis expert. Analyze this request and provide insights: ${prompt}`
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Claude API error:', response.status, errorText)
      throw new Error(`Claude API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Claude API response received successfully')
    
    return new Response(
      JSON.stringify({ response: data.content[0].text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in claude-analyze function:', error)
    return new Response(
      JSON.stringify({ 
        response: `Error: ${error.message}`,
        error: "FUNCTION_ERROR"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
