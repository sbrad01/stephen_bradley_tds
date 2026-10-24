import type { Rate } from "@/components/features/home/RateSelect";

const getApiUrl = () => {
  const base =
    typeof window !== "undefined"
      ? ""
      : (process.env.NEXT_PUBLIC_SITE_URL ??
        `http://localhost:${process.env.PORT ?? 3000}`);
  return `${base}/api/currencies`;
};

export const getCurrencies = async () => {
  const res = await fetch(getApiUrl(), {
    method: "GET",
  });

  if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

  const jsonRes = (await res.json()) as Record<string, Rate>;
  const filteredCurrencies = Object.values(jsonRes).filter(
    (c) => c.short_code !== undefined,
  );
  return filteredCurrencies;
};

export const convertCurrencies = async (
  from: string,
  to: string,
  amount: number,
) => {
  const res = await fetch(getApiUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, amount }),
  });
  if (!res.ok) throw new Error(`Currency request failed: ${res.status}`);

  return res.json();
};
