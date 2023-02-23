import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    
    <Routes>
      <Route path='/' element={<h1>home Page</h1>}/>
      <Route path='/Palette/:id' element={<Palette palette={generatePalette(seedColors[4])} /> } />
    </Routes>
  );
}

export default App;
