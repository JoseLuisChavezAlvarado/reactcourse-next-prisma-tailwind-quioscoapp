import Image from "next/image"
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from "../helpers"

const Producto = ({ producto }) => {

    const { handleSetProducto, handleChangeModal } = useQuiosco()
    const { nombre, imagen, precio } = producto

    const handleClick = () => {
        handleSetProducto(producto)
        handleChangeModal()
    }

    return (
        <div className="border p-3">
            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={`imagen_producto_${nombre}`}
                width={400}
                height={500}
            />

            <div className='p-5'>
                <h3 className='text-2xl font-bold'>{nombre}</h3>
                <p className='mt-5+ font-black text-4xl text-amber-500'>{formatearDinero(precio)}</p>
                <button
                    type='button'
                    onClick={handleClick}
                    className='bg-indigo-800 text-white w-full mt-5 uppercase font-bold'
                >Agregar</button>
            </div>
        </div>
    );
}

export default Producto;