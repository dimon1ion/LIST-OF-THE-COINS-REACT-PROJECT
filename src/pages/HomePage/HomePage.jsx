import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await (
      await fetch("http://localhost:3001/coins/categories", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    setCategories(data);
  };

  return (
    <>
      <h1 className={s["title"]}>Homepage</h1>
      <Search />
      <div className={"row " + s["coins"]}>
        {categories &&
          categories.map((categorie) => (
            <div
              key={categorie.Id}
              className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center align-items-sm-start"
            >
              <h2 className={s["coins__title"]}>{categorie.Name}</h2>
              <Link
                to={`/coins/${categorie.Id}`}
                className={s["coins__show"]}
              >
                Show all &gt;
              </Link>
              <div>
                <img className={s["coins__image"]} src={categorie.Image} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
