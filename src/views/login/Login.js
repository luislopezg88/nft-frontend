import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
  Alert,
  Spinner,
} from "reactstrap";
//Hook
import { useAuth } from "state/stateAuth";
//Service
import { API_URL } from "service/config";
//Config
const initial = {
  correo: "",
  clave: "",
};

const Login = () => {
  const history = useNavigate();
  const [form, setForm] = useState(initial);
  const [process, setProcess] = useState(false);
  const [error, setError] = useState("");
  const sesion = useAuth();

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

  if (sesion.isAuthenticated && sesion.info.rol === "CHEF") {
    return <Navigate to="/profile" />;
  }
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
            <Alert color="info" isOpen={error !== ""} toggle={onDismiss}>
              {error}
            </Alert>
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-1">
                      <small> Sign in</small>
                    </div>
                    <div className="text-muted text-center mb-1">
                      <b>Chef</b>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form" onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
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
                              <i className="ni ni-lock-circle-open" />
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
                        <Button className="my-4" color="primary" type="subtmit">
                          <span className="mr-2">
                            {process ? (
                              <Spinner size="sm">Loading...</Spinner>
                            ) : null}
                          </span>
                          Sign in
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
                        history("/signup");
                      }}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Login;
