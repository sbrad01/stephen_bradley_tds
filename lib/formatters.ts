export const formatSelectItems = (
  items: any[],
  labelKey: string,
  valueKey: string,
) => {
  return items.map((i) => ({ label: i[labelKey], value: i[valueKey] }));
};

export const roundToTwoDecimals = (value: number) =>
  Math.round(value * 100) / 100;
