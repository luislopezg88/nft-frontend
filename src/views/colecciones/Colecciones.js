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
  estilo: "",
  imagen: "",
  cadena: "",
};

const Colecciones = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [form, setForm] = useState(initial);
  const [process, setProcess] = useState(false);
  const [complet, setComplet] = useState(false);
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

      formData.append("idUsuario", id);

      const response = await fetch(`${API_URL}/coleccion/`, {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        body: formData,
      });
      if (response.ok) {
        //const json = await response.json();
        setComplet(true);
      } else {
        const json = await response.json();
        setError(json?.body?.error ?? "Error solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
      setForm(initial);
    }
  };

  const onDismiss = () => setError("");

  const onDismissComplet = () => setComplet(false);

  const categoriasDeArte = [
    { label: "Seleccionar", value: 0 },
    { label: "Abstracto", value: 1 },
    { label: "Arte Digital", value: 2 },
    { label: "Arte Conceptual", value: 3 },
    { label: "Arte Fantástico", value: 4 },
    { label: "Arte Surrealista", value: 5 },
    { label: "Ilustración", value: 6 },
    { label: "Arte 3D", value: 7 },
    { label: "Arte Generativo", value: 8 },
    { label: "Fotografía Digital", value: 9 },
    { label: "Arte de Personajes", value: 10 },
    { label: "Paisajes Digitales", value: 11 },
    { label: "Arte Contemporáneo", value: 12 },
    // Puedes agregar más categorías según sea necesario
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
  //Fecha
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

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
                          src={require("assets/img/theme/nft-3.jpg")}
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
                        <span className="heading">{day}</span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading">{month}</span>
                        <span className="description"></span>
                      </div>
                      <div>
                        <span className="heading">{year}</span>
                        <span className="description"></span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    <b>Colección /</b>
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
                          <Label for="exampleEmail">Nombre del colección</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nombre del coleccion"
                              name="nombre"
                              type="text"
                              value={form.nombre}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">
                            Descripción de la colección
                          </Label>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Descripción de la coleccion"
                              name="descripcion"
                              type="textarea"
                              value={form.descripcion}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleEmail">Estilo de arte</Label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Estilo de arte"
                              name="estilo"
                              type="select"
                              value={form.estilo}
                              onChange={handleChange}
                            >
                              {categoriasDeArte.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </Input>
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
            <Alert color="success" isOpen={complet} toggle={onDismissComplet}>
              Colección agregada de forma exitosa agrega imagenes a tu coleccion
            </Alert>
            <Alert color="danger" isOpen={error !== ""} toggle={onDismiss}>
              {error}
            </Alert>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Colecciones;
