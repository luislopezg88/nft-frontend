import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Form,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormGroup,
  Input,
  Badge,
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
  const { cart, addToProduct, removeFromProduct, deletFromProduct, clearCart } =
    useShopping();
  const sesion = useAuth();
  //Hook
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
  const [colecciones, setColecciones] = useState({ data: [], recordsTotal: 0 });
  const [isLoadingCol, setIsLoadingCol] = useState(false);
  const [activos, setActivos] = useState({
    data: [],
    recordsTotal: 0,
  });
  const [isLoadingAct, setIsLoadingAct] = useState(false);

  const fetchingColecciones = async (id) => {
    setIsLoadingCol(true);
    try {
      const response = await fetch(`${API_URL}/coleccion/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setColecciones(json.body);
      } else {
        //const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCol(false);
    }
  };

  const fetchingActivos = async (id) => {
    setIsLoadingAct(true);
    try {
      const response = await fetch(`${API_URL}/activo/coleccion/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        setActivos(json.body);
      } else {
        //const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAct(false);
    }
  };

  useEffect(() => {
    fetchingColecciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const badge = (id) => {
    const map = [
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
    ];
    const item = map.find((item) => item.value === parseInt(id));
    return item?.label ?? "";
  };
  const isSesion = useMemo(() => {
    return Object.keys(sesion.info).length > 0;
  }, [sesion.info]);

  useEffect(() => {
    if (Object.keys(sesion.info).length > 0) {
      clearCart();
    }
  }, [sesion.info]);
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
                {/*<Row className="justify-content-center">
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
  </Row>*/}

                <Row className="justify-content-center">
                  <Col lg="12" className="d-flex justify-content-center">
                    <h2>Colecciones</h2>
                  </Col>
                  {isLoadingCol
                    ? "Cargando.."
                    : colecciones.data.map((item) => (
                        <Col lg="3" key={item._id}>
                          <div className="card mb-2">
                            <p className="d-block text-uppercase font-weight-bold mb-4 mt-4">
                              {item.nombre}
                            </p>
                            {item.imagen !== "" ? (
                              <img
                                alt="..."
                                className="img-fluid rounded shadow m-auto"
                                src={require("assets/img/theme/nft-2.jpg")}
                                width={100}
                                height={100}
                                style={{ width: "250px", height: "250px" }}
                              />
                            ) : (
                              <img
                                alt="..."
                                className="img-fluid rounded shadow m-auto"
                                src=""
                              />
                            )}

                            <p className="d-block text-uppercase mt-1 mb-0 text-center px-2">
                              <b>{item.descripcion}</b>
                            </p>
                            <Badge className="badge-default">
                              <span className="text-light">
                                {badge(item.estilo)}
                              </span>
                            </Badge>
                            {isSesion ? (
                              <Button
                                color="default"
                                type="button"
                                className="mt-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  fetchingActivos(item._id);
                                }}
                                size="sm"
                              >
                                <i className="fa fa-plus"></i>
                                <span className="m-1">Ver NFT</span>
                              </Button>
                            ) : null}
                          </div>
                        </Col>
                      ))}
                </Row>
                <div className="mt-5 py-5 border-top"> </div>
                {/*NFT*/}
                <Row className="justify-content-center mt-3">
                  <Col lg="12" className="d-flex justify-content-center">
                    <h2>
                      {activos.data.length === 0
                        ? "Selecione una colección"
                        : "NFT"}
                    </h2>
                  </Col>
                </Row>
                {isSesion ? (
                  <Row className="mb-4">
                    {isLoadingAct
                      ? "Cargando.."
                      : activos.data.map((item) => {
                          const isProduct = productInCart(item);
                          const current = sesion.info.id === item.id_usuario;

                          return (
                            <Col
                              lg="2"
                              className="d-flex justify-content-center"
                              key={item._id}
                            >
                              <div className="card mb-2">
                                <p className="d-block text-uppercase font-weight-bold mb-4 mt-4">
                                  {item.nombre}
                                </p>
                                {item.imagen !== "" ? (
                                  <img
                                    alt="..."
                                    className="img-fluid rounded shadow m-auto"
                                    src={require("assets/img/theme/nft-2.jpg")}
                                    width={100}
                                    height={100}
                                    style={{
                                      width: "250px",
                                      height: "250px",
                                    }}
                                  />
                                ) : (
                                  <img
                                    alt="..."
                                    className="img-fluid rounded shadow m-auto"
                                    src=""
                                  />
                                )}

                                <p className="d-block text-uppercase mt-1 mb-0 text-center px-2">
                                  <b>{item.descripcion}</b>
                                </p>
                                {current ? null : (
                                  <div>
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
                                  </div>
                                )}
                              </div>
                            </Col>
                          );
                        })}
                  </Row>
                ) : null}
              </div>
            </Card>
            <Alert color="info" isOpen={error !== ""} toggle={onDismiss}>
              {error}
            </Alert>
          </Container>
          {/*SideMenu*/}
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
