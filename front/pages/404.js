import Link from "next/link";
import 'tailwindcss/dist/tailwind.min.css'
const NotFound = () => {
  return (
      <div className="w-screen mx-auto w">
        <div className="flex items-center justify-center">
          <div className="sm:w-screen lg:w-screen">
            <div className="bg-404 shadow-xl rounded-lg overflow-hidden">
              <div className="bg-cover bg-center h-screen p-4 flex justify-center items-center">
                <div className="block text-center">
                  <p className="text-15xl text-gray-900 font-bold ">404</p>
                  <h2 className="text-4xl text-gray-900 font-bold">
                    Página no encontrada
                  </h2>
                  <a type="button" href="/" className="pt-5 bg-green-400 w-full sm:w-auto font-bold uppercase text-xs rounded p-4 text-white shadow-md">
                    Volver al inicio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NotFound;
