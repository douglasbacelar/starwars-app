import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FetchContext from '../context/FetchContext';

function FetchProvider({ children }) {
  const [data, setData] = useState('');
  const [dataFiltered, setDataFiltered] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      setData(json.results);
    };
    fetchData();
  }, []);

  const values = {
    data,
    setData,
    dataFiltered,
    setDataFiltered,
  };

  return (
    <FetchContext.Provider value={ values }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FetchProvider;
