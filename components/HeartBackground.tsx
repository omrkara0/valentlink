"use client";
import { useEffect, useState } from 'react';

export default function HeartBackground() {
    const [hearts, setHearts] = useState<{ left: string, delay: string, duration: string, size: string }[]>([]);

    useEffect(() => {
        // Generate hearts only on client
        const newHearts = Array.from({ length: 25 }).map(() => ({
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${10 + Math.random() * 15}s`,
            size: `${1 + Math.random()}rem`
        }));
        setHearts(newHearts);
    }, []);

    if (hearts.length === 0) return null;

    return (
        <div className="heart-bg">
            {hearts.map((style, i) => (
                <div
                    key={i}
                    className="heart"
                    style={{
                        left: style.left,
                        animationDelay: style.delay,
                        animationDuration: style.duration,
                        fontSize: style.size
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
}
