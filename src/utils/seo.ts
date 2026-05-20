export interface SEOProps {
  title: string
  description: string
}

export const updateSEO = ({ title, description }: SEOProps) => {
  document.title = `${title} | HeyAlls`

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  } else {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = description
    document.head.appendChild(meta)
  }
}