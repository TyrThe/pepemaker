import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles/LocalGallery.css';

const LocalPepeGallery = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const [selectedPepe, setSelectedPepe] = useState(null);

  const pepes = [
    { id: 1, name: 'pepe1.png', src: '/images/pepes/pepe1.jpg' },
    { id: 2, name: 'pepe2.png', src: '/images/pepes/pepe2.jpg' },
    { id: 3, name: 'pepe3.png', src: '/images/pepes/pepe3.jpg' },
    { id: 4, name: 'pepe4.png', src: '/images/pepes/pepe4.png' },
    { id: 5, name: 'pepe5.png', src: '/images/pepes/pepe5.png' },
    { id: 6, name: 'pepe6.png', src: '/images/pepes/pepe6.png' },
    { id: 7, name: 'pepe7.png', src: '/images/pepes/pepe7.png' },
    { id: 8, name: 'pepe8.png', src: '/images/pepes/pepe8.png' },
    { id: 9, name: 'pepe9.png', src: '/images/pepes/pepe9.png' },
    { id: 10, name: 'pepe10.png', src: '/images/pepes/pepe10.png' },
    { id: 11, name: 'pepe11.png', src: '/images/pepes/pepe11.png' },
    { id: 12, name: 'pepe12.png', src: '/images/pepes/pepe12.png' },
    { id: 13, name: 'pepe13.png', src: '/images/pepes/pepe13.png' },
    // Aquí puedes agregar más Pepes
  ];

  const openModal = (pepe) => {
    setSelectedPepe(pepe);
  };

  const closeModal = () => {
    setSelectedPepe(null);
  };

  return (
    <section className="local-gallery-section">
      <div className="local-gallery-header">
        <h2 className="local-gallery-title">My Pepes</h2>
        <p className="local-gallery-description">
          A collection of the best Pepes generated
        </p>
      </div>

      <motion.div 
        className="local-gallery-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pepes.map((pepe) => (
          <motion.div 
            key={pepe.id}
            className="local-gallery-item"
            variants={item}
            whileHover={{ scale: 1.02 }}
            onClick={() => openModal(pepe)}
          >
            <div className="local-gallery-item-content">
              <img 
                src={pepe.src} 
                alt={`Pepe ${pepe.id}`} 
                className="local-gallery-image"
              />
              <div className="local-gallery-item-overlay">
                <span className="local-gallery-item-zoom">🔍 Click to zoom</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal para ver la imagen ampliada */}
      {selectedPepe && (
        <motion.div 
          className="local-gallery-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div className="local-gallery-modal-content" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedPepe.src} 
              alt={`Pepe ${selectedPepe.id}`}
              className="local-gallery-modal-image"
            />
            <button className="local-gallery-modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default LocalPepeGallery;