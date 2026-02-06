"use client";

import { useState, useEffect, useRef, use } from 'react';
import { useSearchParams } from 'next/navigation'; // Only keep useSearchParams if needed for query params
// Remove useParams import or use the `params` prop from the page

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
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Fetch data from our JSON DB API
        fetch(`/api/gift/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(pageData => {
                setData(pageData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    useEffect(() => {
        if (!loading && data) {
            const timer = setTimeout(() => setShowContent(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [loading, data]);

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

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (error || !data) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Gift not found or has expired. 💔</div>;

    return (
        <main style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

            <HeartBackground />

            <audio ref={audioRef} loop src={data.music || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} />

            <button onClick={toggleMusic} className="music-control">
                {isPlaying ? '⏸️' : '🎵'}
            </button>

            {/* Intro Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 50,
                transition: 'opacity 1s ease',
                opacity: showContent ? 0 : 1,
                pointerEvents: showContent ? 'none' : 'auto'
            }}>
                <h1 className="fade-in" style={{ fontSize: '3rem', color: 'var(--primary)' }}>
                    {data.language === 'tr' ? `${data.recipientName} İçin ❤️` : `For ${data.recipientName} ❤️`}
                </h1>
            </div>

            {/* Main Content */}
            <div
                style={{
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 1s ease 1s',
                    padding: '4rem 2rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <div className="fade-in delay-1">
                    <p style={{ fontSize: '1.2rem', color: '#666', fontStyle: 'italic', marginBottom: '1rem' }}>
                        {data.language === 'tr' ? `${data.buyerName}'den bir mesaj...` : `A message from ${data.buyerName}...`}
                    </p>
                    <div style={{
                        fontSize: '1.5rem',
                        lineHeight: 1.8,
                        marginBottom: '3rem',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--text)',
                        whiteSpace: 'pre-wrap'
                    }}>
                        "{data.message}"
                    </div>
                </div>

                {/* Gallery */}
                {data.photos && data.photos.length > 0 && (
                    <div className="fade-in delay-2" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '1rem',
                        padding: '1rem 0',
                        scrollSnapType: 'x mandatory',
                        marginBottom: '3rem'
                    }}>
                        {data.photos.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt="Memory"
                                style={{
                                    flex: '0 0 250px',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    scrollSnapAlign: 'center',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                                }}
                            />
                        ))}
                    </div>
                )}

                <div className="fade-in delay-3" style={{ marginTop: '4rem' }}>
                    <h2 style={{ marginBottom: '2rem' }}>
                        {data.language === 'tr' ? 'Sevgililer günümüz kutlu olsun!' : 'Will you be my Valentine?'}
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <button style={{
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            borderRadius: '50px',
                            border: 'none',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(225, 29, 72, 0.4)',
                            transform: 'scale(1.1)'
                        }}>
                            {data.language === 'tr' ? 'EVET! Sonsuza kadar biz ❤️' : 'YES! Forever Us ❤️'}
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
