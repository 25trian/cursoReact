import React, { useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Buscador = () => {
  const [resultadoBusquedaCanciones, setResultadoBusquedaCanciones] =
    useState();
  const [letraCancion, setLetraCancion] = useState();
  const API_URL = "https://api.lyrics.ovh";

  const valorInputBusqueda = useRef();

  const getLyrics = async (artist, songTilte) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`${API_URL}/v1/${artist}/${songTilte}`);
            const data = await res.json();
            resolve(data)
        } catch (error) {
            reject(error)
        }

    });
  };

  const searchSongs = async (value) => {
    if (value !== "") {
      const res = await fetch(`${API_URL}/suggest/${value}`);
      const data = await res.json();
      setResultadoBusquedaCanciones(data.data);

      console.log(resultadoBusquedaCanciones);
    } else {
      alert("debes escribir el nombre de la cancion");
    }
  };

  return (
    <div>
      <InputGroup className="mb-3 mt-5">
        <Form.Control
          placeholder="Nombre de la cancion"
          aria-label="Nombre de la cancion"
          aria-describedby="basic-addon2"
          ref={valorInputBusqueda}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => {
            searchSongs(valorInputBusqueda.current.value);
          }}
        >
          Buscar
        </Button>
      </InputGroup>

      {resultadoBusquedaCanciones &&
        resultadoBusquedaCanciones.map((item) => {
          return (
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
                  <div className="col-6">
         
                  </div>
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
