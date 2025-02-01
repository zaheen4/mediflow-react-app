
const WelcomePage = () => {
   return (
      <div>
         <section className="flex mt-40 justify-center">
            <div className="text-center py-16 w-[60%] mx-auto rounded-2xl shadow-2xl p-8 bg-base-200">
               {/* Inner Text Container */}
               <div className="w-[85%] mx-auto">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MediFlow</h1>
                  <p className="text-lg text-gray-600 mb-8">
                     Your trusted partner in medical equipment solutions. We provide high-quality, reliable, and
                     affordable medical devices to healthcare professionals and institutions worldwide.
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                     Whether you&apos;re looking to equip your clinic, hospital, or research facility, MediFlow offers a
                     wide range of products tailored to meet your needs. Explore our catalog and discover the tools
                     that empower modern healthcare.
                  </p>

                  {/* Uncomment this section if you want login/register buttons */}
                  {/* <div className="space-x-4">
            <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Register
            </Link>
          </div> */}
               </div>
            </div>
         </section>
      </div>
   );
};

export default WelcomePage;