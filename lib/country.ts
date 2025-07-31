export function getCountryFromNavigator() {
  if (typeof window === "undefined") return null;
  const lang = navigator.language || "kr";
  // language looks like 'en-US' or 'ko-KR'
  const country = lang.split("-")[1];
  if (country && country.length === 2) return country.toUpperCase();
  return "KR";
}
