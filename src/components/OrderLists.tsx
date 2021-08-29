import { List, ListItem, Divider, Box, BoxProps, Button, Dialog, DialogTitle } from "@material-ui/core"
import { useState, useMemo } from "react"
import { useStorage } from "../storage"


export default function OrderLists(props: BoxProps) {
    const {products, myCart } = useStorage()
    const [payboxIsOpen, setPayboxIsOpen] = useState(false)

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
            <Button variant='contained' onClick={() => setPayboxIsOpen(true)} >Pay</Button>:
            <h4>add Product to your list</h4>}
            <PayBox {...{payboxIsOpen, setPayboxIsOpen}}  />
        </Box>
    )
}

interface payBoxProps {
    payboxIsOpen: boolean,
    setPayboxIsOpen: (value: boolean) => void
}

const PayBox = ({payboxIsOpen, setPayboxIsOpen}: payBoxProps) => {
    const {myCart, products, successPay} = useStorage()
    const totalPrice = useMemo(() => {
        return myCart.reduce((preVal, item) => preVal + products[item]?.price, 0)
    }, [myCart])

    const handlePay = () => {
        successPay()
        setPayboxIsOpen(false)
    }

    return (
        <Dialog open={payboxIsOpen}>
            <DialogTitle>Total Price: {totalPrice}</DialogTitle>
            <Divider />
            <Button variant='contained' onClick={handlePay} >Pay</Button>
        </Dialog>
    )
}
