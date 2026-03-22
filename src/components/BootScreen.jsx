import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BootScreen = ({ onComplete }) => {
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const logoRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete
                });
            }
        });

        // Cinematic fade in for logo
        tl.fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
        
        // Progress bar simulation with realistic booting pauses
        tl.fromTo(progressRef.current, 
            { scaleX: 0 }, 
            { scaleX: 0.3, duration: 0.8, ease: "power1.inOut" }, 
            "-=0.2"
        );
        tl.to(progressRef.current, { scaleX: 0.7, duration: 0.6, ease: "none" });
        tl.to(progressRef.current, { scaleX: 1, duration: 0.5, ease: "power2.inOut" });

    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center select-none">
            <div ref={logoRef} className="flex flex-col items-center gap-12 opacity-0">
                {/* Custom Branded Boot Logo */}
                <div className="flex flex-col items-center gap-6">
                    <img 
                        src="/macbook.png" 
                        alt="Ayush OS" 
                        className="w-28 h-28 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] object-contain" 
                    />
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-3xl font-extrabold tracking-widest text-white/90">
                            AYUSH<span className="text-blue-500">OS</span>
                        </h1>
                        <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Initializing Portfolio</p>
                    </div>
                </div>

                {/* Thin OS-style Loading Bar */}
                <div className="w-64 h-1 bg-[#222222] rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                    <div ref={progressRef} className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-left rounded-full w-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                </div>
            </div>
        </div>
    );
};

export default BootScreen;
