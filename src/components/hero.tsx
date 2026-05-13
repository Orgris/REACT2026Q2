import React from 'react';

export class Hero extends React.Component {
  render(): React.ReactNode {
    return (
      <section
        data-testid="hero"
        className="rounded-b-lg border border-t-0 border-[var(--border)] bg-[var(--bg)] p-6 lg:p-8"
      >
        <div>
          <h1>
            <span className="bg-[var(--rss)] px-5 font-extrabold text-[var(--rss-text)]">
              RS School
            </span>
            <span
              className="pl-5 text-[var(--rss)] [-webkit-text-stroke:10px_var(--pokemon-blue)] [paint-order:stroke_fill] [text-stroke:10px_var(--pokemon-blue)]"
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
