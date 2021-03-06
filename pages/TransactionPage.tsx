import { Box } from "@material-ui/core"
import Head from "next/head"
import OrderLists from "../src/components/OrderLists"
import ProductList from "../src/components/ProductList"
import { COLOR_PALLETE } from "../src/CONSTANTS"



export default function TransactionPage() {
    return (
        <Box display='flex' flexDirection='row' flexWrap='wrap' minHeight='100vh'>
            <Head>
                <title>Transaction Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            
            <OrderLists bgcolor={COLOR_PALLETE.main} flex={0.3} />
            <ProductList height='100vh' flex={1} />
            
        </Box>
    )
}