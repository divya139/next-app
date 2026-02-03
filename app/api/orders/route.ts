import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error('GET /api/orders error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      orderItems,
      subtotal,
      shippingCost,
      total
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        subtotal: parseFloat(subtotal),
        shippingCost: parseFloat(shippingCost) || 10.0,
        total: parseFloat(total),
        status: 'PENDING',
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            productImage: item.productImage,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            subtotal: parseFloat(item.subtotal)
          }))
        }
      },
      include: {
        orderItems: true
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    )
  }
}