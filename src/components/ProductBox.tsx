import { BoxProps, Box, Typography } from "@material-ui/core"
import { useStorage } from "../storage"

import { productProps } from "../commons.types"
import { COLOR_PALLETE } from "../CONSTANTS"


export default function ProductBox(props: BoxProps & { product: productProps, idx: number }) {
    const {product, idx, ...restProps} = props
    const {getCategory} = useStorage()
    const category = getCategory(product.category)

    return (
        <Box 
        bgcolor={COLOR_PALLETE.mainDim} 
        padding='1rem' 
        display='flex' 
        flexDirection='column' 
        flex='0 0 19%' 
        width={150}
        borderRadius='3%'
        boxShadow='2px 2px 2px 2px rgba(0, 0, 0, 0.4)'
        {...restProps}  >
            
                <Typography height='3em' style={{ wordWrap: 'break-word' }} variant='h4'>{product.name}</Typography>
            
                
                <Typography textAlign='end'  >{category}</Typography>
                <Typography flexGrow={1} textAlign='end'>price: {product.price}</Typography>
                <Box>
                    {restProps.children}
                </Box>                   
        </Box>
    )
}