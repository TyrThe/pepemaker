require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');

const app = express();
const port = process.env.PORT || 3000;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.use(cors());
app.use(express.json());


app.post('/generate-pepe', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Iniciando generación con prompt:', prompt);
    
    // Iniciar la predicción
    const prediction = await replicate.predictions.create({
      version: "e12c9c1e6d649b9f96fd5db9054e73daa337bd893bb97522a533597504b4304a",
      input: {
        prompt: prompt,
        lora_scale: 1.07,
        num_outputs: 1,
        output_format: "png",
        guidance_scale: 3.5,
        output_quality: 90,
        num_inference_steps: 50
      }
    });

    console.log('Predicción iniciada:', prediction);

    // Esperar a que la predicción termine
    let result = await replicate.predictions.get(prediction.id);
    
    // Esperar hasta que el estado sea "succeeded"
    while (result.status === "processing") {
      console.log('Esperando resultado...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await replicate.predictions.get(prediction.id);
    }

    if (result.status === "succeeded") {
      console.log('Generación exitosa:', result);
      const imageUrl = result.output[0];
      res.json({ imageUrl });
    } else {
      throw new Error(`Generación fallida: ${result.status}`);
    }
    
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ 
      error: 'Error generando la imagen',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});