import React, { useCallback, useContext } from 'react';
import FiltersContext from '../context/FiltersContext';

function Filters() {
  const {
    searchPlanetInput,
    setSearchPlanetInput,
    selectFilters,
    setSelectFilters,
    selectedFilters,
    setSelectedFilters,
    columns,
    setColumns,
    selectSort,
    setselectSort,
    renderPlanets,
    setRenderPlanets,
  } = useContext(FiltersContext);

  const changeState = () => {
    const newArray = columns.filter((column) => column !== selectFilters.column);
    setSelectedFilters([...selectedFilters, selectFilters]);
    setSelectFilters({
      column: newArray[0],
      condition: 'maior que',
      value: 0,
    });
    setColumns([...newArray]);
  };

  const handleDeleteAll = () => {
    const originalColumns = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];
    setSelectedFilters([]);
    setColumns(originalColumns);
  };

  const handleSort = useCallback((param) => {
    const menosUm = -1;
    if (param.sort === 'ASC') {
      const planetsConditions = [...renderPlanets].sort((a, b) => (
        b[selectSort.column] === 'unknown' ? menosUm
          : parseInt(a[selectSort.column], 10) - parseInt(b[selectSort.column], 10)
      ));
      setRenderPlanets(planetsConditions);
    }

    if (param.sort === 'DESC') {
      const planetsConditions = [...renderPlanets].sort((a, b) => (
        b[selectSort.column] === 'unknown' ? menosUm
          : parseInt(b[selectSort.column], 10) - parseInt(a[selectSort.column], 10)
      ));
      setRenderPlanets(planetsConditions);
    }
  }, [renderPlanets, selectSort.column, setRenderPlanets]);

  return (

    <form>
      <fieldset>
        <label>
          <input
            type="text"
            data-testid="name-filter"
            value={ searchPlanetInput }
            onChange={ ({ target }) => setSearchPlanetInput(target.value) }
          />
        </label>
        <select
          data-testid="column-filter"
          value={ selectFilters.column }
          onChange={ ({ target }) => setSelectFilters(
            { ...selectFilters, column: target.value },
          ) }
        >
          {
            columns.map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))
          }
        </select>

        <select
          data-testid="comparison-filter"
          value={ selectFilters.condition }
          onChange={ ({ target }) => setSelectFilters(
            { ...selectFilters, condition: target.value },
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label>
          <input
            type="number"
            data-testid="value-filter"
            value={ selectFilters.value }
            onChange={ ({ target }) => setSelectFilters(
              { ...selectFilters, value: target.value },
            ) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => changeState() }
        >
          Filtrar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleDeleteAll }
        >
          Remover todas filtragens
        </button>

        <label>
          Ordenar colunas
          <select
            data-testid="column-sort"
            value={ selectSort.column }
            onChange={ ({ target }) => setselectSort(
              { ...selectSort, column: target.value },
            ) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            id="ASC"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
            onClick={ ({ target }) => setselectSort(
              { ...selectSort, sort: target.value },
            ) }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            id="DESC"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
            onClick={ ({ target }) => setselectSort(
              { ...selectSort, sort: target.value },
            ) }
          />

        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSort(selectSort) }
        >
          Ordenar
        </button>
      </fieldset>
    </form>

  );
}

export default Filters;
