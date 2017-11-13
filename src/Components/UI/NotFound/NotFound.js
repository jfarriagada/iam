import React from 'react'
import './index.css'

const NotFound = () => {
    return(
        <div>
            <div id="not-found">404</div>
            <hr/>
            <div id="text-not-found">
                <p>Ooopsss !! No se ha encontrado el sitio</p>
                <p>Vuelva al <a href="/">INICIO</a></p>
            </div>
        </div>
    )
}
export default NotFound
