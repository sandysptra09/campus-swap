import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from "@/lib/auth";
import { generateSlug } from "@/lib/items/slug";
import { ItemCondition } from "@prisma/client";

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