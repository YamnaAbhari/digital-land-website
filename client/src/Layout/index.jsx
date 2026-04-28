// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// export default function Layout() {
//   return (
//     <div className="bg-gray-100">
//       <Navbar/>
//       <main className="min-h-svh">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }


        import React from "react";
        import { Outlet } from "react-router-dom";
        import Navbar from "../Components/Navbar";
        import Footer from "../Components/Footer";

        export default function Layout() {
          return (
            <>
      <Navbar />
      <main className="min-h-[100svh] ">
        <Outlet />
      </main>
      
      <Footer/>
    </>
          );
        }