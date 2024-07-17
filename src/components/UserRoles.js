"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

// const apiEndpoint = "https://ca70dc4225eb462e89bc.free.beeceptor.com/api/users/";
const apiEndpoint = "https://caaa61dca8e3b5dc705c.free.beeceptor.com/api/users/"

const UserRolesTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUser, setSelectedUser] = useState({ email: '', name: '', role: '', password: '' });
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);


  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user || { email: '', name: '', role: '', password: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser({ email: '', name: '', role: '', password: '' });
  };

  const handleUserAction = async () => {
    try {
      if (modalType === 'remove') {
        await axios.delete(`${apiEndpoint}${selectedUser.id}`);
        setUsers(users.filter(user => user.id !== selectedUser.id));
      } else if (modalType === 'edit') {
        const updatedUser = { ...selectedUser };
        await axios.put(`${apiEndpoint}${selectedUser.id}`, updatedUser);
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
      } else if (modalType === 'add') {
        const newUser = { ...selectedUser };
        const response = await axios.post(apiEndpoint, newUser);
        setUsers([...users, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error(`Error during ${modalType} user action:`, error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className='flex flex-row gap-3'>
        <input
          type="text"
          placeholder="Search here..."
          className="p-2 border rounded-md"
        />
        <button className="p-2 ml-2 border rounded-md flex flex-row items-center justify-center">
          <Image src="/filter.svg" alt="Filter" width={20} height={20} />
          <p>Filter</p>
        </button>
        </div>
        <button className="p-2 ml-4 bg-blue-500 text-white rounded-md flex flex-row gap-3 items-center justify-center" onClick={() => openModal('add')}>
            <Image src={"/newUser.svg"} alt='newUser' width={15} height={5} />
           <p>
            New User
            </p> 
            </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email Address</th>
            <th className="p-2 border-b">Role</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <span className={`p-1 rounded ${user.role === 'Administrator' ? 'bg-blue-100 text-blue-700' : user.role === 'Sales Manager' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {user.role}
                </span>
              </td>
              <td className="p-2">
                <button className="text-blue-500" onClick={() => openModal('edit', user)}>Edit</button> | <button className="text-red-500" onClick={() => openModal('remove', user)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
          {modalType === "remove" && (
              <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                  <div className="bg-white p-6 rounded-md shadow-lg w-[550px] h-226px]">
                    <h2 className="text-xl text-center font-semibold mb-4">
                      Delete this User
                    </h2>
                    <p>
                      This user and all associated data will be permanently
                      removed. Do you wish to remove {selectedUser?.name}?
                    </p>
                    <div className="flex justify-center mt-4">
                      <button
                        className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                        onClick={closeModal}
                      >
                        Cancel action
                      </button>
                      <button
                        className="px-4 py-2 bg-red-200 outline outline-red-400 flex flex-row gap-3 items-center justify-center text-red-400 font-bold rounded-md"
                        onClick={handleUserAction}
                      >
                        <Image
                          src={"/delete.svg"}
                          alt="delete"
                          width={10}
                          height={5}
                        />
                        <p>Yes, Delete</p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {modalType === 'edit' && (
              <>
              <h2 className='cursor-pointer text-end' onClick={closeModal}>x</h2>
              <div className="flex items-center justify-center mb-4">
                  <Image src="/user.svg" alt="User" width={40} height={40} />
                </div>
                <h2 className="text-xl text-center font-semibold mb-4">Edit User</h2>
                <input
                  type="email"
                  value={selectedUser?.email || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                />
                <input
                  type="text"
                  value={selectedUser?.name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                />
                <select
                  value={selectedUser?.role || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                >
                  <option value="">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Sales Representative">Sales Representative</option>
                </select>
                <div className='flex flex-row justify-between items-center'>
                <input
                  type={type}
                  placeholder="Create a Password for New User"
                  value={selectedUser?.password || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                  className="p-2 border rounded-md w-full mb-4"
                />
                <span class="flex justify-around items-center" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span>
                </div>
              </>
            )}
            {modalType === 'add' && (
              <>
              <h2 className='cursor-pointer text-end' onClick={closeModal}>x</h2>
                <div className="flex items-center justify-center mb-4">
                  <Image src="/user.svg" alt="User" width={40} height={40} />
                </div>
                
                <h2 className="text-xl font-semibold mb-4 text-center">New User</h2>
                <input
                  type="email"
                  placeholder="New User's Email Address"
                  value={selectedUser?.email || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="New User's Full Name"
                  value={selectedUser?.name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                />
                <select
                  value={selectedUser?.role || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  className="p-2 border rounded-md w-full mb-2"
                >
                  <option value="">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Sales Representative">Sales Representative</option>
                </select>
                <div className='flex flex-row justify-between items-center'>
                <input
                  type={type}
                  placeholder="Create a Password for New User"
                  value={selectedUser?.password || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                  className="p-2 border rounded-md w-full mb-4"
                />
                <span class="flex justify-around items-center" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span>
                </div>
                
                
              </>
            )}
            <div className="flex justify-center mt-4">
              {/* <button className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={closeModal}>Cancel</button> */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleUserAction}>
                {modalType === 'remove' ? 'Remove' : modalType === 'edit' ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRolesTable;
