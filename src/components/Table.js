import React, { useContext } from 'react';
import AppContext from '../context/FetchContext';

function Table() {
  const { data } = useContext(AppContext);

  const newData = data.length === 0 ? ''
    : Object.keys(data[0]).filter((key) => key !== 'residents');

  return (
    <div>
      <table className="table">
        <thead className="hover:bg-white">
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
                <tr>
                  { newData.map((column) => (
                    <th key={ column }>{column}</th>
                  ))}
                </tr>
              )
          }
        </thead>

        <tbody>
          {
            data === ''
              ? (
                <span
                  className="rounded-lg bg-white"
                >
                  Carregando...
                </span>
              )
              : (
                data.map((types) => (
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
                )))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
