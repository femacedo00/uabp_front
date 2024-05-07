async function primeiraFuncao(){
    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Timeout terminou")
            resolve()
        }, 1000);
    })
}

export default async function segundaFuncao(){
    console.log("Chegou aqui 1")
    await primeiraFuncao()
    console.log("Chegou aqui 2")
}