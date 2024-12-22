import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import PepeModel from './PepeModel';
import './styles/HeroSection.css';
import { motion } from 'framer-motion';

const Scene = ({ mousePosition }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <PepeModel mousePosition={mousePosition} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Environment preset="city" />
    </>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator-section');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={heroRef} 
      className="hero-container" 
      onMouseMove={handleMouseMove}
    >
      <div className="hero-pattern"></div>
      
      <div className="model-container">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Generate your Pepe
          <br />
          <span className="hero-title-accent">Personalized</span>
        </h1>
        
        <p className="hero-description">
         Create unique versions of Pepe the Frog with AI.
          <br />
          Bring your most creative ideas to life!
        </p>
        
        <motion.button 
          className="hero-cta-button"
          onClick={scrollToGenerator}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start now!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;