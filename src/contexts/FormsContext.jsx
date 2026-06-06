"use client"
import { createContext, useContext, useReducer } from "react"

export const Context = createContext()
export const FormsContext = ({ children }) => {

    const initialState = {
        user: "",
        email: "",
        password: "",
        phone: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "user":
                return { ...state, user: action.val };
            case "email":
                return { ...state, email: action.val };
            case "password":
                return { ...state, password: action.val };
            case "phone":
                return { ...state, phone: action.val };
            default:
                return state;
        }
    };

    const [Data, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ Data, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export const useForm = () => useContext(Context)