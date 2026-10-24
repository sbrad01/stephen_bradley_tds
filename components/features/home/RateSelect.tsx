"use client";

import { formatSelectItems } from "@/lib/formatters";

import { Currency } from "@/lib/constants/currencies";
import RateComboBox from "./RateComobox";
import RateInput from "./RateInput";

import { InputType } from "./CurrencyForm";

export type Rate = {
  id: number;
  name: string;
  short_code: string;
  symbol: string;
};

type Props = {
  inputType: InputType;
  value: number | null;
  rates: Rate[];
  currency: Currency;
  disabledInput?: boolean;
  onAmountChange: (value: number, inputType: InputType) => void;
  onCurrencyChange: (value: Currency, inputType: InputType) => void;
};

const RateSelect = ({
  inputType,
  value,
  rates,
  currency,
  disabledInput,
  onAmountChange,
  onCurrencyChange,
}: Props) => {
  const handleComboSelect = (value: Currency) => {
    onCurrencyChange(value, inputType);
  };

  const handleAmountChange = (value: string) => {
    onAmountChange(Number(value), inputType);
  };

  const items = formatSelectItems(rates, "short_code", "short_code");
  const currentSymbol = rates.filter((r) => r.short_code === currency)?.[0]
    .symbol;

  return (
    <div className="flex justify-between space-x-6 bg-white rounded-md p-2">
      <RateComboBox
        onChange={handleComboSelect}
        items={items}
        value={currency}
      />
      <RateInput
        currentSymbol={currentSymbol}
        value={value}
        onChange={handleAmountChange}
        disabledInput={disabledInput}
      />
    </div>
  );
};

export default RateSelect;
