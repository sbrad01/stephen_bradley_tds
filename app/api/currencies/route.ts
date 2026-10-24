import { NextRequest, NextResponse } from "next/server";

const CURRENCY_BEACON_URL = "https://api.currencybeacon.com/v1";

const getApiKey = () => {
  const API_KEY = process.env.CURRENCY_BEACON_API_KEY;
  if (!API_KEY) throw new Error("CURRENCY_BEACON_API_KEY is not set");
  return API_KEY;
};

export async function GET() {
  try {
    const url = new URL(`${CURRENCY_BEACON_URL}/currencies`);
    url.searchParams.set("api_key", getApiKey());

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

    const currencies = await res.json();
    return NextResponse.json(currencies);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  let body: { from?: unknown; to?: unknown; amount?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { from, to, amount } = body;
  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    typeof amount !== "number" ||
    !Number.isFinite(amount)
  ) {
    return NextResponse.json(
      { error: "Expected { from: string, to: string, amount: number }" },
      { status: 400 },
    );
  }

  try {
    const url = new URL(`${CURRENCY_BEACON_URL}/convert`);
    url.searchParams.set("api_key", getApiKey());
    url.searchParams.set("from", from);
    url.searchParams.set("to", to);
    url.searchParams.set("amount", String(amount));

    const res = await fetch(url);

    if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

    const conversion = await res.json();

    return NextResponse.json(conversion);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
