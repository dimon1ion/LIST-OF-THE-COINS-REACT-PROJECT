import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sendGetRequest from "../../requests/sendGetRequest";
import s from "./CoinPage.module.css";

export default function CoinPage() {
    const { id: paramId } = useParams();
    const [coin, setCoin] = useState();

    useEffect(() => {
        initCoin();
    }, [])

    const initCoin = async () => {
        if (!paramId) {
            setCoin(null);
            return;
        }
        const data = await sendGetRequest(`http://localhost:3001/coins/${paramId}`);
        if (data.length > 0) {
            setCoin(data[0]);
            return;
        }
        setCoin(null);
    }

    if (coin === undefined) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }
    else if(coin === null){
        return (
            <>
                <h3>Not found</h3>
            </>
        )
    }

    const { id, name, short_Info, full_Info,
        country, composition, quality, categoryId,
        denomination, year, weight, price,
        reverse_Image, obverse_Image } = coin;

    return (
        <>
            <div className="row">
                <div className={`col-12 col-sm-5 ${s["pr-30"]} container-fluid row`}>
                    <div className="col-6 col-sm-12 d-flex justify-content-end">
                        <img className={s["coin-image"]} src={reverse_Image} />
                    </div>
                    <div className="col-6 col-sm-12 d-flex justify-content-end">
                        <img className={s["coin-image"]} src={obverse_Image} />
                    </div>
                </div>
                <div className={`col-12 col-sm-7 col-lg-5 ${s["block"]}`}>
                    <h1 className={s["title"]}>{name}</h1>
                    <p className={s["info"]}>{short_Info}</p>
                    <p className={s["info"]}>{full_Info}</p>
                    <table className={s["info-table"]}>
                        <colgroup>
                            <col className={s["info-table__col"]} />
                            <col className={s["info-table__col"]} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>Issuing Country</td>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <td>Composition</td>
                                <td>{composition}</td>
                            </tr>
                            <tr>
                                <td>Quality</td>
                                <td>{quality}</td>
                            </tr>
                            <tr>
                                <td>Denomination</td>
                                <td>{denomination}</td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>{year}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{weight} g</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{price}$</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/coins/${categoryId}`} className={s["link-to-list"]}>Back to the list</Link>
                </div>
            </div>
        </>
    )
}