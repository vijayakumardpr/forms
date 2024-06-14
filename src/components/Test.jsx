import axios from "axios";
import { useEffect, useState } from "react";

const personDetails = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  dob: "",
  city: "",
  gender: "",
  terms: false,
};

function Test() {
  const [data, setData] = useState(personDetails);
  const [allData, setAllData] = useState([]);
  const [persons, setPersons] = useState([]);
  async function handleSubmit(e) {
    e.preventDefault();
    // if (personDetails.firstname === "") return;
    console.log("data", data);
    try {
      const formattedDate = data.date
        ? new Date(data.date).toISOString().split("T")[0]
        : "";
      console.log(formattedDate);
      const response = await axios.post("http://localhost:8800/persons", {
        ...data,
        date: formattedDate,
      });
      console.log("Post created", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setAllData([...allData, data]);
    setData(personDetails);
  }

  // console.log(allData);
  function handleChange(e) {
    // console.log(e.target);
    const { name, value, type, checked } = e.target;
    console.log(typeof name);
    const newValue = type === "checkbox" ? checked : value;
    setData({
      ...data,
      [name]: newValue,
    });
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:8800/persons/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8800/persons")
      .then((data) => {
        return data.json();
      })
      .then((res) => setPersons(res));
  }, [data]);

  // console.log(persons);
  return (
    <>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            value={data.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <select value={data.city} name="city" onChange={handleChange}>
            <option value="">Select city</option>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
        </div>
        <div>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={data.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={data.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <div>
          <label>
            Terms & Conditions:
            <input
              type="checkbox"
              name="terms"
              value={data.terms}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {persons.length > 0 && (
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>City</th>
            <th>Gender</th>
            <th>Delete</th>
          </tr>
          {persons?.map((person, index) => {
            // console.log(person);
            return (
              <tr key={index}>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.dob}</td>
                <td>{person.city}</td>
                <td>{person.gender}</td>
                <td>
                  <button
                    className="secondary"
                    onClick={() => handleDelete(person.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </>
  );
}

export default Test;
