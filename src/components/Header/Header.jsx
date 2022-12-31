import { Link } from "react-router-dom";
import s from "./Header.module.css";


export default function Header(){
    return (
        <header className={s["header"]}>
            <Link className={"container " + s["header__title"]} to={"/"}>
                COINS
            </Link>
        </header>
    );
}