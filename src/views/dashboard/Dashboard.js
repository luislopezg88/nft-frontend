import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavbarSesion from "components/Navbars/NavbarSesion.js";
//Service
import { API_URL } from "service/config";
//Hook
import { useAuth } from "state/stateAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const sesion = useAuth();
  const { idChef } = useParams();
  const history = useNavigate();
  const [ventasPorChef, setVentasPorChef] = useState([]);
  const [platosVendidos, setPlatosVendidos] = useState([]);
  const [platosChef, setPlatosChef] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      /*      title: {
        display: true,
        text: "Ventas por chef",
      },*/
    },
  };

  const labels = ["noviembre", "diciembre"];

  //Solicitud
  const fetchingVentasPorChef = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/ventasPorChef`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();

        const clone = json.body.data.map((item, i) => {
          const hue = (i * 50) % 360; // Ajusta el 50 para obtener colores distintos
          const backgroundColor = `hsla(${hue}, 70%, 50%, 0.5)`;

          return {
            label: item.nombreChef,
            data: [item.totalVentas],
            backgroundColor: backgroundColor,
          };
        });

        setVentasPorChef(clone);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchingPlatosVendidos = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/platosVendidos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();

        const clone = json.body.data.map((item, i) => {
          const hue = (i * 50) % 360; // Ajusta el 50 para obtener colores distintos
          const backgroundColor = `hsla(${hue}, 70%, 50%, 0.5)`;

          return {
            label: item.nombrePlato,
            data: [item.totalVentas],
            backgroundColor: backgroundColor,
          };
        });
        setPlatosVendidos(clone);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchingPlatosChef = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/dashboard/platosVendidos/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const json = await response.json();

        const clone = json.body.data.map((item, i) => {
          const hue = (i * 50) % 360; // Ajusta el 50 para obtener colores distintos
          const backgroundColor = `hsla(${hue}, 70%, 50%, 0.5)`;

          return {
            label: item.nombrePlato,
            data: [item.totalVentas],
            backgroundColor: backgroundColor,
          };
        });
        setPlatosChef(clone);
      } else {
        const json = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };
  //DataSet
  const data = {
    labels,
    datasets: ventasPorChef,
  };

  const dataDos = {
    labels,
    datasets: platosVendidos,
  };

  const dataTres = {
    labels,
    datasets: platosChef,
  };

  useEffect(() => {
    fetchingVentasPorChef();
    fetchingPlatosVendidos();
  }, [sesion]);

  useEffect(() => {
    if (idChef !== "") {
      fetchingPlatosChef(idChef);
    }
  }, [idChef]);
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
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="12"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="float-right"
                        color="default"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          history(`/profile`);
                        }}
                        size="sm"
                      >
                        Volver
                      </Button>
                    </div>
                  </Col>
                </Row>

                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center mb-5">
                    <Col lg="12">
                      <h2>Ventas por chefs</h2>
                    </Col>
                    <Bar options={options} data={data} />
                  </Row>
                  <Row className="justify-content-center my-5">
                    <Col lg="12">
                      <h2>Platos vendidos de todos los chefs</h2>
                    </Col>
                    <Bar options={options} data={dataDos} />
                  </Row>
                  <Row className="justify-content-center my-5">
                    <Col lg="12">
                      <h2>
                        Platos vendidos del chef {sesion?.info?.name ?? ""}
                      </h2>
                    </Col>
                    <Bar options={options} data={dataTres} />
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
