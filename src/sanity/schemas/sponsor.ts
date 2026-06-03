import {defineField, defineType} from 'sanity'

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'url', title: 'Website URL', type: 'url'}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  preview: {select: {title: 'name', media: 'logo'}},
})
