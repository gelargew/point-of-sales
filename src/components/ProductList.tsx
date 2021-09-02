import { Box, BoxProps, Button, List, ListItem, ListItemText, Typography } from "@material-ui/core"
import { useStorage } from "../storage"
import ProductBox from "./ProductBox"
import { COLOR_PALLETE } from "../CONSTANTS"

export default function ProductList(props: BoxProps) {
    const {products, setMyCart, generateRandomProducts} = useStorage()

    const addToCart = (productId: number) => {
        setMyCart(values => {
            return [...values, productId]
        })
    }

    return (
        <Box {...props} display='flex' flexDirection='column' bgcolor={COLOR_PALLETE.mainDark} >
            <Typography variant='h2'>
                    Transaction Page
            </Typography>
            {products.length < 1 && 
            <Box padding='4rem'>
                <h3>no Product, check Product page for more info</h3>
                <Button variant='contained' onClick={() => generateRandomProducts()}>Generate random products</Button>
            </Box>}
            <Box flex={1}  padding='2rem' display='flex' flexDirection='row' gap={5} flexWrap='wrap' overflow='auto' > 
                <Box flex={1} display='flex' flexDirection='row' flexWrap='wrap' gap={3} >
                    {products.map((product, idx) => 
                        <ProductBox 
                        key={product.id}
                        bgcolor={COLOR_PALLETE.mainDim} 
                        borderRadius='10%' 
                        padding='1rem'
                        
                        {...{product, idx}}>
                            <Button variant='contained'  onClick={() => addToCart(product.id)} >add</Button>
                        </ProductBox>
                    )}  
                </Box>                                                                               
            </Box>
                
        </Box>
    )
}