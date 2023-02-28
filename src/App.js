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
const GetSinglePalette = () => { 
    const { paletteId, colorId } = useParams();
    const palette = generatePalette(findPalette(paletteId))
  return <SingleColorPalette
    palette={palette}
    colorId={colorId}
  />
}

function App() {
  return (
    <Routes>
      <Route index element={<PaletteList palettes={seedColors} />}/>
      <Route path='/palette/:id' element={<GetPalette />}/>
      <Route path='/palette/:paletteId/:colorId' element={<GetSinglePalette />}/>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
