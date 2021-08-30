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
    successPay: () => void,
    generateRandomProducts: (n?: number) => void
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

    const generateRandomProducts = (n=10) => {
        dispatchCategories({
            type: 'add',
            payload: 'random'
        })
        for (let i = 0; i <= n; i++) {
            dispatchProducts({
                type: 'add',
                payload: {
                    name: 'product ' + (Math.random() + 1).toString(36).substring(7),
                    price:  Math.floor(Math.random() * 100000),
                    category: 1
                }
            })
        }
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
        successPay,
        generateRandomProducts
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