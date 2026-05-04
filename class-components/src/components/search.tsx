import React, { type ReactNode } from 'react';

type SearchProps = {
  children: ReactNode;
};

export class Search extends React.Component<SearchProps> {
  render(): React.ReactNode {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 text-left lg:p-8">
        <div>
          <h2>Search your Pokémon!</h2>
          <p>Enter a Pokémon name or National Pokédex number.</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}
