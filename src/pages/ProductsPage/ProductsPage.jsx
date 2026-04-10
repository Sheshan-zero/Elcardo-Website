import React, { lazy, Suspense, useEffect } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ProductsPage.css';

const ProductsHero = lazy(() => import('./components/ProductsHero'));
const ProductsNav = lazy(() => import('./components/ProductsNav'));
const ProductSpotlights = lazy(() => import('./components/ProductSpotlights'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const ProductsMaterials = lazy(() => import('./components/ProductsMaterials'));
const ProductsCTA = lazy(() => import('./components/ProductsCTA'));

function SectionLoader() {
  return <div style={{ minHeight: '200px' }} />;
}

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
        <Suspense fallback={<SectionLoader />}>
          <ProductsHero />
          <ProductsNav />
          <ProductSpotlights />
          <ProductGrid />
          <ProductsMaterials />
          <ProductsCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default ProductsPage;
