app.post('/generate-pepe', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Prompt recibido:', prompt);
    
    const output = await replicate.run(
      "chiasabah/flux-pepe:e12c9c1e6d649b9f96fd5db9054e73daa337bd893bb97522a533597504b4304a",
      {
        input: {
          prompt: prompt,
          lora_scale: 1.07,
          num_outputs: 1,
          output_format: "png",
          guidance_scale: 3.5,
          output_quality: 90,
          num_inference_steps: 50
        }
      }
    );

    console.log('Output de Replicate:', output);
    
    // Asegurarnos de que output es un array y tiene al menos un elemento
    if (!Array.isArray(output) || !output[0]) {
      throw new Error('Respuesta inválida de Replicate');
    }

    const imageUrl = output[0];
    console.log('URL de imagen a enviar:', imageUrl);

    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ error: 'Error generando la imagen' });
  }
});