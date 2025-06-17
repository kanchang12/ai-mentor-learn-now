
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    })

    const body = await req.json()

    // If it's a status check request
    if (body.predictionId) {
      const prediction = await replicate.predictions.get(body.predictionId)
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Image generation
    if (body.type === 'image') {
      const output = await replicate.run(
        "black-forest-labs/flux-schnell",
        {
          input: {
            prompt: body.prompt,
            go_fast: true,
            megapixels: "1",
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 80,
            num_inference_steps: 4
          }
        }
      )
      return new Response(JSON.stringify({ output }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Text generation
    if (body.type === 'text') {
      const output = await replicate.run(
        "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
        {
          input: {
            prompt: body.prompt,
            max_new_tokens: 500,
            temperature: 0.7
          }
        }
      )
      return new Response(JSON.stringify({ output }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ error: "Invalid request type" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
