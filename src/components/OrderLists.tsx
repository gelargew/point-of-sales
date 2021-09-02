import { List, Divider, Box, BoxProps, Button, Dialog, DialogTitle, Typography, ListItem } from "@material-ui/core"
import { useRouter } from "next/router"
import { useState, useMemo } from "react"
import { useStorage } from "../storage"


export default function OrderLists(props: BoxProps) {
    const {products, myCart, setMyCart} = useStorage()
    const [payboxIsOpen, setPayboxIsOpen] = useState(false)
    const totalPrice = useMemo(() => {
        return myCart.reduce((preVal, item) => 
        preVal + (products.find(product => product.id === item)?.price || 0), 0)
    }, [myCart])

    const findProduct = (productId: number) => products.find(product => product.id === productId)
    const removeOrder = (idx: number) => {
        setMyCart(preVal => {
            preVal.splice(idx, 1)
            return [...preVal]
        })
    }
    

    return (
        <Box 
        display='flex' 
        flexDirection='column' 
        justifyContent='space-between' 
        padding={10} 
        gap='1rem'
        {...props}>
            <Box flex={1}>
                <List>
                    {myCart.map((productId, idx) => 
                    <Box key={`${productId}-${idx}`} justifyContent='space-between' display='flex'>
                        <ListItem >
                            {findProduct(productId)?.name}
                            
                        </ListItem>
                        <Button onClick={() => removeOrder(idx)} >X</Button>
                    </Box>
                        
                    )}
                </List>
            </Box>
            
            <Divider />
            {myCart.length > 0?
            <>
                <Typography>total price: {totalPrice}</Typography>
                <Button variant='contained' onClick={() => setPayboxIsOpen(true)} >Pay</Button>
            </>:
            <h4>add Product to your list</h4>}
            <PayBox {...{payboxIsOpen, setPayboxIsOpen, totalPrice}}  />
        </Box>
    )
}

interface payBoxProps {
    payboxIsOpen: boolean,
    setPayboxIsOpen: (value: boolean) => void,
    totalPrice: number
}

const PayBox = ({payboxIsOpen, setPayboxIsOpen, totalPrice=0}: payBoxProps) => {
    const {successPay, myCart} = useStorage()
    const router = useRouter()
    

    const handlePay = () => {
        successPay()
        router.push('/BillingPage')
    }

    return (
        <Dialog open={payboxIsOpen}>
            <DialogTitle>Total items: {myCart.length}</DialogTitle>
            <DialogTitle>Total Price: {totalPrice}</DialogTitle>
            <Box gap='1rem' display='flex' justifyContent='space-around'  >
                <Button fullWidth variant='contained' onClick={handlePay} >Pay</Button>
                <Button fullWidth variant='contained' onClick={() => setPayboxIsOpen(false)}>Cancel</Button>
            </Box>      
        </Dialog>
    )
}
