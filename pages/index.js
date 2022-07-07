import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import Producto from "../components/Producto";

export default function Home() {

  const { categoriaActual } = useQuiosco()

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
      <div className='grid gap-4 grid-cols-2 xl:grid-cols-4 lg:grid-cols-3'>
        {
          categoriaActual?.productos?.map(producto => (
            <Producto
              producto={producto}
              key={producto.id}
            />
          ))
        }
      </div>
    </Layout>
  )
}