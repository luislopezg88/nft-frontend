import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";
//Service
import { API_URL } from "service/config";
//Config
const initial = {
  nombre: "",
  genero: "",
  edad: "",
  correo: "",
  clave: "",
};
const Signup = () => {
  const history = useNavigate();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [process, setProcess] = useState(false);
  const [complet, setComplet] = useState(false);

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
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
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

  const onSuccess = () => setComplet(false);

  return (
    <>
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-3">
                    <div className="text-muted text-center mb-1">
                      <small>
                        <b>Create new account</b>
                      </small>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText></InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nombre completo"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-circle-o" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="exampleSelect"
                            type="select"
                            placeholder="Genero"
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                          >
                            <option value="seleccionar">Seleccionar</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">otro</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-circle-o" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="exampleSelect"
                            type="number"
                            placeholder="Edad"
                            name="edad"
                            value={form.edad}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-circle-o" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Correo"
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-circle-o" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Clave"
                            type="password"
                            autoComplete="off"
                            name="clave"
                            value={form.clave}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormGroup>

                      <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                          {process ? (
                            <Spinner size="sm">Loading...</Spinner>
                          ) : null}
                          Sign up
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6"></Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        history("/");
                      }}
                    >
                      <small>Login</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Alert
              color="danger"
              isOpen={error !== ""}
              toggle={onDismiss}
              className="mt-2"
            >
              {error}
            </Alert>
            <Alert
              color="success"
              isOpen={complet}
              toggle={onSuccess}
              className="mt-2"
            >
              Registro completado.
            </Alert>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Signup;
