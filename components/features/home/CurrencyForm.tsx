"use client";

import { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { Card } from "@/components/ui/card";
import { USD, EUR } from "@/lib/constants/currencies";

import type { Currency } from "@/lib/constants/currencies";
import RateSelect from "./RateSelect";
import type { Rate } from "./RateSelect";
import { convertCurrencies } from "@/services/currencies";
import { roundToTwoDecimals } from "@/lib/formatters";

export type InputType = "FROM" | "TO";

const INPUT_TYPES = {
  FROM: "FROM",
  TO: "TO",
} as const satisfies Record<string, InputType>;

const CurrencyForm = ({ rates }: { rates: Rate[] }) => {
  const [fromValue, setFromValue] = useState<number>(1);
  const [toValue, setToValue] = useState<null | number>(null);
  const [fromCurrency, setFromCurrency] = useState<Currency>(USD);
  const [toCurrency, setToCurrency] = useState<Currency>(EUR);

  const handleCurrencyChange = (value: Currency, inputType: InputType) => {
    inputType === INPUT_TYPES.FROM
      ? setFromCurrency(value)
      : setToCurrency(value);
  };

  const debouncedConvert = useMemo(
    () =>
      debounce(async (value: number) => {
        const data = await convertCurrencies(fromCurrency, toCurrency, value);
        setToValue(roundToTwoDecimals(data.value));
      }, 200),
    [fromCurrency, toCurrency],
  );

  useEffect(() => {
    debouncedConvert(fromValue);
  }, [debouncedConvert]);

  const handleAmountChange = (value: number, inputType: InputType) => {
    inputType === INPUT_TYPES.FROM ? setFromValue(value) : setToValue(value);
    debouncedConvert(value);
  };

  return (
    <Card className="flex flex-col bg-slate-700/5 border-0 p-3">
      <RateSelect
        inputType={INPUT_TYPES.FROM}
        value={fromValue}
        rates={rates}
        currency={fromCurrency}
        onCurrencyChange={handleCurrencyChange}
        onAmountChange={handleAmountChange}
      />
      <RateSelect
        inputType={INPUT_TYPES.TO}
        value={toValue}
        rates={rates}
        currency={toCurrency}
        onCurrencyChange={handleCurrencyChange}
        onAmountChange={handleAmountChange}
      />
    </Card>
  );
};

export default CurrencyForm;
