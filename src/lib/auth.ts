import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

type JwtPayload = {
    id: string;
    role: 'ADMIN' | 'USER';
};

export async function getUserFromRequest(): Promise<JwtPayload | null> {
    try {
        const token = (await cookies()).get('auth_token')?.value;
        if (!token) return null;

        const payload = verifyJwt(token) as JwtPayload | null;
        if (!payload) return null;

        return payload;
    } catch {
        return null;
    }
}
