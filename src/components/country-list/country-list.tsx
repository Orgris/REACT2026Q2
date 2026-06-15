import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { useMemo } from 'react';
import React from 'react';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = React.memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const filteredCountries = useMemo(
      () =>
        countries.filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        }),
      [countries, searchQuery, selectedRegion]
    );

    const countriesWithDataMap = useMemo(() => {
      return filteredCountries.map((filteredCountry) => ({
        ...filteredCountry,
        yearDataMap: createYearDataMap(filteredCountry.data),
      }));
    }, [filteredCountries]);

    const sortedFilteredCountries = useMemo(
      () =>
        [...countriesWithDataMap].sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          } else {
            const popA = getPopulationForYear(a.yearDataMap, selectedYear) || 0;
            const popB = getPopulationForYear(b.yearDataMap, selectedYear) || 0;

            return sortOrder === 'asc' ? popA - popB : popB - popA;
          }
        }),
      [countriesWithDataMap, selectedYear, sortField, sortOrder]
    );

    return (
      <div className={styles.countryList}>
        {sortedFilteredCountries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            selectedYear={selectedYear}
            selectedColumns={selectedColumns}
          />
        ))}
      </div>
    );
  }
);
