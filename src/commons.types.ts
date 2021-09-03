export type { productProps, ProductsActions, CategoriesActions, categoryProps, ProductEditProps }

type productProps = {
    id: number,
    name: string,
    price: number,
    category: number
}

type add = {
    type: 'add',
    payload: Pick<productProps, 'name' | 'price' | 'category'>
}

type edit = {
    id: number,
    type: 'edit',
    payload: Pick<productProps, 'name' | 'price' | 'category'>
}

type ProductsActions = add | edit

type categoryProps = {
    id: number,
    name: string
}

type addCategory = {
    type: 'add',
    payload: string
}

type editCategory = {
    idx: number,
    type: 'edit',
    payload: string
}

type CategoriesActions = addCategory | editCategory

type ProductEdit = {
    action: 'add',
}

type ProductAdd = {
    action: 'edit',
    product: productProps
}

type ProductEditProps = ProductAdd | ProductEdit