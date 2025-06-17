
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
    const apiKey = Deno.env.get('LEONARDO_API_KEY')

    if (!apiKey) {
      console.error('LEONARDO_API_KEY not found in Supabase secrets')
      return new Response(
        JSON.stringify({ 
          response: "Leonardo AI API key not configured in Supabase secrets. Please add LEONARDO_API_KEY to your Supabase Edge Function Secrets.",
          error: "API_KEY_MISSING"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Making request to Leonardo AI API...')

    const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // Leonardo Creative v1.1
        width: 512,
        height: 512,
        num_images: 1,
        guidance_scale: 7,
        num_inference_steps: 15
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Leonardo AI API error:', response.status, errorText)
      throw new Error(`Leonardo AI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Leonardo AI API response received successfully')
    
    return new Response(
      JSON.stringify({ 
        response: "Image generation started successfully with Leonardo AI",
        generationId: data.sdGenerationJob.generationId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in leonardo-generate function:', error)
    return new Response(
      JSON.stringify({ 
        response: `Error: ${error.message}`,
        error: "FUNCTION_ERROR"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
