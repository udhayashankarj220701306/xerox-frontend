import { useEffect } from "react";
import {useUserStore} from "../stores/useUserStore.js"
import {RequestStatus} from "../components/RequestStatus.jsx";

const HomePage = () => {
	const { user } = useUserStore();
  // console.log("HomePage user:", !user);

	return (
    <>
      <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
        {(!user)?(<div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800 overflow-hidden">
          <div className="pt-24">
            <header className="text-center py-10">
              <h1 className="text-4xl font-bold text-blue-800 drop-shadow-lg">
                Welcome to Smart Xerox Shop
              </h1>
              <p className="text-lg mt-3 text-gray-700">
                Fast • Reliable • Digital Copying & Printing Solutions
              </p>
            </header>

            <main className="flex flex-wrap justify-center gap-8 py-10 px-4">
              {/* Card 1 */}
              <div className="bg-white w-72 p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <img
                  src="https://img.freepik.com/free-vector/office-printer-concept-illustration_114360-2215.jpg"
                  alt="Printing Service"
                  className="rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold text-blue-700">
                  Printing
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  High-quality color and black & white printing services at
                  affordable prices.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white w-72 p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <img
                  src="https://img.freepik.com/free-vector/office-document-scanning-concept-illustration_114360-2208.jpg"
                  alt="Scanning Service"
                  className="rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold text-blue-700">
                  Scanning
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Fast and accurate document scanning with PDF conversion and
                  cloud upload options.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white w-72 p-5 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <img
                  src="https://img.freepik.com/free-vector/photocopy-machine-concept-illustration_114360-2196.jpg"
                  alt="Xerox Service"
                  className="rounded-lg mb-3"
                />
                <h2 className="text-xl font-semibold text-blue-700">Xerox</h2>
                <p className="text-gray-600 text-sm mt-2">
                  Quick and reliable photocopying with clear, professional
                  results.
                </p>
              </div>
            </main>
          </div>
        </div>):
        (<RequestStatus/>)}
      </div>
    </>
  );
};
export default HomePage;
