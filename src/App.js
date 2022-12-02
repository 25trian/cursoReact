import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Row } from "react-bootstrap";
import { Buscador } from "./components/Buscador/Buscador";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetalleLetra } from "./components/DetalleLetra/DetalleLetra";
function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="sticky-top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Buscador canciones
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Buscador />} >
              <Route path="/detalle-letra" element={<DetalleLetra />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Row></Row>
      </Container>
    </>
  );
}

export default App;
