import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import {Routes, Route, useParams } from 'react-router-dom'

const findPalette = id => seedColors.find(palette => palette.id === id);
  const GetPalette = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id))
    return <Palette palette={palette} />
  }

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>home Page</h1>}/>
      <Route path='/palette/:id' element={<GetPalette />} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
