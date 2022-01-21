import { useSelector, useDispatch } from 'react-redux';
import {login} from "../redux/actions/authActions.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginForm} from "./loginform"
import "../style.css"


export function LogOut(props){
    const isLogged = useSelector((store => store.authReducer.isLogged));
    const dispatcher = useDispatch();

    return  isLogged ?(
        <div class="logout-bgrnd">
            <h1>Seguro que quieres salir?</h1>
            <button onClick={()=> dispatcher(login(false))}>Sí</button>
        </div>
    ) : (<LoginForm/>)
}