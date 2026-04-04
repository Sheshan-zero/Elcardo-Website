import React, { useEffect } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ProductsPage.css';

import ProductsHero from './components/ProductsHero';
import ProductsNav from './components/ProductsNav';
import ProductSpotlights from './components/ProductSpotlights';
import ProductGrid from './components/ProductGrid';
import ProductsMaterials from './components/ProductsMaterials';
import ProductsCTA from './components/ProductsCTA';

const ProductsPage = () => {
  useEffect(() => {
    document.title = "Products — Elcardo Industries";
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <main className="products-page-main">
        <ProductsHero />
        <ProductsNav />
        <ProductSpotlights />
        <ProductGrid />
        <ProductsMaterials />
        <ProductsCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default ProductsPage;
