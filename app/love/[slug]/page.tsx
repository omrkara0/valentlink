"use client";

import { useState, useEffect, useRef, use } from 'react';
import { useSearchParams } from 'next/navigation'; // Only keep useSearchParams if needed for query params
// Remove useParams import or use the `params` prop from the page
import confetti from 'canvas-confetti';

import HeartBackground from '@/components/HeartBackground';

// Define the shape of the data
interface GiftData {
    slug: string;
    buyerName: string;
    recipientName: string;
    message: string;
    photos: string[];
    package: string;
    language: 'tr' | 'en';
    music?: string;
    password?: string;
}

export default function LovePage({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrap the params using `use()` in React 19 / Next.js 15+ 
    // OR just await it if using async component, BUT this is a client component ('use client').
    // For 'use client', params is a PROMISE in Next.js 15.

    const { slug } = use(params);

    const [data, setData] = useState<GiftData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [showContent, setShowContent] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Start false to sync with browser policy
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isLocked, setIsLocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    // Data Fetching Restored
    useEffect(() => {
        fetch(`/api/gift/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(pageData => {
                setData(pageData);
                if (pageData.password) {
                    setIsLocked(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (data && data.password === passwordInput) {
            setIsLocked(false);
        } else {
            alert(data?.language === 'tr' ? 'Yanlış şifre 🔒' : 'Wrong password 🔒');
        }
    };

    const handleStart = () => {
        setShowContent(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("User interaction needed"));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);

    const handleYesClick = () => {
        // Super Sweet Animation Sequence
        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 }; // High z-index for confetti

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        // 1. Heart Rain
        const heartInterval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(heartInterval);

            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#e11d48', '#ffccd5', '#ffffff'],
                shapes: ['heart' as any],
                scalar: 2,
                drift: 0.5,
                zIndex: 200
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#e11d48', '#ffccd5', '#ffffff'],
                shapes: ['heart' as any],
                scalar: 2,
                drift: -0.5,
                zIndex: 200
            });
        }, 200);

        // 2. Bursts
        const burstInterval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(burstInterval);

            confetti({
                ...defaults,
                particleCount: 30,
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
                colors: ['#e11d48', '#ffffff', '#ffccd5', '#ff0000', '#881337'],
                shapes: ['circle', 'square'],
                scalar: 1.2
            });
        }, 500);

        setTimeout(() => {
            setShowWhatsAppPrompt(true);
        }, 3000);
    };

    const handleWhatsAppRedirect = () => {
        const text = data?.language === 'tr'
            ? `EVET! Sonsuza kadar biz ❤️`
            : `YES! Forever Us ❤️`;

        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setShowWhatsAppPrompt(false);
    };

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (error || !data) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Gift not found or has expired. 💔</div>;

    if (isLocked) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <HeartBackground />

                <div className="fade-in" style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    padding: '3rem 2rem',
                    borderRadius: '30px',
                    boxShadow: '0 20px 50px rgba(225, 29, 72, 0.2)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '90%',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    zIndex: 10
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        animation: 'pulse 2s infinite',
                        filter: 'drop-shadow(0 5px 15px rgba(225, 29, 72, 0.3))'
                    }}>
                        �
                    </div>

                    <h2 style={{
                        color: 'var(--primary)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        lineHeight: 1.2
                    }}>
                        {data.language === 'tr' ? 'Bize Özel' : 'Private Page'}
                    </h2>

                    <p style={{
                        color: '#666',
                        marginBottom: '2rem',
                        fontSize: '1rem'
                    }}>
                        {data.language === 'tr'
                            ? 'Bu sayfaya erişmek için sihirli sözcüğü girmelisin.'
                            : 'Enter the magic word to unlock your surprise.'}
                    </p>

                    <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder={data.language === 'tr' ? 'Şifre...' : 'Password...'}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '50px',
                                    border: '2px solid transparent', // remove default border
                                    background: 'white',
                                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(225, 29, 72, 0.2)'}
                                onBlur={(e) => e.target.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.05)'}
                            />
                        </div>

                        <button type="submit" style={{
                            padding: '1rem',
                            background: 'linear-gradient(to right, #ec4899, #e11d48)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 10px 20px rgba(225, 29, 72, 0.3)',
                            marginTop: '0.5rem',
                            transition: 'transform 0.2s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {data.language === 'tr' ? 'Kilidi Aç ❤️' : 'Unlock ❤️'}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

            <HeartBackground />

            {/* Simple HTML Audio Player */}
            <audio ref={audioRef} loop src={data.music || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} />

            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                pointerEvents: 'none' // Allow clicks to pass through wrapper areas
            }}>
                <div className="fade-in delay-2" style={{
                    background: 'white',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    position: 'relative',
                    pointerEvents: 'auto',
                    whiteSpace: 'nowrap',
                    opacity: showContent ? 1 : 0, // Hide initially
                    transition: 'opacity 0.5s'
                }}>
                    {data.language === 'tr' ? 'Senin için seçtiğim şarkı 🎵' : 'A song I chose for you 🎵'}
                    <div style={{
                        position: 'absolute',
                        right: '-8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '8px solid white'
                    }}></div>
                </div>

                <button
                    onClick={toggleMusic}
                    className="music-control"
                    style={{
                        position: 'relative',
                        bottom: 'auto',
                        right: 'auto',
                        pointerEvents: 'auto',
                        margin: 0,
                        opacity: showContent ? 1 : 0, // Hide initially
                        transition: 'opacity 0.5s'
                    }}
                >
                    {isPlaying ? '⏸️' : '🎵'}
                </button>
            </div>

            {/* Intro / Start Overlay */}
            {!showContent && (
                <div
                    onClick={handleStart}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'var(--bg)', // Same background to blend in
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 200, // Topmost
                        cursor: 'pointer'
                    }}
                >
                    <div className="heartbeat-btn" style={{
                        fontSize: '5rem',
                        marginBottom: '1rem',
                        filter: 'drop-shadow(0 0 10px rgba(225, 29, 72, 0.5))'
                    }}>
                        💌
                    </div>
                    <h1 className="fade-in" style={{
                        fontSize: '2rem',
                        color: 'var(--primary)',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        {data.language === 'tr' ? `${data.recipientName} İçin ❤️` : `For ${data.recipientName} ❤️`}
                    </h1>
                    <button
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(225, 29, 72, 0.4)',
                            animation: 'pulse 2s infinite'
                        }}
                    >
                        {data.language === 'tr' ? 'Paketi Aç' : 'Open Gift'}
                    </button>
                    <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
                        {data.language === 'tr' ? '(Müzikli Sürpriz İçerir 🎵)' : '(Contains Musical Surprise 🎵)'}
                    </p>
                </div>
            )}

            {/* Main Content */}
            <div
                className="glass-card"
                style={{
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 1s ease 1s',
                    zIndex: 10
                }}
            >
                {/* Header / Intro */}
                <div className="fade-in delay-1" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <p style={{
                        fontSize: '1.5rem',
                        color: 'var(--primary)',
                        fontFamily: 'var(--font-handwriting)',
                        marginBottom: '0.5rem'
                    }}>
                        {data.language === 'tr' ? `Sevgili ${data.buyerName}'den...` : `From ${data.buyerName}...`} 💌
                    </p>
                </div>

                {/* Paper Message */}
                <div className="fade-in delay-1 paper-message">
                    "{data.message}"
                    <div style={{
                        textAlign: 'right',
                        marginTop: '1rem',
                        fontSize: '1.2rem',
                        opacity: 0.8
                    }}>
                        — {data.buyerName}
                    </div>
                </div>

                {/* Gallery */}
                {data.photos && data.photos.length > 0 && (
                    <div className="fade-in delay-2 custom-scrollbar" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '2rem',
                        padding: '2rem 1rem',
                        scrollSnapType: 'x mandatory',
                        marginBottom: '2rem',
                        alignItems: 'center',
                        scrollBehavior: 'smooth'
                    }}>
                        {data.photos.map((url, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: '0 0 260px',
                                    height: '380px',
                                    scrollSnapAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    className="photo-card"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        animationDelay: `${2 + i * 0.2}s`
                                    }}
                                >
                                    {url.match(/\.(mp4|webm|ogg)$/i) ? (
                                        <video
                                            src={url}
                                            controls
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                border: '12px solid white',
                                                borderBottomWidth: '50px',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                                                transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})`,
                                                transition: 'transform 0.3s ease',
                                                backgroundColor: 'black'
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={url}
                                            alt="Memory"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                border: '12px solid white',
                                                borderBottomWidth: '50px',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                                                transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})`,
                                                transition: 'transform 0.3s ease'
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Final Question */}
                <div className="fade-in delay-3" style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <h2 style={{
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-handwriting)',
                        color: 'var(--primary)'
                    }}>
                        {data.language === 'tr' ? 'Sevgililer günümüz kutlu olsun!' : 'Will you be my Valentine?'}
                    </h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={handleYesClick}
                            className="heartbeat-btn"
                            style={{
                                padding: '1rem 4rem', // Wider button
                                fontSize: '1.4rem',
                                fontFamily: 'var(--font-handwriting)',
                                borderRadius: '50px',
                                border: 'none',
                                background: 'linear-gradient(to right, #ec4899, #e11d48)', // Gradient bg
                                color: 'white',
                                boxShadow: '0 10px 25px rgba(225, 29, 72, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {data.language === 'tr' ? 'EVET! Sonsuza kadar biz ❤️' : 'YES! Forever Us ❤️'}
                        </button>
                    </div>
                </div>

            </div>

            {/* WhatsApp Confirmation Modal */}
            {showWhatsAppPrompt && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '20px',
                        maxWidth: '90%',
                        width: '400px',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>
                            {data.language === 'tr' ? 'Cevabını iletmek ister misin? 💌' : 'Send your answer? 💌'}
                        </h3>
                        <p style={{ marginBottom: '2rem', color: '#666' }}>
                            {data.language === 'tr'
                                ? `${data.buyerName} cevabını heyecanla bekliyor!`
                                : `${data.buyerName} is waiting for your answer!`}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowWhatsAppPrompt(false)}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #ddd',
                                    background: 'transparent',
                                    color: '#666',
                                    fontSize: '1rem'
                                }}
                            >
                                {data.language === 'tr' ? 'Kalsın' : 'Cancel'}
                            </button>
                            <button
                                onClick={handleWhatsAppRedirect}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: '#25D366', // WhatsApp green
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {data.language === 'tr' ? 'WhatsApp ile Gönder' : 'Send via WhatsApp'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
