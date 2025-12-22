import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const role = req.nextUrl.searchParams.get("role");

        if (!role || !["buyer", "seller"].includes(role)) {
            return NextResponse.json(
                { message: "Invalid role parameter" },
                { status: 400 }
            );
        }

        const whereCondition =
            role === "buyer"
                ? { fromUserId: user.id }
                : { toUserId: user.id };

        const transactions = await prisma.transaction.findMany({
            where: whereCondition,
            orderBy: { createdAt: "desc" },
            include: {
                item: {
                    select: {
                        id: true,
                        title: true,
                        pointValue: true,
                        status: true,
                        imageUrl: true,
                    },
                },
                fromUser: {
                    select: { id: true, fullname: true },
                },
                toUser: {
                    select: { id: true, fullname: true },
                },
            },
        });

        return NextResponse.json(
            {
                role,
                total: transactions.length,
                transactions,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET MY TRANSACTIONS ERROR:", error);
        return NextResponse.json(
            { message: "Failed to fetch transactions" },
            { status: 500 }
        );
    }
}
