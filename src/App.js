import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; //importamos boostrap
import { Container, Navbar, Row } from "react-bootstrap"; //los elementos que usamos de boostrap
import { Buscador } from "./components/Buscador/Buscador"; //Nuestro buscador
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Rutas
import { DetalleLetra } from "./components/DetalleLetra/DetalleLetra"; // El componente que muestra las letras de las canciones

//App dibuja la barra de navegación y trae los compnentes Buscador y DetalleLetra
function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="sticky-top"> 
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/nota-musical.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span> Buscador de canciones</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Buscador />} />
            <Route path="/detalle-letra" element={<DetalleLetra />} /> 
            
          </Routes>
        </BrowserRouter>
        <Row></Row>
      </Container>
    </>
  );
}

export default App;
