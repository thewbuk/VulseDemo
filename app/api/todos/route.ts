import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { completed } = await request.json();
  const todo = await prisma.todo.update({
    where: { id: params.id },
    data: { completed },
  });

  return new NextResponse(JSON.stringify(todo), { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await prisma.todo.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}