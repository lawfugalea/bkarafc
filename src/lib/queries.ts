import {groq} from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroSeasonLabel, heroLine1, heroLine2, heroSubline,
    membershipSeason, membershipHeading, membershipBody, membershipButtonLabel
  }`

export const featuredPostQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0]{
    title, slug, category, coverImage, excerpt, publishedAt
  }`

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...4]{
    title, slug, category, coverImage, publishedAt
  }`

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    title, slug, category, coverImage, excerpt, publishedAt, featured
  }`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title, slug, category, coverImage, excerpt, body, publishedAt
  }`

export const nextFixtureQuery = groq`
  *[_type == "fixture" && status == "upcoming"] | order(kickoff asc)[0]{
    homeTeam, awayTeam, competition, kickoff, venue
  }`

export const recentResultsQuery = groq`
  *[_type == "fixture" && status == "finished"] | order(kickoff desc)[0...4]{
    homeTeam, awayTeam, homeScore, awayScore, competition, kickoff
  }`

export const squadPreviewQuery = groq`
  *[_type == "player"] | order(number asc)[0...4]{
    name, number, position, photo
  }`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    clubName, crest, founded, facebook, instagram, twitter
  }`
