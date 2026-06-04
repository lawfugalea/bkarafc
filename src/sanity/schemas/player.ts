import {defineField, defineType} from 'sanity'

export const player = defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'number', title: 'Squad Number', type: 'number'}),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Goalkeeper', value: 'Goalkeeper'},
          {title: 'Defender', value: 'Defender'},
          {title: 'Midfielder', value: 'Midfielder'},
          {title: 'Forward', value: 'Forward'},
        ],
      },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string'}],
    }),
    defineField({name: 'nationality', title: 'Nationality', type: 'string'}),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 4}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Squad number', name: 'numAsc', by: [{field: 'number', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'position', media: 'photo'},
  },
})
