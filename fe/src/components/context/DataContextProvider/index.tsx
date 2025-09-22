"use client"

import React from "react";
import type { DataContextProps } from './storageContext';

export interface LearnaProviderProps {
    value: DataContextProps;
    children: React.ReactNode;
}

export const DataContext = React.createContext<DataContextProps | null>(null);

export const DataContextProvider = ({ value, children } : LearnaProviderProps) => {
    return(
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    );
}

