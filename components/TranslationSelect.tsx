"use client";

import Image from "next/image";
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

export const LANGUAGES = {
  en: { label: "English", countryCode: "gb" },
  es: { label: "Español", countryCode: "es" },
  fr: { label: "Français", countryCode: "fr" },
} as const;

export type Language = keyof typeof LANGUAGES;

const flagSrc = (language: Language) =>
  `https://flagcdn.com/w80/${LANGUAGES[language].countryCode}.png`;

const items = (Object.keys(LANGUAGES) as Language[]).map((language) => ({
  label: LANGUAGES[language].label,
  value: language,
}));

const labelFor = (item: Language | { value: Language }) => {
  const code = typeof item === "string" ? item : item.value;
  return LANGUAGES[code]?.label ?? "";
};

type Props = {
  value: Language;
  onChange: (value: Language) => void;
};

export default function TranslationSelect({ value, onChange }: Props) {
  return (
    <Combobox
      items={items}
      itemToStringLabel={labelFor}
      onValueChange={(selected) => onChange(selected as Language)}
      value={value}
    >
      <ComboboxInput
        aria-label="translation select"
        className="border-0 focus:border-0 focus-visible:border-0 focus-visible:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-0! has-[[data-slot=input-group-control]:focus-visible]:ring-0!"
      >
        <InputGroupAddon align="inline-start">
          <div className="relative rounded-full h-5 w-5 overflow-hidden">
            <Image src={flagSrc(value)} alt="" fill className="object-cover" />
          </div>
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item.value}
              value={item.value}
              aria-label={`language-${item.value}`}
              className="flex items-center gap-1 cursor-pointer"
            >
              <div className="relative rounded-full h-6 w-6 overflow-hidden">
                <Image
                  src={flagSrc(item.value)}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <Text value={item.label} classOverride="font-bold" />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
