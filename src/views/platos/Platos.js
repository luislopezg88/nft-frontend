import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
  Label,
  Spinner,
  Alert,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavbarSesion from "components/Navbars/NavbarSesion.js";
//Service
import { API_URL } from "service/config";

const initial = {
  nombre: "",
  descripcion: "",
  regiones: "",
  estilos: "",
  ingredientes: "",
  tecnicas: "",
  tipo: "",
  imagen: "",
  precio: 0,
};

const Platos = () => {
  const { idChef } = useParams();
  const history = useNavigate();
  const [form, setForm] = useState(initial);
  const [process, setProcess] = useState(false);
  const [error, setError] = useState("");
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcess(true);
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("file", img);

      formData.append("idChef", idChef);

      const response = await fetch(`${API_URL}/platos/`, {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ ...form, idChef, file: img }),
        body: formData,
      });
      if (response.ok) {
        const json = await response.json();
      } else {
        const json = await response.json();
        setError(json?.body?.error ?? "Error solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
      //setForm(initial);
    }
  };

  const onDismiss = () => setError("");

  const catCocinas = [
    { label: "Seleccionar", value: 0 },
    { label: "Cocina Italiana", value: 1 },
    { label: "Cocina Francesa", value: 2 },
    { label: "Cocina Española", value: 3 },
    { label: "Cocina Mexicana", value: 4 },
    { label: "Cocina China", value: 5 },
    { label: "Cocina Japonesa", value: 6 },
    { label: "Cocina India", value: 7 },
    { label: "Cocina Tailandesa", value: 8 },
    { label: "Cocina Griega", value: 9 },
    { label: "Cocina Turca", value: 10 },
    { label: "Cocina Marroquí", value: 11 },
    { label: "Cocina Brasileña", value: 12 },
  ];

  const catEstilos = [
    { label: "Seleccionar", value: 0 },
    { label: "Cocina de Fusión", value: 1 },
    { label: "Cocina Tradicional", value: 2 },
    { label: "Cocina Contemporánea", value: 3 },
  ];

  const catTipo = [
    { label: "Seleccionar", value: 0 },
    { label: "Platos Principales" },
    { label: "Aperitivos" },
    { label: "Ensaladas" },
    { label: "Postres" },
    { label: "Desayunos y Brunch" },
    { label: "Bebidas" },
    { label: "Platos de Alta Cocina" },
    { label: "Platos de Comfort Food" },
    { label: "Platos Internacionales" },
    { label: "Platos para Compartir" },
    { label: "Platos Saludables" },
  ];

  const onChangeImage = (e) => {
    if (e.target.files[0] === undefined) return;
    // Verifica si hay archivos seleccionados
    if (e.target.files.length === 0) {
      return;
    }
    let files = e.target.files;
    let name = files[0]?.name ?? "";

    setForm((prev) => ({
      ...prev,
      imagen: name,
    }));
    setImg(files[0]);
  };
  //style={{ background: "#adb5bd" }}
  return (
    <>
      <NavbarSesion />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/comida.jpg")}
                          height={200}
                          width={200}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          history("/profile");
                        }}
                        size="sm"
                      >
                        volver
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">0</span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading">0</span>
                        <span className="description"></span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    <b>Plato /</b>
                    <span className="font-weight-light mr-1 ml-1">
                      {form?.nombre ?? ""}{" "}
                    </span>
                  </h3>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Form role="form" onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for="exampleEmail">Nombre del plato</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nombre del plato"
                              name="nombre"
                              type="text"
                              value={form.nombre}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">
                            Descripción del plato
                          </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Descripción del plato"
                              name="descripcion"
                              type="textarea"
                              value={form.descripcion}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Cocina regional</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Cocina regional"
                              name="regiones"
                              type="select"
                              value={form.regiones}
                              onChange={handleChange}
                            >
                              {catCocinas.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Estilo de cocina</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Estilos de cocina"
                              name="estilos"
                              type="select"
                              value={form.estilos}
                              onChange={handleChange}
                            >
                              {catEstilos.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Ingredientes</Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Ingredientes"
                              name="ingredientes"
                              type="textarea"
                              value={form.ingredientes}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Tecnica</Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Tecnicas"
                              name="tecnicas"
                              type="textarea"
                              value={form.tecnicas}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Label for="exampleEmail">Tipo</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="exampleSelect"
                              type="select"
                              placeholder="Genero"
                              name="tipo"
                              value={form.tipo}
                              onChange={handleChange}
                            >
                              {catTipo.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Precio del plato</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Precio"
                              name="precio"
                              type="text"
                              value={form.precio}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Subir foto</Label>
                          <div>
                            <Input
                              type="file"
                              onChange={onChangeImage}
                              accept="image/jpeg"
                            />
                          </div>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            {process ? (
                              <Spinner size="sm">Loading...</Spinner>
                            ) : null}
                            Guardar
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
            <Alert color="info" isOpen={error !== ""} toggle={onDismiss}>
              {error}
            </Alert>
          </Container>
        </section>
      </main>
      {/*<SimpleFooter />*/}
    </>
  );
};

export default Platos;
