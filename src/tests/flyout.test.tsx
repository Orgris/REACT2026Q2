import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer, {
  togglePokemonSelection,
} from '../app/selectedPokemonsSlice';
import { mockPokemon } from './mocks';
import { Flyout } from '../components/ui/flyout';

function createTestStore() {
  return configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsReducer,
    },
  });
}

describe('Flyout', () => {
  test('renders and shows selected pokemons count', () => {
    const store = createTestStore();

    store.dispatch(togglePokemonSelection(mockPokemon));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('Selected pokemons')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('unselect all button clears selected pokemons', () => {
    const store = createTestStore();

    store.dispatch(togglePokemonSelection(mockPokemon));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /unselect all/i,
      })
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('download button creates csv file', () => {
    const store = createTestStore();

    store.dispatch(togglePokemonSelection(mockPokemon));

    const createObjectURLMock = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('mock-url');

    const revokeObjectURLMock = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const clickMock = vi.fn();

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
      clickMock
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /download/i,
      })
    );

    expect(createObjectURLMock).toHaveBeenCalled();

    expect(clickMock).toHaveBeenCalled();

    expect(revokeObjectURLMock).toHaveBeenCalledWith('mock-url');
  });
});
