import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { useState, useEffect } from 'react'

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

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
  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id));
  }

  useEffect(() => {
     window.localStorage.setItem('palettes', JSON.stringify(palettes));
  },[palettes])

  return (
    <Routes>
      <Route index element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
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
