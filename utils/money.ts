// format cents into dollars
export const formatCentsToDollars = (cents = 0) => {
    const dollars = cents / 100;
    return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };