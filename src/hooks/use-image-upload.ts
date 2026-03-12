import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase/config'

interface UseImageUploadOptions {
  folder: string
  maxSizeMB?: number
  allowedTypes?: string[]
}

interface UploadResult {
  url: string
  path: string
}

export function useImageUpload({
  folder,
  maxSizeMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `نوع الملف غير مدعوم. الأنواع المسموحة: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `حجم الملف يتجاوز الحد المسموح (${maxSizeMB}MB)`
    }
    return null
  }

  const uploadImage = async (file: File): Promise<UploadResult | null> => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return null
    }

    try {
      setIsUploading(true)
      setError(null)
      setProgress(0)

      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      const storageRef = ref(storage, fileName)

      setProgress(50)
      await uploadBytes(storageRef, file)
      setProgress(80)

      const url = await getDownloadURL(storageRef)
      setProgress(100)

      return { url, path: fileName }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'فشل رفع الصورة'
      setError(message)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const uploadMultiple = async (files: File[]): Promise<UploadResult[]> => {
    const results: UploadResult[] = []

    for (const file of files) {
      const result = await uploadImage(file)
      if (result) {
        results.push(result)
      }
    }

    return results
  }

  return {
    uploadImage,
    uploadMultiple,
    isUploading,
    progress,
    error,
    clearError: () => setError(null),
  }
}
