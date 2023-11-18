import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseToken } from "../System/Login";
import * as Bs from "react-bootstrap"

export default function VacIndex() {
    let api = import.meta.env.VITE_BASE_URL
    var redirect = useNavigate();
    const [Token, SetToken] = useState(null);
    var [Data, SetData] = useState([]);
    var [Loding, SetLoding] = useState(true);
    var { name } = useParams();


    useEffect(() => {
        var tkn = UseToken();
        !tkn ? redirect("/login") : SetToken(tkn)
        if (Token !== null) {
            DaftarSpot();
        }

    }, [Token])

    const DaftarSpot = async () => {
        const ftp = await fetch(api + "/spots?token=" + Token)
        let dtn = await ftp.json();
        Data.splice(0, Data.length);
        dtn?.spots.forEach(element => {
            Data.push(element)
        });

        SetData(Data)
        SetLoding(false)
    }

    const ServeData = [
        "Only first vaccination",
        "Only second vaccination",
        "Both vaccination"
    ]


    return (
        <>
            <p>List Vaccination Spots in Central Jakarta</p>
            <Bs.Row className="gap-4">
                {
                    Loding == true ?
                        <Bs.Spinner />
                        :
                        Data.map((el, os) => {
                            let scn = name == "First" ? 1 : 2;
                            const trueEntries = Object.keys(el.available_vaccines).filter(key => el.available_vaccines[key]);
                            const resultString = trueEntries.join(',');
                            var dataVaksin = (trueEntries.length !== 0 && (el.serve === 3 || scn === el.serve))
                            var lineTime = dataVaksin ? "opacity-100" : "opacity-50"
                            return (
                                <Bs.Col className={lineTime} md={12} key={"rs" + os}>
                                    <Link to={dataVaksin ? `/vaccinations/${name}/${el.id}` : ''}>
                                        <Bs.Card>
                                            <Bs.CardBody>
                                                <Bs.Row className="align-items-center">
                                                    <Bs.Col md={4}>
                                                        <h4 className="text-primary">{el.name}</h4>
                                                        <p>{el.address}</p>
                                                    </Bs.Col>
                                                    <Bs.Col md={4}>
                                                        <h6>Available vaccines</h6>
                                                        <p>{resultString}</p>
                                                    </Bs.Col>
                                                    <Bs.Col md={4}>
                                                        <h6>Serve</h6>
                                                        <p>{ServeData[el.serve - 1]}</p>
                                                    </Bs.Col>
                                                </Bs.Row>
                                            </Bs.CardBody>
                                        </Bs.Card>
                                    </Link>
                                </Bs.Col>
                            )
                        })
                }
            </Bs.Row>
        </>
    )
}