import './Buscador.css'
import axios from 'axios';
import { useState } from 'react'
import Peliculas from '../Peliculas/Peliculas';


const Buscador = () => {
  const [consultar, setConsultar] = useState('');
  const [peliculas, setPeliculas] = useState([]);

  const apretarEnter = (evento) => {
    if (evento.key === 'Enter') {
      buscarPeliculas();
      setConsultar ('')
    }
  };

  const buscarPeliculas = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b006afc23660e51b20e5de6dd87f7447&query=${consultar}`
      );
      setPeliculas(response.data.results);
    } catch (error) {
      console.error('Error al buscar la película:', error);
    }
  };


  return (
    <>
      {/* Barra de búsqueda */}
      <div className='barra-busqueda'>
        <input type="text" placeholder='🔎🎬    Buscar...' value={consultar} onChange={(e) => setConsultar(e.target.value)} onKeyDown={apretarEnter} />
      </div>

      {/* Películas buscadas */}
      <div className='contenedor-peliculas'>
        {peliculas.map(pelicula => (
          <Peliculas key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </>
  )
}

export default Buscador
