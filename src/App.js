import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { useState } from 'react'

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = id => palettes.find(palette => palette.id === id);
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
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  }

  return (
    <Routes>
      <Route index element={<PaletteList palettes={palettes} />} />
      <Route path='/palette'>
        <Route index element={<Navigate to='/'/>}/>
        <Route path='new' element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />}/>
        <Route path=':id' element={<GetPalette />}/>
        <Route path=':paletteId/:colorId' element={<GetSinglePalette />} /> 
      </Route>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
