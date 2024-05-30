import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "./usersSlice"; 
import FavoriteIcon from '@mui/icons-material/FavoriteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/PhoneEnabledOutlined';
import WebsiteIcon from '@mui/icons-material/LanguageOutlined';

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [filled, setFilled] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  });
  const [avatarUrl, setAvatarUrl] = useState(
    `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`
  );

  const handleShowModal = () => {
    setShowModal(true);  // For opening the Modal
  };

  const handleClick = () => {
    setFilled((prevFilled) => !prevFilled);
  };

  const handleCloseModal = () => {
    setShowModal(false); // For closing the Modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateUser({ id: user.id, updatedUser }));
    handleCloseModal();
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  useEffect(() => {
    setAvatarUrl(
      `https://api.dicebear.com/8.x/avataaars/svg?seed=${updatedUser.name}`
    );
  }, [updatedUser.name]);

  return (
    // Render the single User Card 
    <div className="col-md-3 d-flex align-items-stretch">
      <div
        className="card mb-4"
        style={{ width: "18rem", border: "1px solid black" }}
      >
        <img
          src={avatarUrl}
          className="card-img-top bg-secondary"
          alt="avatar"
        />
        <div className="card-body">
           <h5 className="card-title">{user.name}</h5>
          <p className="card-text"> <span><EmailIcon/></span> {user.email}</p>
          <p className="card-text"><span><PhoneIcon/></span> {user.phone}</p>
          <p className="card-text"><span><WebsiteIcon/></span> {user.website}</p>

          <div className="row bg-secondary rounded-4" >
            <div className="col-4 d-flex justify-content-center align-items-center">
              <span
                onClick={handleClick}
                style={{ cursor: "pointer", color: filled ? "red" : "black" }}
              >
                <FavoriteIcon />
              </span>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <button className="border-0 bg-secondary" onClick={handleShowModal}>
                <EditIcon/>
              </button>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
             <DeleteIcon onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
 

 {/* Modal Code */}
      {showModal && (
        <div
        className="modal show"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={updatedUser.phone}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    name="website"
                    value={updatedUser.website}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                  >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  {/* Modal Code */}
    </div>
  );
};

export default SingleUser;
