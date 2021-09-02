import { CategoriesActions, categoryProps, productProps, ProductsActions } from "./commons.types";
import { idGenerator } from "./utils";

export { productsReducer, categoriesReducer }

const productId = idGenerator()

const productsReducer = (products: productProps[], action: ProductsActions) => {
    switch (action.type) {
        case 'add':
            const newProduct = {
                id: productId.next().value as number,
                ...action.payload
            }
            console.log(newProduct)
            return [...products, newProduct]
        case 'edit':
            products[action.idx] = {...products[action.idx], ...action.payload}
            return [...products]
        default:
            return [...products]
    }
}


const categoryId = idGenerator()

const categoriesReducer = (categories: categoryProps[], action: CategoriesActions) => {
    switch (action.type) {
        case 'add':
            const newCategory = {
                id: categoryId.next().value as number,
                name: action.payload
            }
            return [...categories, newCategory]
        case 'edit':
            categories[action.idx].name = action.payload
            return [...categories]
        default:
            return [...categories]
    }
}