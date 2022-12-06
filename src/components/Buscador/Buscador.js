import React, { useRef, useState } from "react"; //Actualizar sin recargar pagina (Creo)
import { Button, Card, Form, InputGroup } from "react-bootstrap"; //Elementos de Boostrap
import { Link } from "react-router-dom"; 
//El componente buscador consume la api desde "https://api.lyrics.ovh"
export const Buscador = () => {
  const [resultadoBusquedaCanciones, setResultadoBusquedaCanciones] =
    useState();
  const [letraCancion, setLetraCancion] = useState();
//API
  const API_URL = "https://api.lyrics.ovh";

  const valorInputBusqueda = useRef();
// usamos fetch para consumir la api
  const getLyrics = async (artist, songTilte) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${API_URL}/v1/${artist}/${songTilte}`);
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
// usamos fetch para traer las canciones
  const searchSongs = async (value) => {
    const res = await fetch(`${API_URL}/suggest/${value}`);
    const data = await res.json();
    setResultadoBusquedaCanciones(data.data);

    console.log(resultadoBusquedaCanciones);
  };
//Dibujamos el fomulario donde se escriba la canción que buscamos
  return (
    <div>
      <InputGroup className="mb-3 mt-5">
        <Form.Control
          placeholder="Nombre de la cancion"
          aria-label="Nombre de la cancion"
          aria-describedby="basic-addon2"
          ref={valorInputBusqueda}
          onKeyUp={() => {
            searchSongs(valorInputBusqueda.current.value); //Mientras se escriba en el input se ejecuta la funcion "searchSongs".
          }}
        />
      </InputGroup>

      {resultadoBusquedaCanciones &&
        resultadoBusquedaCanciones.map((item) => {
          return ( //Mostramos en formato tarjeta las canciones: El título, autor, preview y el link hacia la cancion completa.
            <Card key={item.id} className="mt-2 shadow">
              <Card.Header>
                {item.title} - {item.artist.name}{" "}
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0 row">
                  <img
                    src={item.album.cover}
                    alt={item.album.title}
                    className="col-2 mb-2"
                  />
                  <div className="col-4">
                    <p className="col-12">Escuchar preview</p>
                    <audio id="audio" controls className="col-6">
                      <source type="audio/wav" src={item.preview} />
                    </audio>
                  </div>
                  <div className="col-6"></div>
                  <footer className="blockquote-footer col-12">
                    <a href={item.link} target="_blank" rel="noreferrer">
                      Escucha la cancion
                      <cite title="Source Title"> Completa</cite>
                    </a>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
