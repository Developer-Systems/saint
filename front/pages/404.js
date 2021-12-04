import Link from "next/link";
import 'tailwindcss/dist/tailwind.min.css'
const NotFound = () => {
  return (
      <div className="w-screen mx-auto w">
        <div className="flex items-center justify-center">
          <div className="sm:w-screen lg:w-screen">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="bg-cover bg-center h-screen p-4">
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl text-gray-900 font-bold block">404</h1>
                  <h2 className="text-2xl text-gray-900 font-bold">
                    Página no encontrada
                  </h2>
                  <Link href="/" className="text-gray-600">
                    <a>Volver al inicio</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NotFound;
