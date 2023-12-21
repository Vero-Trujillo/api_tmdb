import './Header.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Inicio from '../Inicio/Inicio'
import Buscador from '../Buscador/Buscador'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'


function Header() {
  // Función para que aparezca el texto al posicionarse sobre el ícono
  const [textoInicio, setTextoInicio] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState(false);

  const aparecerInicio = () => {
    setTextoInicio(true);
  };

  const desaparecerInicio = () => {
    setTextoInicio(false);
  };

  const aparecerBuscar = () => {
    setTextoBuscar(true);
  };

  const desaparecerBuscar = () => {
    setTextoBuscar(false);
  };



  return (
    <>
      <BrowserRouter>
        <header>
          <h2>Base de datos de Películas</h2>
          <nav>

            <NavLink to='/'>
              <FontAwesomeIcon className='icono' icon={faHome}
                onMouseEnter={aparecerInicio} onMouseLeave={desaparecerInicio} />
              {textoInicio && (
                <p className='texto inicio'>Inicio</p>
              )}
            </NavLink>

            <NavLink to='buscador' target='_blank'>
              <FontAwesomeIcon className='icono' icon={faSearch}
                onMouseEnter={aparecerBuscar} onMouseLeave={desaparecerBuscar} />
              {textoBuscar && (
                <p className='texto buscar'>Buscar</p>
              )}
            </NavLink>

          </nav>
        </header>

        <Routes>
          <Route index element={<Inicio />} />
          <Route path='buscador' element={<Buscador />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Header
