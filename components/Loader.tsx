// // import React from 'react'
// import Image from 'next/image'

// const Loader=()=>{
//   return(
//     <div className="flex-center h-screen w-full">
//       <Image
//       src="/icons/loading-circle.svg"
//       alt="Loading"
//       width={50}
//       height={50}
//       />


//     </div>
//   )
// }
// export default Loader;
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-dark-2">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading"
        width={50}
        height={50}
        priority={true} // Ensures it loads immediately
        loading="eager" // Prevents lazy loading
      />
    </div>
  );
};

export default Loader;
