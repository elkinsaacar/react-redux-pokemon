import axios from 'axios';

//  Constantes
const dataInicial = {
    estiloContenedorBotones: {display:"none"},
    array: [],
    offset: 0
}

// Types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_PAGINA_POKEMONES_EXITO = 'SIGUIENTE_PAGINA_POKEMONES_EXITO';
const ANTERIOR_PAGINA_POKEMONES_EXITO = 'ANTERIOR_PAGINA_POKEMONES_EXITO';

// Reducer
export default function pokemonReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return { ...state, array: action.payload, estiloContenedorBotones: action.estiloContenedorBotones };
        
        case SIGUIENTE_PAGINA_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset, estiloContenedorBotones: action.estiloContenedorBotones}

        case ANTERIOR_PAGINA_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset, estiloContenedorBotones: action.estiloContenedorBotones}

        default:
            return state;
    }
}

// Acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    // const {offset} = getState().pokemones
    const offset = getState().pokemones.offset;
    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        dispatch({
            type: OBTENER_POKEMONES_EXITO, 
            payload: res.data.results,
            estiloContenedorBotones: {display:"block"}
        });
    } catch (error){
        console,log( error );
    }
}

export const siguientePaginaPokemonesAccion = (numero) => async (dispatch, getState) => {
    
    // const {offset} = getState().pokemones
    const offset = getState().pokemones.offset;
    //const siguiente = offset + 20;
    const siguiente = offset + numero;

    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);
        dispatch({
            type: SIGUIENTE_PAGINA_POKEMONES_EXITO, 
            payload:{
                array: res.data.results,
                offset: siguiente,
                estiloContenedorBotones: {display:"block"}
            }
        });
    } catch (error){
        console,log( error );
    }
}

export const anteriorPaginaPokemonesAccion = (numero) => async (dispatch, getState) => {
    
    // const {offset} = getState().pokemones
    const offset = getState().pokemones.offset;
    //const siguiente = offset - 20;
    const siguiente = offset - numero;

    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);
        dispatch({
            type: ANTERIOR_PAGINA_POKEMONES_EXITO, 
            payload:{
                array: res.data.results,
                offset: siguiente,
                estiloContenedorBotones: {display:"block"}
            }
        });
    } catch (error){
        console,log( error );
    }
}