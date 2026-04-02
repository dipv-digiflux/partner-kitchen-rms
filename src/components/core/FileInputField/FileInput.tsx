import React, { useRef, useState, useEffect } from 'react'
import { File as FileIcon, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils/utills'

export interface FileInputProps {
  value: File | string | (File | string)[] | null | undefined
  onChange: (value: File | string | (File | string)[] | null | undefined) => void
  multiple?: boolean
  accept?: string
  className?: string
  placeholder?: string
}

export const FileInput = ({ value, onChange, multiple = false, accept, className, placeholder = 'Click or drag file to this area to upload' }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [previews, setPreviews] = useState<Record<string, string>>({})

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [previews])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files))
    }
  }

  const processFiles = (newFiles: File[]) => {
    // Generate previews for images
    const newPreviews: Record<string, string> = { ...previews }
    newFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        newPreviews[file.name] = url
      }
    })
    setPreviews(newPreviews)

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : []
      onChange([...currentValues, ...newFiles])
    } else {
      onChange(newFiles[0])
    }
  }

  const handleRemove = (indexToRemove: number) => {
    if (multiple && Array.isArray(value)) {
      const removedFile = value[indexToRemove]
      if (removedFile instanceof File && previews[removedFile.name]) {
        URL.revokeObjectURL(previews[removedFile.name])
      }
      onChange(value.filter((_, idx) => idx !== indexToRemove))
    } else {
      if (value instanceof File && previews[value.name]) {
        URL.revokeObjectURL(previews[value.name])
      }
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave' || e.type === 'drop') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const getFilePreview = (file: File | string): string | undefined => {
    if (typeof file === 'string') return file
    if (file instanceof File && file.type.startsWith('image/')) {
      return previews[file.name]
    }
    return undefined
  }

  const renderPreview = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null
    const filesArray = Array.isArray(value) ? value : [value]

    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filesArray.map((file, idx) => {
          const fileName = typeof file === 'string' ? file.split('/').pop() : (file as File)?.name
          const previewUrl = getFilePreview(file)
          const isImage = !!previewUrl || (typeof file === 'string' && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(file))

          return (
            <div key={idx} className="group relative flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all overflow-hidden">
              {isImage ? (
                <div className="w-10 h-10 rounded-md bg-gray-100 shrink-0 overflow-hidden border border-gray-100">
                  <img src={previewUrl} alt={fileName} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                  <FileIcon className="text-primary w-4 h-4" />
                </div>
              )}

              <div className="flex-1 min-w-0 pr-8">
                <p className="text-xs font-bold text-gray-800 truncate mb-0.5">{fileName || 'File'}</p>
                <p className="text-[10px] text-gray-400 font-medium">{file instanceof File ? `${(file.size / 1024).toFixed(1)} KB` : 'Cloud Storage'}</p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove(idx)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 border text-danger border-danger/30 p-1 rounded-md cursor-pointer"
                title="Remove file"
              >
                <X size={12} strokeWidth={3} />
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full border-1 border-dashed rounded-lg flex items-center justify-between p-3 cursor-pointer transition-all duration-200 group',
          isDragActive ? 'border-primary bg-primary/10 scale-[1.01]' : 'border-primary/30',
        )}
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-[20px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rounded-[5px]">
            <Upload size={18} />
          </div>
          <div className="text-left overflow-hidden">
            <h4 className="text-xs font-bold text-gray-700 truncate mb-0.5">{placeholder}</h4>
            <p className="text-[10px] text-gray-400 font-medium truncate">{multiple ? 'Drag files or click to browse' : 'Drag a file or click to browse'}</p>
          </div>
        </div>

        <div className="shrink-0 ml-2">
          <button type="button" className="text-[10px] bg-primary text-white font-bold py-1.5 px-3 rounded-md shadow-sm group-hover:bg-primary-dark transition-colors">
            Browse
          </button>
        </div>

        <input type="file" ref={inputRef} className="hidden" multiple={multiple} accept={accept} onChange={handleFileChange} />
      </div>

      {renderPreview()}
    </div>
  )
}
