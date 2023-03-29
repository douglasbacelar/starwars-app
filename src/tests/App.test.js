import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('I am your test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Testes para a página Login', () => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  test('Página inicial começa com a rota /', () => {
    const initialEntries = ['/'];
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
})
