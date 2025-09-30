import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(template: EmailTemplate): Promise<void> {
  const msg = {
    to: template.to,
    from: process.env.FROM_EMAIL || 'noreply@halfdrinks.com',
    subject: template.subject,
    text: template.text,
    html: template.html,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export function generateOrderConfirmationEmail(order: any, items: any[]): EmailTemplate {
  const total = order.total.toFixed(2)
  const orderNumber = order.orderNumber

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - 1/2 Drinks</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; }
        .order-details { background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; }
        .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍹 1/2 Drinks</h1>
          <h2>Order Confirmation</h2>
        </div>
        
        <div class="order-details">
          <h3>Order #${orderNumber}</h3>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          
          <h4>Items Ordered:</h4>
          ${items.map(item => `
            <div class="item">
              <span>${item.product?.name || item.customDrink?.name} x${item.quantity}</span>
              <span>$${item.total.toFixed(2)}</span>
            </div>
          `).join('')}
          
          <div class="total">
            <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
            <p>Tax: $${order.tax.toFixed(2)}</p>
            <p>Shipping: $${order.shipping.toFixed(2)}</p>
            ${order.discount > 0 ? `<p>Discount: -$${order.discount.toFixed(2)}</p>` : ''}
            <p>Total: $${total}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing 1/2 Drinks!</p>
          <p>Questions? Contact us at support@halfdrinks.com</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
    Order Confirmation - 1/2 Drinks
    
    Order #${orderNumber}
    Order Date: ${new Date(order.createdAt).toLocaleDateString()}
    Status: ${order.status}
    
    Items Ordered:
    ${items.map(item => `- ${item.product?.name || item.customDrink?.name} x${item.quantity} - $${item.total.toFixed(2)}`).join('\n')}
    
    Subtotal: $${order.subtotal.toFixed(2)}
    Tax: $${order.tax.toFixed(2)}
    Shipping: $${order.shipping.toFixed(2)}
    ${order.discount > 0 ? `Discount: -$${order.discount.toFixed(2)}` : ''}
    Total: $${total}
    
    Thank you for choosing 1/2 Drinks!
    Questions? Contact us at support@halfdrinks.com
  `

  return {
    to: order.email,
    subject: `Order Confirmation #${orderNumber} - 1/2 Drinks`,
    html,
    text
  }
}

export function generateWelcomeEmail(email: string, firstName: string): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to 1/2 Drinks</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px; }
        .cta { text-align: center; margin: 30px 0; }
        .button { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍹 1/2 Drinks</h1>
          <h2>Welcome to the Family!</h2>
        </div>
        
        <div class="content">
          <p>Hi ${firstName},</p>
          <p>Welcome to 1/2 Drinks! We're thrilled to have you join our community of health-conscious drink lovers.</p>
          <p>As a new member, you'll enjoy:</p>
          <ul>
            <li>🎁 10% off your first order</li>
            <li>⭐ Exclusive access to new flavors</li>
            <li>🏆 Loyalty points on every purchase</li>
            <li>📱 Early access to our mobile app</li>
          </ul>
          
          <div class="cta">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" class="button">Start Shopping</a>
          </div>
          
          <p>Happy sipping!</p>
          <p>The 1/2 Drinks Team</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
    Welcome to 1/2 Drinks!
    
    Hi ${firstName},
    
    Welcome to 1/2 Drinks! We're thrilled to have you join our community of health-conscious drink lovers.
    
    As a new member, you'll enjoy:
    - 10% off your first order
    - Exclusive access to new flavors
    - Loyalty points on every purchase
    - Early access to our mobile app
    
    Start shopping: ${process.env.NEXT_PUBLIC_APP_URL}/shop
    
    Happy sipping!
    The 1/2 Drinks Team
  `

  return {
    to: email,
    subject: 'Welcome to 1/2 Drinks! 🍹',
    html,
    text
  }
}

