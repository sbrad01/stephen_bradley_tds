import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import Text from "@/components/typography/Text";
import type { Currency } from "@/lib/constants/currencies";
import countries from "@/lib/constants/countries.json";
import Image from "next/image";

type Props = {
  items: { label: string; value: string }[];
  onChange: (value: Currency) => void;
  value: Currency;
};

export default function RateComboBox({ items, onChange, value }: Props) {
  const selectedFlag = countries[value as keyof typeof countries]?.image;
  return (
    <Combobox
      items={items}
      onValueChange={(selected) => onChange(selected as Currency)}
      value={value}
    >
      <ComboboxInput
        aria-label="currency input select"
        className="border-0 focus:border-0 focus-visible:border-0 focus-visible:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-0! has-[[data-slot=input-group-control]:focus-visible]:ring-0!"
      >
        <InputGroupAddon align="inline-start">
          <div className="relative rounded-full h-5 w-5 overflow-hidden">
            {selectedFlag && (
              <Image
                src={selectedFlag}
                alt=""
                fill
                sizes="20px"
                className="object-cover"
              />
            )}
          </div>
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const flagSrc =
              countries[item.value as keyof typeof countries]?.image;
            return (
              <ComboboxItem
                key={item.value}
                value={item.value}
                aria-label={`currency-${item.value}`}
                className="flex items-center gap-1 cursor-pointer"
              >
                <div className="relative rounded-full h-6 w-6 overflow-hidden">
                  {flagSrc && (
                    <Image
                      src={flagSrc}
                      alt=""
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  )}
                </div>
                <Text value={item.label} classOverride="font-bold" />
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
