import { HuggingFaceInference } from '@huggingface/inference';

export async function POST(req) {
  const { imageUrl } = await req.json();
  const hf = new HuggingFaceInference(process.env.HF_TOKEN);
  
  // 1. Analyze garment
  const analysis = await hf.imageClassification({
    data: await fetch(imageUrl).then(r => r.blob()),
    model: 'google/vit-base-patch16-224'
  });

  // 2. Generate mockup
  const mockupRes = await fetch(`${process.env.MOCKEY_API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MOCKEY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      garment_type: analysis[0].label,
      style: 'upcycled'
    })
  });
  const mockupData = await mockupRes.json();

  return Response.json({
    type: analysis[0].label,
    mockup: mockupData.url,
    instructions: await generateInstructions(analysis[0].label)
  });
}

async function generateInstructions(type) {
  const hf = new HuggingFaceInference(process.env.HF_TOKEN);
  const { generated_text } = await hf.textGeneration({
    model: 'bigscience/bloom',
    inputs: `Generate step-by-step instructions to upcycle a ${type}:`
  });
  return generated_text;
}
