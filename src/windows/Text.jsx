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
        <div className="h-full flex flex-col bg-transparent rounded-lg overflow-hidden">
            <div id="window-header">
                <WindowControls target={windowKey} />
                <h2 className="ml-4 font-semibold text-gray-400">{name}</h2>
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
                        <h3 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                            {subtitle}
                        </h3>
                    )}

                    <div className="space-y-6">
                        {description && Array.isArray(description) && description.map((paragraph, index) => (
                            <p key={index} className="text-base md:text-lg leading-relaxed text-gray-300/90 font-medium tracking-wide">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
