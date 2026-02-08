import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

// Types pour upload
export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  resource_type: string
}

// ✅ FIX: Fonction d'upload avec conversion Buffer → Data URI
export async function uploadToCloudinary(
  file: string | Buffer,
  folder: string = 'logements'
): Promise<CloudinaryUploadResult> {
  try {
    // ✅ Convertir Buffer en data URI si nécessaire
    let uploadFile: string

    if (Buffer.isBuffer(file)) {
      const base64 = file.toString('base64')
      // Utiliser jpeg par défaut (adapter selon tes besoins)
      uploadFile = `data:image/jpeg;base64,${base64}`
    } else {
      uploadFile = file
    }

    const result = await cloudinary.uploader.upload(uploadFile, {
      folder,
      resource_type: 'auto',
    })

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width || 0,
      height: result.height || 0,
      format: result.format || '',
      resource_type: result.resource_type || 'image',
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

// Fonction de suppression
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}