import { cn } from "@/lib/utils";

type TextProps = {
  classOverride?: string;
  value: string;
};

const Text = ({ classOverride, value }: TextProps) => {
  return <p className={cn(classOverride, "text-slate-400")}>{value}</p>;
};

export default Text;
