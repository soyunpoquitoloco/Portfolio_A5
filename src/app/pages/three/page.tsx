'use client'
import { useRef } from 'react';
import Scene from '../../components/Three';

export default function Three() {
  const canvasRef = useRef(null);  

  return (
    <div>
      <canvas ref={canvasRef} id="bg">
        <Scene ref={canvasRef} />
      </canvas>
      <div id="description-overlay" style={{overflowY: 'auto',}}>
        <h2 id="title" style = {{color : '#9AD4D6',
          fontSize: '2.5rem',fontWeight: 'bold', marginBottom: '20px', marginTop: '0',}}></h2>
        <p id="desc"></p>
        <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',      
              gap: '20px',             
              marginBottom : "2%",
              marginTop : "2%",
            }}>
        <img id="project-image" src="none" alt="Image du projet" style={{ display: 'none', maxWidth: '100%', height: 'auto', marginBottom: '10px', borderRadius : '10px' }} />
        <video id="project-video" controls style={{ display: 'none', maxWidth: '100%', height: 'auto', marginBottom: '10px', borderRadius : '10px' }}>
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <video id="project-video2" controls style={{ display: 'none', maxWidth: '100%', height: 'auto', marginBottom: '10px', borderRadius : '10px' }}>
          Votre navigateur ne supporte pas la vidéo.
        </video>
        </div>
        <br />
        <button id="close-desc" style={{ background: '#564787', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', marginTop: '10px', borderRadius : '10px' }}>Fermer</button>
      </div>
    </div>
  );
}