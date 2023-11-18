import { useEffect, useState } from 'react';
import * as Bs from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UseLogin } from './System/Login';
export default function Login() {

    const [Username, SetUsername] = useState("");
    const [Password, SetPassword] = useState("");
    const Location = useNavigate();

    let api = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        UseLogin(Location);
    }, []);

    const LoginBtn = async () => {

        if (Username == "" || Password == "") {
            toast.error("Make sure the input is not empty")
            return false
        }

        var formData = new FormData();
        formData.append("id_card_number", Username);
        formData.append("password", Password);

        var request = await fetch(api + "/login", { body: formData, method: "POST" });
        var DtLogin = await request.json();

        if (DtLogin.message) {
            toast.error(DtLogin.message)
            return false
        }
        if (DtLogin.login_tokens) {
            localStorage.setItem("login", JSON.stringify(DtLogin));
            Location("/");
            return false
        }

        toast.error("There is an error");
    }







    return (
        <>
            <Bs.Container>
                <Bs.Row className='justify-content-center mt-5'>
                    <Bs.Col lg={6} xl={5}>
                        <Bs.Card className='border rounded-3 shadow-sm'>
                            <Bs.CardBody className='p-4'>
                                <h1 className='text-center text-primary fw-bolder mt-3'>Login</h1>
                                <p className='text-center'>Enter with ID card number and password</p>
                                <Bs.FormFloating className='mb-3 mt-5'>
                                    <Bs.FormControl id='username' onInput={(e) => { SetUsername(e.target.value) }} value={Username} />
                                    <Bs.FormLabel htmlFor='username'>Id Card Number</Bs.FormLabel>
                                </Bs.FormFloating>
                                <Bs.FormFloating className='mb-3'>
                                    <Bs.FormControl id='password' type='password' onInput={(e) => { SetPassword(e.target.value) }} value={Password} />
                                    <Bs.FormLabel htmlFor='password'>Password</Bs.FormLabel>
                                </Bs.FormFloating>
                                <div className="d-flex justify-content-end w-100">
                                    <Bs.Button onClick={LoginBtn}>
                                        Login
                                    </Bs.Button>
                                </div>
                            </Bs.CardBody>
                        </Bs.Card>
                    </Bs.Col>
                </Bs.Row>
            </Bs.Container>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}