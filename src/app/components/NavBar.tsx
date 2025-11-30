// NavBar.tsx
import Link from 'next/link';
import AudioVisualizer from './AudioVisualizer';

interface NavBarProps {
  show: boolean;
  activeSection: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
  show, 
  activeSection, 
  audioRef, 
  isPlaying, 
  isMuted, 
  toggleMute 
}) => {
  return (
    <nav 
      className={`fixed left-10 top-1/2 transform -translate-y-1/2 w-46 h-130 bg-white bg-opacity-80 p-2 z-10 transition-all duration-500 ${
        show ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
      style={{
        borderRadius: '10px',
        transformOrigin: 'left center',
        background:'rgba(16, 25, 53,1)'
      }}
    >
      <div className="flex flex-col space-y-4 items-center ">
       
        <audio ref={audioRef} src="/Nutcracker.m4a" preload="metadata" autoPlay loop/>
       
        <AudioVisualizer key={`audio-vis-${activeSection || 'home'}`} audioRef={audioRef} isPlaying={isPlaying} />
        
       
        <div className="flex space-x-2 ">
          <button onClick={toggleMute} className="text-black hover:text-gray-200 transition-colors duration-300">
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
        
        
        
        
        <Link href="/" className="text-black text-xl font-bold mb-4 transition-colors duration-300 "
        style={{
          color:'rgba(154, 212, 214,1)'
        }}
        >
          Victor RANGUIN
        </Link>
        <a 
          href="#top" 
          className={`text-[rgba(242,253,255,1)] hover:text-[rgba(242,253,255,1)] hover:bg-[rgba(86,71,135,1)] hover:transition-colors duration-300 p-1 border-2 border-black rounded-xl w-40 flex justify-center items-center ${
            activeSection==='top' ? 'bg-[rgba(86,71,135,1)] text-white border-[rgba(86,71,135,1)]' : ''
          }`}
          style={{
            border: '2px solid rgba(86, 71, 135, 1)'  
          }}
        >
          Home
        </a>
        <a href="#about"
        className={`text-[rgba(242,253,255,1)] hover:text-[rgba(242,253,255,1)] hover:bg-[rgba(86,71,135,1)] transition-colors duration-300 p-1 border-2 border-black rounded-xl w-40 flex justify-center items-center ${
          activeSection==='about' ? 'bg-[rgba(86,71,135,1)] text-white border-[rgba(86,71,135,1)]' : ''
        }`}
        style={{
          border: '2px solid rgba(86, 71, 135, 1)'  
        }}
        >
          About me
        </a>
        <a href="#description2" 
        className={`text-[rgba(242,253,255,1)] hover:text-[rgba(242,253,255,1)] hover:bg-[rgba(86,71,135,1)] transition-colors duration-300 p-1 border-2 border-black rounded-xl w-40 flex justify-center items-center ${
          activeSection==='description2' ? 'bg-[rgba(86,71,135,1)] text-white border-[rgba(86,71,135,1)]' : ''
        }`}
        style={{
          border: '2px solid rgba(86, 71, 135, 1)'  
        }}
        >
          Experiences
        </a>
        <a href="#projects" 
        className={`text-[rgba(242,253,255,1)] hover:text-[rgba(242,253,255,1)] hover:bg-[rgba(86,71,135,1)] transition-colors duration-300 p-1 border-2 border-black rounded-xl w-40 flex justify-center items-center ${
          activeSection==='projects' ? 'bg-[rgba(86,71,135,1)] text-white border-[rgba(86,71,135,1)]' : ''
        }`}
        style={{
          border: '2px solid rgba(86, 71, 135, 1)'  
        }}
        >
          Main Projects
        </a>
        
        <a 
        href="https://github.com/soyunpoquitoloco" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-[rgba(242,253,255,1)] hover:text-white transition-colors duration-300 p-1 border-2 border-black hover:border-[rgba(86,71,135,1)] rounded-xl hover:bg-[rgba(86,71,135,1)] w-40 flex justify-center items-center`}
        style={{
          border: '2px solid rgba(86, 71, 135, 1)' 
        }}
        >
          <span>🐙</span> 
          <span>GitHub</span>
        </a>
        <a 
        href="/CV.pdf" 
        download="Victor_Ranguin_CV.pdf" 
        className={`text-[rgba(242,253,255,1)] hover:text-white transition-colors duration-300 p-1 border-2 border-black hover:border-[rgba(86,71,135,1)] rounded-xl hover:bg-[rgba(86,71,135,1)] w-40 flex justify-center items-center`}
        style={{
          border: '2px solid rgba(86, 71, 135, 1)'  
        }}
        >
          <span>📄</span> 
          <span>Download CV</span>
        </a>
      </div>

      
      <style jsx>{`
        @keyframes wave {
          0% { color: gray; transform: scale(1); }
          50% { color: blue; transform: scale(1.1); }
          100% { color: inherit; transform: scale(1); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
