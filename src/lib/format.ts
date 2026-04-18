export const formatPrice = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export const cls = (...x: Array<string | false | null | undefined | 0 | "">) => x.filter(Boolean).join(" ");
