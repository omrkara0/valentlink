"use client";

import Link from 'next/link';
import HeartBackground from '@/components/HeartBackground';
import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  const content = {
    tr: {
      title: "Kalbinin Ritmini Yakala.",
      subtitle: "Fotoğraflarınız, şarkınız ve size özel hikayenizle sonsuza kadar sürecek dijital bir aşk mektubu oluşturun. Sevgililer Günü için en anlamlı hediye.",
      cta: "Hediyeni Oluştur 💝",
      feature1_title: "Müziğini Seç",
      feature1_desc: "Romantik listelerimizden seçin veya size özel şarkıyı yükleyin.",
      feature2_title: "Fotoğraf Galerisi",
      feature2_desc: "En güzel anılarınızı şık bir albümde toplayın.",
      feature3_title: "Sonsuz Link",
      feature3_desc: "Size özel linki (valent.link/isim) WhatsApp'tan hemen paylaşın.",
      pricing_title: "Paketini Seç",
      pricing_subtitle: "Sevgililer Günü Beta sürecinde tüm paketler ücretsiz!",
      basic_title: "Başlangıç",
      basic_price: "Ücretsiz",
      basic_features: ["✅ 3 Fotoğraf", "✅ Standart Mesaj", "✅ Varsayılan Müzik"],
      premium_title: "Premium",
      premium_price: "99₺",
      premium_features: ["✅ 10 Fotoğraf", "✅ Özel Şarkı Yükleme", "✅ Premium Temalar", "✅ Öncelikli Destek"],
      deluxe_title: "Deluxe",
      deluxe_price: "199₺",
      deluxe_features: ["✅ Sınırsız Fotoğraf", "✅ Video Desteği (Yakında)", "✅ Özel Alan Adı (Yakında)", "✅ Ömür Boyu Saklama"],
      footer_made: "Aşıklar için ❤️ ile yapıldı.",
      admin_login: "Yönetici Girişi"
    },
    en: {
      title: "Make Their Heart Skip a Beat.",
      subtitle: "Create a personalized, everlasting digital love letter with photos, music, and your unique story. The perfect gift for Valentine's Day.",
      cta: "Create Your Gift Now 💝",
      feature1_title: "Set the Mood",
      feature1_desc: "Choose our romantic tracks or upload your special song.",
      feature2_title: "Photo Gallery",
      feature2_desc: "Share your best memories together in a beautiful gallery.",
      feature3_title: "Forever Link",
      feature3_desc: "Get a unique link (valent.link/name) to share instantly.",
      pricing_title: "Choose Your Tier",
      pricing_subtitle: "All packages are free during our Valentine's Beta!",
      basic_title: "Basic",
      basic_price: "Free",
      basic_features: ["✅ 3 Photos", "✅ Standard Message", "✅ Default Music"],
      premium_title: "Premium",
      premium_price: "$4.99",
      premium_features: ["✅ 10 Photos", "✅ Custom Music Upload", "✅ Premium Themes", "✅ Priority Support"],
      deluxe_title: "Deluxe",
      deluxe_price: "$9.99",
      deluxe_features: ["✅ Unlimited Photos", "✅ Video Support (Soon)", "✅ Custom Domain (Soon)", "✅ Forever Hosting"],
      footer_made: "Made with ❤️ for lovers everywhere.",
      admin_login: "Admin Login"
    }
  };

  const t = content[lang];

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'var(--font-heading), sans-serif', color: '#333', overflowX: 'hidden' }}>

      {/* Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.6 }}>
        <HeartBackground />
      </div>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        backdropFilter: 'blur(5px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <img src="/logo.jpg" alt="Logo" style={{ height: '40px', width: 'auto' }} />
          ValentLink
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} style={{
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #e5e7eb',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            {lang === 'tr' ? '🇺🇸 English' : '🇹🇷 Türkçe'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 className="fade-in" style={{
          fontSize: 'clamp(3rem, 5vw, 5rem)',
          fontWeight: '800',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 4px 6px rgba(225, 29, 72, 0.2))'
        }}>
          {t.title}
        </h1>
        <p className="fade-in delay-1" style={{
          fontSize: '1.25rem',
          color: '#666',
          marginBottom: '3rem',
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          {t.subtitle}
        </p>
        <Link href="/contact" className="fade-in delay-2" style={{
          padding: '1.2rem 3rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 10px 25px rgba(225, 29, 72, 0.4)',
          transition: 'transform 0.2s',
          display: 'inline-block'
        }}>
          {t.cta}
        </Link>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>{lang === 'tr' ? 'Kodlama gerektirmez • Anında link' : 'No coding required • Instant link'}</p>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#1f2937' }}>{lang === 'tr' ? 'Her Şey Düşünüldü' : 'Everything You Need'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div className="fade-in delay-1" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎵</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>{t.feature1_title}</h3>
              <p style={{ color: '#6b7280' }}>{t.feature1_desc}</p>
            </div>
            {/* Feature 2 */}
            <div className="fade-in delay-2" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>{t.feature2_title}</h3>
              <p style={{ color: '#6b7280' }}>{t.feature2_desc}</p>
            </div>
            {/* Feature 3 */}
            <div className="fade-in delay-3" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>{t.feature3_title}</h3>
              <p style={{ color: '#6b7280' }}>{t.feature3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>{t.pricing_title}</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem' }}>{t.pricing_subtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {/* Basic */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '24px',
              border: '1px solid #e5e7eb',
              color: '#4b5563'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t.basic_title}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111', marginBottom: '1.5rem' }}>{t.basic_price}</div>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', lineHeight: 2 }}>
                {t.basic_features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/contact" style={{ display: 'block', padding: '0.8rem', borderRadius: '12px', border: '2px solid #e5e7eb', color: '#4b5563', textDecoration: 'none', fontWeight: 'bold' }}>{lang === 'tr' ? 'Seç' : 'Select'}</Link>
            </div>

            {/* Premium (Main) */}
            <div style={{
              padding: '2.5rem',
              backgroundColor: 'white',
              borderRadius: '24px',
              border: '2px solid var(--primary)',
              boxShadow: '0 20px 40px rgba(225, 29, 72, 0.15)',
              transform: 'scale(1.05)',
              zIndex: 1,
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{lang === 'tr' ? 'EN POPÜLER' : 'MOST POPULAR'}</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>{t.premium_title}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111', marginBottom: '1.5rem' }}>{t.premium_price}</div>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', lineHeight: 2 }}>
                {t.premium_features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/contact" style={{ display: 'block', padding: '1rem', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)' }}>{lang === 'tr' ? 'Başla 🚀' : 'Start Creating 🚀'}</Link>
            </div>

            {/* Deluxe */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '24px',
              border: '1px solid #e5e7eb',
              color: '#4b5563'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t.deluxe_title}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111', marginBottom: '1.5rem' }}>{t.deluxe_price}</div>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', lineHeight: 2 }}>
                {t.deluxe_features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <Link href="/contact" style={{ display: 'block', padding: '0.8rem', borderRadius: '12px', border: '2px solid #e5e7eb', color: '#4b5563', textDecoration: 'none', fontWeight: 'bold' }}>{lang === 'tr' ? 'Seç' : 'Select'}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>ValentLink</div>
        <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>{t.footer_made}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
          <span>© 2026 ValentLink</span>
          <span>•</span>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>{lang === 'tr' ? 'Gizlilik' : 'Privacy'}</a>
          <span>•</span>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>{lang === 'tr' ? 'İletişim' : 'Contact'}</a>
        </div>
      </footer>
    </main>
  );
}
