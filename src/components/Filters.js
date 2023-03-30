import React, { useContext } from 'react';
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

  return (
    <div>
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
        </fieldset>
      </form>
    </div>
  );
}

export default Filters;
