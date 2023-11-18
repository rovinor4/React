import { useEffect, useState } from "react";
import * as Bs from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { UseDataLogin } from "./System/Login";

export default function App() {

  const [Ctn, SetCtn] = useState(null)
  const [Vsk, SetVsk] = useState(null)

  let api = import.meta.env.VITE_BASE_URL
  let UserData = []
  var redirect = useNavigate();

  useEffect(() => {
    UserData = UseDataLogin()
    if (!UserData) {
      redirect("/login")
    }

    Consultation()
    Vaksinasi()
  }, [])

  const Consultation = async () => {
    const ftp = await fetch(api + "/consultations?token=" + UserData?.login_tokens)
    const dtn = await ftp.json();
    SetCtn(dtn)
  }

  const Vaksinasi = async () => {
    const ftp = await fetch(api + "/vaccinations?token=" + UserData?.login_tokens)
    const dtn = await ftp.json();
    SetVsk(dtn)
  }


  const VaksinasiKomponent = ({ Name, Data, StatusSb }) => {

    if (!Data || Data === null) {
      if (StatusSb === true) {
        return (
          <Bs.Col md={4} key={"sm" + Name}>
            <Bs.Card>
              <Bs.CardHeader>
                <span>{Name} Vaccination</span>
              </Bs.CardHeader>
              <Bs.CardBody>
                <Link to={`/vaccinations/${Name}`} className="text-decoration-none">+ Register vaccination</Link>
              </Bs.CardBody>
            </Bs.Card>
          </Bs.Col>
        )
      } else {
        return (
          <></>
        )
      }
    } else {
      return (
        <Bs.Col md={4} key={"sm" + Name}>
          <Bs.Card>
            <Bs.CardHeader>
              <span>{Name} Vaccination</span>
            </Bs.CardHeader>
            <Bs.ListGroup className="list-group-flush">
              <Bs.ListGroupItem>
                <Bs.Row>
                  <Bs.Col className="fw-bold">Status</Bs.Col>
                  <Bs.Col><Bs.Badge>{Data?.status === null ? "Vaccine Process" : "Vaccinated"}</Bs.Badge></Bs.Col>
                </Bs.Row>
              </Bs.ListGroupItem>
              <Bs.ListGroupItem>
                <Bs.Row>
                  <Bs.Col className="fw-bold">Date</Bs.Col>
                  <Bs.Col><span>{Data?.vaccination_date}</span></Bs.Col>
                </Bs.Row>
              </Bs.ListGroupItem>
              <Bs.ListGroupItem>
                <Bs.Row>
                  <Bs.Col className="fw-bold">Spot</Bs.Col>
                  <Bs.Col><span>{Data?.spot?.name}</span></Bs.Col>
                </Bs.Row>
              </Bs.ListGroupItem>
              <Bs.ListGroupItem>
                <Bs.Row>
                  <Bs.Col className="fw-bold">Vaccine</Bs.Col>
                  <Bs.Col><span>{Data?.vaccine?.name}</span></Bs.Col>
                </Bs.Row>
              </Bs.ListGroupItem>
              <Bs.ListGroupItem>
                <Bs.Row>
                  <Bs.Col className="fw-bold">Vaccinator</Bs.Col>
                  <Bs.Col><span>{Data?.vaccinator?.name}</span></Bs.Col>
                </Bs.Row>
              </Bs.ListGroupItem>
            </Bs.ListGroup>
          </Bs.Card>
        </Bs.Col >
      )
    }
  }

  const CtnComponents = () => {
    if (Ctn === null) {
      return (
        <Bs.Card>
          <Bs.CardHeader>
            <span>Consultation</span>
          </Bs.CardHeader>
          <Bs.CardBody>
            <Link to="/consultation" className="text-decoration-none">+ Request Consultation</Link>
          </Bs.CardBody>
        </Bs.Card>
      )
    }

    var Dt = Ctn?.consultation

    var VarianyStatus = "success";
    switch (Dt?.status) {
      case "pending":
        VarianyStatus = "warning"
        break;

      case "declined":
        VarianyStatus = "danger"
        break;

      default:
        VarianyStatus = "success"
        break;
    }

    return (
      <Bs.Card>
        <Bs.CardHeader>
          <span>Consultation</span>
        </Bs.CardHeader>
        <Bs.ListGroup className="list-group-flush">
          <Bs.ListGroupItem>
            <Bs.Row>
              <Bs.Col className="fw-bold">Status</Bs.Col>
              <Bs.Col><Bs.Badge bg={VarianyStatus}>{Dt?.status}</Bs.Badge></Bs.Col>
            </Bs.Row>
          </Bs.ListGroupItem>
          <Bs.ListGroupItem>
            <Bs.Row>
              <Bs.Col className="fw-bold">Disease History</Bs.Col>
              <Bs.Col>{Dt?.disease_history}</Bs.Col>
            </Bs.Row>
          </Bs.ListGroupItem>
          <Bs.ListGroupItem>
            <Bs.Row>
              <Bs.Col className="fw-bold">Current Symptoms</Bs.Col>
              <Bs.Col>{Dt?.current_symptoms}</Bs.Col>
            </Bs.Row>
          </Bs.ListGroupItem>
          <Bs.ListGroupItem>
            <Bs.Row>
              <Bs.Col className="fw-bold">Doctor Name</Bs.Col>
              <Bs.Col>{Dt?.doctor?.name}</Bs.Col>
            </Bs.Row>
          </Bs.ListGroupItem>
          <Bs.ListGroupItem>
            <Bs.Row>
              <Bs.Col className="fw-bold">Doctor Notes</Bs.Col>
              <Bs.Col>{Dt?.doctor_note}</Bs.Col>
            </Bs.Row>
          </Bs.ListGroupItem>
        </Bs.ListGroup>
      </Bs.Card>
    )


  }


  return (
    <>
      <div className="p-5 bg-body-tertiary">
        <div className="container py-5">
          <h1 className="text-body-emphasis">Dashboard</h1>
        </div>
      </div>

      <Bs.Container className="my-5">
        <Bs.Row className="gap-3">
          <Bs.Col md={12}>
            <h4>My Consultation</h4>
          </Bs.Col>
          <Bs.Col md={4}>
            <CtnComponents />
          </Bs.Col>
        </Bs.Row>


        <Bs.Row className="gap-3 my-5">
          <Bs.Col md={12}>
            <h4>My Vaccinations</h4>
          </Bs.Col>
          {
            Ctn === null || Ctn?.consultation?.status !== "accepted" ?
              <Bs.Col md={12}>
                <Bs.Alert variant="warning">Your consultation must be approved by doctor to get the vaccine.</Bs.Alert>
              </Bs.Col>
              :
              <>
                <VaksinasiKomponent Name={"First"} Data={Vsk?.first} StatusSb={true} />
                <VaksinasiKomponent Name={"Second"} Data={Vsk?.second} StatusSb={!Vsk?.first?.status ? false : true} />
              </>

          }
        </Bs.Row>

      </Bs.Container >
    </>
  )
}