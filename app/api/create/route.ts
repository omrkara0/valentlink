
import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Extract textual data
        const buyerName = formData.get('buyerName') as string;
        const recipientName = formData.get('recipientName') as string;
        const message = formData.get('message') as string;
        const pkg = formData.get('package') as string;
        const theme = formData.get('theme') as string;
        const language = (formData.get('language') as 'tr' | 'en') || 'en';
        let music = formData.get('music') as string;

        // Generate or validate slug
        let slug = formData.get('slug') as string;
        if (!slug) {
            slug = Math.random().toString(36).substring(2, 9); // Random 7 char slug
        }

        // Check if slug exists
        const docRef = doc(db, 'gift-pages', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return NextResponse.json({ error: 'Bu Link (Slug) zaten kullanılıyor. Lütfen başka bir tane deneyin.' }, { status: 400 });
        }

        // Handle Music File Upload
        const musicFile = formData.get('musicFile');
        if (musicFile && musicFile instanceof File) {
            const buffer = await musicFile.arrayBuffer();
            const fileName = `music/${Date.now()}-${musicFile.name.replace(/\s/g, '_')}`;
            const storageRef = ref(storage, fileName);

            // Upload
            await uploadBytes(storageRef, new Uint8Array(buffer));
            music = await getDownloadURL(storageRef);
        }

        // Handle Photos
        const photos: string[] = [];
        const files = formData.getAll('photos');

        for (const file of files) {
            if (file instanceof File) {
                const buffer = await file.arrayBuffer();
                const fileName = `photos/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
                const storageRef = ref(storage, fileName);

                await uploadBytes(storageRef, new Uint8Array(buffer));
                const downloadURL = await getDownloadURL(storageRef);
                photos.push(downloadURL);
            }
        }

        const newPage = {
            slug,
            buyerName,
            recipientName,
            message,
            package: pkg,
            theme,
            language,
            music: music || '', // Ensure string
            photos,
            createdAt: new Date().toISOString()
        };

        // Save to Firestore with slug as ID
        await setDoc(doc(db, 'gift-pages', slug), newPage);

        return NextResponse.json({ success: true, slug });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}
