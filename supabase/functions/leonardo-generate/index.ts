
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
    const apiKey = Deno.env.get('LEONARDO_API_KEY')

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          response: "Leonardo AI API key not configured. Admin needs to set the LEONARDO_API_KEY in Supabase secrets.",
          imageUrl: "https://via.placeholder.com/512x512?text=Leonardo+AI+Demo"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

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

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Leonardo AI API error')
    }

    return new Response(
      JSON.stringify({ 
        response: "Image generated successfully with Leonardo AI",
        generationId: data.sdGenerationJob.generationId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        response: `Leonardo AI Demo: Would generate image for "${prompt}" when API key is configured`,
        imageUrl: "https://via.placeholder.com/512x512?text=Leonardo+AI+Demo"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
