import { Link, Outlet, useNavigate, useParams, } from "react-router-dom";
import * as Bs from "react-bootstrap"

export default function Vaccinations() {
    var { name } = useParams();
    const navigate = useNavigate();
    const Back = () => {
        try {
            navigate(-1)
        } catch (error) {
            navigate("/")
        }
    }

    return (
        <>
            <div className="p-5 bg-body-tertiary">
                <div className="container py-5">
                    <h1 className="text-body-emphasis">{name} Vaccination</h1>
                    <div className="d-flex gap-2">
                        <Bs.Button className="mb-3" onClick={Back}>Back</Bs.Button>
                        <Link to={"/"}>
                            <Bs.Button variant="dark" className="mb-3">Back Home</Bs.Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Bs.Container className="my-5">
                <Outlet />
            </Bs.Container>
        </>
    )
}