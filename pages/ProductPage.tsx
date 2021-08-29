import { Box, Typography } from "@material-ui/core"
import Head from "next/head"

import ProductListEdit from "../src/components/ProductListEdit"
import CategoryList from "../src/components/CategoryList"
import { COLOR_PALLETE } from "../src/CONSTANTS"



export default function ProductPage() {

    return (
        <Box flexDirection='row' display='flex' minHeight='100vh' >
            <Head>
                <title>Product Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            
            <CategoryList display='flex' flexDirection='column' flex={0.3} bgcolor={COLOR_PALLETE.main} paddingTop='3rem' paddingLeft='3rem' />
            <Box flex={1} padding='3rem'>
                <Typography variant='h2'>
                    Product Page
                </Typography>
                <ProductListEdit />  
            </Box>
                     
        </Box>
    )
}