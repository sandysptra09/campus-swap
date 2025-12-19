import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                item: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        imageUrl: true,
                        pointValue: true,
                        status: true,
                        verificationStatus: true,
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })
        return NextResponse.json(wishlist)

    } catch (error) {
        console.error('GET /api/wishlist error:', error)
        return NextResponse.json(
            { message: 'Failed to fetch wishlist' },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { itemId } = await req.json()
        if (!itemId) {
            return NextResponse.json(
                { message: 'Item ID is required' },
                { status: 400 }
            )
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId },
            select: {
                ownerId: true,
                status: true,
                verificationStatus: true,
            },
        })

        if (!item) {
            return NextResponse.json(
                { message: 'Item not found' },
                { status: 404 }
            )
        }

        if (item.ownerId === user.id) {
            return NextResponse.json(
                { message: 'Cannot wishlist your own item' },
                { status: 400 }
            )
        }

        if (
            item.status !== 'AVAILABLE' ||
            item.verificationStatus !== 'APPROVED'
        ) {
            return NextResponse.json(
                { message: 'Item not available for wishlist' },
                { status: 400 }
            )
        }

        const wishlist = await prisma.wishlist.create({
            data: {
                userId: user.id,
                itemId,
            },
        })

        return NextResponse.json(
            { message: 'Added to wishlist', wishlist },
            { status: 201 }
        )

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json(
                { message: 'Item already in wishlist' },
                { status: 409 }
            )
        }

        console.error('POST /api/wishlist error:', error)
        return NextResponse.json(
            { message: 'Failed to add wishlist' },
            { status: 500 }
        )
    }
}