import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Verify API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, orderNumber, cartItems, addressDetails, totalPrice } = body;

    // Validate required fields
    if (!email || !orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Sending email to:', email);
    console.log('Order Number:', orderNumber);

    const data = await resend.emails.send({
      from: 'Order Confirmation <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 20px auto; padding: 0; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%); color: white; padding: 40px 20px; text-align: center; }
              .header h1 { font-size: 28px; margin-bottom: 10px; }
              .content { padding: 40px 20px; }
              .order-number { background-color: #EEF2FF; border-left: 4px solid #4F46E5; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .order-number strong { color: #4F46E5; }
              .section { margin: 30px 0; }
              .section h2 { color: #4F46E5; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #EEF2FF; padding-bottom: 10px; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
              .item-details { flex: 1; }
              .item-price { text-align: right; font-weight: bold; }
              .summary { margin-top: 20px; padding-top: 20px; border-top: 2px solid #EEF2FF; }
              .summary-row { display: flex; justify-content: space-between; margin: 10px 0; }
              .summary-row.total { font-size: 18px; font-weight: bold; color: #4F46E5; }
              .address { background-color: #f9f9f9; padding: 15px; border-radius: 4px; }
              .footer { background-color: #f4f4f4; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; }
              .button { display: inline-block; background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Order Confirmed!</h1>
                <p>Thank you for your purchase</p>
              </div>
              <div class="content">
                <p>Dear <strong>${addressDetails.fullName}</strong>,</p>
                <p style="margin-top: 15px;">Your order has been successfully placed and is being processed. We'll keep you updated on the status of your shipment.</p>
                
                <div class="order-number">
                  <strong>Order Number:</strong> <span style="font-size: 16px;">${orderNumber}</span>
                </div>

                <div class="section">
                  <h2>Order Items</h2>
                  ${cartItems.map((item: any) => `
                    <div class="item">
                      <div class="item-details">
                        <strong>${item.productTitle}</strong><br>
                        <small style="color: #666;">Quantity: ${item.quantity} × $${item.price.toFixed(2)}</small>
                      </div>
                      <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  `).join('')}
                </div>

                <div class="summary">
                  <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${(totalPrice - 10).toFixed(2)}</span>
                  </div>
                  <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$10.00</span>
                  </div>
                  <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div class="section">
                  <h2>Shipping Address</h2>
                  <div class="address">
                    <p><strong>${addressDetails.fullName}</strong></p>
                    <p>${addressDetails.address}</p>
                    <p>${addressDetails.city}, ${addressDetails.state} ${addressDetails.zipCode}</p>
                    <p>${addressDetails.country}</p>
                    <p style="margin-top: 10px;"><strong>Phone:</strong> ${addressDetails.phone}</p>
                  </div>
                </div>

                <p style="margin-top: 30px; color: #666;">We'll send you a shipping notification with tracking information once your order ships.</p>
              </div>
              <div class="footer">
                <p>Thank you for shopping with us!</p>
                <p style="margin-top: 10px;">If you have any questions, please don't hesitate to contact our support team.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}