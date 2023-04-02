import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import FiltersContext from '../context/FiltersContext';

function Table() {
  const { data } = useContext(FetchContext);
  const { selectedFilters, setSelectedFilters,
    renderPlanets, columns, setColumns } = useContext(FiltersContext);

  const columnWithoutResidents = data.length === 0 ? ''
    : Object.keys(data[0]).filter((key) => key !== 'residents');

  const handleDelete = (e) => {
    const newFilters = selectedFilters.filter((param) => param.column !== e.target.value);
    setSelectedFilters(newFilters);
    setColumns([...columns, e.target.value]);
  };

  return (
    <div>
      <div>
        {selectedFilters.map((filter, index) => (
          <li key={ index } data-testid="filter">
            {`${filter.column} ${filter.condition} ${filter.value}`}
            <button
              data-testid="delete-btn"
              value={ filter.column }
              onClick={ handleDelete }
            >
              Excluir
            </button>
          </li>
        ))}
      </div>
      <table
        className="bg-red-200 flex rounded-xl justify-center"
      >

        {
          columnWithoutResidents === ''
            ? (
              <div
                className="rounded-lg bg-white"
              >
                Carregando...
              </div>
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
                      <td data-testid="planet-name">{types.name}</td>
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
