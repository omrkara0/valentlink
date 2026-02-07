"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCreatePage() {
    const [loading, setLoading] = useState(false);
    const [createdUrl, setCreatedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        package: 'basic',
        buyerName: '',
        recipientName: '',
        message: '',
        theme: 'rose',
        language: 'tr',
        music: '/music/sarki1.mp3',
        slug: '',
        password: '',
    });
    const [files, setFiles] = useState<FileList | null>(null);
    const [musicFile, setMusicFile] = useState<File | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');

    const [giftList, setGiftList] = useState<any[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchGifts();
        }
    }, [isAuthenticated]);

    const fetchGifts = async () => {
        try {
            const res = await fetch('/api/admin');
            if (res.ok) {
                const data = await res.json();
                setGiftList(data);
            }
        } catch (error) {
            console.error("Failed to fetch gifts", error);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Bu linki silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/admin?slug=${slug}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Silindi!');
                fetchGifts(); // Refresh
            } else {
                alert('Silinemedi.');
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === 'love2026') {
            setIsAuthenticated(true);
        } else {
            alert('Yanlış şifre');
        }
    };

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const count = e.target.files.length;
            const pkg = formData.package;

            // Enforce Limits
            if (pkg === 'basic' && count > 3) {
                alert('Basic pakette en fazla 3 fotoğraf yükleyebilirsiniz. 📸');
                e.target.value = ''; // Reset input
                return;
            }
            if (pkg === 'premium' && count > 10) {
                alert('Premium pakette en fazla 10 fotoğraf yükleyebilirsiniz. 📸');
                e.target.value = '';
                return;
            }

            setFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('package', formData.package);
        data.append('buyerName', formData.buyerName);
        data.append('recipientName', formData.recipientName);
        data.append('message', formData.message);
        data.append('theme', formData.theme);
        data.append('language', formData.language);
        data.append('music', formData.music);
        if (formData.slug) data.append('slug', formData.slug);
        if (formData.package === 'deluxe' && formData.password) data.append('password', formData.password);

        if (musicFile && formData.music === 'custom') {
            data.append('musicFile', musicFile);
        }

        if (files) {
            for (let i = 0; i < files.length; i++) {
                data.append('photos', files[i]);
            }
        }

        try {
            const res = await fetch('/api/create', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();

            if (result.success) {
                const protocol = window.location.protocol;
                const host = window.location.host;
                setCreatedUrl(`${protocol}//${host}/love/${result.slug}`);
            } else {
                alert('Hata: ' + result.error);
            }
        } catch (err) {
            console.error(err);
            alert('Gönderim başarısız');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
                <div className="fade-in" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                    <h1 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Yönetici Girişi</h1>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="password"
                            placeholder="Şifreyi Girin"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            style={{ padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                        />
                        <button
                            type="submit"
                            style={{ padding: '1rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Giriş Yap
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    if (createdUrl) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff0f3 0%, #ffe4e6 100%)' }}>
                <div className="fade-in" style={{ padding: '3rem', backgroundColor: 'white', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(225, 29, 72, 0.15)', maxWidth: '500px', width: '90%' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Sayfa Hazır!</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Romantik hediyeniz paylaşılmaya hazır.</p>

                    <div style={{ padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', wordBreak: 'break-all', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '2rem' }}>
                        {createdUrl}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            onClick={() => navigator.clipboard.writeText(createdUrl)}
                            style={{ padding: '1rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s' }}
                        >
                            Linki Kopyala
                        </button>
                        <a
                            href={createdUrl}
                            target="_blank"
                            style={{ padding: '1rem', backgroundColor: 'white', color: '#333', border: '1px solid #ddd', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            Aç ↗
                        </a>
                    </div>

                    <button
                        onClick={() => { setCreatedUrl(null); setFormData(prev => ({ ...prev, buyerName: '', recipientName: '', message: '' })); setFiles(null); }}
                        style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#999', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Başka Bir Hediye Oluştur
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fafafa' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '2.5rem', fontFamily: 'var(--font-dynalight)', color: 'var(--primary)', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '100px', width: 'auto' }} />
                    BuKalpSana
                </Link>
                <p style={{ color: '#888', marginTop: '0.5rem' }}>Yönetici Paneli</p>
            </header>

            <form onSubmit={handleSubmit} className="fade-in" style={{
                width: '100%',
                maxWidth: '900px',
                backgroundColor: 'white',
                borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.03)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr', // Split layout
                gap: '0'
            }}>
                {/* Left Side: Settings */}
                <div style={{ padding: '3rem', backgroundColor: '#fff9fa', borderRight: '1px solid #fceef2' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ⚙️ AYARLAR
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Paket Seçimi</label>
                            <select
                                value={formData.package}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    updateField('package', val);
                                    if (val !== 'deluxe') {
                                        updateField('password', ''); // Clear password if rarely switching from Deluxe
                                    }
                                }}
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', cursor: 'pointer' }}
                            >
                                <option value="basic">Basic Paket</option>
                                <option value="premium">Premium Paket</option>
                                <option value="deluxe">Deluxe Paket</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sayfa Dili</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => updateField('language', 'en')}
                                    style={{
                                        padding: '0.8rem',
                                        borderRadius: '10px',
                                        border: formData.language === 'en' ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                        backgroundColor: formData.language === 'en' ? '#fff0f3' : 'white',
                                        color: formData.language === 'en' ? 'var(--primary)' : '#666',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🇺🇸 English
                                </button>
                                <button
                                    type="button"
                                    onClick={() => updateField('language', 'tr')}
                                    style={{
                                        padding: '0.8rem',
                                        borderRadius: '10px',
                                        border: formData.language === 'tr' ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                        backgroundColor: formData.language === 'tr' ? '#fff0f3' : 'white',
                                        color: formData.language === 'tr' ? 'var(--primary)' : '#666',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🇹🇷 Türkçe
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Özel Link Adresi (Slug)</label>
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', paddingLeft: '1rem' }}>
                                <span style={{ color: '#aaa', fontSize: '0.9rem' }}>bukalpsana.com/</span>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => updateField('slug', e.target.value)}
                                    placeholder="rastgele-id"
                                    style={{ flex: 1, padding: '1rem 1rem 1rem 0.2rem', border: 'none', background: 'transparent', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>


                        {formData.package === 'deluxe' && (
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#e11d48', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🔒 Sayfa Şifresi (Deluxe)</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={(e) => updateField('password', e.target.value)}
                                    placeholder="Örn: 14022026 veya SeniSeviyorum"
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #e11d48', backgroundColor: '#fff0f3', fontSize: '1rem', outline: 'none' }}
                                />
                                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>Ziyaretçiler sayfayı görmek için bu şifreyi girmelidir.</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Arka Plan Müziği</label>
                            <select
                                value={formData.music}
                                onChange={(e) => {
                                    updateField('music', e.target.value);
                                    if (e.target.value !== 'custom') {
                                        setMusicFile(null);
                                    }
                                }}
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', cursor: 'pointer' }}
                            >
                                <option value="/music/sarki1.mp3">Romantik Müzik (Varsayılan)</option>
                                {formData.package !== 'basic' ? (
                                    <option value="custom">Özel (Dosya Yükle) ✨</option>
                                ) : (
                                    <option disabled>Özel Müzik (Premium/Deluxe) 🔒</option>
                                )}
                            </select>
                            {formData.music === 'custom' && (
                                <div style={{ marginTop: '0.5rem' }}>
                                    <input
                                        type="file"
                                        accept="audio/mpeg, audio/mp3"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setMusicFile(e.target.files[0]);
                                            }
                                        }}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                                    />
                                    <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>
                                        Kabul edilen: MP3. Maksimum 5MB önerilir.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        💌 İÇERİK
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Gönderen Adı</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.buyerName}
                                    onChange={(e) => updateField('buyerName', e.target.value)}
                                    placeholder="Romeo"
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Alıcı Adı</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.recipientName}
                                    onChange={(e) => updateField('recipientName', e.target.value)}
                                    placeholder="Juliet"
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Romantik Mesaj</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => updateField('message', e.target.value)}
                                placeholder="Kalbinizden gelenleri yazın..."
                                rows={5}
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Fotoğraf Galerisi</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    border: '2px dashed #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backgroundColor: files && files.length > 0 ? '#f0fdf4' : 'white',
                                    borderColor: files && files.length > 0 ? '#22c55e' : '#e2e8f0'
                                }}
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept={formData.package === 'deluxe' ? "image/*, video/*" : "image/*"}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                {files && files.length > 0 ? (
                                    <div style={{ color: '#15803d' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
                                        <p style={{ fontWeight: 'bold' }}>{files.length} Fotoğraf Seçildi</p>
                                        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Değiştirmek için tıkla</p>
                                    </div>
                                ) : (
                                    <div style={{ color: '#94a3b8' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☁️</div>
                                        <p style={{ fontWeight: 'bold', color: '#64748b' }}>Fotoğraf Yüklemek İçin Tıkla</p>
                                        <p style={{ fontSize: '0.8rem' }}>veya sürükleyip bırak</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                padding: '1.2rem',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'wait' : 'pointer',
                                boxShadow: '0 10px 20px rgba(225, 29, 72, 0.2)',
                                transition: 'transform 0.2s'
                            }}
                        >
                            {loading ? 'Sayfa Oluşturuluyor...' : 'Hediye Sayfasını Oluştur 🚀'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Admin Dashboard: List of Created Links */}
            <div style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                <h2 style={{ textAlign: 'center', color: '#e11d48', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                    Oluşturulan Linkler ({giftList.length})
                </h2>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {giftList.map((gift) => (
                        <div key={gift.id} style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '15px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                                    {gift.buyerName} ➡️ {gift.recipientName}
                                </div>
                                <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    Slug: <Link href={`/love/${gift.slug}`} target="_blank" style={{ color: '#e11d48', textDecoration: 'underline' }}>{gift.slug}</Link>
                                </div>
                                <div style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                    {gift.createdAt ? new Date(gift.createdAt).toLocaleDateString('tr-TR') : 'Tarih Yok'}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDelete(gift.slug)}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#ef4444',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Sil 🗑️
                            </button>
                        </div>
                    ))}

                    {giftList.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#999' }}>Henüz hiç link oluşturulmamış.</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 800px) {
                    form {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="border-right"] {
                        border-right: none !important;
                        border-bottom: 1px solid #fceef2;
                    }
                }
            `}</style>
        </main >
    );
}
