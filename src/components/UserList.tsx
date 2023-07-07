import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, RootState } from '../redux/types';
import './UserList.css';

const UserList: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const userList = useSelector((state: RootState) => state.user.userList);

    useEffect(() => {
        return (localStorage.removeItem('userList'));
    }, [])

    if (!userList || userList.length === 0) {
        return <p>No users found.</p>;
    }

    const filteredUserList = userList.filter((user: User) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
    );



    return (
        <div>
            <input
                className="search-input"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search by name"
            />

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>City</th>
                        <th>Pincode</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserList.map((user: User) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.city}</td>
                            <td>{user.pincode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;