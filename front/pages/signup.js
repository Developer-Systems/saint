import React from "react";
import Layout from "../components/Layout";
import { useFormik} from 'formik';
import* as yup from 'yup';

const NuevaCuenta= () => {

  //validacion de formulario
  const formik = useFormik ({
    initialValues:{
      nombre: '' ,
      apellido : '' ,
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El Nombre es Obligatorio'),
      apellido: Yup.string()
                  .required('El Apeliido es Obligatorio'),
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email es Obligatorio'),
      password: Yup.string()
                  .required('El Password no puede ir vacio')
                  .min(6,'El password debe ser de al menos 6 caracteres')
    }),
    onSubmit: valores => {
      console.log("enviando");
      console.log(valores);
    }
  });






  return (
    <div>
      <Layout>
        <h1 className="text-center text-2xl text-white font-bold">Crear Nueva Cuenta</h1>
        <div className="flex justify-center mt-5 "> 
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
              
              <div className= "mb-4">
                <label className="block text-gray-700 text-sm  font-bold mb-2" htmlfor="nombre">
                  Nombre
                </label>    
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline  "  id="nombre" type="text" placeholder="Nombre Usuario" value={ formik.values.nombre} onChane={formik.handleChange} onBlur={formik.handleBlur}/>
              </div>

              {formik.touched.nombre && formik.errors.nombre ? (
                <div className = " my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" > 
                  <a className ="font-bold">Error</a>
                  <a>(formik.error.nombre)</a>
                </div>
              ): null }

              <div className= "mb-4">
                <label className="block text-gray-700 text-sm  font-bold mb-2" htmlfor="apellido">
                  Apellido
                </label>    
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline  "  id="apellido" type="text" placeholder="Apellido Usuario"value={ formik.values.apellido} onChane={formik.handleChange}/>
              </div>

              {formik.touched.apellido && formik.errors.apellido ? (
                <div className = " my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" > 
                  <a className ="font-bold">Error</a>
                  <a>(formik.error.apellido)</a>
                </div>
              ): null }

              <div className= "mb-4">
                <label className="block text-gray-700 text-sm  font-bold mb-2" htmlfor="nombre">
                  Email
                </label>    
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline  "  id="email" type="email" placeholder="Email Usuario" value={ formik.values.email} onChane={formik.handleChange}/>
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className = " my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" > 
                  <a className ="font-bold">Error</a>
                  <a>(formik.error.email)</a>
                </div>
              ): null }

              <div className ="mb-4">
                <label className="block text-gray-700 text-sm  font-bold mb-2" htmlfor="password">
                  Password
                </label>    
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline  "  id="password" type="password" placeholder="Password Usuario" value={ formik.values.password} onChane={formik.handleChange}/>
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className = " my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" > 
                  <a className ="font-bold">Error</a>
                  <a>(formik.error.Password)</a>
                </div>
              ): null }

              <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900" value="Crear Cuenta"/>

            </form>

          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NuevaCuenta;