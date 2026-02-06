"use client";

import Link from 'next/link';
import HeartBackground from '@/components/HeartBackground';

export default function ContactPage() {
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.6 }}>
                <HeartBackground />
            </div>

            <div className="fade-in" style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(225, 29, 72, 0.15)', maxWidth: '600px', width: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                    <img src="/logo.jpg" alt="ValentLink" style={{ height: '70px', width: 'auto' }} />
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                    Hediye Siparişi Oluştur 💌
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Sevgiliniz için en özel hediyeyi hazırlamaya hazırız! <br />
                    Siparişinizi tamamlamak ve detayları konuşmak için bize WhatsApp üzerinden ulaşabilirsiniz.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <a
                        href="https://wa.me/905336776259"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            padding: '1.2rem',
                            backgroundColor: '#25D366',
                            color: 'white',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            boxShadow: '0 10px 20px rgba(37, 211, 102, 0.3)',
                            transition: 'transform 0.2s'
                        }}
                    >
                        <span>📱</span> WhatsApp ile Sipariş Ver
                    </a>

                    <div style={{ margin: '1rem 0', color: '#aaa' }}>veya</div>

                    <a
                        href="mailto:iletisim@valent.link"
                        style={{
                            padding: '1rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '50px',
                            color: '#4b5563',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        ✉️ E-posta Gönder
                    </a>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <Link href="/" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem' }}>
                        ← Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </main>
    );
}
