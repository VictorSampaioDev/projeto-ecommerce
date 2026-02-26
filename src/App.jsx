import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Busca o JSON que está na sua raiz ou pasta public
        const response = await fetch('/api.json');
        const data = await response.json();
        setProducts(data.products || data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      <Header />
      
      <main>
        <Banner 
          title="IMPRESSÕES 3D PARA PAIXÕES TECNOLÓGICAS"
          description="Modelos exclusivos e detalhados para sua coleção geek e tech."
          buttonText="Confira Agora"
          image="/assets/dragon-hero.png" 
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-purple-500 animate-pulse text-xl">Carregando miniaturas...</p>
          </div>
        ) : (
          <ProductCarousel products={products} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App; // Resolve o erro de declaração duplicada