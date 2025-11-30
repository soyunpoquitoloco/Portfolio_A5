import React from 'react'

import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image du projet */}
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      
      {/* Contenu de la carte */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        {/* Bouton pour voir le projet */}
        <Link href={link} passHref className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Voir le projet
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;