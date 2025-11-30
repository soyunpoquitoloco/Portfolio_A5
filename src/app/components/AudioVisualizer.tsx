// components/AudioVisualizer.tsx
import React, { useRef, useEffect } from 'react';
// @ts-ignore
import * as THREE from 'three';


interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioRef, isPlaying }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!mountRef.current || !audioRef.current) return;

    let renderer: THREE.WebGLRenderer;
    let audioContext: AudioContext;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sphere: THREE.Mesh;
    let geometry: THREE.IcosahedronGeometry;
    let material: THREE.MeshBasicMaterial;

    try {
      // Scène Three.js
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 150 / 100, 0.1, 1000);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(150, 100);

      // Nettoyer tout canvas existant avant d'ajouter
      const existingCanvas = mountRef.current.querySelector('canvas');
      if (existingCanvas) {
        mountRef.current.removeChild(existingCanvas);
      }
      mountRef.current.appendChild(renderer.domElement);

      // Sphère avec maillage
      geometry = new THREE.IcosahedronGeometry(2, 0);
      material = new THREE.MeshBasicMaterial({ color: 0x9AD4D6, wireframe: true });
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Sauvegarder les positions originales
      originalPositionsRef.current = new Float32Array(geometry.attributes.position.array);

      // Audio context
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      // Connecter l'audio
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        if (isPlaying && analyserRef.current && dataArrayRef.current && originalPositionsRef.current) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;

          // Déformation (supprimez randomFactor si trop chaotique)
          const positions = geometry.attributes.position.array as Float32Array;
          const originalPositions = originalPositionsRef.current;
          for (let i = 0; i < positions.length; i += 3) {
            const x = originalPositions[i];
            const y = originalPositions[i + 1];
            const z = originalPositions[i + 2];
            const distance = Math.sqrt(x * x + y * y + z * z);
            const audioFactor = (average / 255) * 4;
            const randomFactor = (Math.random() * average / 255) * 7; // Optionnel
            const scale = 2 + audioFactor + randomFactor;
            positions[i] = x / distance * scale;
            positions[i + 1] = y / distance * scale;
            positions[i + 2] = z / distance * scale;
          }
          geometry.attributes.position.needsUpdate = true;
        }

        // Rotation
        sphere.rotation.y += 0.01;
        sphere.rotation.z += 0.05;
        renderer.render(scene, camera);
      };
      animate();

    } catch (error) {
      console.error('Erreur WebGL ou initialisation:', error);
      // Fallback : Affichez un message ou une animation CSS
      if (mountRef.current) {
        mountRef.current.innerHTML = '<p style="color: red; font-size: 12px;">WebGL indisponible. Mettez à jour vos pilotes.</p>';
      }
      return;
    }

    // Nettoyage renforcé
    return () => {
      const canvas = mountRef.current?.querySelector('canvas');
      if (canvas && mountRef.current.contains(canvas)) {
        mountRef.current.removeChild(canvas);
      }
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss(); // Force la libération du contexte
      }
      if (audioContext) {
        audioContext.close().catch(() => {});
      }
    };
  }, [audioRef, isPlaying]); // Dépendances stabilisées

  return <div ref={mountRef} style={{ width: '150px', height: '100px' }} />;
};

export default AudioVisualizer;
