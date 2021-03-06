
import { FormEvent, useEffect, useMemo, useState } from "react"
import { productProps } from "../commons.types"
import { useStorage } from "../storage"
import { 
    InputLabel, 
    Box, 
    BoxProps,
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    FormControl, 
    FormHelperText,
    SelectChangeEvent,
    Container
} from "@material-ui/core"
import ProductBox from "./ProductBox"


export default function ProductListEdit(props: BoxProps) {
    const {products, categories, generateRandomProducts, getProduct} = useStorage()
    const [selectedProductId, setSelectedProductId] = useState<undefined | number>()
    const selectedProduct = useMemo(() => 
        getProduct(selectedProductId), [selectedProductId])


    const selectProduct = (idx: number) => {
        setSelectedProductId(idx)
    }

    return (
        <Box display='flex' flexDirection='column'  flex={1} justifyContent='space-between' {...props}  >
            {categories.length > 0 ?
            <>
                <Box flex={1} padding='2rem' display='flex' flexDirection='row' gap={5} flexWrap='wrap' overflow='auto' > 
                    <Box flex={1} display='flex' flexDirection='row' flexWrap='wrap' gap={1} >
                        {products.map((product, idx) => 
                            <ProductBox 
                            key={product.id}                          
                            {...{product, idx}}>
                                <Button onClick={() => selectProduct(product.id)} >Edit</Button>
                            </ProductBox>
                        )}  
                    </Box>   
                                                                              
                </Box>
                <Container>
                    <Box flex={0.3} padding='1rem' bgcolor='white' boxShadow='1px 1px 1px 1px gray' >      
                        <ProductEdit 
                        setSelectedProductId={setSelectedProductId} 
                        product={selectedProduct} 
                        selectedProductId={selectedProductId} />                                
                    </Box>   
                </Container>
                
            </>:
            <Box padding='5rem' >
                <h3>create categories to add product</h3>
                <Button variant='contained' onClick={() => generateRandomProducts()}>Generate random Products</Button>
            </Box>
            
            }                       
        </Box>
    )
}



interface ProductEditProps {
    product?: productProps | null,
    selectedProductId?: number,
    setSelectedProductId: (value: number | undefined) => void
}

const ProductEdit = ({setSelectedProductId, product, selectedProductId}: ProductEditProps) => {
    const {categories, dispatchProducts, getCategory} = useStorage()
    const [tempName, setTempName] = useState('')
    const [tempPrice, setTempPrice] = useState(0)   
    const [tempCategory, setTempCategory] = useState('')
    const [selectedCategoryId, setSelectedCategoryId] = useState(1)

    useEffect(() => { 
        product ? setTempCategory(getCategory(product.category)) : ''
        setTempName(product ? product.name : '')
        setTempPrice(product ? product.price : 0)
        setSelectedCategoryId(product ? product.category : 1)
    }, [product])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        if (!product || !selectedProductId) dispatchProducts({
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
            id: selectedProductId
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


