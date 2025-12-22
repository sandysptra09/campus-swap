import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const currentUser = await getUserFromRequest();

    if (!currentUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: currentUser.id
          }
        }
      },
      include: {
        users: true, 
        messages: {  
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        lastMessageAt: 'desc' 
      }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getUserFromRequest();
    
    if (!currentUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ message: 'User ID required' }, { status: 400 });
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          { users: { some: { id: currentUser.id } } },
          { users: { some: { id: userId } } }
        ]
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            { id: currentUser.id },
            { id: userId }
          ]
        }
      },
      include: {
        users: true
      }
    });

    return NextResponse.json(newConversation);

  } catch (error) {
    console.error('CONVERSATION_POST_ERROR', error);
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}