import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const user = await getUserFromRequest();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const history = await prisma.pointHistory.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" }, 
        });

        return NextResponse.json(history);

    } catch (error) {
        console.error("POINT HISTORY ERROR:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}