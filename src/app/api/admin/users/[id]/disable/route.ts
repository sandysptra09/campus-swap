import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function PATCH(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const admin = await getUserFromRequest()

    if (!admin || admin.role !== 'ADMIN') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
        where: { id: params.id },
    })

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updated = await prisma.user.update({
        where: { id: params.id },
        data: {
            isActive: !user.isActive,
        },
    })

    return NextResponse.json({
        message: updated.isActive ? 'User enabled' : 'User disabled',
    })
}
