"use client";

import { usePathname, useRouter } from "next/navigation";
import TranslationSelect, {
  LANGUAGES,
  type Language,
} from "@/components/features/navigation/TranslationSelect";

const DEFAULT_LANGUAGE: Language = "en";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segment = pathname.split("/")[1] ?? "";
  const base = segment.split("-")[0];
  const current: Language =
    base in LANGUAGES ? (base as Language) : DEFAULT_LANGUAGE;

  const handleChange = (language: Language) => {
    router.push(`/${language}`);
  };

  return <TranslationSelect value={current} onChange={handleChange} />;
}
