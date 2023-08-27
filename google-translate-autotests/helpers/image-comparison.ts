import * as fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch = require('pixelmatch');

export const isImagesPixelsMatch = (img1Path: string, img2Path: string, diffPath: any) => {
    const img1 = getImageByPath(img1Path);
    const img2 = getImageByPath(img2Path);
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    const numPixels = width * height;
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    const diffPercent = `${numDiffPixels / numPixels * 100}%`;
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log('debug', `Pixels number of difference between images: ${numDiffPixels} pixels or ${diffPercent}`);
    return diffPercent;
};

export const getImageByPath = (imgPath: string) => {
    const imgData = PNG.sync.read(fs.readFileSync(imgPath));
    return imgData;
};