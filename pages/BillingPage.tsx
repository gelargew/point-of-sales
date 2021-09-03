import { Box, Button, Container, Dialog, DialogTitle, Divider, List, ListItem, Typography } from "@material-ui/core"
import { COLOR_PALLETE } from "../src/CONSTANTS"
import { useStorage } from "../src/storage"
import Head from "next/head"
import { useMemo, useState } from "react"
import { numberToCurrency } from "../src/utils"

export default function BillingPage() {
    const {transactions} = useStorage()
    const [detailIsOpen, setDetailIsOpen] = useState(false)
    const [transaction, setTransaction] = useState<number[]>([])

    const showDetail = (thisTransaction: number[]) => {
        setTransaction(thisTransaction)
        setDetailIsOpen(true)
    }

    return (
        <Container  maxWidth='sm'>
            <Head>
                <title>Billing Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box bgcolor={COLOR_PALLETE.mainDim} padding='2rem' minHeight='100vh'>

            
                <Typography variant='h2'>
                    Billing Page
                </Typography>
                <List>
                    {transactions.map((thisTransaction, idx) =>  
                        <ListItem key={idx}>
                            <Button onClick={() => showDetail(thisTransaction)} >transaction id: {thisTransaction[0]}</Button>
                        </ListItem>)}
                </List>
                {transactions.length < 1 && <p>you have no transactions</p>}
            </Box>
            <TransactionDetail {...{transaction, detailIsOpen, setDetailIsOpen}} />
        </Container>
    )
}

interface transactionDetailProps {
    transaction: number[],
    setDetailIsOpen: (value: boolean) => void,
    detailIsOpen: boolean
}

const TransactionDetail = ({ transaction, setDetailIsOpen, detailIsOpen}: transactionDetailProps) => {
    const {products} = useStorage()
    const productIds = useMemo(() => transaction.slice(1, transaction.length), [transaction])
    const totalPrice = useMemo(() => productIds.reduce((preVal, id) => preVal + (products.find(product => product.id === id)?.price || 0), 0), [transaction])

    return (
        <Dialog open={detailIsOpen} style={{ justifyContent: 'center'}} >
            <DialogTitle>transaction id: {transaction[0]}</DialogTitle>
            <Divider />
            <List  >
                {productIds.map((id, idx) => 
                    <ListItem style={{ paddingLeft: '2rem' }} key={idx}>
                        {products.find(product => product.id === id)?.name}
                    </ListItem>)}
            </List>
            <Divider />
            <Typography gutterBottom textAlign='center'>total: {numberToCurrency(totalPrice)}</Typography>
            <Button variant='contained' onClick={() => setDetailIsOpen(false)}>close</Button>
        </Dialog>
    )
}

