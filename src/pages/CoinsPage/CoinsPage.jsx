import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import SearchGlobalContext from "../../contexts/SearchGlobal.context";
import SearchValueContext from "../../contexts/SearchValue.context";
import sendGetRequest from "../../requests/sendGetRequest";
import sendPutRequest from "../../requests/sendPutRequest";
import SearchInput from "../../UI/SearchInput/SearchInput";
import s from "./CoinsPage.module.css";

export default function CoinsPage() {
    const [firstStart, setFirstStart] = useState(true);
    const [coins, setCoins] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [countCoins, setCountCoins] = useState(1);
    const [countAllCoins, setCountAllCoins] = useState(0);
    const [selectPage, setSelectPage] = useState(0);
    const [pagenation, setPagenation] = useState([]);

    const { id } = useParams();
    const {globalSearch} = useContext(SearchGlobalContext);

    useEffect(() => {
        initCoins();
        setFirstStart(false);
    }, [globalSearch]);

    useEffect(() => {
        if (firstStart) {
            return;
        }
        if (+countCoins === 0){
            setPagenation([]);
            return;
        }
        let arr = [];
        for (let i = 0; i < Math.ceil(countAllCoins / +countCoins); i++) {
            arr.push(<button key={i} onClick={onChangePage} 
                className={`${s["pagenation-button"]} ${i === selectPage ? s["active"] : ""}`}>{i+1}</button>);
        }
        setPagenation(arr);
    }, [coins]);

    useEffect(() => {
        if (firstStart) {
            return;
        }
        initCoins();
    }, [selectPage]);

    useEffect(() => {
        if (firstStart) {
            return;
        }
        if (selectPage !== 0) {
            setSelectPage(0);
            return;
        }
        initCoins();
    }, [countCoins])

    const initCoins = async () => {
        if (!id) {
            await initCoinsByGlobalSearch();
            return;
        }
        const send = {count: +countCoins, offset: selectPage * +countCoins };

        const {coins, count} = await sendPutRequest(send, `http://localhost:3001/coins/category/${id}`);
        setCountAllCoins(() => (count));
        setCoins(coins);
    }

    const initCoinsByGlobalSearch = async () => {
        if (!globalSearch) {
            return;
        }
        const send = { ...globalSearch, count: +countCoins, offset: selectPage * +countCoins };
        const {coins, count} = await sendPutRequest(send, `http://localhost:3001/coins`);
        setCountAllCoins(() => (count));
        setCoins(coins);
    }

    const onChangePage = (e) =>{
        setSelectPage(() => (+e.target.textContent - 1 ?? 0));
    }

    const changeCountCoins = (value) => {
        if (+value < 0) {
            value = 0;
        }
        setCountCoins(+value);
    }

    
    return (
        <>
            <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
                <h1 className={s["title"]}>List of the coins</h1>
                <p className={s["nav"]}>
                    <Link to={"/"} className={s["nav__link"]}>Homepage</Link> &mdash; List of the coins
                </p>
                <Search />
                <div className="row col-3 col-lg-1 ms-auto my-2">
                    <SearchInput value={countCoins} setValue={changeCountCoins} type={"number"}/>
                </div>
                <div className={`row ${s["coins"]} justify-content-between`}>
                    {coins.length > 0 && (
                        coins.filter(({name, short_Info}) => name.includes(searchValue) || short_Info.includes(searchValue))
                            .map(({id, name, short_Info, obverse_Image}) => (
                                <Link key={id} to={`/coin/${id}`} className={`col-7 mx-auto mx-md-0 col-md-6 ${s["coins__coin"]}`}>
                                    <div className={`container-fluid row ${s["coins__content"]}`}>
                                        <div className="col-md-4 d-flex justify-content-center">
                                            <img className={`${s["coins__content__image"]}`} src={obverse_Image} />
                                        </div>
                                        <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">
                                            <h3 className={s["coins__content__title"]}>{name}</h3>
                                            <p className={s["coins__content__info"]}>{short_Info}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                    )}
                </div>
                <div className="d-flex justify-content-center my-2">
                    {pagenation}
                </div>
            </SearchValueContext.Provider>
        </>
    )
}