export interface SEOProps {
  title: string;
  description: string;
}

export const updateSEO = ({ title, description }: SEOProps) => {
  // Tarayıcı sekme başlığını günceller
  document.title = `${title} | HeyAlls`;

  // Meta description alanını günceller
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
  }
};