// generate-pwa-assets.js
import * as pwaAssetGenerator from 'pwa-asset-generator';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const sourceImage = path.join(__dirname, 'resources/assets/favicon.png');
  const outputFolder = path.join(__dirname, 'public/favicon');
  
  try {
    // First, generate the images
    const result = await pwaAssetGenerator.generateImages(
      sourceImage,
      outputFolder,
      {
        scrape: false,
        background: '#ffffff',
        splashOnly: false,
        portraitOnly: false,
        log: true,
        manifest: './public/manifest.json',
        index: './resources/views/app.blade.php',
        favicon: true,
        mstile: true,
        iconOnly: false,
        pathOverride: '/favicon' // This tells the generator to use /favicon instead of the full path
      }
    );
    
    // Fix the manifest.json file paths
    const manifestPath = path.join(__dirname, 'public/manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      // Fix icon paths if they exist
      if (manifest.icons && Array.isArray(manifest.icons)) {
        manifest.icons = manifest.icons.map(icon => {
          // Replace any path that starts with "../../public/" with "/"
          if (icon.src && icon.src.startsWith('../../public/')) {
            icon.src = icon.src.replace('../../public', '');
          }
          return icon;
        });
      }
      
      // Write the fixed manifest back
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    }
    
    // Fix the app.blade.php file paths
    const bladePath = path.join(__dirname, 'resources/views/app.blade.php');
    if (fs.existsSync(bladePath)) {
      let bladeContent = fs.readFileSync(bladePath, 'utf8');
      
      // Replace all instances of "../../public/" with "/"
      bladeContent = bladeContent.replace(/\.\.\/\.\.\/public\//g, '/');
      
      // Write the fixed blade file back
      fs.writeFileSync(bladePath, bladeContent, 'utf8');
    }
    
    console.log('PWA assets generated successfully with corrected paths!');
  } catch (error) {
    console.error('Error generating PWA assets:', error);
  }
})();