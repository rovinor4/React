import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseToken } from "../System/Login";
import * as Bs from "react-bootstrap"
import { format } from 'date-fns'
import toast, { Toaster } from 'react-hot-toast';



export default function VacSpot() {
    let api = import.meta.env.VITE_BASE_URL
    var redirect = useNavigate();
    const formattedDate = format(new Date(), 'yyyy-MM-dd');


    const [Token, SetToken] = useState(null);
    var [Data, SetData] = useState([]);
    var [Loding, SetLoding] = useState(true);
    var [Tanggal, SetTanggal] = useState(`${formattedDate}`);
    var { spotId } = useParams();

    useEffect(() => {
        if (Token === null) {
            var tkn = UseToken();
            !tkn ? redirect("/login") : SetToken(tkn)
        }
        if (Token !== null) {
            DaftarSpot()
        }
    }, [Token, Data, Tanggal])


    const DaftarSpot = async () => {
        const ftp = await fetch(api + `/spots/${spotId}?token=` + Token + "&date=" + Tanggal)
        let Datar = await ftp.json();
        Data.splice(0, Data.length);
        if (await ftp.ok) {
            Data.push(Datar)
            SetData(Data)
        }
        SetLoding(false);
    }

    function bagiArray(array, jumlahBagian) {
        var panjangBagian = Math.ceil(array.length / jumlahBagian);
        var hasil = [];

        for (var i = 0; i < array.length; i += panjangBagian) {
            var bagian = array.slice(i, i + panjangBagian);
            hasil.push(bagian);
        }

        return hasil;
    }

    let DataTimeSesi = [
        "09.00 - 11.00",
        "13.00 - 15.00",
        "15.00 - 17.00"
    ]


    const Antrian = () => {
        var HtmlIn = []

        for (let itm = 0; itm <= Data[0]?.spot?.capacity; itm++) {
            HtmlIn.push(
                <Bs.Col md={1} key={"doms" + itm}>
                    <Bs.Button className="mx-auto d-block" variant={itm <= Data[0]?.vaccinations_count ? itm === (Data[0]?.vaccinations_count) ? "primary" : "outline-primary" : "outline-dark"}>{(itm + 1).toString().padStart(2, "0")}</Bs.Button>
                </Bs.Col>
            )
        }


        var HtmlShow = []
        var Mc = bagiArray(HtmlIn, 3);
        Mc.forEach((ex, id) => {
            HtmlShow.push(
                <Bs.Col md={6}>
                    <Bs.Card>
                        <Bs.CardHeader className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold fs-5">Session {id + 1}</span>
                            <span>{DataTimeSesi[id]}</span>
                        </Bs.CardHeader>
                        <Bs.CardBody>
                            <Bs.Row className="gap-4">
                                {ex}
                            </Bs.Row>
                        </Bs.CardBody>
                    </Bs.Card>
                </Bs.Col>
            )
        })

        return HtmlShow
    }


    const SimpanData = async () => {
        let Body = new FormData();
        Body.append("date", Tanggal);
        Body.append("spot_id", spotId);

        const Simpan = await fetch(api + "/vaccinations?token=" + Token, { method: "POST", body: Body })
        let Hasil = await Simpan.json();

        if (Hasil?.message && !Hasil?.message.includes("successful")) {
            toast.error(Hasil?.message)
        }
        if (Hasil?.message.includes("successful")) {
            redirect("/")
        }
    }

    const ServeData = [
        "Only first vaccination",
        "Only second vaccination",
        "Both vaccination"
    ]

    return (
        <>
            {
                !Loding ?
                    <Bs.Row className="g-5">
                        <Bs.Col md={4}>
                            <Bs.Card>
                                <Bs.CardBody>
                                    <h3 className="text-primary fw-bolder">{Data[0]?.spot.name}</h3>
                                    <span className="d-block">{Data[0]?.spot.address}</span>
                                    <b className="d-block">{ServeData[Data[0]?.spot.serve]}</b>

                                    <Bs.FormFloating className="mt-4">
                                        <Bs.FormControl type="date" value={Tanggal} onChange={(e) => { SetTanggal(e.target.value) }} />
                                        <Bs.FormLabel>Select vaccination date</Bs.FormLabel>
                                    </Bs.FormFloating>

                                    <Bs.Button variant="dark" className="my-3" onClick={SimpanData}>Register vaccination</Bs.Button>
                                </Bs.CardBody>
                            </Bs.Card>
                        </Bs.Col>
                        <Bs.Col md={8}>
                            <Bs.Row className="g-4">
                                <Antrian />
                            </Bs.Row>
                        </Bs.Col>
                    </Bs.Row>
                    :
                    <Bs.Spinner />
            }
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}