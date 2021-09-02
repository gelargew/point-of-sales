import React, { useContext, useReducer, useState } from "react"
import { CategoriesActions, categoryProps, productProps, ProductsActions } from "./commons.types"
import { DUMMY_CATEGORIES } from "./CONSTANTS"
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
    generateRandomProducts: (n?: number) => void,
    getCategory: (id: number) => string,
    getProduct: (id: number | undefined) => productProps | undefined
}

const transactionsId = idGenerator()

const useCreateStorage = () => {
    const [products, dispatchProducts] = useReducer(productsReducer, [])
    const [myCart, setMyCart] = useState<number[]>([])
    const [categories, dispatchCategories] = useReducer(categoriesReducer, [])
    const [transactions, setTransactions] = useState<number[][]>([])

    const successPay = () => {
        //add new [transactionId, mycart] to the transactions history, then clear myCart
        setTransactions([...transactions, [transactionsId.next().value as number, ...myCart]])
        setMyCart([])
    }

    const generateRandomProducts = (n=10) => {
        DUMMY_CATEGORIES.forEach(category => {
            dispatchCategories({
                type: 'add',
                payload: category
            })
        })
        
        for (let i = 0; i <= n; i++) {
            dispatchProducts({
                type: 'add',
                payload: {
                    name: 'product ' + (Math.random() + 1).toString(36).substring(7),
                    price:  Math.floor(Math.random() * 100000),
                    category: Math.floor(Math.random() * 5)
                }
            })
        }
    }

    const getCategory = (id:number) => categories.find(category => category.id === id)?.name || 'other'
    const getProduct = (id:number | undefined) => products.find(product => product.id === id)

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
        generateRandomProducts,
        getCategory,
        getProduct
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