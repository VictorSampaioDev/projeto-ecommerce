import React from 'react';

const Banner = ({ title, description, buttonText, image }) => {
  return (
    <section className="relative w-full h-[500px] flex items-center bg-[#121212] overflow-hidden border-b-4 border-purple-600">
      <div className="container mx-auto px-12 z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-black leading-tight mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] uppercase">
            {title}
          </h1>
          <p className="text-zinc-400 text-xl mb-10">{description}</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-md transition-all hover:shadow-[0_0_20px_#9333ea] uppercase">
            {buttonText}
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2 flex justify-center items-center">
        <img src={image} alt="Destaque" className="h-[85%] object-contain" />
      </div>
    </section>
  );
};

export default Banner; // Resolve o erro de export named 'default'