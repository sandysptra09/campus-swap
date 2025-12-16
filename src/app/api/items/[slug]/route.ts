import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const item = await prisma.item.findFirst({
      where: {
        slug: params.slug,
        status: 'AVAILABLE',
        verificationStatus: 'APPROVED',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        description: true,
        condition: true,
        pointValue: true,
        imageUrl: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        owner: {
          select: {
            id: true,
            fullname: true,
          },
        },
      },
    })

    if (!item) {
      return NextResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('GET /api/items/:slug error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch item' },
      { status: 500 }
    )
  }
}
