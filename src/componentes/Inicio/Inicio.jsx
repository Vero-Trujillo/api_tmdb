import { useEffect, useState } from 'react'
import './Inicio.css'
import Peliculas from '../Peliculas/Peliculas';


function Inicio() {

  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1);

  // Llamado a la API
  useEffect(() => {
    function cargarPelicula() {
      fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=b006afc23660e51b20e5de6dd87f7447&page=${pagina}&sort_by=popularity.desc`)
        .then(response => response.json())
        .then(datos => {
          setPeliculas((masPeliculas) => [...masPeliculas, ...datos.results]);
        })
    }
    cargarPelicula();
  }, [pagina]);

  // Cargar películas al scrolear
  function scrolleo() {
    const final = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (final) {
      setPagina((cargarPagina) => cargarPagina + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrolleo);
    return () => {
      window.removeEventListener('scroll', scrolleo);
    };
  }, []);


  return (
    <>
      <div className='contenedor-peliculas'>
        {peliculas.map(pelicula => (
          <Peliculas key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </>
  )
}

export default Inicio


