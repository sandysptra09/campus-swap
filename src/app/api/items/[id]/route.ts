import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { generateSlug } from '@/lib/items/slug'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const item = await prisma.item.findUnique({
    where: { id },
  })

  if (!item) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: itemId } = await params

    const user = await getUserFromRequest()
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: {
        ownerId: true,
        verificationStatus: true,
        status: true,
        title: true,
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

    let newSlug: string | undefined = undefined

    if (body.title && body.title !== item.title) {
       newSlug = generateSlug(body.title)
    }

   const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        title: body.title,
        shortDescription: body.shortDescription,
        description: body.description,
        categoryId: body.categoryId,
        condition: body.condition,
        ...(newSlug && { slug: newSlug }),
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: itemId } = await params

    const user = await getUserFromRequest()
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
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
        { message: 'Approved item cannot be deleted' },
        { status: 400 }
      )
    }

    await prisma.item.delete({
      where: { id: itemId },
    })

    return NextResponse.json({
      message: 'Item deleted successfully',
    })
  } catch (error) {
    console.error('DELETE ITEM ERROR:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}