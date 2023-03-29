import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import FiltersContext from '../context/FiltersContext';

function Table() {
  const { data } = useContext(FetchContext);
  const { searchPlanetInput, selectedFilters } = useContext(FiltersContext);

  const newData = data.length === 0 ? ''
    : Object.keys(data[0]).filter((key) => key !== 'residents');

  const newArray = data.filter((info) => info.name.toUpperCase()
    .includes(searchPlanetInput.toUpperCase()));

  const allFilters = () => {
    const filteredByName = newArray.filter(({ name }) => name.toUpperCase()
      .includes(searchPlanetInput.toUpperCase()));
    console.log(selectedFilters);

    const filteredByNameAndConditions = filteredByName.filter((filter) => {
      const filterPlanet = selectedFilters.map(({ column, condition, value }) => {
        switch (condition) {
        case 'maior que':
          return Number(filter[column]) > Number(value);
        case 'menor que':
          return Number(filter[column]) < Number(value);
        case 'igual a':
          return Number(filter[column]) === Number(value);
        default:
          return 'testando';
        }
      });
      console.log(filterPlanet);
      return filterPlanet.every((el) => el);
    });
    console.log(filteredByName);
    return filteredByNameAndConditions;
  };

  return (
    <div>
      <div>
        {selectedFilters.map((filter, index) => (
          <span key={ index }>
            {filter.column}
            {' '}
            {filter.condition}
            {' '}
            {filter.value}
          </span>
        ))}
      </div>
      <table className="table">

        {
          newData === ''
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
                    { newData.map((column) => (
                      <th key={ column }>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody />
                {allFilters().map((types) => (
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
                ))}
              </>
            )
        }
      </table>
    </div>
  );
}

export default Table;
