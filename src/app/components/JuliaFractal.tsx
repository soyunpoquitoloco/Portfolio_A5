"use client"
import React, { useState, useEffect } from 'react';

interface JuliaFractalProps {
  width: number;
  height: number;
}

const JuliaFractal: React.FC<JuliaFractalProps> = ({ width, height }) => {
  // Liste des GIFs (ajoutez vos chemins ici)
  const gifs = [
    '/peter_dejong_fractal.gif', // GIF actuel
    '/cool.gif',
  ];

  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  useEffect(() => {
    // Change le GIF toutes les 5 secondes
    const interval = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 5000); // 5000ms = 5 secondes ; ajustez pour plus/moins rapide

    return () => clearInterval(interval); // Nettoie l'intervalle au unmount
  }, [gifs.length]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${gifs[currentGifIndex]})`, // URL dynamique
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        imageRendering: 'pixelated', // Garde un rendu net
        transition: 'background-image 1s ease-in-out', // Transition douce entre GIFs
      }}
    />
  );
};

export default JuliaFractal;