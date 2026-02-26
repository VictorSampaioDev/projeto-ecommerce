import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductCarousel from '../components/ProductCarousel';

const Header = () => {
  const [products, setProducts] = useState([]); // Garantimos que começa como Array

  useEffect(() => {
    fetch('/api.json')
      .then(res => res.json())
      .then(data => {
        // Verifica se os dados estão dentro de uma chave 'products' ou se o JSON já é a lista
        const list = Array.isArray(data) ? data : (data.products || []);
        setProducts(list);
      })
      .catch(err => console.error("Erro no fetch:", err));
  }, []);

  return (
    <>
      <Banner 
        title="IMPRESSÕES 3D PARA PAIXÕES TECNOLÓGICAS"
        description="Modelos exclusivos e detalhados para sua coleção."
        buttonText="Confira Agora"
        image="/assets/dragon-hero.png" 
      />
      <ProductCarousel products={products} />
    </>
  );
};

export default Header;