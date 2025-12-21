import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from "@/lib/auth";
import { generateSlug } from "@/lib/items/slug";
import { ItemCondition } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {

    const user = await getUserFromRequest().catch(() => null);

    const searchParams = req.nextUrl.searchParams;
    const sellerId = searchParams.get('sellerId');
    
    const whereClause: any = {
      status: 'AVAILABLE',
      verificationStatus: 'APPROVED',
    };

    if (sellerId) {
      whereClause.ownerId = sellerId;
    } else {
      if (user) {
        whereClause.ownerId = {
          not: user.id
        };
      }
    }

    const items = await prisma.item.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      take: sellerId ? 8 : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        pointValue: true,
        condition: true,
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
            avatarUrl: true,
          },
        },
      },
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('GET /api/items error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await getUserFromRequest();

    if (!authUser) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (authUser.role !== 'USER') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      shortDescription,
      description,
      condition,
      pointValue,
      categoryId,
    } = body;

    if (
      !title ||
      !shortDescription ||
      !description ||
      !condition ||
      !pointValue ||
      !categoryId
    ) {
      return NextResponse.json(
        { message: 'Invalid payload' },
        { status: 400 }
      );
    }

    if (!Object.values(ItemCondition).includes(condition)) {
      return NextResponse.json(
        { message: 'Invalid item condition' },
        { status: 400 }
      );
    }

    if (pointValue <= 0) {
      return NextResponse.json(
        { message: 'Point value must be greater than 0' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const item = await prisma.item.create({
      data: {
        title,
        slug,
        shortDescription,
        description,
        condition,
        pointValue,
        ownerId: authUser.id,
        categoryId,
        status: 'AVAILABLE',
        verificationStatus: 'PENDING',
      },
    });

    return NextResponse.json(
      { message: 'Item created successfully', item },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE ITEM ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}