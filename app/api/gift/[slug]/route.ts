
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;

        // Use cached Firestore instance from lib/firebase
        const docRef = doc(db, 'gift-pages', slug);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(docSnap.data());
    } catch (error) {
        console.error("Firestore Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
