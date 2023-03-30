import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import FiltersContext from '../context/FiltersContext';

function Table() {
  const { data } = useContext(FetchContext);
  const { selectedFilters, selectFilters, setSelectedFilters,
    renderPlanets, columns, setColumns, setSelectFilters } = useContext(FiltersContext);

  const columnWithoutResidents = data.length === 0 ? ''
    : Object.keys(data[0]).filter((key) => key !== 'residents');

  const handleDelete = (e) => {
    const newFilters = selectedFilters.filter((param) => param.column !== e.target.value);
    setSelectedFilters(newFilters);
    console.log('columns', columns);
    console.log('select', selectFilters);
    console.log('selected', selectedFilters);
    const newArray = columns.filter((column) => column !== selectFilters.column);
    console.log('target', e.target.value);
    console.log('selected', selectedFilters);
    console.log('newarray', newArray);
    setColumns([...columns, e.target.value]);
  };

  return (
    <div>
      <div>
        {selectedFilters.map((filter, index) => (
          <span key={ index } data-testid="filter">

            {filter.column}
            {' '}
            {filter.condition}
            {' '}
            {filter.value}
            <button
              data-testid="delete-btn"
              value={ filter.column }
              onClick={ handleDelete }
            >
              Excluir
            </button>
          </span>
        ))}
      </div>
      <table className="table">

        {
          columnWithoutResidents === ''
            ? (
              <span
                className="rounded-lg bg-white"
              >
                Carregando...
              </span>
            )
            : (
              <>
                <thead className="hover:bg-white">
                  <tr>
                    { columnWithoutResidents.map((column) => (
                      <th key={ column }>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody />
                {
                  renderPlanets.map((types) => (
                    <tr key={ types.name }>
                      <td>{types.name}</td>
                      <td>{types.rotation_period}</td>
                      <td>{types.orbital_period}</td>
                      <td>{types.diameter}</td>
                      <td>{types.climate}</td>
                      <td>{types.gravity}</td>
                      <td>{types.terrain}</td>
                      <td>{types.surface_water}</td>
                      <td>{types.population}</td>
                      <td>{types.films}</td>
                      <td>{types.created}</td>
                      <td>{types.edited}</td>
                      <td>{types.url}</td>
                    </tr>
                  ))
                }
              </>
            )
        }
      </table>
    </div>
  );
}

export default Table;
