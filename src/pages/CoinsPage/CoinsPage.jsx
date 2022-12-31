import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import SearchValueContext from "../../contexts/SearchValue.context";
import s from "./CoinsPage.module.css";

export default function CoinsPage() {
    const { id } = useParams();
    const [coins, setCoins] = useState([]);
    const [filterValue, setFilterValue] = useState("");


    useEffect(() => {
        initCoins();
    }, [])

    const initCoins = async () => {
        const send = { categoryId: id };

        const data = await (await fetch(`http://localhost:3001/coins`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(send)
        })).json();
        setCoins(data);
    }

    return (
        <>
            <SearchValueContext.Provider value={{ filterValue, setFilterValue }}>
                <h1 className={s["title"]}>List of the coins</h1>
                <p className={s["nav"]}>
                    <Link to={"/"} className={s["nav__link"]}>Homepage</Link> &mdash; List of the coins
                </p>
                <Search />
                <div className={`row ${s["coins"]} justify-content-between`}>
                    {coins.length > 0 && (
                        coins.filter(({name, short_Info}) => name.includes(filterValue) || short_Info.includes(filterValue))
                            .map(({id, name, short_Info, obverse_Image}) => (
                                <div key={id} className={`col-7 mx-auto mx-md-0 col-md-6 ${s["coins__coin"]}`}>
                                    <div className={`container-fluid row ${s["coins__content"]}`}>
                                        <div className="col-md-4 d-flex justify-content-center">
                                            <img className={`${s["coins__content__image"]}`} src={obverse_Image} />
                                        </div>
                                        <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
                                            <h3 className={s["coins__content__title"]}>{name}</h3>
                                            <p className={s["coins__content__info"]}>{short_Info}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </SearchValueContext.Provider>
            {/* <div className={`row ${s["coins"]} justify-content-between`}>
                <div className={`col-7 mx-auto mx-md-0 col-md-5 ${s["coins__coin"]}`}>
                    <div className={`container-fluid row ${s["coins__content"]}`}>
                        <div className="col-md-4 d-flex justify-content-center">
                            <img className={`${s["coins__content__image"]}`} src="https://drive.google.com/uc?export=view&id=1xgO_dbrUJCJFuxs-YZ1flC3MdyCvYN-P" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
                            <h3 className={s["coins__content__title"]}>Canadian Beaver</h3>
                            <p className={s["coins__content__info"]}>"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.</p>
                        </div>
                    </div>
                </div>
                <div className={`col-7 mx-auto mx-md-0 col-md-5 ${s["coins__coin"]}`}>
                    <div className={`container-fluid row ${s["coins__content"]}`}>
                        <div className="col-md-4 d-flex justify-content-center">
                            <img className={`${s["coins__content__image"]}`} src="https://drive.google.com/uc?export=view&id=1xgO_dbrUJCJFuxs-YZ1flC3MdyCvYN-P" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
                            <h3 className={s["coins__content__title"]}>Canadian Beaver</h3>
                            <p className={s["coins__content__info"]}>"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.</p>
                        </div>
                    </div>
                </div>
                <div className={`col-7 mx-auto mx-md-0 col-md-5 ${s["coins__coin"]}`}>
                    <div className={`container-fluid row ${s["coins__content"]}`}>
                        <div className="col-md-4 d-flex justify-content-center">
                            <img className={`${s["coins__content__image"]}`} src="https://drive.google.com/uc?export=view&id=1xgO_dbrUJCJFuxs-YZ1flC3MdyCvYN-P" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
                            <h3 className={s["coins__content__title"]}>Canadian Beaver</h3>
                            <p className={s["coins__content__info"]}>"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}