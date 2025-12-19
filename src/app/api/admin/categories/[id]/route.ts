import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const { name } = await req.json()

    if (!name) {
        return NextResponse.json(
            { message: 'Category name is required' },
            { status: 400 }
        )
    }

    const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name },
    })

    return NextResponse.json(category)
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    
    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const categoryId = Number(id)

    const itemCount = await prisma.item.count({
        where: { categoryId },
    })

    if (itemCount > 0) {
        return NextResponse.json(
            { message: 'Category still used by items' },
            { status: 400 }
        )
    }

    await prisma.category.delete({
        where: { id: categoryId },
    })

    return NextResponse.json({ message: 'Category deleted' })
}
