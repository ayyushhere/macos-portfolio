import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components';
import useWindowStore from '#store/Windows';
import React from 'react'

const Text = ({ windowKey }) => {
    const { windows } = useWindowStore();
    const win = windows[windowKey];
    const data = win?.data;
    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <div className="h-full flex flex-col bg-transparent rounded-lg overflow-hidden selection:bg-blue-500/30">
            <div id="window-header" className="!justify-center relative">
                <div className="absolute left-4">
                    <WindowControls target={windowKey} />
                </div>
                <h2 className="text-[13px] font-black tracking-[-0.01em] text-white/40 premium-heading uppercase">{name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-10 text-gray-200 flex flex-col md:flex-row gap-12 items-start max-w-5xl mx-auto w-full">
                {image && (
                    <div className="shrink-0 w-full md:w-1/3 flex justify-center sticky top-0">
                        <img
                            src={image}
                            alt={name}
                            className="rounded-2xl shadow-2xl w-full max-w-[250px] object-cover border border-white/20"
                        />
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-6">
                    {subtitle && (
                        <h3 className="text-4xl md:text-5xl font-black gradient-text tracking-tighter leading-tight drop-shadow-2xl premium-heading">
                            {subtitle}
                        </h3>
                    )}

                    <div className="space-y-6">
                        {description && Array.isArray(description) && description.map((paragraph, index) => {
                            const isBullet = paragraph.trim().startsWith('•');
                            return (
                                <p 
                                    key={index} 
                                    className={`text-base md:text-lg leading-relaxed ${isBullet ? 'text-gray-100 font-bold' : 'text-gray-300/90 font-medium'} tracking-wide ${isBullet ? 'pl-4 -indent-4' : ''}`}
                                >
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
