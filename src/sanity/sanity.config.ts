import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {
  CogIcon,
  HomeIcon,
  InfoOutlineIcon,
  ComposeIcon,
  UsersIcon,
  CalendarIcon,
  ImagesIcon,
  TagIcon,
  StarFilledIcon,
} from '@sanity/icons'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'birkirkara-fc',
  title: 'Birkirkara FC',
  projectId: 'i4fmomt4',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Birkirkara FC')
          .items([
            // ── Site-wide settings (singletons) ──────────────
            S.listItem()
              .title('Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .icon(CogIcon)
                      .child(
                        S.editor()
                          .id('siteSettings')
                          .schemaType('siteSettings')
                          .documentId('siteSettings'),
                      ),
                    S.listItem()
                      .title('Homepage')
                      .icon(HomeIcon)
                      .child(
                        S.editor()
                          .id('homepage')
                          .schemaType('homepage')
                          .documentId('homepage'),
                      ),
                    S.listItem()
                      .title('Club Page')
                      .icon(InfoOutlineIcon)
                      .child(
                        S.editor()
                          .id('clubPage')
                          .schemaType('clubPage')
                          .documentId('clubPage'),
                      ),
                  ]),
              ),

            S.divider(),

            // ── Day-to-day content ────────────────────────────
            S.documentTypeListItem('post')
              .title('News Posts')
              .icon(ComposeIcon),

            S.documentTypeListItem('player')
              .title('Players')
              .icon(UsersIcon),

            S.documentTypeListItem('fixture')
              .title('Fixtures')
              .icon(CalendarIcon),

            S.documentTypeListItem('galleryItem')
              .title('Gallery')
              .icon(ImagesIcon),

            S.divider(),

            // ── Commercial ────────────────────────────────────
            S.documentTypeListItem('membership')
              .title('Memberships')
              .icon(TagIcon),

            S.documentTypeListItem('sponsor')
              .title('Sponsors')
              .icon(StarFilledIcon),
          ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
