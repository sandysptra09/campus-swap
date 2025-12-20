import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (user.role !== "USER") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const { itemId } = await req.json();

        if (!itemId) {
            return NextResponse.json(
                { message: "Item ID is required" },
                { status: 400 }
            );
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId },
            include: { owner: true },
        });

        if (!item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        if (item.verificationStatus !== "APPROVED") {
            return NextResponse.json(
                { message: "Item not approved yet" },
                { status: 400 }
            );
        }

        if (item.status !== "AVAILABLE") {
            return NextResponse.json(
                { message: "Item is not available" },
                { status: 400 }
            );
        }

        if (item.ownerId === user.id) {
            return NextResponse.json(
                { message: "You cannot claim your own item" },
                { status: 400 }
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { points: true },
        });

        if (!dbUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (dbUser.points < item.pointValue) {
            return NextResponse.json(
                { message: "Insufficient points" },
                { status: 400 }
            );
        }

        const transaction = await prisma.$transaction(async (tx) => {
            const createdTx = await tx.transaction.create({
                data: {
                    itemId: item.id,
                    fromUserId: user.id,
                    toUserId: item.ownerId,
                    points: item.pointValue,
                    status: "PENDING",
                },
            });

            await tx.item.update({
                where: { id: item.id },
                data: { status: "IN_CLAIM" },
            });

            await tx.user.update({
                where: { id: user.id },
                data: { points: { decrement: item.pointValue } },
            });

            await tx.user.update({
                where: { id: item.ownerId },
                data: { points: { increment: item.pointValue } },
            });

            await tx.pointHistory.createMany({
                data: [
                    {
                        userId: user.id,
                        amount: item.pointValue,
                        type: "SPEND",
                        description: `Claim item: ${item.title}`,
                    },
                    {
                        userId: item.ownerId,
                        amount: item.pointValue,
                        type: "EARN",
                        description: `Item claimed: ${item.title}`,
                    },
                ],
            });

            await tx.transaction.update({
                where: { id: createdTx.id },
                data: { status: "COMPLETED" },
            });

            await tx.item.update({
                where: { id: item.id },
                data: { status: "COMPLETED" },
            });

            return createdTx;
        });

        return NextResponse.json(
            {
                message: "Item successfully claimed",
                transaction,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CLAIM ITEM ERROR:", error);
        return NextResponse.json(
            { message: "Failed to claim item" },
            { status: 500 }
        );
    }
}
