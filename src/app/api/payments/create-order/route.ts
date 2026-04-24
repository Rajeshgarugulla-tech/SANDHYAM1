import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { plan = 'starter', amount = 499 } = await req.json();
    const orderId = `basic_order_${Date.now()}`;

    return NextResponse.json({
      success: true,
      payment: {
        provider: 'razorpay_basic_stub',
        orderId,
        plan,
        amount,
        currency: 'INR',
        note: 'Basic placeholder integration. Replace with live Razorpay server-side order creation.',
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
