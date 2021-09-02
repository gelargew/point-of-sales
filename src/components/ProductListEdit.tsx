
import { FormEvent, useEffect, useMemo, useState } from "react"
import { productProps } from "../commons.types"
import { useStorage } from "../storage"
import { 
    InputLabel, 
    Box, 
    BoxProps, 
    List, 
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    FormControl, 
    FormHelperText,
    Divider, 
    ListItemButton ,
    ListItemText,
    SelectChangeEvent,
    Typography
} from "@material-ui/core"
import ProductBox from "./ProductBox"
import { COLOR_PALLETE } from "../CONSTANTS"


export default function ProductListEdit(props: BoxProps) {
    const {products, categories, generateRandomProducts, getProduct} = useStorage()
    const [selectedProductId, setSelectedProductId] = useState<undefined | number>()
    const selectedProduct = useMemo(() => 
        getProduct(selectedProductId), [selectedProductId])


    const selectProduct = (idx: number) => {
        setSelectedProductId(idx)
    }

    return (
        <Box display='flex' flexDirection='column'  flex={1} {...props} justifyContent='space-between' >
            <h3>Product Lists</h3>
            {categories.length > 0 ?
            <>
                <Box flex={1} borderRadius='5%' bgcolor={COLOR_PALLETE.mainDark} padding='2rem' display='flex' flexDirection='row' gap={5} flexWrap='wrap' overflow='auto' > 
                    <Box flex={1} display='flex' flexDirection='row' flexWrap='wrap' gap={1} >
                        {products.map((product, idx) => 
                            <ProductBox 
                            key={product.id}
                            bgcolor={COLOR_PALLETE.mainDim} 
                            borderRadius='10%' 
                            padding='1rem'

                            
                            {...{product, idx}}>
                                <Button onClick={() => selectProduct(product.id)} >Edit</Button>
                            </ProductBox>
                        )}  
                    </Box>   
                                                                              
                </Box>
                <Divider />
                <Box flex={0.3} padding='1rem' >      
                    <ProductEdit setSelectedProductId={setSelectedProductId} product={selectedProduct} idx={selectedProductId} />                                
                </Box>   
            </>:
            <Box>
                <h3>create categories to add product</h3>
                <Button variant='contained' onClick={() => generateRandomProducts()}>Generate random Products</Button>
            </Box>
            
            }                       
        </Box>
    )
}



interface ProductEditProps {
    product?: productProps | null,
    idx?: number,
    setSelectedProductId: (value: number | undefined) => void
}

const ProductEdit = ({setSelectedProductId, product, idx=0}: ProductEditProps) => {
    const {categories, dispatchProducts, getCategory} = useStorage()
    const [tempName, setTempName] = useState(product ? product.name : '')
    const [tempPrice, setTempPrice] = useState(product ? product.price : 0)   
    const [tempCategory, setTempCategory] = useState(categories.find(category => category.id === product?.category)?.name || '')
    const [selectedCategoryId, setSelectedCategoryId] = useState(1)

    useEffect(() => { 
        console.log(product)
        product ? setTempCategory(getCategory(product.category)) : ''
        setTempName(product ? product.name : '')
        setTempPrice(product ? product.price : 0)
        setSelectedCategoryId(product ? product.category : 1)
    }, [product])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        console.log(tempPrice)
        if (!product) dispatchProducts({
            type: 'add',
            payload: {
                name: tempName,
                price: tempPrice,
                category: selectedCategoryId
            }
        })
        else dispatchProducts({
            type: 'edit',
            payload: {
                name: tempName,
                price: tempPrice,
                category: selectedCategoryId
            },
            idx
        })

    }

    const handleCategoryChange = (e: SelectChangeEvent) => {
        const name = e.target.value
        setSelectedCategoryId(categories.find(category => category.name === name)?.id || 0)
        setTempCategory(name)        
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
            name='name'
            label='Product Name'
            value={tempName}
            required
            onChange={e => setTempName(e.target.value)} 
            />      
            <TextField
            name='Price'
            label='Enter price'
            value={tempPrice}
            required
            type='number'
            onChange={e => setTempPrice(Math.abs(parseInt(e.target.value)))}
            />
            <FormControl>
                <Select
                labelId='select-category'
                label='category'
                value={tempCategory}
                onChange={handleCategoryChange}
                >
                <InputLabel id='select-category'>Category</InputLabel>
                    {categories.map(category => 
                        <MenuItem 
                        key={category.id} 
                        value={category.name} 
                        >
                            {category.name}
                        </MenuItem>)}
                </Select>
                <FormHelperText>Category</FormHelperText>
            </FormControl>
            

            <Button type='submit'>{!product ? 'Add product' : 'Save changes'}</Button>
            {product ? 
            <Button onClick={() => setSelectedProductId(undefined)} >Cancel</Button>:
            <p>click product to edit</p>}
        </form>
    )
}


