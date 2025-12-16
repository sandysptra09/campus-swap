import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

interface Params {
  params: {
    id: string
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const user = await getUserFromRequest()
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const itemId = params.id
    const body = await req.json()

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: {
        ownerId: true,
        verificationStatus: true,
        status: true,
      },
    })

    if (!item) {
      return NextResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      )
    }

    if (item.ownerId !== user.id) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    if (item.verificationStatus === 'APPROVED') {
      return NextResponse.json(
        { message: 'Approved item cannot be edited' },
        { status: 400 }
      )
    }

    if (item.status !== 'AVAILABLE') {
      return NextResponse.json(
        { message: 'Item cannot be edited at this stage' },
        { status: 400 }
      )
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        title: body.title,
        shortDescription: body.shortDescription,
        description: body.description,
        categoryId: body.categoryId,
        condition: body.condition,
        pointValue: body.pointValue,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('PUT /api/items/:id error:', error)
    return NextResponse.json(
      { message: 'Failed to update item' },
      { status: 500 }
    )
  }
}
