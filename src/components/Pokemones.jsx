import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux'

// importamos la acción
import { obtenerPokemonesAccion, siguientePaginaPokemonesAccion, anteriorPaginaPokemonesAccion } from '../redux/pokemonDucks'

const Pokemones = () => {

    const dispatch = useDispatch();

    const listaPokemones = useSelector(store => store.pokemones.array);
    //console.log(listaPokemones);

    const estiloContenedorBotones = useSelector(store => store.pokemones.estiloContenedorBotones);

    return (
        <div>
            <h1>Lista de pokemones !!</h1>
            <button onClick={() => dispatch(obtenerPokemonesAccion())}> Obtener Pokemones !! </button>
            <br/>
            <ul>
                {
                    listaPokemones.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
            <br/>
            <div id="divBotones" style={estiloContenedorBotones}>
                <button onClick={() => dispatch(siguientePaginaPokemonesAccion(20))}> Siguiente </button>
                <br/>
                <button onClick={() => dispatch(anteriorPaginaPokemonesAccion(20))}> Anterior </button>
            </div>
        </div>
    )
}

export default Pokemones
