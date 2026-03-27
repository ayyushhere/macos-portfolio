import { techStack } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper'
import { Check, Flag } from 'lucide-react';
import { WindowControls } from '#components';
import React from 'react'

import useWindowStore from '#store/Windows';

const Terminal = ({ windowKey }) => {
    const { isMobile } = useWindowStore();
    return (
        <>
            <div id="window-header">
                <WindowControls target={windowKey} />
                <h2>Tech Stack</h2>
            </div>

            <div className='techstack'>
                <p>
                    <span className='font-bold'>@ayush %</span>
                    show tech stack
                </p>

                {!isMobile && (
                    <div className='label'>
                        <p className='w-32 text-gray-400 font-bold uppercase tracking-wider text-[10px]'>Category</p>
                        <p className='text-gray-400 font-bold uppercase tracking-wider text-[10px]'>Technologies</p>
                    </div>
                )}

                <ul className='content'>
                    {techStack.map(({ category, items }) => (
                        <li key={category} className={`flex ${isMobile ? 'flex-col items-start gap-4' : 'items-start'} mb-8 border-b border-white/5 pb-6 last:border-0`}>
                            <div className='flex items-center'>
                                <Check className="text-green-500 w-4 flex-shrink-0" size={16} />
                                <h3 className={`font-black text-green-500 ${isMobile ? 'ms-3' : 'w-32 ms-5'} flex-shrink-0 uppercase tracking-widest text-[11px]`}>{category}</h3>
                            </div>
                            <ul className={`flex items-center gap-2.5 flex-wrap flex-1 ${isMobile ? 'ml-0' : 'ml-4'}`}>
                                {items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all cursor-default shadow-lg group">
                                        <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain drop-shadow group-hover:scale-110 transition-transform" />
                                        <span className="text-gray-300 font-medium text-xs tracking-wide">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>))}
                </ul>

                <div className="footnote">
                    <p className="text-green-500">
                        <Check size={20} /> 5 of 5 stacks loaded successfully(100%)
                    </p>

                    <p className='text-white'>
                        <Flag size={15} fill='white' strokeWidth={1.5} />
                        Render time:6ms
                    </p>
                </div>
            </div>
        </>
    )
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;