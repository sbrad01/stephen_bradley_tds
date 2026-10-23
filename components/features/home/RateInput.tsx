import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
  currentSymbol: string;
  value: number | null;
  onChange: (value: string) => void;
};

export default function RateInput({ currentSymbol, value, onChange }: Props) {
  const [isInFocused, setIsInFocused] = useState(false);
  const [prettyValue, setPrettyValue] = useState<string | null>(null);

  useEffect(() => {
    if (value === null) return;
    setPrettyValue(value.toLocaleString("en-GB", { maximumFractionDigits: 2 }));
  }, [value]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    event.stopPropagation();
    const [whole, ...decimals] = event.target.value
      .replace(/[^0-9.]/g, "")
      .split(".");
    onChange(decimals.length ? `${whole}.${decimals.join("")}` : whole);
  };

  const handleInputBlur = () => {
    setIsInFocused(false);
    if (value === null || Number.isNaN(value)) return;
    setPrettyValue(value.toLocaleString("en-GB", { maximumFractionDigits: 2 }));
  };

  return (
    <span className="flex items-center font-bold">
      {!isInFocused && <p>{currentSymbol}</p>}
      <Input
        className="border-0 outline-none font-bold text-2xl p-0 focus:border-0 focus:outline-0 focus-visible:ring-0 focus-visible:border-0"
        value={
          isInFocused || prettyValue === null ? (value ?? "") : prettyValue
        }
        type="text"
        inputMode="decimal"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={() => setIsInFocused(true)}
        aria-label="money conversion amount"
      />
    </span>
  );
}
