import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/ZaraAnimation.module.css';

export default function ZaraAnimation( {eyesOn} ) {

    const infiniteRotateAndScale = {
        animate: {
            scale: [1, 1.1, 1],
            boxShadow: ["inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.3), 0 0 30px rgba(21, 213, 159, 0.7)"]
        },
        whileHover: {
            boxShadow: [
                "inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.3), 0 0 30px rgba(21, 213, 159, 0.7)",
                "inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 35px rgba(21, 213, 159, 0.9)",
                "inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.3), 0 0 30px rgba(21, 213, 159, 0.7)"
            ],
            transition: {
                boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }
            }
        },
        transition: {
            scale: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            className={styles['zara-animation-button']}
            {...infiniteRotateAndScale}
        >
            <div className={styles['zara-animation-inner']}>
                <div className={`${styles.eye} ${eyesOn ? styles['eye-listening'] : ''}`} style={{ top: "55px", left: "40px" }}></div>
                <div className={`${styles.eye} ${eyesOn ? styles['eye-listening'] : ''}`} style={{ top: "55px", left: "70px" }}></div>
                <div className={styles.mouth} style={{ top: "90px", left: "55px" }}></div>
            </div>
            <svg className={styles.wave} viewBox="0 0 500 150" preserveAspectRatio="none">
                <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
            </svg>
            <svg className={styles['wave2']} viewBox="0 0 500 150" preserveAspectRatio="none">
                <path d="M0.00,59.98 C250.00,100.00 300.20,-70.00 500.00,59.98 L500.00,150.00 L0.00,150.00 Z" />
            </svg>
            <svg className={styles['wave3']} viewBox="0 0 500 100" preserveAspectRatio="none">
                <path d="M0.00,59.98 C200.00,20.00 349.20,140.00 500.00,59.98 L500.00,0.00 L0.00,0.00 Z" />
            </svg>
            <svg className={styles['wave4']} viewBox="0 0 500 100" preserveAspectRatio="none">
                <path d="M0.00,59.98 C200.00,20.00 349.20,140.00 500.00,59.98 L500.00,0.00 L0.00,0.00 Z" />
            </svg>
        </motion.div>
    )
}
