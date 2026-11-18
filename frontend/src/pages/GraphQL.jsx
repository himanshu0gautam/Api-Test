import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Chat from './Chat';

const GraphQL = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null
  });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("image", formData.image);

    await axios.post("http://localhost:5000/api/users", data, {
      headers: { "content-Type": "multipart/form-data" }
    });

    fetchUsers();
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>API Testing</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} /> <br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} /> <br />
        <input type="file" name="image" accept="image/*" onChange={handleChange} /> <br />
        <button type="submit">Submit</button>
      </form>

      <h3> Api Testing Data List :</h3>
      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: "15px" }}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.imageUrl} alt="user"  width="120" style={{ borderRadius: "8px" }}/>
        </div>
      ))}
    </div> 

    <Chat />

    </>
  )
}

export default GraphQL