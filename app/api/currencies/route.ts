import { NextRequest, NextResponse } from "next/server";
import { fetchConversion, fetchCurrencies } from "@/lib/currency-beacon";

export async function GET() {
  try {
    const currencies = await fetchCurrencies();
    return NextResponse.json(currencies);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const { from, to, amount } = await request.json();

  try {
    const conversion = await fetchConversion(from, to, amount);
    return NextResponse.json(conversion);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
