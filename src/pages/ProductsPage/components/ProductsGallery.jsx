import React from 'react';
import { motion } from 'framer-motion';
import './ProductsGallery.css';

const GALLERY_IMAGES = [
  { id: 1, title: 'Corporate Headquarters', category: 'Roller Gates', size: 'large', image: 'https://images.unsplash.com/photo-1541888047468-f99fc691aa30?q=80&w=1500' },
  { id: 2, title: 'Industrial Logistics Park', category: 'Gates', size: 'small', image: 'https://images.unsplash.com/photo-1587621453982-18115664ec64?q=80&w=1500' },
  { id: 3, title: 'Solar Farm Array', category: 'Solar', size: 'small', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1500' },
  { id: 4, title: 'Manufacturing Plant', category: 'Roofing', size: 'large', image: 'https://images.unsplash.com/photo-1518640030045-31ce716a575a?q=80&w=1500' },
];

const ProductsGallery = () => {
  return (
    <section className="products-gallery-premium" id="gallery">
      <div className="products-gallery-header">
        <h2 className="products-title-large">Industrial <br/><em>Applications.</em></h2>
        <p className="products-body-text">Engineered systems installed in extreme real-world environments.</p>
      </div>

      <div className="products-gallery-masonry">
        {GALLERY_IMAGES.map((img) => (
          <motion.div 
            key={img.id} 
            className={`gallery-card ${img.size}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="gallery-card-bg"
              style={{ backgroundImage: `url(${img.image})` }}
            ></div>
            <div className="gallery-card-overlay">
              <div className="gallery-card-content">
                <h3>{img.title}</h3>
                <span>{img.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsGallery;
