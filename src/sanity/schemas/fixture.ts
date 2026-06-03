import {defineField, defineType} from 'sanity'

export const fixture = defineType({
  name: 'fixture',
  title: 'Fixture',
  type: 'document',
  fields: [
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'Maltese Premier League', value: 'MPL'},
          {title: 'FA Trophy', value: 'FA Trophy'},
          {title: 'Super Cup', value: 'Super Cup'},
          {title: 'Friendly', value: 'Friendly'},
        ],
      },
      initialValue: 'MPL',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kickoff',
      title: 'Kick-off (date & time)',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Finished', value: 'finished'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
      hidden: ({document}) => document?.status !== 'finished',
    }),
    defineField({
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
      hidden: ({document}) => document?.status !== 'finished',
    }),
  ],
  orderings: [
    {title: 'Kick-off (newest)', name: 'koDesc', by: [{field: 'kickoff', direction: 'desc'}]},
  ],
  preview: {
    select: {home: 'homeTeam', away: 'awayTeam', date: 'kickoff'},
    prepare({home, away, date}) {
      return {
        title: `${home} vs ${away}`,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
