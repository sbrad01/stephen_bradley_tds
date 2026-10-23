import { cn } from "@/lib/utils";

type variant = "h1" | "h2" | "h3";

type TitleProps = {
  variant?: variant;
  classOverride?: string;
  value: string;
};

const Title = ({ variant, classOverride, value }: TitleProps) => {
  return <h1 className={cn(classOverride)}>{value}</h1>;
};

export default Title;
