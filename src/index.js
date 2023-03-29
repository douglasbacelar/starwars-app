import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './Provider/FetchProvider';
import FiltersProvider from './Provider/FiltersProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FetchProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </FetchProvider>,
  );
