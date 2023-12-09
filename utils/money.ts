// format cents into dollars
export const formatCentsToDollars = (cents: null | number | undefined) => {
  const dollars = (cents || 0) / 100;
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
