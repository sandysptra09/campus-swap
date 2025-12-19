import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const user = await getUserFromRequest()
        if (!user) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        await prisma.wishlist.deleteMany({
            where: {
                userId: user.id,
                id,
            },
        })

        return NextResponse.json({
            message: 'Removed from wishlist',
        })
        
    } catch (error) {
        console.error('DELETE /api/wishlist error:', error)
        return NextResponse.json(
            { message: 'Failed to remove wishlist' },
            { status: 500 }
        )
    }
}
