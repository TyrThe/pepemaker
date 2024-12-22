import { useState } from 'react'
import './styles/Generator.css'
import { generatePepe } from '../services/api'
import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import LocalPepeGallery from './LocalPepeGallery';
import Features from './Features';



function Generator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedImage('');
    
    try {
      const imageUrl = await generatePepe(prompt);
      console.log('URL recibida:', imageUrl);
      
      if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
        setGeneratedImage(imageUrl)
      } else {
        throw new Error('La URL de la imagen no es válida')
      }
    } catch (err) {
      setError(err.message || 'Error al generar la imagen')
      console.error('Error detallado:', err)
    } finally {
      setIsLoading(false)
    }
  };

  const scrollToGenerator = () => {
    document.getElementById('generator-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection onGetStarted={scrollToGenerator} />


      <Features />
      <LocalPepeGallery />
      
      <div id="generator-section" className="container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>

      


        <div className="title-container">
          <h1 className="cartoon-title">PEPE MAKER</h1>
          <div className="trigger-text">
            The trigger word for this model is <span className="trigger-word">PEPE</span>. Be sure to include it in your prompt.
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-container">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how you want your Pepe (e.g.: Pepe chef with hat)"
              required
              disabled={isLoading}
            />
          </div>

          <div className="button-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Pepe!'}
            </motion.button>
          </div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="error"
          >
            {error}
          </motion.div>
        )}

        {isLoading && (
          <div className="loading">
            <div className="loading-spinner" />
            <p>Generando tu Pepe... ¡Espera un momento! 🐸</p>
          </div>
        )}

        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="generated-image-container"
          >
            <img 
              src={generatedImage} 
              alt="Pepe generado" 
              onError={() => setError('Error loading image')}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(generatedImage, '_blank')}
              className="download-button"
            >
              Descargar Pepe
            </motion.button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Generator;