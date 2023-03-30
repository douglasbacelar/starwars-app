import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Testes para as renderizações dos filtros', () => {

  test('Verifica se todos os inputs, selects e buttons estão na página corretamente', () => {
    render(<App />);

    const nameInput = screen.getByTestId('name-filter');
    const columnSelect = screen.getByTestId('column-filter');
    const conditionSelect = screen.getByTestId('comparison-filter');
    const valueSelect = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const btnDeleteAll = screen.getByTestId('button-remove-filters');

    expect(nameInput).toBeVisible();
    expect(columnSelect).toBeVisible();
    expect(conditionSelect).toBeVisible();
    expect(valueSelect).toBeVisible();
    expect(btnFilter).toBeVisible();
    expect(btnDeleteAll).toBeVisible();
  });

  test('Verifica se ao filtrar por digitação a tabela é renderizada corretamente', async () => {
  
    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
  
    render(<App />);
  
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeVisible();
  
    const nameDagobah = await screen.findByText('Dagobah');
    const nameAlderaan = await screen.findByText('Alderaan');
    const nameEndor = await screen.findByText('Endor');
    const nameCoruscant = await screen.findByText('Coruscant');
  
    expect(nameDagobah).toBeVisible();
    expect(nameAlderaan).toBeVisible();
    expect(nameEndor).toBeVisible();
    expect(nameCoruscant).toBeVisible();
  
    userEvent.type(nameInput, 'd');
  
    expect(nameDagobah).toBeVisible();
    expect(nameCoruscant).not.toBeVisible();
    expect(nameEndor).toBeVisible();
    expect(nameAlderaan).toBeVisible();  
  });

  test('Verifica se adiciona corretamente os filtros ao clicar no botão FILTRAR', async () => {
  
    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
  
    render(<App />);
  
    const valueSelect = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    expect(valueSelect).toBeVisible();
    expect(btnFilter).toBeVisible();
  
    const nameAlderaan = await screen.findByText('Alderaan');
    const nameBespin = await screen.findByText('Bespin');
    const nameEndor = await screen.findByText('Endor');
    const nameNaboo = await screen.findByText('Naboo');
    const nameCoruscant	 = await screen.findByText('Coruscant');
    const nameKamino = await screen.findByText('Kamino');
    const nameTatooine = await screen.findByText('Tatooine');
    const nameHoth = await screen.findByText('Hoth');
  
    expect(nameAlderaan).toBeVisible();
    expect(nameBespin).toBeVisible();
    expect(nameEndor ).toBeVisible();
    expect(nameNaboo).toBeVisible();
    expect(nameCoruscant).toBeVisible();
    expect(nameKamino).toBeVisible();
    expect(nameTatooine).toBeVisible();
    expect(nameHoth).toBeVisible();
  
    userEvent.type(valueSelect, '1000000');
    userEvent.click(btnFilter);
  
  
    expect(nameTatooine).not.toBeVisible();
    expect(nameHoth).not.toBeVisible();
    expect(nameAlderaan).toBeVisible();
    expect(nameBespin).toBeVisible();
    expect(nameEndor ).toBeVisible();
    expect(nameNaboo).toBeVisible();
    expect(nameCoruscant).toBeVisible();
    expect(nameKamino).toBeVisible(); 
  });
  
})
