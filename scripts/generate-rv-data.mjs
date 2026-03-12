import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'rv-galleries.json');

// Exact folders requested by user
const targetFolders = ['RV _31', 'RV _68', 'RV _69', 'RV _30'];
// Provide nicer display titles
const folderTitles = {
    'RV _31': 'RV Site 31',
    'RV _68': 'RV Site 68',
    'RV _69': 'RV Site 69',
    'RV _30': 'RV Site 30'
};

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function generateGalleryData() {
    try {
        const galleries = [];
        const items = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory() && targetFolders.includes(item.name)) {
                const folderPath = path.join(PUBLIC_DIR, item.name);
                const folderItems = fs.readdirSync(folderPath, { withFileTypes: true });
                
                const images = [];
                for (const file of folderItems) {
                    if (file.isFile() && imageExtensions.has(path.extname(file.name).toLowerCase())) {
                        images.push(`/${item.name}/${file.name}`);
                    }
                }

                if (images.length > 0) {
                    galleries.push({
                        title: folderTitles[item.name] || item.name,
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
