import { useState, useEffect, createContext } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const router = useRouter()

    const [total, setTotal] = useState(0)
    const [nombre, setNombre] = useState('')
    const [pedido, setPedido] = useState([])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})

    useEffect(() => {
        const obtenerCategorias = async () => {
            const { data } = await axios('/api/categorias')
            setCategorias(data)
        }
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])


    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleEditarCantidades = id => {
        setModal(true)
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const handldeAgregarPedido = ({ categoriaId, ...producto }) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const colocarOrden = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })

            //RESET APP
            setCategoriaActual(categorias[0])
            setNombre('')
            setPedido([])

            toast.success('Pedido realizado correctamente')
            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QuioscoContext.Provider value={{
            total,
            modal,
            nombre,
            pedido,
            producto,
            categorias,
            categoriaActual,
            setNombre,
            colocarOrden,
            handleChangeModal,
            handleSetProducto,
            handleClickCategoria,
            handldeAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
        }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export { QuioscoProvider }
export default QuioscoContext
