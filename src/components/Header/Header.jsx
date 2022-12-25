import s from "./Header.module.css";


export default function Header(){
    return (
        <header className={s["header"]}>
            <h1 className={"container " + s["header__title"]}>
                COINS
            </h1>
        </header>
    );
}