import {defineArrayMember, defineField, defineType} from 'sanity'

export const clubPage = defineType({
  name: 'clubPage',
  title: 'Club Page',
  type: 'document',
  fields: [
    defineField({
      name: 'historyBody',
      title: 'Club History',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich-text history shown on the Club page.',
    }),
    defineField({
      name: 'honours',
      title: 'Honours',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Competition', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'years',
              title: 'Years Won',
              type: 'array',
              of: [{type: 'string'}],
              description: 'e.g. 2002/03, 2005/06',
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'stadiumBody',
      title: 'Stadium',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich-text stadium section shown on the Club page.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Club Page'}
    },
  },
})
