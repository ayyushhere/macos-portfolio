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

            <div className="flex-1 overflow-y-auto p-8 text-gray-200">
                {image && (
                    <div className="mb-8 flex justify-center">
                        <img
                            src={image}
                            alt={name}
                            className="rounded-xl shadow-2xl max-h-64 object-cover border border-white/10"
                        />
                    </div>
                )}

                {subtitle && (
                    <h3 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">
                        {subtitle}
                    </h3>
                )}

                <div className="space-y-5 max-w-3xl mx-auto">
                    {description && Array.isArray(description) && description.map((paragraph, index) => (
                        <p key={index} className="text-lg leading-relaxed text-gray-300 font-medium">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
