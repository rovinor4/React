import { useEffect, useState } from "react"
import * as Bs from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { UseToken } from "./System/Login";

export default function Consultation() {
    let api = import.meta.env.VITE_BASE_URL
    var redirect = useNavigate();


    const [Token, SetToken] = useState("");
    const [Disease, SetDisease] = useState(true);
    const [DiseaseText, SetDiseaseText] = useState("");
    const [Symptoms, SetSymptoms] = useState(true);
    const [SymptomsText, SetSymptomsText] = useState("");
    const ubahDi = (e) => {
        SetDisease(e.target.value == "yes" ? true : false)
    }
    const ubahSy = (e) => {
        SetSymptoms(e.target.value == "yes" ? true : false)
    }

    useEffect(() => {
        Consultation
        var tkn = UseToken();

        !tkn ? redirect("/login") : SetToken(tkn)
    }, [])

    const Simpan = async () => {
        const Data = new FormData();
        Data.append("current_symptoms", !Symptoms ? "Do not have" : SymptomsText)
        Data.append("disease_history", !Disease ? "Do not have" : DiseaseText)

        if (Data.get("current_symptoms") == "" || Data.get("disease_history") === "") {
            toast.error("Make sure not empty");
        }

        var Apiset = await fetch(api + "/consultations?token=" + Token, { method: "POST", body: Data })
        var JsonApi = await Apiset.json()
        redirect("/")

    }

    return (
        <>
            <div className="p-5 bg-body-tertiary">
                <div className="container py-5">
                    <Link to={"/"}>
                        <Bs.Button className="mb-3">Back Home</Bs.Button>
                    </Link>
                    <h1 className="text-body-emphasis">Request Consultation</h1>
                </div>
            </div>
            <Bs.Container className="my-5">
                <Bs.Row>
                    <Bs.Col lg={7}>
                        <Bs.Row className="gap-3">
                            <Bs.Col md={6}>
                                <Bs.FormLabel>Do you have disease history ?</Bs.FormLabel>
                            </Bs.Col>
                            <Bs.Col md={4}>
                                <Bs.FormSelect onChange={ubahDi} onLoad={ubahDi}>
                                    <option value="yes">Yes, I Have</option>
                                    <option value="not">I do not have</option>
                                </Bs.FormSelect>
                            </Bs.Col>
                            {
                                !Disease ?
                                    <></>
                                    :
                                    <Bs.Col md={12}>
                                        <Bs.FormControl value={DiseaseText} onInput={(e) => { SetDiseaseText(e.target.value) }} as={"textarea"} placeholder="Do you have disease history " />
                                    </Bs.Col>
                            }
                            <Bs.Col md={6}>
                                <Bs.FormLabel>Do you have symptoms now ?</Bs.FormLabel>
                            </Bs.Col>
                            <Bs.Col md={4} onChange={ubahSy} onLoad={ubahSy}>
                                <Bs.FormSelect>
                                    <option value="yes">Yes, I Have</option>
                                    <option value="not">I do not have</option>
                                </Bs.FormSelect>
                            </Bs.Col>
                            <Bs.Col md={12}>
                                {
                                    !Symptoms ?
                                        <></>
                                        :
                                        <Bs.FormControl value={SymptomsText} onInput={(e) => { SetSymptomsText(e.target.value) }} as={"textarea"} placeholder="Do you have symptoms now" />
                                }
                            </Bs.Col>
                            <Bs.Col md={12}>
                                <Bs.Button onClick={Simpan}>Submit</Bs.Button>
                            </Bs.Col>
                        </Bs.Row>
                    </Bs.Col>
                </Bs.Row>
            </Bs.Container>
            <Toaster position="top-right" reverseOrder={false} />

        </>
    )
}