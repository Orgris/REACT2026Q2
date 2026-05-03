import React from 'react';

export class Hero extends React.Component {
  render(): React.ReactNode {
    return (
      <section className="rounded-b-lg border border-t-0 border-[var(--border)] bg-[var(--bg)] p-6 lg:p-8">
        <div>
          <h1>
            <span className="bg-[var(--rss)] px-5 font-bold text-[var(--rss-text)]">
              RS School
            </span>
            <span
              className="pl-5 text-[var(--rss)]"
              style={{ fontFamily: 'Pokemon Solid' }}
            >
              Pokédex
            </span>
          </h1>
          <p>Gotta Catch &apos;Em All!</p>
        </div>
      </section>
    );
  }
}
