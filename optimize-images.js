import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
    console.log('Starting image optimization...\n');

    // Optimize IMG_3786.JPG (1.8MB -> ~200KB target)
    const imgPath = path.join(publicDir, 'IMG_3786.JPG');
    if (fs.existsSync(imgPath)) {
        const info = fs.statSync(imgPath);
        console.log(`Original IMG_3786.JPG: ${(info.size / 1024).toFixed(1)} KB`);

        await sharp(imgPath)
            .resize(800, 1000, { fit: 'cover' })
            .jpeg({ quality: 80, progressive: true })
            .toFile(path.join(publicDir, 'IMG_3786_optimized.jpg'));

        // Replace original
        fs.unlinkSync(imgPath);
        fs.renameSync(
            path.join(publicDir, 'IMG_3786_optimized.jpg'),
            path.join(publicDir, 'IMG_3786.JPG')
        );

        const newInfo = fs.statSync(imgPath);
        console.log(`Optimized IMG_3786.JPG: ${(newInfo.size / 1024).toFixed(1)} KB`);
        console.log(`Saved: ${((info.size - newInfo.size) / 1024).toFixed(1)} KB\n`);
    }

    // Optimize logo (627KB -> ~50KB target)
    const logoPath = path.join(publicDir, 'realitigrowth-logo.png.png');
    if (fs.existsSync(logoPath)) {
        const info = fs.statSync(logoPath);
        console.log(`Original logo: ${(info.size / 1024).toFixed(1)} KB`);

        await sharp(logoPath)
            .resize(400, null, { withoutEnlargement: true })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(path.join(publicDir, 'realitigrowth-logo_optimized.png'));

        // Replace original
        fs.unlinkSync(logoPath);
        fs.renameSync(
            path.join(publicDir, 'realitigrowth-logo_optimized.png'),
            path.join(publicDir, 'realitigrowth-logo.png.png')
        );

        const newInfo = fs.statSync(logoPath);
        console.log(`Optimized logo: ${(newInfo.size / 1024).toFixed(1)} KB`);
        console.log(`Saved: ${((info.size - newInfo.size) / 1024).toFixed(1)} KB\n`);
    }

    console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
