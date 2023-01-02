import { createContext } from "react";

const SearchGlobalContext = createContext({globalSearch: undefined, setGlobalSearch: () => {}});

export default SearchGlobalContext;