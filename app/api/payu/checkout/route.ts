import { NextRequest, NextResponse } from "next/server";
import * as crypto from "node:crypto";

type PayuCheckoutBody = {
  description: string;
  referenceCode: string;
  amount: string;
  email: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PayuCheckoutBody;

  const formData = new URLSearchParams();
  formData.append("merchantId", process.env.PAYU_MERCHANT_ID!);
  formData.append("accountId", process.env.PAYU_ACCOUNT_ID!);
  formData.append("description", body.description);
  formData.append("referenceCode", body.referenceCode);
  formData.append("amount", body.amount);
  formData.append("currency", "COP");
  formData.append(
    "signature",
    generateSignature(body.referenceCode, body.amount)
  );
  formData.append("buyerEmail", body.email);
  formData.append("responseUrl", "http://localhost:3000s");
  formData.append("confirmationUrl", "http://localhost:3000");

  return NextResponse.json({
    redirectUrl: "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/",
    params: Object.fromEntries(formData),
  });
}

function generateSignature(referenceCode: string, amount: string) {
  const raw = `${process.env.PAYU_API_KEY}~${process.env.PAYU_MERCHANT_ID}~${referenceCode}~${amount}~COP`;
  return crypto.createHash("md5").update(raw).digest("hex");
}
