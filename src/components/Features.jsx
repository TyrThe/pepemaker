import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, Share2 } from 'lucide-react';
import '../styles/features.css';

const Features = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Zap size={48} className="feature-icon" />,
      title: "Instant Generation",
      description: "Create unique Pepes in seconds using our advanced AI. Get high quality results instantly."
    },
    {
      icon: <Camera size={48} className="feature-icon" />,
      title: "Total Customization",
      description: "From chef Pepes to astronauts, bring any idea to life. The only limit is your imagination."
    },
    {
      icon: <Share2 size={48} className="feature-icon" />,
      title: "Easy to Share",
      description: "Download and share your Pepes instantly. Perfect for memes, stickers or personal collections.."
    }
  ];

  return (
    <section className="features-section">
      <div className="features-content">
        <motion.h2 
          className="features-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why use PepeMaker?
        </motion.h2>

        <motion.div 
          className="features-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={item}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
                <div className="feature-icon-bg"></div>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;