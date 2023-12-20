import React from "react"
import ChatBoot from "../chatboot/ChatBoot"
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Agradecimentos</h5>
                <p>Somos imensamente gratas pela sua contribuição! Cada gota de óleo de cozinha doado é uma valiosa atitude em prol da sustentabilidade ambiental. Obrigada por se unir a nós na missão de transformar pequenos gestos em grandes impactos positivos para o nosso planeta!</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text">Contatos: Luana</h5>
                <ul className="list-unstyled">
                    <li><a href="mailto:luanasilvafigueiredo999@gmail.com" target="_blank" className="link-styled">
                            <FaEnvelope /> Email
                        </a>
                    </li>
                    <li><a href="https://github.com/lualys" target="_blank" className="link-styled">
                            <FaGithub /> GitiHub
                        </a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/luana-silvaffigueiredo-240052236/" target="_blank" className="link-styled">
                            <FaLinkedin /> LinkedIn
                        </a>
                    </li>                  
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text">Contatos: Tamiris</h5>
                <ul className="list-unstyled">
                    <li><a href="mailto:justamiris@gmail.com" target="_blank" className="link-styled">
                            <FaEnvelope /> Email
                        </a>
                    </li>
                    <li><a href="https://github.com/tamirisveras"  target="_blank" className="link-styled">
                            <FaGithub /> GitiHub
                        </a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/tamiris-lob%C3%A3o-a7b4401a7/" target = "_blank" className="link-styled">
                            <FaLinkedin /> LinkedIn
                        </a>
                    </li>                  
                </ul>
            </div>
            <div>
                {<ChatBoot />}
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>

</footer>

export default Footer