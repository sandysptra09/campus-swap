import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getUserFromRequest()

    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const items = await prisma.item.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        verificationStatus: true,
        pointValue: true,
        imageUrl: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('GET /api/items/my error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch my items' },
      { status: 500 }
    )
  }
}
