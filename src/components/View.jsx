import { Link, useParams } from "react-router-dom";
// import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

function View() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(`http://localhost:8800/users/${id}`);
      setUser(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  if (user === null) return <h2>Loading</h2>;

  return (
    <>
      <section>
        <div>
          <Link to="/">
            <IoArrowBack className="icons back" />
            {/* <button className="btn">&#8592; Back</button> */}
          </Link>
          <div className="section-header">User Details</div>
        </div>
        <div className="info-row">
          <div className="info-label">First Name</div>
          <div className="info-value">{user.firstname}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Last Name</div>
          <div className="info-value">{user.lastname}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Date Of Birth</div>
          <div className="info-value">{user.dob}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Email Id</div>
          <div className="info-value">{user.email}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Phone Number</div>
          <div className="info-value">{user.phone}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Address</div>
          <div className="info-value">{user.address}</div>
        </div>
        <div className="info-row">
          <div className="info-label">City</div>
          <div className="info-value">{user.city}</div>
        </div>
        <div className="info-row">
          <div className="info-label">State</div>
          <div className="info-value">{user.state}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Pincode</div>
          <div className="info-value">{user.pincode}</div>
        </div>
      </section>
    </>
  );
}

export default View;
