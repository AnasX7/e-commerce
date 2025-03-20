import { useState } from 'react'
import { z } from 'zod'

type UseFormProps<T extends Record<string, any>> = {
  initialData: T
  schema: z.ZodSchema<T>
}

export function useForm<T extends Record<string, any>>({
  initialData,
  schema,
}: UseFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path[0] as string
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    updateField,
    validateForm,
  }
}
