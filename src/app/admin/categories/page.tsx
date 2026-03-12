'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card, Button, Badge } from '@/components/ui'
import { useTranslations } from 'next-intl'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Package,
  X,
  Save,
  Loader2,
  AlertCircle,
  Upload,
  ImageIcon,
} from 'lucide-react'
import { db, storage } from '@/lib/firebase/config'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

interface Category {
  id: string
  name: string
  nameAr: string
  icon: string
  image?: string
  productsCount?: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Available icons
const availableIcons = [
  'Shirt', 'Smartphone', 'Home', 'Sparkles', 'UtensilsCrossed',
  'Wrench', 'Heart', 'Dumbbell', 'Baby', 'Package', 'Car',
  'Book', 'Camera', 'Headphones', 'Watch', 'Glasses', 'Gem',
  'Flower', 'Palette', 'Music', 'Gamepad', 'Laptop', 'Tv',
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('admin')
  const tc = useTranslations('common')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    icon: 'Package',
    isActive: true,
    image: '',
  })

  // Fetch categories from Firestore
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError('')
      const categoriesRef = collection(db, 'categories')

      // Try with ordering first, fallback to simple query
      let snapshot
      try {
        const q = query(categoriesRef, orderBy('createdAt', 'desc'))
        snapshot = await getDocs(q)
      } catch {
        // If ordering fails (index not created), fetch without ordering
        snapshot = await getDocs(categoriesRef)
      }

      const categoriesData: Category[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[]

      setCategories(categoriesData)
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err && (err as Error & { code: string }).code === 'permission-denied') {
        setError('ليس لديك صلاحية للوصول للأقسام')
      } else {
        setError(tc('error'))
      }
    } finally {
      setLoading(false)
    }
  }

  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.nameAr?.includes(searchQuery)
  )

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload image to Firebase Storage
  const uploadImage = async (file: File, categoryId: string): Promise<string> => {
    const storageRef = ref(storage, `categories/${categoryId}/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  // Open modal for new category
  const handleAddNew = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      nameAr: '',
      icon: 'Package',
      isActive: true,
      image: '',
    })
    setImageFile(null)
    setImagePreview('')
    setIsModalOpen(true)
    setError('')
  }

  // Open modal for editing
  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name || '',
      nameAr: category.nameAr || '',
      icon: category.icon || 'Package',
      isActive: category.isActive ?? true,
      image: category.image || '',
    })
    setImageFile(null)
    setImagePreview(category.image || '')
    setIsModalOpen(true)
    setError('')
  }

  // Save category
  const handleSave = async () => {
    if (!formData.name || !formData.nameAr) {
      setError('الرجاء ملء جميع الحقول المطلوبة')
      return
    }

    try {
      setSaving(true)
      setError('')

      let imageUrl = formData.image

      if (editingCategory) {
        // Upload new image if selected
        if (imageFile) {
          setUploadingImage(true)
          try {
            imageUrl = await uploadImage(imageFile, editingCategory.id)
          } catch (uploadErr: unknown) {
            const errMsg = uploadErr instanceof Error ? uploadErr.message : 'خطأ غير معروف'
            const errCode = uploadErr instanceof Error && 'code' in uploadErr ? (uploadErr as Error & { code: string }).code : undefined
            throw new Error(`فشل رفع الصورة: ${errCode || errMsg}`)
          }
          setUploadingImage(false)
        }

        // Update existing category
        const categoryRef = doc(db, 'categories', editingCategory.id)
        await updateDoc(categoryRef, {
          name: formData.name,
          nameAr: formData.nameAr,
          icon: formData.icon,
          isActive: formData.isActive,
          image: imageUrl,
          updatedAt: serverTimestamp(),
        })
      } else {
        // Add new category first to get ID
        const categoryData = {
          name: formData.name,
          nameAr: formData.nameAr,
          icon: formData.icon,
          isActive: formData.isActive,
          image: '',
          productsCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
        let docRef
        try {
          docRef = await addDoc(collection(db, 'categories'), categoryData)
        } catch (addErr: unknown) {
          const errCode = addErr instanceof Error && 'code' in addErr ? (addErr as Error & { code: string }).code : undefined
          if (errCode === 'permission-denied') {
            throw new Error('ليس لديك صلاحية الكتابة في Firestore. يرجى تحديث قواعد الأمان في Firebase Console.')
          }
          const errMsg = addErr instanceof Error ? addErr.message : 'خطأ غير معروف'
          throw new Error(`فشل إضافة القسم: ${errCode || errMsg}`)
        }

        // Upload image if selected
        if (imageFile) {
          setUploadingImage(true)
          try {
            imageUrl = await uploadImage(imageFile, docRef.id)
          } catch (uploadErr: unknown) {
            // Don't fail completely, category was created
            const errMsg = uploadErr instanceof Error ? uploadErr.message : 'خطأ'
            setError(`تم إنشاء القسم لكن فشل رفع الصورة: ${errMsg}`)
          }
          setUploadingImage(false)

          // Update with image URL
          if (imageUrl) {
            try {
              await updateDoc(doc(db, 'categories', docRef.id), {
                image: imageUrl,
              })
            } catch (_updateErr: unknown) {
              // Silently ignore update errors - category was already created
            }
          }
        }
      }

      setIsModalOpen(false)
      setImageFile(null)
      setImagePreview('')
      fetchCategories()
    } catch (err: unknown) {
      const errCode = err instanceof Error && 'code' in err ? (err as Error & { code: string }).code : undefined
      if (errCode === 'permission-denied') {
        setError('ليس لديك صلاحية. يرجى تحديث قواعد Firestore في Firebase Console:\n\nrules_version = "2";\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /categories/{document} {\n      allow read, write: if true;\n    }\n  }\n}')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(tc('error'))
      }
    } finally {
      setSaving(false)
      setUploadingImage(false)
    }
  }

  // Delete category
  const handleDelete = async (categoryId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return

    try {
      setDeleting(categoryId)

      // Get category to delete image
      const category = categories.find(c => c.id === categoryId)
      if (category?.image) {
        try {
          const imageRef = ref(storage, category.image)
          await deleteObject(imageRef)
        } catch {
          // Image might not exist, continue
        }
      }

      await deleteDoc(doc(db, 'categories', categoryId))
      fetchCategories()
    } catch (_err: unknown) {
      setError(tc('error'))
    } finally {
      setDeleting(null)
    }
  }

  // Toggle active status
  const toggleActive = async (category: Category) => {
    try {
      const categoryRef = doc(db, 'categories', category.id)
      await updateDoc(categoryRef, {
        isActive: !category.isActive,
        updatedAt: serverTimestamp(),
      })
      fetchCategories()
    } catch (err) {

    }
  }

  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData({ ...formData, image: '' })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('categoriesSection')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {/* TODO: no exact key for إنشاء وتعديل وحذف أقسام المنتجات */}
            إنشاء وتعديل وحذف أقسام المنتجات
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 ml-2" />
          {tc('add')}
        </Button>
      </div>

      {/* Error Alert */}
      {error && !isModalOpen && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{/* TODO: no exact key */}إجمالي الأقسام</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {categories.length}
              </p>
            </div>
            <FolderTree className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{/* TODO: no exact key */}الأقسام النشطة</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.filter(c => c.isActive).length}
              </p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{/* TODO: no exact key */}الأقسام المعطلة</p>
              <p className="text-2xl font-bold text-red-600">
                {categories.filter(c => !c.isActive).length}
              </p>
            </div>
            <Package className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('activeProducts')}</p>
              <p className="text-2xl font-bold text-blue-600">
                {categories.reduce((sum, c) => sum + (c.productsCount || 0), 0)}
              </p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative max-w-md">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tc('search')}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      </Card>

      {/* Categories Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-12 text-center">
            <FolderTree className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">{tc('noResults')}</p>
            <Button onClick={handleAddNew} className="mt-4">
              <Plus className="h-4 w-4 ml-2" />
              {tc('add')}
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                    الصورة
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                    القسم
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                    الاسم بالإنجليزية
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                    عدد المنتجات
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                    الحالة
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-4">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.nameAr}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.nameAr}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                      {category.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                      {category.productsCount || 0}
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleActive(category)}>
                        <Badge variant={category.isActive ? 'success' : 'danger'}>
                          {category.isActive ? 'نشط' : 'معطل'}
                        </Badge>
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => handleDelete(category.id)}
                          disabled={deleting === category.id}
                        >
                          {deleting === category.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingCategory ? tc('edit') : tc('add')}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600 dark:bg-red-900/20">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  صورة القسم
                </label>
                <div className="flex items-start gap-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      {imagePreview ? 'تغيير الصورة' : 'رفع صورة'}
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG أو WEBP. الحد الأقصى 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Arabic Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم بالعربية *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="مثال: إلكترونيات"
                />
              </div>

              {/* English Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم بالإنجليزية *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Example: Electronics"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الأيقونة
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700 dark:text-gray-300">
                  قسم نشط
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
                disabled={saving}
              >
                {tc('cancel')}
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                    {uploadingImage ? tc('loading') : tc('loading')}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 ml-2" />
                    {tc('save')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
