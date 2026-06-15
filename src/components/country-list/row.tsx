import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { type RowComponentProps } from 'react-window';

export function Row({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<{
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}>) {
  return (
    <div style={style}>
      <CountryCard
        country={countries[index]}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}
