import { cn } from "@/lib/utils";

type TitleProps = {
  classOverride?: string;
  value: string;
};

const Title = ({ classOverride, value }: TitleProps) => {
  return <h1 className={cn(classOverride)}>{value}</h1>;
};

export default Title;
