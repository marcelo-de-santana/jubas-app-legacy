import { createContext, useContext, useState, useEffect } from "react";
import env from "../../env.json";
import d from "../services/api/barberServices.json";

const ServiceContext = createContext()

export default function ServiceProvider({ children }) {
    const [serviceData, setServiceData] = useState([])
    const [dataIndex, setDataIndex] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])
    const [switchState, setSwitchState] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${env.host}/schedule/services`)
            .then(response => response.json())
            .then(json => {
                setServiceData(json)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <ServiceContext.Provider value={{
            serviceData, setServiceData,
            dataIndex, setDataIndex,
            shoppingCart, setShoppingCart,
            switchState, setSwitchState,
            loading
        }}>
            {children}
        </ServiceContext.Provider>
    );
}

export function useService() {
    return useContext(ServiceContext);
}