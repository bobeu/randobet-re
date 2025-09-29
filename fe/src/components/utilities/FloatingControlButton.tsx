import { motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';

const FloatingControlButton = ({ showControlButtons, setShowControlButtons } : {showControlButtons: boolean; setShowControlButtons: (arg: boolean) => void; }) => {
    return (
        <div className="fixed top-4 right-4 z-50 floating-button">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                <Button
                    onClick={() => setShowControlButtons(!showControlButtons)}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white border-2 border-violet-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                        <motion.div
                            animate={{ rotate: showControlButtons ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                        {
                            showControlButtons ? (
                                <X className="w-6 h-6 md:w-7 md:h-7" />
                            ) : (
                                <Menu className="w-6 h-6 md:w-7 md:h-7" />
                            )
                        }
                    </motion.div>
                </Button>
            </motion.div>
        </div>
    )
}

export default FloatingControlButton;