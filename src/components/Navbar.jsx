import { useEffect, useState } from 'react';
import * as Bs from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UseDataLogin, UseLogOut } from '../System/Login';

function Main() {
    const Location = useNavigate();

    const [UDT, SetUDT] = useState(null);

    useEffect(() => {
        var x = UseDataLogin()
        SetUDT(x);
    }, [])

    return (
        <>
            <Bs.Navbar className='bg-primary text-white py-3'>
                <Bs.Container>
                    <Link to={"/"} className='text-decoration-none'>
                        <Bs.NavbarBrand className='fw-bolder text-white fs-3'>Vaccination Platform</Bs.NavbarBrand>
                    </Link>
                    <Bs.NavbarToggle />
                    <Bs.NavbarCollapse className="justify-content-end gap-3"  >
                        <Bs.NavbarText className='fw-semibold text-white'>Welcome, {UDT?.name}</Bs.NavbarText>
                        <Bs.Button variant='danger' onClick={() => { UseLogOut(Location) }}>Logout</Bs.Button>
                    </Bs.NavbarCollapse>
                </Bs.Container>
            </Bs.Navbar>
            <Outlet />
        </>
    );
}

export default Main;