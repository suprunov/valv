import React, { useEffect, useRef, useState } from 'react';
import img from '../../images/2205458.gif';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const FloatingGif = () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [width, setWidth] = useState(100);
    const imgRef = useRef(null);
    const showTimerRef = useRef(null);
    const hideTimerRef = useRef(null);

    const scheduleNextAppearance = () => {
        const delay = getRandom(60 * 1000, 10 * 60 * 1000); // 1–10 минут
        showTimerRef.current = setTimeout(() => {
            showGif();
        }, delay);
    };

    const showGif = () => {
        const w = getRandom(50, 100); // ширина: 50–100px
        setWidth(w);

        const margin = 40;
        const maxX = window.innerWidth - w - margin;
        const maxY = window.innerHeight - w - margin;
        const pos = {
            top: getRandom(0, maxY),
            left: getRandom(0, maxX),
        };

        setPosition(pos);
        setVisible(true);

        const duration = getRandom(1 * 60 * 1000, 5 * 60 * 1000); // 1–5 минут
        hideTimerRef.current = setTimeout(() => {
            setVisible(false);
            scheduleNextAppearance();
        }, duration);
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        clearTimeout(hideTimerRef.current);
        setVisible(false);
        scheduleNextAppearance();
    };

    useEffect(() => {
        // Первый запуск (через 1–10 мин)
        scheduleNextAppearance();

        return () => {
            clearTimeout(showTimerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    if (!visible) return null;

    return (
        <img
            ref={imgRef}
            src={img}
            alt="Floating GIF"
            onContextMenu={handleRightClick}
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${width}px`,
                height: 'auto',
                zIndex: 9999,
                pointerEvents: 'auto',
                userSelect: 'none',
            }}
        />
    );
};

export default FloatingGif;
