import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';
import SingleUser from './SingleUser';
import Loading from '../../Components/Loading';


const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);  // Access the state
  const userStatus = useSelector((state) => state.users.status);  // Access the status

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());  // Call fetchUsers depending on the status
      
    }
  }, [userStatus, dispatch]);

  return (
    <div className="container">
      <h2>Users</h2>
      {userStatus === 'loading' ? (     // To show Loading UI until the users are fetched
        <Loading/>
      ) : (                               // Conditional Ternary Operator 
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
