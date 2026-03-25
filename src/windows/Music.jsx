import React, { useRef, useState, useEffect } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const Music = ({ windowKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play/Pause functionality relying directly on HTMLMediaElement native node APIs
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed: ", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col h-full bg-[#18181b] text-gray-200 shadow-2xl overflow-hidden rounded-xl">
      {/* MacOS Title Bar */}
      <div id="window-header" className="bg-[#27272a]/95 backdrop-blur-xl border-b border-black/50 py-3 pointer-events-auto">
        <WindowControls target={windowKey} />
        <h2 className="text-gray-300 font-semibold text-sm mx-auto tracking-wide">Music Player</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#18181b] to-[#09090b] relative">
        
        {/* Backdrop Ambient Glow */}
        <div className={`absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100 scale-110' : 'opacity-0 scale-95'}`} />

        {/* Dynamic Rotating Vinyl CD */}
        <div className={`relative w-52 h-52 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[8px] border-[#111] overflow-hidden flex items-center justify-center z-10 transition-all duration-[3000ms] ease-linear ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} style={{ backgroundColor: '#1a1a1a' }}>
          {/* Vinyl Rings Textures */}
          <div className="absolute inset-0 rounded-full border border-white/5 m-3"></div>
          <div className="absolute inset-0 rounded-full border border-white/5 m-8"></div>
          <div className="absolute inset-0 rounded-full border border-white/10 m-12"></div>
          
          {/* Center Record Label */}
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full z-10 flex items-center justify-center drop-shadow-2xl border-[3px] border-[#181818]">
             <div className="w-3 h-3 bg-[#09090b] rounded-full drop-shadow-inner border border-black backdrop-blur-md"></div>
          </div>
          
          {/* Glossy Overlay Reflection */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-white/5 z-20 pointer-events-none rounded-full transform -rotate-45"></div>
        </div>

        {/* Track Info */}
        <div className="mt-10 text-center space-y-1.5 z-10">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-lg tracking-tight">Rasputin</h3>
          <p className="text-sm font-medium text-indigo-400/80 uppercase tracking-widest mt-1">Boney M.</p>
        </div>

        {/* Media Controls Layout */}
        <div className="mt-8 flex items-center justify-center gap-8 w-full z-10">
          <button className="text-gray-500 hover:text-white transition-colors duration-300">
            <SkipBack size={24} className={isPlaying ? 'animate-pulse' : ''} />
          </button>
          
          <button onClick={togglePlay} className="w-16 h-16 bg-white hover:bg-gray-100 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:scale-110 active:scale-95 duration-300 group">
            {isPlaying ? 
              <Pause size={28} className="fill-black group-hover:scale-95 transition-transform" /> : 
              <Play size={28} className="fill-black ml-1.5 group-hover:scale-105 transition-transform" />
            }
          </button>
          
          <button className="text-gray-500 hover:text-white transition-colors duration-300">
            <SkipForward size={24} className={isPlaying ? 'animate-pulse' : ''} />
          </button>
        </div>
        
        {/* Playback Volume Slider UI representation */}
        <div className="mt-8 flex items-center justify-center gap-3 text-gray-500 w-full max-w-[200px] z-10">
           <Volume2 size={16} />
           <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 w-2/3 rounded-full"></div>
           </div>
        </div>

        {/* Hidden Audio Emitter */}
        <audio 
          ref={audioRef} 
          src="/music/rasputin.mp3" 
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default WindowWrapper(Music, 'music');
