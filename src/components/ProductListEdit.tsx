
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
    ListItemText
} from "@material-ui/core"


export default function ProductListEdit(props: BoxProps) {
    const {products, categories} = useStorage()
    const [selectedProductId, setSelectedProductId] = useState<undefined | number>()
    const selectedProduct = useMemo(() => 
        typeof selectedProductId === 'number' ? products[selectedProductId] : null, [selectedProductId])


    const h = (idx: number) => {
        setSelectedProductId(idx)
        console.log(selectedProduct)
    }

    return (
        <Box display='flex' flexDirection='column' gap={5} height='100%' flex={0.8} {...props} justifyContent='space-between' >
            <h3>Product Lists</h3>
            {categories.length > 0 ?
            <>
                <Box flex={1} display='flex' flexDirection='row' gap={5} flexWrap='wrap' overflow='auto' > 
                    <List>
                        {products.map((product, idx) => 
                            <ListItemButton key={product.id} onClick={() => h(idx)} >                     
                                <ListItemText>{product.name}</ListItemText>
                            </ListItemButton>
                        )}  
                    </List>   
                                                                              
                </Box>
                <Divider />
                <Box flex={0.3} >      
                    <ProductEdit setSelectedProductId={setSelectedProductId} product={selectedProduct} idx={selectedProductId} />                                
                </Box>   
            </>:
            <h3>create categories to add product</h3>
            }                       
        </Box>
    )
}



interface ProductEditProps {
    product: productProps | null,
    idx?: number,
    setSelectedProductId: (value: number | undefined) => void
}

const ProductEdit = ({setSelectedProductId, product, idx=0}: ProductEditProps) => {
    const {categories, dispatchProducts} = useStorage()
    const [tempName, setTempName] = useState(product ? product.name : '')
    const [tempPrice, setTempPrice] = useState(product ? product.price : 0)   
    const [tempCategory, setTempCategory] = useState(product ? categories[product.category].name : '')
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

    useEffect(() => { 
        !product && setTempCategory(categories[0].name)
        setTempName(product ? product.name : '')
        setTempPrice(product ? product.price : 0)
    }, [product])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
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
                onChange={e => setTempCategory(e.target.value)}
                >
                <InputLabel id='select-category'>Category</InputLabel>
                    {categories.map(category => 
                        <MenuItem 
                        key={category.id} 
                        value={category.name} 
                        onSelect={() => setSelectedCategoryId(category.id)}
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