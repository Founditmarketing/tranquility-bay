import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'mobile-home-galleries.json');

// Helper to check if a folder name looks like a trailer/mobile home directory
const isMobileHomeDir = (name) => {
    const lower = name.toLowerCase();
    // Match "Trailer" from the public directory
    return lower.includes('trailer');
};

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function generateGalleryData() {
    try {
        const galleries = [];
        const items = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory() && isMobileHomeDir(item.name)) {
                const folderPath = path.join(PUBLIC_DIR, item.name);
                const folderItems = fs.readdirSync(folderPath, { withFileTypes: true });
                
                const images = [];
                for (const file of folderItems) {
                    if (file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase())) {
                        images.push(`/${item.name}/${file.name}`);
                    }
                }

                if (images.length > 0) {
                    // Update title to be a little cleaner, replacing "Trailer" with "Mobile Home" if preferred
                    const friendlyTitle = item.name.replace(/Trailer/ig, 'Mobile Home');
                    galleries.push({
                        title: friendlyTitle,
                        folder: item.name,
                        images: images
                    });
                }
            }
        }

        // Sort alphabetically by title
        galleries.sort((a, b) => a.title.localeCompare(b.title));

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleries, null, 2));
        console.log(`Successfully generated gallery data at ${OUTPUT_FILE}`);
        console.log(`Found ${galleries.length} galleries.`);
    } catch (error) {
        console.error('Error generating gallery data:', error);
        process.exit(1);
    }
}

generateGalleryData();
