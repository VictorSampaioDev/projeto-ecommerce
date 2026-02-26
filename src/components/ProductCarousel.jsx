import React, { useRef } from 'react';

const ProductCarousel = ({ products }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-12 group">
      <h2 className="text-2xl font-bold mb-8 px-12 border-l-4 border-purple-600 ml-12 uppercase tracking-widest">
        Novidades Quantes!
      </h2>

      <button onClick={() => scroll('left')} className="absolute left-6 top-1/2 z-20 -translate-y-1/2 bg-purple-600/40 hover:bg-purple-600 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        ◀
      </button>

      <div ref={carouselRef} className="flex overflow-x-auto gap-8 px-12 pb-10 scrollbar-hide snap-x snap-mandatory">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] bg-zinc-900 border border-zinc-800 rounded-xl p-6 snap-center hover:border-purple-500 transition-all">
            <div className="bg-zinc-800 rounded-lg h-48 flex items-center justify-center mb-4">
              <img src={product.imageUrl} alt={product.title} className="h-full object-contain" />
            </div>
            <h3 className="font-bold truncate">{product.title}</h3>
            <p className="text-purple-400 font-black text-xl my-4">R$ {product.price}</p>
            <button className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-2 rounded font-bold transition-colors">
              Adicionar
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="absolute right-6 top-1/2 z-20 -translate-y-1/2 bg-purple-600/40 hover:bg-purple-600 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        ▶
      </button>
    </div>
  );
};

export default ProductCarousel; // Resolve o erro de export named 'default'