import React from 'react';
import { DataContext } from "../components/context/DataContextProvider";

export default function useData(){
    const context = React.useContext(DataContext);
    if(!context) {
        throw new Error("Data must be used within DatacontetProvider");
    }
    
    return { ...context }

}