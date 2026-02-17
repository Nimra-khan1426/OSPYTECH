import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({ 
      name: 'heading', 
      title: 'Heading Lines', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ name: 'highlightedTextIndex', title: 'Highlighted Line Index', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'laptopImage', title: 'Laptop Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'link', title: 'Button Link', type: 'url' },
            { name: 'type', title: 'Button Type', type: 'string' } // primary / secondary
          ]
        }
      ]
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'iconSvg', title: 'Icon SVG', type: 'text' }
          ]
        }
      ]
    })
  ]
})