import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import FiltersContext from '../context/FiltersContext';
import FetchContext from '../context/FetchContext';

function FiltersProvider({ children }) {
  const { data } = useContext(FetchContext);
  const [searchPlanetInput, setSearchPlanetInput] = useState('');
  const originalColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [selectFilters, setSelectFilters] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [selectSort, setselectSort] = useState({
    column: 'population',
    sort: 'ASC' });
  const [sortClicked, setsortClicked] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [renderPlanets, setRenderPlanets] = useState([]);
  const [columns, setColumns] = useState(originalColumns);

  useEffect(() => {
    const allFilters = () => {
      const newArray = data.filter((info) => info.name.toUpperCase()
        .includes(searchPlanetInput.toUpperCase()));
      const filteredByName = newArray.filter(({ name }) => name.toUpperCase()
        .includes(searchPlanetInput.toUpperCase()));

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
            return 'true';
          }
        });
        return filterPlanet.every((el) => el);
      });

      return filteredByNameAndConditions;
    };
    setRenderPlanets(allFilters());
  }, [searchPlanetInput, selectedFilters, data]);

  const values = {
    searchPlanetInput,
    setSearchPlanetInput,
    selectFilters,
    setSelectFilters,
    selectedFilters,
    setSelectedFilters,
    columns,
    setColumns,
    renderPlanets,
    setRenderPlanets,
    selectSort,
    setselectSort,
    sortClicked,
    setsortClicked,
  };

  return (
    <FiltersContext.Provider value={ values }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FiltersProvider;
