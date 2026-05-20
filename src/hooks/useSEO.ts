import { useEffect } from 'react'
import { updateSEO } from '@/utils/seo'

export const useSEO = (title: string, description: string) => {
  useEffect(() => {
    updateSEO({ title, description })
  }, [title, description])
}