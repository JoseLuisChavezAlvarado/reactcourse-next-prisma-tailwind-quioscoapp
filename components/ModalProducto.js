import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import { useEffect, useState } from "react";

const ModalProdcuto = () => {

    const { producto, handleChangeModal, handldeAgregarPedido, pedido } = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {
        if (pedido.some(pedidodState => pedidodState.id === producto.id)) {
            const productoEdicion = pedido.find(pedidodState => pedidodState.id === producto.id)
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [producto, pedido])


    return (
        <div className="md:flex gap-10">

            <div className="md:w-1/3">
                <Image
                    width={300}
                    height={400}
                    src={`/assets/img/${producto.imagen}.jpg`}
                    alt={`imagen_producto_${producto.nombre}`}
                />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button
                        onClick={handleChangeModal}
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
                <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(producto.precio)}</p>

                <div className="flex gap-4 my-5">
                    <button
                        onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : cantidad)}
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className="text-3xl">{cantidad}</p>
                    <button
                        onClick={() => setCantidad(cantidad < 5 ? cantidad + 1 : cantidad)}
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => handldeAgregarPedido({ ...producto, cantidad })}
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold uppercase rounded"
                >{edicion ? 'Guardar cambios' : 'Añadir al pedido'}</button>
            </div>

        </div>
    );
}

export default ModalProdcuto;