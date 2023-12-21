import { useState } from 'react'
import axios from 'axios';
import './Peliculas.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Peliculas({ pelicula }) {

  // Funciones de estado
  const [informacion, setInformacion] = useState(false);
  const [favorito, setFavorito] = useState(false)

  // Función para llamar a la API y mostrar la información adicional al seleccionar con el mouse el título de una película
  const posicionarMouse = async () => {
    const respuesta = await axios.get(`https://api.themoviedb.org/3/movie/${pelicula.id}?api_key=b006afc23660e51b20e5de6dd87f7447`);
    setInformacion(respuesta.data);
  };

  const sacarMouse = () => {
    setInformacion(false);
  };


  // Función para marcar como favorita una película
  const manejarClick = () => {
    setFavorito(!favorito);
  };
  const textoBoton = favorito ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'
  const colorIcono = favorito ? 'red' : 'beige'



  return (
    <>
      {/* Poster e información que se va a ver siempre */}
      <div className='espacio-pelicula' key={pelicula.id}>

        <div className='cada-pelicula'>
          <img className='poster' src={`${'https://image.tmdb.org/t/p/original' + pelicula.poster_path}`} alt="" />
          <h4 className='titulo-pelicula' onMouseEnter={posicionarMouse} onMouseLeave={sacarMouse}>{pelicula.title}</h4>
          <div className='agregar-favorito'>
            <button onClick={manejarClick}>{textoBoton}</button>
        <FontAwesomeIcon className='icono' icon={faHeart} style={{ color: colorIcono }} />

          </div>
        </div>

        {/* Información adicional que se va a mostrar al selecciona con el mouse el título de una película */}
        {informacion && (
          <div className='recuadro-informacion'>
            <h3 className='titulo-recuadro'>{informacion.title}</h3>
            <div className='div-anio'>
              <p className='anio texto-recuadro'>Año: </p>
              <p className='numero-anio texto-recuadro'>{informacion.release_date.substring(0, 4)}</p>
            </div>
            <div className='div-genero'>
              <p className='genero texto-recuadro'>Género: </p>
              <p className='valor-genero texto-recuadro'>{informacion.genres.map((genre) => genre.name).join(', ')}</p>
            </div>
            <p className='sinopsis texto-recuadro'>Sinopsis:</p>
            <p className='info texto-recuadro'>{informacion.overview}</p>
            <div className='div-calificacion'>
              <p className='calificacion texto-recuadro'>Calificación: </p>
              <p className='valor-calificacion texto-recuadro'>{pelicula.vote_average}/10</p>
            </div>
          </div>
        )}

      </div>
    </>
  );
};


export default Peliculas;