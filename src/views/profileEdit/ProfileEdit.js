import React, { useState, useEffect } from "react";
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
  Spinner,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import NavbarSesion from "components/Navbars/NavbarSesion.js";
//Service
import { API_URL } from "service/config";
//Hook
import { useAuth } from "state/stateAuth";

const initial = {
  _id: "",
  email: "",
  password: "",
  nombre: "",
  sexo: "",
  edad: "",
  foto: "",
  telefono: "",
  correo: "",
  ubicacion: "",
};

const ProfileEdit = () => {
  const sesion = useAuth();
  const history = useNavigate();
  const [form, setForm] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (id) => {
    if (id === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/usuario/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setForm(json.body.data);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sesion.info.id) {
      fetching(sesion.info.id ?? 0);
    }
  }, [sesion]);

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
      const response = await fetch(`${API_URL}/usuario/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (response.ok) {
        const json = await response.json();
      } else {
        const json = await response.json();
        setError(json?.body?.error ?? "Error solicitud");
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcess(false);
    }
  };

  const onDismiss = () => setError("");
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
                        onClick={(e) => {
                          e.preventDefault();
                          history("/profile");
                        }}
                        size="sm"
                        type="button"
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
                        <span className="heading"> {month}</span>
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
                    {form?.nombre ?? ""}
                    <span className="font-weight-light mr-1 ml-1">
                      /{form?.edad ?? ""}
                    </span>
                  </h3>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Form role="form" onSubmit={handleSubmit}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nombre"
                              name="nombre"
                              type="text"
                              value={form.nombre}
                              onChange={handleChange}
                              disabled={isLoading}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Teléfono"
                              name="telefono"
                              type="text"
                              value={form.telefono}
                              onChange={handleChange}
                              disabled={isLoading}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Edad"
                              name="edad"
                              type="text"
                              value={form.edad}
                              onChange={handleChange}
                              disabled={isLoading}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Dirección"
                              name="ubicacion"
                              type="text"
                              value={form.ubicacion}
                              onChange={handleChange}
                              disabled={isLoading}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
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
                              name="sexo"
                              value={form.sexo}
                              onChange={handleChange}
                              disabled={isLoading}
                            >
                              <option value="masculino">Masculino</option>
                              <option value="femenino">Femenino</option>
                              <option value="otro">otro</option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            <span className="mr-2">
                              {process ? (
                                <Spinner size="sm">Loading...</Spinner>
                              ) : null}
                            </span>
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
    </>
  );
};

export default ProfileEdit;
