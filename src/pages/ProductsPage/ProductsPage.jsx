import React, { lazy, Suspense, useEffect, useState, useCallback, useRef } from 'react';
import SmoothScroll from '../../components/SmoothScroll';
import CustomCursor from '../../components/CustomCursor';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ProductsPage.css';

const ProductsHero = lazy(() => import('./components/ProductsHero'));
const DivisionSelector = lazy(() => import('./components/DivisionSelector'));
const ProductFilter = lazy(() => import('./components/ProductFilter'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const ProductsCTA = lazy(() => import('./components/ProductsCTA'));

function SectionLoader() {
  return <div style={{ minHeight: '200px' }} />;
}

const ProductsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);

  useEffect(() => {
    document.title = "Products — Elcardo Industries";
    window.scrollTo(0, 0);
  }, []);

  const handleDivisionSelect = useCallback((divisionId) => {
    setActiveFilter(divisionId);
    // Scroll to the product grid section
    setTimeout(() => {
      const gridEl = document.getElementById('product-grid');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <main className="products-page-main">
        <Suspense fallback={<SectionLoader />}>
          <ProductsHero />
          <DivisionSelector onSelectDivision={handleDivisionSelect} />
          <ProductFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <ProductGrid activeFilter={activeFilter} ref={gridRef} />
          <ProductsCTA />
        </Suspense>
      </main>

      <Footer />
    </SmoothScroll>
  );
};

export default ProductsPage;
