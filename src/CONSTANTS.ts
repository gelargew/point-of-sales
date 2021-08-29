export { ROUTES, COLOR_PALLETE, DUMMY_PRODUCT }

const COLOR_PALLETE = {
    main: '#FFE3E3',
    mainDim: '#E4D8DC',
    mainGray: '#C9CCD5',
    mainDark: '#93B5C6'
}

const ROUTES = [ 
    {
        name: 'Home',
        path: '/'
    }, 
    {
        name: 'Transactions',
        path:'/TransactionPage'
    },
    {
        name: 'Products',
        path: '/ProductPage'
    }, 
    {
        name: 'Billing',
        path: '/BillingPage'
    }
]


const DUMMY_PRODUCT = {
    id: 1,
    name: 'food',
    category: 1,
    price: 100
}