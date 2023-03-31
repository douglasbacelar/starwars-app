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

  test('Teste se consigo remover todos os Filtros', async () => {
    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
    
    render(<App />);

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '24')
    userEvent.click(filterBtn)

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(5)

    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '5000')
    userEvent.click(filterBtn)

    const newFilteredPlanets = await screen.findAllByTestId('planet-name')
    expect(newFilteredPlanets).toHaveLength(4)

    userEvent.selectOptions(columnFilter, 'surface_water')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '1')
    userEvent.click(filterBtn)

    const newFilteredPlanets2 = await screen.findAllByTestId('planet-name')
    expect(newFilteredPlanets2).toHaveLength(1)

    const removeAllFilters = await screen.findByTestId('button-remove-filters')
    userEvent.click(removeAllFilters)

    const AllPlanets = await screen.findAllByTestId('planet-name')
    expect(AllPlanets).toHaveLength(10)

  })

  test('Teste se consigo remover um Filtro por coluna', async () => {
    jest.spyOn(global, 'fetch');
  
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
    
    render(<App />);

    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const filterBtn = screen.getByTestId('button-filter')

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.type(valueFilter, '20')
    userEvent.click(filterBtn)

    const filteredPlanets = await screen.findAllByTestId('planet-name')
    expect(filteredPlanets).toHaveLength(2)

    const removeFilter = await screen.findByTestId('delete-btn')
    userEvent.click(removeFilter)

    const AllRenderPlanets = await screen.findAllByTestId('planet-name')
    expect(AllRenderPlanets).toHaveLength(10)

  })
  
})
