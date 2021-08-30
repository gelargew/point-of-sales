import { List, ListItem, Divider, Box, BoxProps, Button, Dialog, DialogTitle, Typography } from "@material-ui/core"
import { useState, useMemo } from "react"
import { useStorage } from "../storage"


export default function OrderLists(props: BoxProps) {
    const {products, myCart } = useStorage()
    const [payboxIsOpen, setPayboxIsOpen] = useState(false)
    const totalPrice = useMemo(() => {
        return myCart.reduce((preVal, item) => preVal + (products.find(product => product.id === item)?.price || 0), 0)
    }, [myCart])

    const findProduct = (productId: number) => products.find(product => product.id === productId)
    

    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between' padding={10} flex={0.4} {...props}>
            <List>
                {myCart.map((productId, idx) => 
                    <ListItem key={`${productId}-${idx}`} >
                        {findProduct(productId)?.name}
                    </ListItem>
                )}
            </List>
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
    

    const handlePay = () => {
        successPay()
        setPayboxIsOpen(false)
    }

    return (
        <Dialog open={payboxIsOpen}>
            <DialogTitle>Total items: {myCart.length}</DialogTitle>
            <DialogTitle>Total Price: {totalPrice}</DialogTitle>
            <Divider />
            <Button variant='contained' onClick={handlePay} >Pay</Button>
            <Button variant='contained' onClick={() => setPayboxIsOpen(false)}>Cancel</Button>
        </Dialog>
    )
}
