import { useEffect, useCallback } from "react";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import { formatearDinero } from "../helpers";

export default function Total() {

    const { total, pedido, nombre, setNombre, colocarOrden } = useQuiosco()

    console.log(total);

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || !nombre || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

    return (
        <Layout pagina='Total y confirmar pedido'>
            <h1 className='text-4xl font-black'>Total y Confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md'
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        id="nombre"
                        type='text'
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar: {''}
                        <span className="font-bold">{formatearDinero(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    <input
                        className={`w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center cursor-pointer ${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'}`}
                        disabled={comprobarPedido()}
                        value='Confirmar Pedido'
                        type='submit' />
                </div>
            </form>
        </Layout>
    )
}