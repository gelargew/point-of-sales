import { BoxProps, Box, Typography } from "@material-ui/core"
import { useStorage } from "../storage"

import { productProps } from "../commons.types"


export default function ProductBox(props: BoxProps & { product: productProps, idx: number }) {
    const {product, idx, ...restProps} = props
    const {getCategory} = useStorage()
    const category = getCategory(product.category)

    return (
        <Box display='flex' flexDirection='column' flex='0 0 19%' {...restProps} width={150} >
            
                <Typography height='3em' style={{ wordWrap: 'break-word' }} variant='h4'>{product.name}</Typography>
            
                
                <Typography textAlign='end'  >{category}</Typography>
                <Typography flexGrow={1} textAlign='end'>price: {product.price}</Typography>
                <Box>
                    {restProps.children}
                </Box>                   
        </Box>
    )
}