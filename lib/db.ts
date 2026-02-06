import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface GiftPage {
    slug: string;
    buyerName: string;
    recipientName: string;
    message: string;
    photos: string[];
    package: string;
    theme?: string;
    language: 'tr' | 'en';
    music?: string;
    createdAt: string;
}

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export function getGiftPages(): GiftPage[] {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function getGiftPage(slug: string): GiftPage | undefined {
    const pages = getGiftPages();
    return pages.find(p => p.slug === slug);
}

export function saveGiftPage(page: GiftPage): boolean {
    try {
        const pages = getGiftPages();
        // Check if slug exists
        if (pages.some(p => p.slug === page.slug)) {
            return false; // Slug collision, though unlikely with random
        }
        pages.push(page);
        fs.writeFileSync(DB_PATH, JSON.stringify(pages, null, 2));
        return true;
    } catch (error) {
        console.error("Error saving page:", error);
        return false;
    }
}
