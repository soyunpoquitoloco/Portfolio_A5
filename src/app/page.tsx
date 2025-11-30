'use client'
import React, { useState, useEffect, useRef } from 'react'; 
import JuliaFractal from './components/JuliaFractal';
import NavBar from './components/NavBar';
import Link from 'next/link';

const Page: React.FC = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowNavBar(true);
        setShowMain(true);
      } else {
        setShowNavBar(false);
        setShowMain(false);
      }

      
      const aboutElement = document.getElementById('about');
      const descriptionElement = document.getElementById('description2');
      const projectsElement = document.getElementById('projects');
      if (aboutElement && projectsElement && descriptionElement) {
        const aboutRect = aboutElement.getBoundingClientRect();
        const descriptionRect = descriptionElement.getBoundingClientRect();
        const projectsRect = projectsElement.getBoundingClientRect();
        const screenMiddle = window.innerHeight / 2;

        if (screenMiddle >= projectsRect.top && screenMiddle <= projectsRect.bottom) {
          setActiveSection('projects');
        } else if (screenMiddle >= aboutRect.top && screenMiddle <= aboutRect.bottom) {
          setActiveSection('about');
        } else if (screenMiddle >= descriptionRect.top && screenMiddle <= descriptionRect.bottom) {
          setActiveSection('description2');
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div id="top" style={{ position: 'relative', minHeight: '200vh', scrollBehavior: 'smooth' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <JuliaFractal width={1080} height={5000} />
      </div>
      
    
      <div style={{
        position: 'fixed',
        top: '0%', 
        left: '0%',
        
        zIndex: 15, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', 
      }}>
      </div>
      
      <NavBar 
      show={showNavBar} 
      activeSection={activeSection} 
      audioRef={audioRef} 
      isPlaying={isPlaying} 
      isMuted={isMuted} 
      toggleMute={toggleMute} 
    />
      
      <main 
        style={{ 
          marginTop: '50vh', 
          marginLeft: '15vw', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'row', 
          position: 'relative', 
          zIndex: 1, 
          overflow: 'hidden',
          opacity: showMain ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: showMain ? 'auto' : 'none'
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div 
            id="about" 
            style={{ 
              flex: 1, 
              backgroundColor: 'rgba(86, 71, 135, 1)', 
              background: 'linear-gradient(to bottom, rgba(86, 71, 135, 1), rgba(16, 25, 53))',
              padding: '20px', 
              overflow: 'visible',
              borderRadius: '10px',
              margin: '100px',
              transition: 'all 0.5s ease-in-out',
              textAlign: 'center',
              color: 'rgba(219, 203, 216, 1)'
            }}
          >
            <h2         style={{ 
          fontSize: '2.5rem',  
          fontWeight: 'bold',  
          marginBottom: '20px',  
          marginTop: '0',  
          color :'rgba(154, 212, 214)'
        }}>About Me</h2>
            <img src="/PP.jpeg" alt="" className='mx-auto' style={{maxWidth: '20%', marginBottom : '2%', borderRadius : '10px'}}/>
            <p>Hi, my name is Victor and I am a Creative Technologist</p>
            <p>My passions and interests go from robotics and programming to 3D animation and ham radio.</p>
            <p>I started doing robotics when I was in preparation classroom for Engineering school.</p>
            <p>I had a blast finally making robots and programming them.</p>
            <p>Then, I arrived at the IFT (Institute For Future Technologies). There I discovered whole new passions and interests.</p>
            <p>I did 3D modeling, research and learned about design.</p>
            <p>Through many experiences surrounded by incredible people this allowed me to trully be curious and creative and really taught me about making.</p>
            <img src="/Bootcamp.jpg" alt="" className='mx-auto' style={{maxWidth: '50%', borderRadius : '10px', marginTop : '10px', marginBottom : '10px'}}/>
            <p>This was made during the first bootcamp before joining the IFT, we captured the signals of NOAA satellites that transmit the live date of earth&aposs weather.</p>
          </div>
          <div 
            id="description2" 
            style={{ 
              flex: 1, 
              backgroundColor: 'rgba(86, 71, 135, 1)', 
              background: 'linear-gradient(to bottom, rgba(86, 71, 135, 1), rgba(16, 25, 53))',
              padding: '20px', 
              overflow: 'visible',
              borderRadius: '10px',
              margin: '100px',
              transition: 'all 0.5s ease-in-out',
              textAlign: 'center',
              color: 'rgba(219, 203, 216, 1)'
            }}
          >
            <h2 style={{ 
          fontSize: '2.5rem',  
          fontWeight: 'bold',  
          marginBottom: '20px',  
          marginTop: '0',  
          color :'rgba(154, 212, 214)'
        }}>Projects and Experiences</h2>
            <h2         style={{ 
          fontSize: '1.5rem',  
          fontWeight: 'bold',  
          marginBottom: '20px',  
          marginTop: '0', 
          color :'rgba(154, 212, 214)'
        }}>CaribeWave 2025</h2>
            <img src="/CaribeWave.png" alt="" className='mx-auto' style={{maxWidth: '20%'}}/>
            <p>According to NCEI, in the past 500 years, over 65 confirmed tsunamis have been observed and approximately 4,500 people have lost their lives to tsunamis in the Caribbean and adjacent regions. Population growth and influx of tourists along the Caribbean and Western Atlantic coasts increasing the tsunami vulnerability of the region.
Therefore, to try and minimize the risks,the CARIBE WAVE annual tsunami exercise is being conducted to assist tsunami preparedness efforts throughout the Caribbean and adjacent regions. Recent tsunamis, such as those in the Indian Ocean (2004, 2018), Samoa (2009), Haiti (2010), Chile (2010, 2014, 2015), Japan (2011), Honduras (2018), New Zealand (2021) and Hunga Tonga-Hunga Ha&aposapai (2022), attest to the importance of proper planning for tsunami response. With this exercise, the strengths and gaps of the tsunami warning system can be identified.
            </p>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'row',  
              justifyContent: 'center',  
              alignItems: 'center',      
              gap: '20px',            
              marginBottom : "2%",
              marginTop : "2%",
            }}>
            <img src="/Caribewave_1.jpeg" alt="" className='mx-auto' style={{maxWidth: '30%', borderRadius : '10px'}}/>
            <img src="/CaribeGroup.jpeg" alt="" className='mx-auto' style={{maxWidth: '30%', borderRadius : '10px'}}/>
            <img src="/HamRadio.jpeg" alt="" className='mx-auto' style={{maxWidth: '20%', borderRadius : '10px'}}/>
            </div>
            <p>During March 2025, I had the opportunity to travel to Martinique with collegues under the guidance of Gael Musquet for this event.</p>
            <p>This experience was both eye-opening and enriching! Throughtout the week, we had the chance to monitor air and maritime traffic via radio, observing how different actors coordinate in real time during a crisis.</p>
            <p>We also explored the behind-the-scenes of tsunami alerts, learning about the complex protocols that ensure timely warnings and effective response.</p>
            <p>On March 20, we took part in the evacuation fo nearly 400 students of a primary school, a hands-on experience that highlighted just how crucial clear procedures, rapid execution, and community awareness are in disaster preparedness.</p>
            <p>This learning experience would not have been possible without the generous support of Air Caraibes, YesWeHack, the town of Lamentin.</p>
            <p>This was also a great introduction to Ham radio.</p>
            <h2 style={{ 
            fontSize: '1.5rem',  
            fontWeight: 'bold',  
            marginBottom: '20px',  
            marginTop: '20px',  
            color :'rgba(154, 212, 214)'
          }}>FPGA</h2>
            <p>This project was about coding an FPGA. Now Field Programmable Gate Arrays (FPGAs) are integrated circuits often sold off-the-shelf. They’re referred to as ‘field programmable’ because they provide customers the ability to reconfigure the hardware to meet specific use case requirements after the manufacturing process. This allows for feature upgrades and bug fixes to be performed in situ, which is especially useful for remote deployments. </p>
            <p>Me and my team experimented a lot of different configurations and logical circuits and gained a lot of knowledge and practical skills.</p>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'center',  
              alignItems: 'center',      
              gap: '20px',              
              marginBottom : "2%",
              marginTop : "2%",
            }}>
            <img src="/FPGA_1.jpeg" alt="" className='mx-auto' style={{maxWidth: '30%', borderRadius : '10px'}}/>
            <img src="/FPGA_2.jpeg" alt="" className='mx-auto' style={{maxWidth: '30%', borderRadius : '10px'}}/>
            <img src="/FPGA_3.jpeg" alt="" className='mx-auto' style={{maxWidth: '30%', borderRadius : '10px'}}/>
            </div>
          </div>
          <div 
            id="projects" 
            style={{ 
              flex: 1, 
              backgroundColor: 'rgba(86, 71, 135, 1)', 
              background: 'linear-gradient(to bottom, rgba(86, 71, 135, 1), rgba(16, 25, 53))',
              padding: '20px', 
              overflow: 'visible',
              borderRadius: '10px',
              margin: '100px',
              transition: 'all 0.5s ease-in-out',
              textAlign: 'center',
              color: 'rgba(219, 203, 216, 1)'
            }}
          >
            <h2 style={{ 
            fontSize: '1.5rem',  
            fontWeight: 'bold',  
            marginBottom: '20px',  
            marginTop: '0', 
            color :'rgba(154, 212, 214)'
          }}>Main projects</h2>
            <Link 
              href="/pages/three" 
              className="inline-block px-6 py-3 bg-[rgba(16,25,53,0.8)] border-2 border-[rgba(154,212,214,1)] text-[rgba(154,212,214,1)] hover:bg-[rgba(86,71,135,1)] hover:text-[rgba(219,203,216,1)] hover:border-[rgba(219,203,216,1)] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Click here to see more !!!
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
