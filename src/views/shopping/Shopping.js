import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Alert,
  Spinner,
  Form,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
} from "reactstrap";
import NavbarClient from "components/Navbars/NavbarClient";
//Service
import { API_URL } from "service/config";
//Hook
import { useShopping } from "state/stateShopping";
import { useAuth } from "state/stateAuth";
import "./shopping.css";

const SideMenu = ({ children, isOpen, setIsOpen }) => {
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const menuStyle = {
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  };

  return (
    <div>
      <div className={`side-menu ${isOpen ? "open" : ""}`} style={menuStyle}>
        <div className="menu-content">{children}</div>
      </div>
      {isOpen && <div className="overlay" onClick={handleMenuToggle}></div>}
    </div>
  );
};
const INITIAL = { correo: "", clave: "", rol: "CLIENT" };
const Compras = () => {
  const { cart, addToProduct, removeFromProduct, deletFromProduct } =
    useShopping();
  const sesion = useAuth();
  //Hook
  const [chefs, setChefs] = useState({ data: [], recordsTotal: 0 });
  const [isLoadingChef, setIsLoadingChef] = useState(false);
  //Platos
  const [platos, setPlatos] = useState({ data: [], recordsTotal: 0 });
  const [isLoadingPlato, setIsLoadingPlato] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [process, setProcess] = useState(false);
  const [complet, setComplet] = useState(false);
  //Error
  const [error, setError] = useState("");
  //Sesion
  const [sideClient, setSideClient] = useState(false);
  const [form, setForm] = useState(INITIAL);
  const [processLogin, setProcessLogin] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  const fetching = async () => {
    setIsLoadingChef(true);
    try {
      const response = await fetch(`${API_URL}/chef`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setChefs(json.body);
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingChef(false);
    }
  };

  useEffect(() => {
    //fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlatos = async (id) => {
    setIsLoadingPlato(true);
    try {
      const response = await fetch(`${API_URL}/platos/chef/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setPlatos(json.body);
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPlato(false);
    }
  };

  const productInCart = (product) => {
    const condicion = cart.some((item) => item._id === product._id);

    return condicion;
  };

  const onDismiss = () => setError("");

  const onSuccess = () => setComplet(false);
  //Sesion
  const onSubtmit = async (e) => {
    e.preventDefault();
    setProcess(true);
    try {
      const listaPlatos = cart.map((item) => {
        return {
          _id: item._id,
          id_chef: item.id_chef,
          cantidad: item.cantidad,
        };
      });
      const response = await fetch(`${API_URL}/carrito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listaPlatos: listaPlatos }),
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
    }
  };

  const handleSubmitSesion = async (e) => {
    e.preventDefault();
    setProcessLogin(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      if (response.ok) {
        const json = await response.json();
        sesion.createUser(json.body.user);
      } else {
        const json = await response.json();
        setErrorForm(json?.body?.error ?? "Error solicitud");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessLogin(false);
      setForm(INITIAL);
      setTimeout(function () {
        setSideClient(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onDismissForm = () => setErrorForm("");

  const isSesion = useMemo(() => {
    return Object.keys(sesion.info).length > 0;
  }, [sesion.info]);
  //Catalogo
  const catEspecialidades = [
    { label: "Cocina Francesa", value: "1" },
    { label: "Cocina Italiana", value: "2" },
    { label: "Cocina Asiática", value: "3" },
    { label: "Cocina Mexicana", value: "4" },
    { label: "Cocina Mediterránea", value: "5" },
    { label: "Cocina Vegetariana", value: "6" },
    { label: "Cocina Vegana", value: "7" },
    { label: "Cocina de Fusión", value: "8" },
    { label: "Cocina de Autor", value: "9" },
    { label: "Cocina Molecular", value: "10" },
    { label: "Parrilla/Asados", value: "11" },
    { label: "Repostería", value: "12" },
    { label: "Sushi", value: "13" },
    { label: "Tapas", value: "14" },
    { label: "Comida Étnica", value: "15" },
  ];

  return (
    <>
      <NavbarClient
        sideMenu={sideMenu}
        setSideMenu={setSideMenu}
        sideClient={sideClient}
        setSideClient={setSideClient}
        sesion={sesion}
      />
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
                    <div className="card-profile-actions py-4 mt-lg-0"></div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{chefs.recordsTotal}</span>
                        <span className="description">Todo</span>
                      </div>
                      <div>
                        <span className="heading">{chefs.recordsTotal}</span>
                        <span className="description">Arte</span>
                      </div>
                      <div>
                        <span className="heading">{chefs.recordsTotal}</span>
                        <span className="description">Fotografia</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/*<div className="text-center mt-5">
                  <h3>
                    Ordenar
                    <span className="font-weight-light">, comida</span>
                  </h3>
  </div>*/}
                <div className="mt-5 py-5 border-top"> </div>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Button
                      color="default"
                      outline
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        setPlatos({ data: [], recordsTotal: 0 });
                      }}
                      disabled={platos.recordsTotal === 0}
                    >
                      {platos.recordsTotal > 0 ? "Limpiar busqueda" : "Chef "}
                    </Button>
                  </Col>
                  {isLoadingChef ? (
                    "Cargando..."
                  ) : chefs.data.length === 0 ? (
                    <Col sm="12" xs="12">
                      <p>Sin registros</p>
                    </Col>
                  ) : (
                    chefs.data.map((item, indexChef) => (
                      <Col sm="3" xs="6" key={indexChef}>
                        <small className="d-block text-uppercase font-weight-bold mb-4 mt-4">
                          {item?.nombre ?? ""}
                        </small>
                        <img
                          alt="..."
                          className="img-fluid rounded shadow"
                          src={require("assets/img/theme/comida.jpg")}
                          width={100}
                          height={100}
                          style={{ width: "150px" }}
                        />
                        <small className="d-block text-uppercase font-weight-bold mb-1">
                          Cocina regional
                        </small>
                        {catEspecialidades
                          .filter((filt) =>
                            item?.especialidadesculinarias.includes(filt.value)
                          )
                          .map((cat, indexCat) => (
                            <Badge
                              key={indexCat}
                              color="warning"
                              className="mr-1"
                            >
                              {cat.label}
                            </Badge>
                          ))}
                        {isSesion ? (
                          <Button
                            color="default"
                            outline
                            type="button"
                            className="mt-2"
                            onClick={() => {
                              handlePlatos(item._id);
                            }}
                          >
                            Seleccionar
                          </Button>
                        ) : null}
                      </Col>
                    ))
                  )}
                </Row>
                <div className="mt-5 py-5 border-top"> </div>
                {isSesion ? (
                  <Row className="justify-content-center mt-3">
                    <Col lg="12">
                      <h2>Platos</h2>
                    </Col>
                    {isLoadingPlato ? (
                      <Col sm="12" xs="12">
                        <p>Cargando</p>
                      </Col>
                    ) : platos.data.length === 0 ? (
                      <Col sm="12" xs="12" className="mb-4">
                        <p>Sin registros</p>
                      </Col>
                    ) : (
                      platos.data.map((item) => {
                        const isProduct = productInCart(item);

                        return (
                          <Col sm="3" xs="6" key={item._id}>
                            <small className="d-block text-uppercase font-weight-bold mb-4 mt-4">
                              {item.nombre}
                            </small>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/comida.jpg")}
                              width={100}
                              height={100}
                              style={{ width: "150px" }}
                            />
                            <small className="d-block text-uppercase font-weight-bold mb-1">
                              <b>{item.descripcion}</b>
                            </small>
                            <small className="d-block text-uppercase font-weight-bold mb-1">
                              <b>Costo:</b>
                              {item.precio}
                            </small>
                            {isProduct ? (
                              <Button
                                className="my-4"
                                color="danger"
                                type="submit"
                                onClick={() => {
                                  deletFromProduct(item);
                                }}
                              >
                                x
                              </Button>
                            ) : (
                              <Button
                                className="my-4"
                                color="primary"
                                type="submit"
                                onClick={() => {
                                  addToProduct(item);
                                }}
                              >
                                +
                              </Button>
                            )}
                          </Col>
                        );
                      })
                    )}
                  </Row>
                ) : null}
              </div>
            </Card>
            <Alert color="info" isOpen={error !== ""} toggle={onDismiss}>
              {error}
            </Alert>
          </Container>
          <SideMenu isOpen={sideMenu} setIsOpen={setSideMenu}>
            <div>
              <div className="mb-2">
                <h2>Compras</h2>
              </div>
              <div>
                <div>
                  {cart.length === 0
                    ? "Sin productos"
                    : cart.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex flex-column mb-2 border p-1"
                        >
                          <div className="d-flex justify-content-start">
                            <div>
                              <b>Producto:</b>
                              {item.nombre}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <b>Precio:</b>
                              {item?.precio ?? 0}
                            </div>
                            <div>
                              <b>Subtotal:</b>
                              {item?.precio * item.cantidad}
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <Button
                              className="mr-1"
                              color="dark"
                              type="submit"
                              size="sm"
                              onClick={() => {
                                removeFromProduct(item);
                              }}
                            >
                              -
                            </Button>
                            <b>{item?.cantidad}</b>
                            <Button
                              className="ml-1"
                              color="dark"
                              type="submit"
                              size="sm"
                              onClick={() => {
                                addToProduct(item);
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  {cart.length > 0 ? (
                    <Button onClick={onSubtmit} type="button">
                      <span className="mr-2">
                        {process ? (
                          <Spinner size="sm">Loading...</Spinner>
                        ) : null}
                      </span>
                      Confirmar
                    </Button>
                  ) : null}
                </div>
                <Alert color="success" isOpen={complet} toggle={onSuccess}>
                  Orden completada.
                </Alert>
              </div>
            </div>
          </SideMenu>
          <SideMenu isOpen={sideClient} setIsOpen={setSideClient}>
            <div className="mb-2">
              <h2>Iniciar sesion</h2>
            </div>
            <div>
              <Form role="form" onSubmit={handleSubmitSesion}>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Correo"
                      name="correo"
                      type="text"
                      value={form.correo}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Clave"
                      name="clave"
                      type="password"
                      autoComplete="off"
                      value={form.clave}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="subtmit">
                    <span className="mr-2">
                      {processLogin ? (
                        <Spinner size="sm">Loading...</Spinner>
                      ) : null}
                    </span>
                    Sign in
                  </Button>
                </div>
              </Form>
              <Alert
                color="info"
                isOpen={errorForm !== ""}
                toggle={onDismissForm}
              >
                {errorForm}
              </Alert>
            </div>
          </SideMenu>
        </section>
      </main>
    </>
  );
};

export default Compras;
