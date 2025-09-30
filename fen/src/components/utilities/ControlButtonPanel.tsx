import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Zap, Coins, Settings } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import useData from '@/hooks/useData';

const ControlButtonPanel = ({ showControlButtons, activePanel, setActivePanel, setShowControlButtons } : ControlPanelProps) => {
    const { isApproved } = useData();

    const handlePanelClick = (arg: Panel, showControlArg: boolean) => {
        setActivePanel(arg);
        setShowControlButtons(showControlArg);
    }
    return (
        <AnimatePresence>
            {showControlButtons && (
                <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="control-panel fixed top-20 right-4 z-50 flex flex-col gap-2 bg-stone-900/95 backdrop-blur-sm border border-stone-600 rounded-lg p-3 shadow-2xl min-w-[200px] md:min-w-[220px]"
                >
                    {
                        isApproved && (
                            <Button
                                onClick={()=> handlePanelClick('admin', false)}
                                className={`btn-primary flex items-center gap-2 w-full justify-start ${
                                activePanel === 'admin' ? 'ring-2 ring-yellow-400' : ''}`}
                            >
                                <Shield className="w-4 h-4" />
                                ADMIN PANEL
                            </Button>
                        )
                    }
                    <Button
                        onClick={() => handlePanelClick('betting-action', false)}
                        className={`btn-secondary flex items-center gap-2 w-full justify-start ${activePanel === 'betting-action' ? 'ring-2 ring-yellow-400' : ''}`}
                    >
                        <Zap className="w-4 h-4" />
                        BETTING ACTIONS
                    </Button>
                    <Button
                        onClick={() => handlePanelClick('standing-order', false)}
                        className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-2 border-purple-500 px-4 py-2 font-bold text-sm uppercase tracking-wider flex items-center gap-2 w-full justify-start ${activePanel === 'standing-order' ? 'ring-2 ring-purple-400' : ''}`}
                    >
                    <Coins className="w-4 h-4" />
                    STANDING ORDERS
                    </Button>
                    <Button
                        onClick={() => handlePanelClick('main-view', false)}
                        className={`bg-stone-800 hover:bg-stone-700 text-yellow-400 border-2 border-yellow-400 px-4 py-2 font-bold text-sm uppercase tracking-wider flex items-center gap-2 w-full justify-start ${activePanel === 'main-view' ? 'ring-2 ring-yellow-400' : ''}`}
                    >
                        <Settings className="w-4 h-4" />
                        MAIN VIEW
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ControlButtonPanel;

interface ControlPanelProps {
    showControlButtons: boolean; 
    activePanel: Panel;
    setActivePanel: (arg: Panel) => void;
    setShowControlButtons: (arg: boolean) => void;
}
export type Panel = 'admin' | 'betting-action' | 'standing-order' | 'main-view';
