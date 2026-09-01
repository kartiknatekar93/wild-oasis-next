import { getCountries } from "@/app/_lib/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  // Find default country's flag emoji using v5 schema (country.names.common and country.flag.emoji)
  const defaultFlag =
    countries.find((c) => c.names?.common === defaultCountry)?.flag?.emoji ??
    "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${defaultFlag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => {
        const countryName = c.names?.common;
        const flagEmoji = c.flag?.emoji ?? "";

        return (
          <option key={countryName} value={`${countryName}%${flagEmoji}`}>
            {flagEmoji} {countryName}
          </option>
        );
      })}
    </select>
  );
}

export default SelectCountry;
