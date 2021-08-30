import React, { FormEvent, useState, useEffect } from "react";
import { List, ListItemText, Box, TextField, Button, BoxProps, ListItemButton } from "@material-ui/core";
import { useStorage } from "../storage";


export default function CategoryList(props: BoxProps) {
    const {categories} = useStorage()
    const [selectedCategory, setSelectedCategory] = useState<undefined | number>(undefined)
    const [editMode, setEditMode] = useState<'add' | 'edit' | 'standby'>('standby')

    const startEditMode = (idx: number) => {
        setEditMode('edit')
        setSelectedCategory(idx)
    }

    return (
        <Box justifyContent='space-between' paddingBottom={10} {...props}>
            <h3>Categories</h3>
            <List>
                {categories.map((category, idx) =>
                    <ListItemButton key={category.id} onClick={() => startEditMode(idx)} >
                        <ListItemText primary={category.name} />
                    </ListItemButton>)}
            </List>
            {editMode != 'standby'?
            <CategoryEdit 
            categoryIdx={selectedCategory} 
            setSelectedCategory={setSelectedCategory}
            editMode={editMode}
            setEditMode={setEditMode} />:
            <Box>
                <Button variant='contained' color='primary' onClick={() => setEditMode('add')} >Add Category</Button>
                <p>or click category to edit</p>
            </Box>
        }
            
        </Box>       
    )
}

interface CategoryEditProps {
    categoryIdx?: number,
    setSelectedCategory: (value: undefined) => void,
    editMode: 'add' | 'edit',
    setEditMode: (value: 'add' | 'edit' | 'standby') => void
}

const CategoryEdit = ({ categoryIdx, editMode, setEditMode, setSelectedCategory}: CategoryEditProps) => {
    const {categories, dispatchCategories} = useStorage()
    const [tempCategory, setTempCategory] = useState(typeof categoryIdx === 'number' ? categories[categoryIdx].name : '')

    useEffect(() => {
        setTempCategory(typeof categoryIdx === 'number' ? categories[categoryIdx].name : '')
    }, [categoryIdx])

    const handleEdit = (e:FormEvent) => {
        e.preventDefault()
        //prevent adding 2 category with the same name
        if (editMode === 'add' && !categories.some(category => category.name === tempCategory)) {
            dispatchCategories({
                payload: tempCategory,
                type: 'add'
            })
        }
        else if ( editMode === 'edit' && typeof categoryIdx === 'number') {
            dispatchCategories({
                payload: tempCategory,
                type: 'edit',
                idx: categoryIdx
            })
        }
        handleClear()
        
    }

    const handleClear = () => {
        setEditMode('standby')
        setSelectedCategory(undefined)
    }

    return (
        <Box >
            <form onSubmit={handleEdit}>
                <TextField 
                name='category' 
                label='name' 
                value={tempCategory} 
                onChange={e => setTempCategory(e.target.value)}
                required />
                <Button variant='contained' color='secondary' type='submit'>Save</Button>
                <Button variant='contained' color='secondary' onClick={handleClear}>Cancel</Button>
            </form>
        </Box>
    )
}