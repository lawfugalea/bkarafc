import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
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
