// app/api/payu/confirmation/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData(); 

  const reference = data.get('reference_sale');
  const state = data.get('state_pol');

  console.log(`Pago ${state} para referencia ${reference}`);


  return NextResponse.json({ received: true });
}
