import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { postSendEmail } from "../../redux/actions"


import "bootstrap/dist/css/bootstrap.min.css";
import './styles/faq.css';

const Faq = () => {
    const dispatch = useDispatch()
    const userActive = useSelector((state) => state.user);
const sendEmail = () => {
    const sendEmail = {
      text: 'Gracias por su consulta, en breve un asesor se pondrá en contacto',
      email: userActive.email
        }
        dispatch(postSendEmail(sendEmail))
      }


    return (
        <div className='contenedor-faqs'>
            <div className='jumbotron contenido-faq'>
                <h3 className='titulo-faq'>Preguntas Frecuentes</h3>
                <p className='parrafo-faq'>En esta sección podes consultar las preguntas frecuentes sobre Back to the 90's. ¿Tenés alguna consulta que no ves aquí?</p> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">No dudes en consultarnos</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Envianos tu consulta</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Tu email:</label>
                            <input type="email" class="form-control" id="recipient-name"/>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Tu consulta:</label>
                            <textarea type='text' class="form-control" id="message-text"></textarea>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onClick={sendEmail}>Enviar consulta</button>
                    </div>
                    </div>
                </div>
                </div>

                <h3 className='preg-faq'>¿Cómo me registro?</h3>
                <p className='parrafo-faq-preg'>¿Es necesario estar registrado para realizar una compra?</p>
                <p className='parrafo-faq'>
                Sí, para efectuar una compra en <span>Back to the 90's</span> es necesario primero crear una cuenta. 
                De todas formas, si el producto que seleccionaste tiene disponible la opción de Retiro en sucursal, tendrás habilitado un registro rápido que podrás utilizar en tus próximas compras.
                </p>
                <p className='preg-faq'>
                ¿Hay un monto mínimo de compra?
                </p>
                <p className='parrafo-faq mt-1'>
                El monto mínimo de compra para los productos con envío a domicilio es de $2500, exceptuando las compras realizadas con la modalidad de retiro en sucursal que no presentan monto mínimo alguno. Considerar que la compra mínima considera al total sobre los precios sin descuentos.
                Tené en cuenta que el mínimo de compra se calcula sobre los productos seleccionados con envío a domicilio y no sobre el monto total.
                </p> 
                <p className='preg-faq'>   
                ¿Cómo encuentro el producto que estoy buscando?
                </p>
                <p className='parrafo-faq mt-1'>
                La forma más rápida de encontrar un producto es utilizando el buscador que se encuentra en el menú principal. Si ingresás el nombre, marca y/o descripción del producto vamos a sugerirte un listado de productos relacionados para que puedas ver el detalle y agregarlos al Carrito si te interesa comprarlos.
                </p>
                <p className='preg-faq'>
                ¿Recibo un mail de confirmación luego de hacer mi pedido?
                </p>
                <p className='parrafo-faq mt-1'>
                Una vez finalizada tu compra, recibirás un primer mail de confirmación en donde se detalla el importe total del pedido sin los descuentos. Algunas horas antes de enviar el pedido a tu domicilio, te llegará a tu correo electrónico el Voucher de Compra en donde tendrás detallados los productos, cantidades y monto final de compra.
                </p>
                <div className='sep-faq'></div>
                <p className='terminos-condiciones'>
                    El usuario acepta los términos y condiciones con el discurso del viaje a la estratósfera y a Japón en 2 horas, dicho por el actual presidente de la República Carlos Saúl.
                </p>
            </div>
        </div>
    )
}

export default Faq;