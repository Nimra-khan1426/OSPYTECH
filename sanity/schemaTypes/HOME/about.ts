import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [

    defineField({
      name: "headingLight",
      title: "Heading Light Text",
      type: "string"
    }),

    defineField({
      name: "headingBold",
      title: "Heading Bold Text",
      type: "string"
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text"
    }),

    defineField({
      name: "focusTitle",
      title: "Focus Title",
      type: "string"
    }),

    defineField({
      name: "focusDescription",
      title: "Focus Description",
      type: "text"
    }),

    defineField({
      name: "highlightText",
      title: "Highlight Text",
      type: "string"
    }),

    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "number" },
            { name: "label", type: "string" },
            { name: "suffix", type: "string" }
          ]
        }
      ]
    }),

    defineField({
      name: "gridItems",
      title: "Grid Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", type: "string" },
            { name: "title", type: "string" },
            { name: "subtitle", type: "string" },
            { name: "description", type: "text" },
            { name: "stats", type: "string" },
            { name: "color", type: "string" },
            { name: "image", type: "image" }
          ]
        }
      ]
    })
  ]
});