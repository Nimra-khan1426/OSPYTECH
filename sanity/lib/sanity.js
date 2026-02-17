import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// ✅ TUMHARI SANITY CONFIGURATION
export const client = createClient({
  projectId: 'otx2pf0t',           // ✅ TUMHARA PROJECT ID
  dataset: 'production',           // ✅ TUMHARA DATASET
  apiVersion: '2024-03-01',        // ✅ LATEST API
  useCdn: true,                    // ✅ FAST DELIVERY
})

// ✅ IMAGES KE LIYE URL BUILDER
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// ✅ TEST KARNE KE LIYE
console.log('✅ Sanity client ready! Project ID: otx2pf0t')