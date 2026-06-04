import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET

  if (webhookSecret && secret !== webhookSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const type: string = body._type ?? ''

    // Always revalidate homepage — it shows fixtures, news, squad, results
    revalidatePath('/', 'page')

    switch (type) {
      case 'fixture':
        revalidatePath('/fixtures', 'page')
        break
      case 'post':
        revalidatePath('/news', 'page')
        if (body.slug?.current) {
          revalidatePath(`/news/${body.slug.current}`, 'page')
        }
        break
      case 'player':
        revalidatePath('/squad', 'page')
        if (body.number) {
          revalidatePath(`/squad/${body.number}`, 'page')
        }
        break
      case 'membership':
        revalidatePath('/memberships', 'page')
        break
      case 'galleryItem':
        revalidatePath('/gallery', 'page')
        break
      case 'clubPage':
        revalidatePath('/club', 'page')
        break
      case 'siteSettings':
      case 'homepage':
        // Affects layout (navbar/footer) and all pages
        revalidatePath('/', 'layout')
        break
    }

    return NextResponse.json({ revalidated: true, type: type || 'unknown' })
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
