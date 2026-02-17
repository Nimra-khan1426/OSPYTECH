import { defineType, defineField } from "sanity";

export default defineType({
  name: "servicesSection",
  title: "Services Section",
  type: "document",
  fields: [
    defineField({
      name: "badgeTitle",
      title: "Badge Title",
      type: "string",
    }),
    defineField({
      name: "headingLight",
      title: "Heading Light",
      type: "string",
    }),
    defineField({
      name: "headingBold",
      title: "Heading Bold",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "string" },
            { name: "features", type: "array", of: [{ type: "string" }] },
            { name: "stats", type: "string" },
            { name: "gradientStart", type: "string" },
            { name: "gradientEnd", type: "string" },
            { name: "icon", type: "string" }, // icon name save karo
            {
              name: "image",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
  ],
});