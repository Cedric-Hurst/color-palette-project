import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Routes, Route, useParams } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'

const findPalette = id => seedColors.find(palette => palette.id === id);
  const GetPalette = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id))
    return <Palette palette={palette} />
  }

function App() {
  return (
    <Routes>
      <Route index element={<PaletteList palettes={seedColors} />}/>
      <Route path='/palette/:id' element={<GetPalette />}/>
      <Route path='/palette/:paletteId/:colorId' element={<SingleColorPalette />}/>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
