import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataChart from './components/DataChart';
import LocationMap from './components/LocationMap';

function App() {
  return (
<>
<LocationMap />
<DataChart />
</>  );
}

export default App;
