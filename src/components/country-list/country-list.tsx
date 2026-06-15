import type { Country } from '../../types';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { useMemo } from 'react';
import React from 'react';
import { List, useDynamicRowHeight } from 'react-window';
import { Row } from './Row';

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

    const rowHeight = useDynamicRowHeight({
      defaultRowHeight: 120,
    });

    return (
      <List
        className={styles.countryList}
        rowComponent={Row}
        rowCount={sortedFilteredCountries.length}
        rowProps={{
          countries: sortedFilteredCountries,
          selectedYear,
          selectedColumns,
        }}
        rowHeight={rowHeight}
      />
    );
  }
);
