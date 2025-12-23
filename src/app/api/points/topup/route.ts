import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { amount } = await req.json();
        
        if (!amount || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: { points: { increment: Number(amount) } }
            }),
            prisma.pointHistory.create({
                data: {
                    userId: user.id,
                    amount: Number(amount),
                    type: "TOPUP", 
                    description: "Top Up Balance (Sandbox)"
                }
            })
        ]);

        return NextResponse.json({ message: "Top up success" });

    } catch (error) {
        console.error("TOPUP ERROR:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}