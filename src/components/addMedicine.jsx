import React, { useState } from 'react';
import axios from 'axios';

function AddMedicine() {
  const [medicine_name, setmedicine] = useState('');
  const [price, setprice] = useState('');
  const [stock, setstock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/medicinelist/medicinelist', {
        medicine_name,
        price,
        stock
      });
      alert(' added successfully!');
      setmedicine('');
      setprice('');
      setstock('');
    } catch (error) {
      console.error('Error adding theater:', error);
      alert('Something went wrong while adding the theater.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Add Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicine_name}
          onChange={(e) => setmedicine(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="stock"
          value={stock}
          onChange={(e) => setstock(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
}

export default AddMedicine;
