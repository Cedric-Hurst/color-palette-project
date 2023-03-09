import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';
import HomePage from './HomePage';

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
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          <Route index element={<HomePage><PaletteList palettes={palettes} deletePalette={deletePalette}/></HomePage>} />
          <Route path='/palette'>
            <Route index element={<HomePage><Navigate to='/'/></HomePage>}/>
            <Route path='new' element={<Page><NewPaletteForm savePalette={savePalette} palettes={palettes} /></Page>}/>
            <Route path=':id' element={<Page><GetPalette /></Page>}/>
            <Route path=':paletteId/:colorId' element={<Page><GetSinglePalette /></Page>} /> 
          </Route>
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
