import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

// GET all gifts
export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, 'gift-pages'));
        const gifts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(gifts);
    } catch (error) {
        console.error('Error fetching gifts:', error);
        return NextResponse.json({ error: 'Failed to fetch gifts' }, { status: 500 });
    }
}

// DELETE a gift by slug
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const docRef = doc(db, 'gift-pages', slug);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ error: 'Gift not found' }, { status: 404 });
        }

        const data = docSnap.data();

        // 1. Collect all files to delete
        const filesToDelete: string[] = [];

        // Check Photos
        if (data.photos && Array.isArray(data.photos)) {
            data.photos.forEach((url: string) => {
                if (url.includes('firebasestorage.googleapis.com')) {
                    filesToDelete.push(url);
                }
            });
        }

        // Check Custom Music
        if (data.music && typeof data.music === 'string' && data.music.includes('firebasestorage.googleapis.com')) {
            filesToDelete.push(data.music);
        }

        // 2. Delete files from Storage
        // We use Promise.allSettled or just loop with try-catch to ensure we continue even if one fails
        await Promise.all(filesToDelete.map(async (url) => {
            try {
                // ref(storage, url) works with full download URLs
                const fileRef = ref(storage, url);
                await deleteObject(fileRef);
            } catch (err) {
                console.warn(`Could not delete file: ${url}`, err);
            }
        }));

        // 3. Delete Document
        await deleteDoc(docRef);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting gift:', error);
        return NextResponse.json({ error: 'Failed to delete gift' }, { status: 500 });
    }
}
