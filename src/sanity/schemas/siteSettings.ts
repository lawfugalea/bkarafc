import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'clubName',
      title: 'Club Name',
      type: 'string',
      initialValue: 'Birkirkara FC',
    }),
    defineField({
      name: 'crest',
      title: 'Club Crest',
      type: 'image',
      options: {hotspot: false},
      description: 'Upload the club crest here',
    }),
    defineField({
      name: 'founded',
      title: 'Founded Year',
      type: 'string',
      initialValue: '1950',
    }),
    defineField({
      name: 'clubTagline',
      title: 'Club Tagline',
      type: 'string',
      description: 'Shown under the club name in the navbar, footer, and page headers. e.g. "Est. 1950 · Malta"',
      initialValue: 'Est. 1950 · Malta',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 2,
      description: 'Short club description shown in the footer.',
      initialValue: 'Maltese Premier League football club based in Birkirkara, Malta. The Stripes.',
    }),
    defineField({
      name: 'membershipsPageSubtitle',
      title: 'Memberships Page Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle text shown below the Memberships heading.',
      initialValue: 'Support the Stripes and get exclusive benefits — matchday tickets, merchandise discounts, and priority access to club events.',
    }),
    defineField({
      name: 'seasonLabel',
      title: 'Season Label',
      type: 'string',
      description: 'Shown in the navbar topbar. e.g. "2024/25 Season · Maltese Premier League"',
      initialValue: '2024/25 Season · Maltese Premier League',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
