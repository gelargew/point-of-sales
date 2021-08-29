import React, { useContext, useReducer, useState } from "react"
import { CategoriesActions, categoryProps, productProps, ProductsActions } from "./commons.types"
import { categoriesReducer, productsReducer } from "./reducers"
import { idGenerator } from "./utils"

export { StorageProvider, useStorage }

interface storageProps {
    products: productProps[],
    dispatchProducts: React.Dispatch<ProductsActions>,
    myCart: number[],
    setMyCart: React.Dispatch<React.SetStateAction<number[]>>,
    categories: categoryProps[],
    dispatchCategories: React.Dispatch<CategoriesActions>,
    transactions: number[][],
    setTransactions: (transactions: number[][]) => void,
    successPay: () => void
}

const transactionsId = idGenerator()

const useCreateStorage = () => {
    const [products, dispatchProducts] = useReducer(productsReducer, [])
    const [myCart, setMyCart] = useState<number[]>([])
    const [categories, dispatchCategories] = useReducer(categoriesReducer, [])
    const [transactions, setTransactions] = useState<number[][]>([])

    const successPay = () => {
        setTransactions([...transactions, [transactionsId.next().value as number, ...myCart]])
        setMyCart([])
    }

    return {
        products,
        dispatchProducts,
        myCart,
        setMyCart,
        categories,
        dispatchCategories,
        transactions,
        setTransactions,
        successPay
    }
}

const Storage = React.createContext<storageProps>(null!)

const StorageProvider = ({ children }: { children: any}) => {
    const storage = useCreateStorage()

    return (
        <Storage.Provider value={storage}>
            {children}
        </Storage.Provider>
    )
}

const useStorage = () => useContext(Storage)