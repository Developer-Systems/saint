import Layout from "../components/Layout";
import Cliente from "../components/Cliente";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Index = () => {
  const router = useRouter();

<<<<<<< HEAD
const Login = () => {


  //routing
  const router = useRouter ();

  const[mensaje, guardarMensaje] = useState(null);

  //Mutation para crear nuevos usuarios en apollo 

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
                        .email('El email no es valido')
                        .required('El email no puede estar vacio'),
      password: Yup.string()
                          .required('El password es obligatorio')
    }),
    onSubmit: async valores => {
      //console.log(valores);
      const{email, password }= valores;

<<<<<<< HEAD
      try {
        const{data} = await autenticarUsuario ({
          variables:{
            input:{
              email,
              password
            }
          }
        });
        console.log(data);
        guardarMensaje('Autenticando...');

        
        //Guardar tokenn  en localstorage
        const{ token } = data.autenticarUsuario;
        localStorage.setItem('token', token);

        //Redireccionar hacia clientes
        setTimeout(()=>{
          guardarMensaje(null);
          router.push('/clientes')
        }, 3000)

      } catch (error) {
        guardarMensaje(error.message.replace('GraphQL error: ', ''));
        //console.log(error);

        setTimeout (()=>{
          guardarMensaje(null);  
        },3000)
        
      }

    }
  })
=======
  //consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  // console.log(data);
  // console.log(loading);
  // console.log(error);
>>>>>>> parent of 33c329e (mejoras en el front-end)

  const mostrarMensaje = () => {
    return(
      <div className = "bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
          <p>{mensaje}</p>
      </div>
    )
=======
  //consulta de apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (loading) return "Cargando...";
  if (!data.obtenerClientesVendedor) {
    return router.push("/login");
>>>>>>> parent of b399220 (Correccion de ruta de login y clientes)
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-white font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white round text-sm hover:bg-gray-800 mb-3 uppercase font-bold ">
            Nuevo cliente
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};
export default Index;
