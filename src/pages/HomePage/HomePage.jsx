import Search from "../../components/Search/Search";
import s from "./HomePage.module.css";

export default function HomePage() {
    

    return (
        <>
            <h1 className={s["title"]}>Homepage</h1>
            <Search />
        </>
    )
}