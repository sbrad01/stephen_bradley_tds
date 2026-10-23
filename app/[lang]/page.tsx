import { Suspense } from "react";
import Image from "next/image";
import backgroundImage from "@/public/background.png";
import Title from "@/components/typography/Title";
import Text from "@/components/typography/Text";
import { getDictionary } from "@/locales/locales";
import CurrencyForm from "@/components/features/home/CurrencyForm";
import { fetchCurrencies } from "@/lib/currency-beacon";

export function generateStaticParams() {
  return [{ lang: "en-GB" }, { lang: "en" }, { lang: "es" }, { lang: "fr" }];
}

export default function Page({ params }: PageProps<"/[lang]">) {
  return (
    <main className="flex flex-1 w-full justify-center items-center">
      <Image
        src={backgroundImage}
        alt=""
        priority
        placeholder="blur"
        className="fixed bottom-[-100] left-0 w-full h-auto -z-10 pointer-events-none"
      />
      <Suspense fallback={null}>
        <HomeContent params={params} />
      </Suspense>
    </main>
  );
}

async function HomeContent({
  params,
}: {
  params: PageProps<"/[lang]">["params"];
}) {
  const { lang } = await params;

  const dict = await getDictionary(lang);
  const rates = await fetchCurrencies();

  return (
    <div className="flex flex-col justify-center text-center max-w-3xl space-y-4">
      <Title value={dict.home.title} classOverride="text-6xl" />
      <Text value={dict.home.subheading} />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <CurrencyForm rates={Object.values(rates)} />
        </div>
      </div>
    </div>
  );
}
