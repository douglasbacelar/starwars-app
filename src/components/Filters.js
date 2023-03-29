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
  } = useContext(FiltersContext);

  const arrayColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

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
            {arrayColumns.map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))}
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
            onClick={ () => setSelectedFilters([...selectedFilters, selectFilters]) }
          >
            Filtrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Filters;
