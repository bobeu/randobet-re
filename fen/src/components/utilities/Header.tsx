import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import React from 'react'

const Header = () => {
    return (
        <div className="absolute top-0 left-0 z-50 md:max-w-2xl lg:max-w-2xl flex justify-between items-center">
            <motion.div
                className="w-2/4 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {/* Logo */}
                <div className="w-20 h-20 md:w-28 md:h-28">
                    <img 
                        src="/logo.png" 
                        alt="Randobet Logo" 
                        className="w-full h-full object-contain"
                    />
                </div>
                
                {/* Brand Text */}
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold spooky-text mb-1">
                        RANDOBET
                    </h2>
                    <p className="text-xs md:text-sm text-yellow-400 uppercase tracking-widest">
                        On-Chain Betting Protocol
                    </p>
                </div>
                </motion.div>
        
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="w-2/4 flex justify-end"
                >
                    <ConnectButton 
                        chainStatus="none"
                        accountStatus="avatar"
                        showBalance={{
                            smallScreen: true,
                            largeScreen: true,
                        }}
                    />
                </motion.div>
        </div>
    )
}

export default Header;