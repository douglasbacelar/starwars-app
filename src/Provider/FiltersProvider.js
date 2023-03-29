import PropTypes from 'prop-types';
import { useState } from 'react';
import FiltersContext from '../context/FiltersContext';

function FiltersProvider({ children }) {
  const [searchPlanetInput, setSearchPlanetInput] = useState('');
  const [selectFilters, setSelectFilters] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columns, setColumns] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);

  const values = {
    searchPlanetInput,
    setSearchPlanetInput,
    selectFilters,
    setSelectFilters,
    selectedFilters,
    setSelectedFilters,
    columns,
    setColumns,
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
