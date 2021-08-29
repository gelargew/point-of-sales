import { Box, Button, Container, List, ListItemButton, Typography } from "@material-ui/core"
import { COLOR_PALLETE } from "../src/CONSTANTS"
import { useStorage } from "../src/storage"

export default function BillingPage() {
    const {transactions} = useStorage()

    return (
        <Container  maxWidth='sm'>
            <Box bgcolor={COLOR_PALLETE.mainDim} padding='2rem' minHeight='100vh'>

            
                <Typography variant='h2'>
                    Billing Page
                </Typography>
                <List>
                    {transactions.map(transaction =>  
                        <ListItemButton>
                            <Button>transaction id: {transaction[0]}</Button>
                        </ListItemButton>)}
                </List>
                {transactions.length < 1 && <p>you have no transactions</p>}
            </Box>
        </Container>
    )
}

