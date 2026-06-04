import {defineField, defineType} from 'sanity'

export const membership = defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {list: ['Standard', 'Premium', 'Junior', 'Family']},
    }),
    defineField({
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'period',
      title: 'Period Label',
      type: 'string',
      description: 'Shown next to the price. e.g. "per season"',
      initialValue: 'per season',
    }),
    defineField({
      name: 'features',
      title: 'Features / Benefits',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of bullet-point benefits shown on the membership card.',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight (recommended tier)',
      type: 'boolean',
      description: 'Renders this tier with the red background to draw attention.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Set by the builder — links this membership to a Stripe price',
    }),
    defineField({
      name: 'active',
      title: 'Available for sale',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tier', media: 'image'},
  },
})
