import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import SideBar from '../../Components/SideBar/SideBar';
function AddLearningProgress() {
  const [formData, setFormData] = useState({
    skillTitle: '',
    description: '',
    field: '',
    startDate: '',
    endDate: '',
    level: '',
    postOwnerID: '',
    postOwnerName: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      setFormData((prevData) => ({ ...prevData, postOwnerID: userId }));
      fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.fullname) {
            setFormData((prevData) => ({ ...prevData, postOwnerName: data.fullname }));
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
//resolve error in handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/learningProgress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Learning Progress added successfully!');
        window.location.href = '/allLearningProgress';
      } else {
        alert('Failed to add Learning Progress.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
//re admit user form
  return (
    <div>
      <div className='continer'>
        <div> <SideBar /></div>
        <div className='continSection'>
          <div className="from_continer">
            <p className="Auth_heading">Add Learning Progress</p>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setFormData({
                  skillTitle: '',
                  description: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                  level: '',
                  postOwnerID: formData.postOwnerID,
                  postOwnerName: formData.postOwnerName,
                });
              }}
              className='from_data'
            >
              <div className="Auth_formGroup">
                <label className="Auth_label">Title</label>
                <input
                  className="Auth_input"
                  name="skillTitle"
                  placeholder="Skill Title"
                  value={formData.skillTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Description</label>
                <textarea
                  className="Auth_input"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Field</label>
                <select
                  className="Auth_input"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Field</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Programming Language">Programming Language</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Start Date</label>
                <input
                  className="Auth_input"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">End Date</label>
                {/*Add Validation on date settings */}
                <input
                  className="Auth_input"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (new Date(value) < new Date(formData.startDate)) {
                      alert("End date cannot be earlier than start date.");
                      return;
                    }
                    handleChange(e);
                  }}
                  required
                />
                {/*Add Validation on percentage section */}
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Level</label>
                <input
                  type='number'
                  className="Auth_input"
                  name="level"
                  placeholder="Level"
                  value={formData.level}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (value < 0 || value > 100) {
                      alert("Level must be between 0 and 100.");
                      return;
                    }
                    handleChange(e);
                  }}
                  required
                />
              </div>
              <button type="submit" className="Auth_button">Add</button>
            </form >
          </div >
        </div >
      </div >
    </div >
  );
}

export default AddLearningProgress;
