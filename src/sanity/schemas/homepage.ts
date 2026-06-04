import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSeasonLabel',
      title: 'Hero — Season Label',
      type: 'string',
      description: 'Shown in the animated badge. e.g. "Live Season · Matchday 28"',
      initialValue: 'Live Season · Matchday 28',
    }),
    defineField({
      name: 'heroLine1',
      title: 'Hero — Heading Line 1',
      type: 'string',
      initialValue: 'THE',
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero — Heading Line 2',
      type: 'string',
      initialValue: 'STRIPES',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Hero — Sub-heading',
      type: 'string',
      description: 'Smaller gold line below the main heading',
      initialValue: 'Birkirkara FC',
    }),
    defineField({
      name: 'membershipSeason',
      title: 'Membership CTA — Season Label',
      type: 'string',
      initialValue: '2024/25 Season',
    }),
    defineField({
      name: 'membershipHeading',
      title: 'Membership CTA — Heading',
      type: 'string',
      initialValue: 'Become a Member',
    }),
    defineField({
      name: 'membershipBody',
      title: 'Membership CTA — Body Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Support the Stripes and get exclusive benefits — matchday tickets, merchandise discounts, and priority access to club events.',
    }),
    defineField({
      name: 'membershipButtonLabel',
      title: 'Membership CTA — Button Label',
      type: 'string',
      initialValue: 'Get Yours',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
