import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { orderItems: true }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// UPDATE order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
      include: { orderItems: true }
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    )
  }
}