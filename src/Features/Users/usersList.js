// src/features/users/UsersList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';
import SingleUser from './SingleUser';
import Loading from '../../Components/Loading';


const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
      
    }
  }, [userStatus, dispatch]);

  return (
    <div className="container">
      <h2>Users</h2>
      {userStatus === 'loading' ? (
        <Loading/>
      ) : (
        <div className="row">
          {users.map((user) => (
            <SingleUser key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
