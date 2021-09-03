export { idGenerator, numberToCurrency }

function* idGenerator() {
    let id = 1
    while (true) yield id++
}

const numberToCurrency = (n: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n)

