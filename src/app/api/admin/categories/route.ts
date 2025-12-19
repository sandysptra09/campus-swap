import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET() {
    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { items: true },
            },
        },
    })

    return NextResponse.json(categories)
}

export async function POST(req: Request) {
    const user = await getUserFromRequest()

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
        )
    }

    const { name } = await req.json()

    if (!name || name.trim().length < 3) {
        return NextResponse.json(
            { message: 'Category name is required' },
            { status: 400 }
        )
    }

    const exists = await prisma.category.findFirst({
        where: { name },
    })

    if (exists) {
        return NextResponse.json(
            { message: 'Category already exists' },
            { status: 400 }
        )
    }

    const category = await prisma.category.create({
        data: { name },
    })

    return NextResponse.json(category, { status: 201 })
}
