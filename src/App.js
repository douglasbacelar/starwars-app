import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import FetchProvider from './Provider/FetchProvider';
import FiltersProvider from './Provider/FiltersProvider';

function App() {
  return (
    <div>
      <FetchProvider>
        <FiltersProvider>
          <Filters />
          <Table />
        </FiltersProvider>
      </FetchProvider>
    </div>
  );
}

export default App;
