



import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileSearch from "./MobileSearch";
import {handleResize } from "../../Utils/handleResize";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth<1024);
  const [isSearchPageVisible, setIsSearchPageVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleOpenSearch = () => {
    setIsSearchPageVisible(true);
    setIsAnimating(true);
  };

  const handleCloseSearch = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsSearchPageVisible(false);
    }, 300);
  };


  // no scroll when the search page is open
  useEffect(() => {

    if (isSearchPageVisible || isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchPageVisible, isAnimating]); 


  useEffect(()=>{
  handleResize(setIsMobile,1024)
  },[])
   
 

  return (
    <>
      {isMobile ? (
        <MobileNavbar onOpenSearch={handleOpenSearch} />
      ) : (
        <DesktopNavbar />
      )}
      {isSearchPageVisible && isMobile && (
        <MobileSearch
          onClose={handleCloseSearch}
          isSearchPageVisible={isAnimating}
        />
      )}
    </>
  );
}





// import React, { useState, useEffect } from "react";
// import DesktopNavbar from "./DesktopNavbar";
// import MobileNavbar from "./MobileNavbar";
// import MobileSearch from "./MobileSearch";


// export default function Navbar() {
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSearchPageVisible, setIsSearchPageVisible] = useState(false);

//   useEffect(()=>{
//     if(isSearchPageVisible){
//       document.body.style.overflow='hidden'
//     }
//     else{
//        document.body.style.overflow='auto'
//     }
//   },[isSearchPageVisible])

//   useEffect(() => {
//     const checkSize = () => setIsMobile(window.innerWidth < 1024);
//     checkSize();
//     window.addEventListener("resize", checkSize);
//     return () => window.removeEventListener("resize", checkSize);
//   }, []);

//   const handleOpenSearch = () => {
//     setIsSearchPageVisible(true);
//   };

//   const handleCloseSearch = () => {
//     setIsSearchPageVisible(false);
//   };

//   return (
//     <>
//       {isMobile ? (
//         <MobileNavbar onOpenSearch={handleOpenSearch} />
//       ) : (
//         <DesktopNavbar />
//       )}
//       {isSearchPageVisible && (
//         <MobileSearch onClose={handleCloseSearch} isSearchPageVisible={isSearchPageVisible} />
//       )}
//     </>
//   );
// };
