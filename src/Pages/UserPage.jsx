import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { addUser,getUser,editUser } from "../api/myApi";

const UserPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [userName, setuserName] = useState('');
  const [age, setAge] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [users,setUsers] = useState([]);

  const [SuserName,setSuserName] = useState('');
  const [SuserAge,setSuserAge] = useState('');
  const [SuserEmail,setSuserEmail] = useState('');
  const [SuserPhone,setSuserPhone] = useState(0);
  const [userId,setuserId] = useState(null);

  const openEditModal = (value)=>{
    let {name,age,email,phone,_id} = value
    setSuserName(name);
    setSuserAge(age);
    setSuserEmail(email);
    setSuserPhone(phone)
    setEditModalIsOpen(true);
    setuserId(_id)
  }

  const closeEditModal = ()=>{
    setEditModalIsOpen(false)
  }

  const handleEdituser = (e) => {
    e.preventDefault();
    closeEditModal();
  };

  const submitEditUser = async()=>{
    let values = {SuserName,SuserAge,SuserEmail,SuserPhone,userId};
    let res = await editUser(values);
    if(res?.status==200){
      getUser().then((res)=>{
        if(res?.status==200){
          setUsers(res.data?.users)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  useEffect(()=>{
    getUser().then((res)=>{
      setUsers(res?.data?.users)
    }).catch((err)=>{
      console.log('facing some issue',err)
    })
  },[])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAdduser = (e) => {
    e.preventDefault();
    closeModal();
  };

  const AddNewUser = async()=>{
    try {
      let userData = {userName,age,email,phone};
    const res = await addUser(userData);
    if(res?.status==200){
      getUser().then((res)=>{
        setUsers(res?.data?.users)
      }).catch((err)=>{
        console.log('facing some issue',err)
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
            <p className="mb-7 text-2xl font-bold text-white">Users</p>

            <div className="relative  overflow-hide shadow-md fade-ef pointer">
              <table className="w-full text-sm text-left rtl:text-right text-gray-50 dark:text-gray-600 font-bold">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:text-gray-500">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Name</th>
                    <th scope="col" className="px-6 py-3">Age</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Phone</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users&&
                  users.map((user)=>(

                    <tr className="bg-white hover:bg-black dark:border-gray-700 transition duration-500 hover:text-white hover:scale-105">
                    <th className="px-6 py-4">{user.name}</th>
                    <td className="px-6 py-4">{user.age}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">
                    <h2 className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={()=>openEditModal(user)}
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
            <h2 className="text-2xl text-white mb-4">Add New User</h2>
            <form onSubmit={handleAdduser}>
              <div className="mb-4">
                <label className="block text-gray-50">Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-50">Age</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-50">Email</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-50">Phone</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
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
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={()=>AddNewUser()}
                >
                  Add user
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
            <h2 className="text-2xl mb-4 text-white">Edit user</h2>
            <form onSubmit={handleEdituser}>
              <div className="mb-4">
                <label className="block text-gray-200">Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SuserName}
                  onChange={(e) => setSuserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Age</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SuserAge}
                  onChange={(e) => setSuserAge(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Email</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  value={SuserEmail}
                  onChange={(e) => setSuserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-200">Phone</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                  value={SuserPhone}
                  onChange={(e) => setSuserPhone(e.target.value)}
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
                  onClick={()=>submitEditUser()}
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

export default UserPage;
