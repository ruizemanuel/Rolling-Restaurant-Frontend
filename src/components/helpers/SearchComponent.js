import React, {useState, useEffect} from 'react'


function SearchComponent() {
    //setear los hooks useState
    const [productName, setUsers] = useState([])
    const [search, setSearch] = useState("")

    //función para traer los datos de la API
    const URL = 'https://rolling-restaurant.netlify.app/'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        //console.log(data)
        setUsers(data)
    }
    //función de búsqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    //metodo de filtrado 1 
    /*  let results = []
    if(!search)
    {
        results = users
    }else{
         results = users.filter( (dato) =>
         dato.name.toLowerCase().includes(search.toLocaleLowerCase())
     )
    } */
    //metodo de filtrado 2   
    const results = !search ? productName : productName.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        showData()
    }, [])

    //renderizamos la vista
    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control' />
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='bg-curso text-white'>
                        <th>NAME</th>
                        <th>TIPO DE MENU</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((productName) => (
                        <tr key={productName.productName}>
                            <td>{productName.price}</td>
                            <td>{productName.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default SearchComponent