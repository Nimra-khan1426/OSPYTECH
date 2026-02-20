import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Latest API version use karo
  useCdn: process.env.NODE_ENV === 'production', // Production mein CDN, local mein false
  perspective: 'published',
})

// Debugging ke liye
console.log('Sanity Client Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  env: process.env.NODE_ENV
});