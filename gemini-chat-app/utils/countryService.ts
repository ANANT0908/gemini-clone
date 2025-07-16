export async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/independent');
  const data = await res.json();
  return data.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
    dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
  })).filter((c:any) => c.dialCode);
}
