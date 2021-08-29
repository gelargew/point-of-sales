import { Box, BoxProps, Button, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import { useStorage } from "../storage"

export default function ProductList(props: BoxProps) {
    const {products, setMyCart} = useStorage()

    const addToCart = (productId: number) => {
        setMyCart(values => {
            return [...values, productId]
        })
    }

    return (
        <Box {...props} >
            <Typography variant='h2'>
                    Transaction Page
            </Typography>
            {products.length < 1 && <h3>no Product, check Product page for more info</h3>}
            <List>
                {products.map((product, idx) => 
                <ListItem key={idx} >
                    <ListItemText>{product.name}</ListItemText>
                    <Button variant='contained'  onClick={() => addToCart(product.id)} >add</Button>
                </ListItem>)}
            </List>
        </Box>
    )
}