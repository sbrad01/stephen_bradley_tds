import { cacheLife } from "next/cache";

const CURRENCY_BEACON_URL = "https://api.currencybeacon.com/v1";

const getApiKey = () => {
  const API_KEY = process.env.CURRENCY_BEACON_API_KEY;
  if (!API_KEY) throw new Error("CURRENCY_BEACON_API_KEY is not set");
  return API_KEY;
};

export const fetchCurrencies = async () => {
  "use cache";
  cacheLife("days");

  const url = new URL(`${CURRENCY_BEACON_URL}/currencies`);
  url.searchParams.set("api_key", getApiKey());

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

  return res.json();
};

export const fetchConversion = async (from: string, to: string, amount: number) => {
  "use cache";
  cacheLife("days");

  const url = new URL(`${CURRENCY_BEACON_URL}/convert`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("amount", String(amount));

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

  return res.json();
};
