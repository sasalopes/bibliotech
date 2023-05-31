import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css"


export function Footer(){

    return (
        <>

<footer>
    <div className = "header-footer">

<section className=" d-flex flex-wrap justify-content-between align-items-center p-4 mt-4 border-top">

        <div className="col-md-4  justify-content d-flex align-items-center ">
        <h5 className="text-uppercase"> Links</h5>
        <ul className="links1">
            <li><Link as={Link} to="/politicas-de-privacidade">Políticas de privacidade</Link></li>
            <li><Link as={Link} to="/termos-e-condicoes-de-uso">Termos e condições de uso</Link></li>
            </ul>
        </div>
        </section>

        <section className="redes_sociais">

        <div className="col-md-4 justify-content-end list-unstyled d-flex">
        <h5 className="text-uppercase">Redes Sociais</h5>
        <ul className="social_list">
            <li><a href="#"><i className="bi bi-instagram"></i> Instagram</a></li>
            <li><a href="#"><i className="bi bi-linkedin"></i> Linkedin</a></li>
            <li><a href="#"><i className="bi bi-facebook"></i> Facebook</a></li>
        </ul>

        </div>
        </section>

        <div className= "copy copyright text-center py-3">
            
        © 2023 Copyright: SoulCode -  Bibliotech Project

        </div>

        </div>
        
        </footer>
    </>
    );
    
    }
