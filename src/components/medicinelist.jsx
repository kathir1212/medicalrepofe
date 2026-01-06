
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Medicinelist() {

  const { id } = useParams(); 
  
  const [medicines, setMedicineinfo] = useState([]);
  
  




  


  let medicallistapi = async () => {
    const token = localStorage.getItem("token"); // or wherever you store the JWT token
    console.log(id, "ididididi");
  
    try {
      const res = await axios.get(`http://localhost:3000/medicinelist/medicinelist`);
  
      const threaterlists = res.data;
      console.log(threaterlists, "aninini");
      setMedicineinfo(threaterlists);
    } catch (error) {
      console.error("Error fetching threater list:", error);
    }
  };
  


  

  
  const deletemedicine = async (id) => {
    const token = localStorage.getItem("token");
  
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await axios.delete(`http://localhost:3000/medicinelist/medicinelist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // After successful delete, remove it from the local state
        setMedicineinfo(medicines.filter(med => med._id !== id));
      } catch (error) {
        console.error("Error deleting :", error);
        alert("Error deleting theater");
      }
    }
  };
  




  useEffect(() => {
    medicallistapi();
    
    

  }, [id]);

  

  return (

<div class="">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
       <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" class="px-6 py-3">
                      Medicine Name
                   </th>
                   <th scope="col" class="px-6 py-3">
                     Price
                   </th>
                    <th scope="col" class="px-6 py-3">
                     Stock
                   </th>
                    <th scope="col" class="px-6 py-3">
                     Action
                   </th>
               </tr>
           </thead>
           <tbody>
   
          {medicines.map((movieinfo, index) => (
       <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               {movieinfo?.medicine_name}
           </th>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               {movieinfo?.price}
           </th>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               {movieinfo?.stock}
           </th>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <button className='text-red-500' onClick={() => deletemedicine(movieinfo._id)}>Delete</button>
           </th>
          
          
       </tr>
   ))}
   
   
              
           </tbody>
       </table>
   </div>
   
   </div>
   
   

  );
}

export default Medicinelist;




