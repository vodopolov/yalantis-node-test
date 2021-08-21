import * as fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export class ImageProcessor {
  public static cropImage(originalFilename: string, width: number, height: number): Promise<string> {
    const croppedFilename = `c${originalFilename}`
    const originalPath = path.join(__dirname, '..', '..', 'storage', 'images', originalFilename)
    const outputPath = path.join(__dirname, '..', '..', 'storage', 'images', croppedFilename)
    const content = fs.readFileSync(originalPath, null)
    const image = sharp(content)
    return image.metadata().then(metadata => {
      const imageWidth = metadata.width || 0
      const imageHeight = metadata.height || 0
      const horizontalIndent = imageWidth > width ? (imageWidth - width) / 2 : 0
      const verticalIndent = imageHeight > height ? (imageHeight - height) / 2 : 0
      image.extract({ left: horizontalIndent, top: verticalIndent, width: Math.min(width, imageWidth), height: Math.min(height, imageHeight) })
        .toFile(outputPath, (err) => {
          if (err) {
            throw err
          }
          fs.unlink(originalPath, () => {
          })
        })
      return Promise.resolve(croppedFilename)
    })
  }
}
