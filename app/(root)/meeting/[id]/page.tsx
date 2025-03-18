
import React from "react";

const Meeting =async ({ params } : { params: { id :string}}) => {
  
 
  return (
    <div>
    
     Meeting Room: #{ params.id}
     console.log()
      </div>
  )
}
export default Meeting

