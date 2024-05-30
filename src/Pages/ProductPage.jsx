import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { getProduct, addProduct, editProduct } from '../api/myApi';

const ProductPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [Products, setProducts] = useState([])

  const [SproductName,setSproductName] = useState('');
  const [SproductColor,setSproductColor] = useState('');
  const [SproductCategory,setSproductCategory] = useState('');
  const [SproductPrice,setSproductPrice] = useState(0);
  const [pid,setPid] = useState(null)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    closeModal();
  };


  const openEditModal = (value)=>{
    let {productName,color,category,price,_id} = value
    setSproductName(productName);
    setSproductCategory(category);
    setSproductColor(color);
    setSproductPrice(price)
    setEditModalIsOpen(true);
    setPid(_id)
  }

  const closeEditModal = ()=>{
    setEditModalIsOpen(false)
  }

  const handleEditProduct = (e) => {
    e.preventDefault();
    closeEditModal();
  };

  const submitEditProduct = async()=>{
    let values = {SproductCategory,SproductColor,SproductName,SproductPrice,pid};
    let res = await editProduct(values);
    if(res?.status==200){
      getProduct().then((res)=>{
        if(res?.status==200){
          setProducts(res.data?.AllProducts)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  useEffect(()=>{
    getProduct().then((res)=>{
      if(res?.status==200){
        setProducts(res.data?.AllProducts)
      }
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const addNewProduct = async()=>{
    try {
      let productDetails = {productName,color,category,price};
      let res = await addProduct(productDetails);
      if(res?.status==200){
        getProduct().then((res)=>{
          if(res?.status==200){
            setProducts(res.data?.AllProducts)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="bg-[#011a05] to-pink-500 min-h-screen">
        <div className="md:flex w-full">
          <SideBar />
          <div className="p-12 w-full h-auto">
            <button
              type="button"
              className="border text-white hover:text-black px-9 py-2 hover:font-bold transition duration-500 hover:bg-white mb-7 hover:scale-110"
              onClick={openModal}
            >
              Add
            </button>
            <p className="mb-7 text-2xl font-bold text-white">Products</p>

            <div className="relative md:overflow-visible overflow-x-auto shadow-md fade-ef">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-600 font-bold ">
                <thead className="text-xs text-gray-200 uppercase bg-gray-200 dark:text-gray-500">
                  <tr>
                    <th scope="col" className="px-6 py-3">Product Name</th>
                    <th scope="col" className="px-6 py-3">Colour</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Products&&Products.map((each)=>(
                    <tr className="bg-white hover:bg-black dark:border-gray-700 transition duration-500 hover:text-white hover:scale-105">
                    <th className="px-6 py-4">{each.productName}</th>
                    <td className="px-6 py-4">{each.color}</td>
                    <td className="px-6 py-4">{each.category}</td>
                    <td className="px-6 py-4">{each.price}</td>
                    <td className="px-6 py-4">
                      <h2 className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={()=>openEditModal(each)}
                      >Edit</h2>
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50 fade-ef">
          <div className="bg-gradient-to-r from-[#011a05] to-[#65821a] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4 text-white">Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-200">Product Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Color</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Category</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Price</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-200 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#65921a] to-[#011a05] text-white rounded"
                  onClick={()=>addNewProduct()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/*Edit Modal */}
      {editModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50 fade-ef">
          <div className="bg-gradient-to-r from-[#011a05] to-[#65821a] p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4 text-white">Edit Product</h2>
            <form onSubmit={handleEditProduct}>
              <div className="mb-4">
                <label className="block text-gray-200">Product Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SproductName}
                  onChange={(e) => setSproductName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Color</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SproductColor}
                  onChange={(e) => setSproductColor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Category</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SproductCategory}
                  onChange={(e) => setSproductCategory(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Price</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={SproductPrice}
                  onChange={(e) => setSproductPrice(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 px-4 py-2 bg-gray-200 rounded"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#65921a] to-[#011a05] text-white rounded"
                  onClick={()=>submitEditProduct()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
