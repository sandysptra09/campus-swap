import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        const { id } = await params;

        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const transaction = await prisma.transaction.findUnique({
            where: { id: id },
            include: {
                item: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        pointValue: true,
                        status: true,
                    },
                },
                fromUser: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                    },
                },
                toUser: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                    },
                },
            },
        });

        if (!transaction) {
            return NextResponse.json(
                { message: "Transaction not found" },
                { status: 404 }
            );
        }

        const isAdmin = user.role === "ADMIN";
        const isBuyer = transaction.fromUserId === user.id;
        const isSeller = transaction.toUserId === user.id;

        if (!isAdmin && !isBuyer && !isSeller) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        console.error("GET TRANSACTION DETAIL ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch transaction detail" },
            { status: 500 }
        );
    }
}
