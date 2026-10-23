import { cn } from "@/lib/utils";

type variant = "h1" | "h2" | "h3";

type TextProps = {
  variant?: string;
  classOverride?: string;
  value: string;
};

const Text = ({ classOverride, value }: TextProps) => {
  return <p className={cn(classOverride, "text-slate-400")}>{value}</p>;
};

export default Text;
