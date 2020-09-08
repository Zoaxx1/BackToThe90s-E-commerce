import React from 'react';
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AboutUs.css";


const AboutUs = () => {
    return (
        <div className="fondo-pr" /*style={{ color: 'white' }}*/>
            <div className="p-3 mb-2 container aboutUs fondo mt-5">
                <h1 className="cont-titulo" id='titulo'>Acerca de nosotros</h1>
                <div className='contenido'>
                    <div className='card trj trj1'>
                        <i className="far fa-lightbulb fa-2x"></i>
                        <h5 className='subTitulo p-1'>¿Quienes somos?</h5>
                        <div className="cont-uno">
                            <ul className='lista'>
                                <li className="mb-1 list" style={{ color: 'black' }}>Tomas Benjamin Vasquez</li>
                                <li className="mb-1 list" style={{ color: 'black' }}>Maria de la Paz Casaux</li>
                                <li className="mb-1 list" style={{ color: 'black' }}>Javier Eduardo Sosa Fuch</li>
                                <li className="mb-1 list" style={{ color: 'black' }}>Facundo Rivadero</li>
                                <li className="mb-1 list" style={{ color: 'black' }}>Marcelo Del Valle</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card text-center trj 2">
                        <i className="far fa-lightbulb fa-2x"></i>
                        <h5 className="subTitulo p-1">Origen de la idea</h5>
                        <p className="card-text parrafos" style={{ color: 'black' }}>
                            Back to the 90's es una tienda online que apunta a evocar la memoria de la niñez de quienes
                            vivimos esta epoca, desde el surtido de productos
                            retro, haciendo enfasis en describirlos de manera
                            ironica y jocosa.
                        </p>
                    </div>
                    <div className="card text-center trj trj3">
                        <i className="far fa-lightbulb fa-2x"></i>
                        <h5 className="subTitulo p-1">
                            Traido a usted por:
                        </h5>
                        <div className="card-body">
                            <h5 className="m-1" style= {{color: 'black'}}> Red Hot Chilli Henrys ft.
                            <a style={{ color: 'black' }} href="http://soyhenry.com/">SoyHenry</a></h5>
                            <p className="card-text parrafos" style={{color: 'black'}}>Navega por nuestra web y sentite libre. Revivi tu infancia.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*---------------------------------------------------.|  
            |                    DEV TEAM                          |                    
            -----------------------------------------------------*/}
            <div className='contentDevTeam'>
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="https://media-exp1.licdn.com/dms/image/C5635AQFJm2ndfazyfw/profile-framedphoto-shrink_200_200/0?e=1599530400&v=beta&t=5n7XHyivrGNAPDDUPYiHxOX_elw-mBFnihPlJMjfp1k" alt="Facu" />
                        <h4 className= 'name-surname'>Facundo Rivadero</h4>
                        <p className= "dev">Desarrollador FullStack</p>
                        <div className='icons'>
                            <a class="btn btn-dark btn-social mx-2" href="https://github.com/facu03/" target='blank'><i class="fab fa-github"></i></a>
                            <a class="btn btn-primary btn-social mx-2" href="https://www.linkedin.com/in/facundo-rivadero-6153401b6/" target='blank'><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4E03AQHprH0E-m9a_g/profile-displayphoto-shrink_200_200/0?e=1605139200&v=beta&t=7g3EVAyQtVyOvdnuKat6NAotSr7lOX2jGtxvITyte-M" alt="Tomas" />
                        <h4 className= 'name-surname'>Tomas Benjamin Vasquez</h4>
                        <p className= "dev">Desarrollador FullStack</p>
                        <div className='icons'>
                            <a class="btn btn-dark btn-social mx-2" href="https://github.com/tomas0011" target='blank'><i class="fab fa-github"></i></a>
                            <a class="btn btn-primary btn-social mx-2" href="https://github.com/tomas0011" target='blank'><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4D03AQEUzjMXwHNpDw/profile-displayphoto-shrink_200_200/0?e=1605139200&v=beta&t=2CHCmrvltoRg8O7M8rfgZ6vLtC715M30nWXqqw7b9Jo" alt="Javi" />
                        <h4 className= 'name-surname'>Javier Sosa Fuch</h4>
                        <p className= "dev">Desarrollador FullStack</p><div className='icons'>
                            <a class="btn btn-dark btn-social mx-2" href="https://github.com/Zoaxx1" target='blank'><i class="fab fa-github"></i></a>
                            <a class="btn btn-primary btn-social mx-2" href="https://www.linkedin.com/in/javier-e-sosa-fuch-032820192/" target='blank'><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4D35AQE4bq0zImAuYw/profile-framedphoto-shrink_200_200/0?e=1599530400&v=beta&t=OxiuM2xK15-osTAtV7zQMKuJQtQSydMHzDraBuu3vUg" alt="Paz" />
                        <h4 className= 'name-surname'>Maria de la Paz Casaux</h4>
                        <p className= "dev">Desarrollador FullStack</p><div className='icons'>
                            <a class="btn btn-dark btn-social mx-2" href="https://github.com/paz873107/cat-lady" target='blank'><i class="fab fa-github"></i></a>
                            <a class="btn btn-primary btn-social mx-2" href="https://www.linkedin.com/in/mar%C3%ADa-de-la-paz-casaux-1395a4159/" target='blank'><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="team-member">
                        <img class="mx-auto rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4E03AQF-x1hLmMvmGw/profile-displayphoto-shrink_200_200/0?e=1605139200&v=beta&t=90xu8AOTpX_X-5RQLHRx-BVPB5kingnMTScBHvvVMXk" alt="Marce" />
                        <h4 className= 'name-surname'>Marcelo del Valle</h4>
                        <p className= "dev">Desarrollador FullStack</p><div className='icons'>
                            <a class="btn btn-dark btn-social mx-2" href="https://github.com/cheloxnz" target='blank'><i class="fab fa-github"></i></a>
                            <a class="btn btn-primary btn-social mx-2" href="https://www.linkedin.com/in/marcelo-d-a0678913a/" target='blank'><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default AboutUs;