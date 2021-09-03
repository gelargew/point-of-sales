import { Box, BoxProps, Button, Typography } from "@material-ui/core"
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
            <Typography paddingLeft='3rem' variant='h2'>
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
                        {...{product, idx}}>
                            <Button variant='contained'  onClick={() => addToCart(product.id)} >add</Button>
                        </ProductBox>
                    )}  
                </Box>                                                                               
            </Box>
                
        </Box>
    )
}