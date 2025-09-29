import { motion } from "framer-motion"
import React from "react"

export const MysticalElements = () => {
    return(
        <React.Fragment>
            {
                ['top-20 right-20', 'bottom-20 left-20'].map((item) => (
                    <div className={`absolute ${item} hidden md:block z-10`}>
                        {
                            ELEMENTS.map((element) => (
                                <motion.div
                                    {...element}
                                />  
                            ))
                        }
                        
                    </div>
                ))
            }
        </React.Fragment>
    )
}

const ELEMENTS = [
    {
        className: 'w-16 h-16 border-2 border-purple-400/30 rounded-full',
        rotate: 360,
        transtition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    {
        className: 'w-12 h-12 border-2 border-orange-400/30 rounded-full',
        rotate: -360,
        transtition: { duration: 15, repeat: Infinity, ease: "linear" }
    }
]