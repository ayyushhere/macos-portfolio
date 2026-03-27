import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useThemeStore from '../store/Theme';
import useWindowStore from '../store/Windows';

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
}

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => { };

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    // Initialize all letters with base weight
    letters.forEach(letter => {
        letter.style.fontVariationSettings = `'wght' ${base}`;
    });

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const center = l - left + w / 2;
            const distance = Math.abs(mouseX - center);

            // Calculate intensity based on distance (Gaussian-like distribution)
            const intensity = Math.exp(-(distance ** 2) / 10000); // Adjusted sigma for better feel
            const targetWeight = base + (max - min) * intensity;

            gsap.to(letter, {
                fontVariationSettings: `'wght' ${targetWeight}`,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto"
            });
        });
    };

    const handleMouseLeave = () => {
        gsap.to(letters, {
            fontVariationSettings: `'wght' ${base}`,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto"
        });
    };

    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mousemove", handleMouseMove);
    };
};

const Welcome = () => {
    const { subtitleRef, titleRef } = { titleRef: useRef(null), subtitleRef: useRef(null) };
    const { wallpaper } = useThemeStore();
    const { isMobile } = useWindowStore();

    // Dark text for light wallpaper, Light text for dark wallpaper
    const textColor = wallpaper === 'light' ? 'text-gray-900' : 'text-gray-200';

    useGSAP(() => {
        if (isMobile) return;
        const titleCleanup = setupTextHover(titleRef.current, "title")
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle")

        return () => {
            subtitleCleanup();
            titleCleanup();
        }
    }, [isMobile])

    return (
        <section id='welcome' className={isMobile ? 'flex flex-col items-center justify-center h-full text-center px-6' : ''}>
            <p ref={subtitleRef} className={isMobile ? 'text-xl' : ''}>
                {renderText("Hey, I'm Ayush! Welcome to my",
                    `${isMobile ? 'text-xl' : 'text-3xl'} font-georama ${textColor}`,
                    100)}
            </p>
            <h1 ref={titleRef} className={isMobile ? 'mt-4 text-6xl leading-tight' : 'mt-7'}>
                {renderText("portfolio", `${isMobile ? 'text-7xl' : 'text-9xl'} italic font-georama ${textColor}`)},
            </h1>
        </section>
    )
}

export default Welcome