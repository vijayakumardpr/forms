/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiViewList, CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

function Header({ columns }) {
  return (
    <thead>
      <tr>
        {columns?.map((column) => {
          return <th key={column}>{column.toUpperCase()}</th>;
        })}
      </tr>
    </thead>
  );
}

function Content({ entries, columns, handleDeleteClick }) {
  return (
    <tbody>
      {entries.map((entry) => {
        return (
          <tr key={entry.id}>
            {columns.map((column) => {
              return (
                <td key={column}>
                  {column === "view" ? (
                    <Link to={`/view/${entry.id}`}>
                      <CiViewList className="icons view" />
                    </Link>
                  ) : column === "edit" ? (
                    <Link to={`/edit/${entry.id}`}>
                      <CiEdit className="icons edit" />
                    </Link>
                  ) : column === "delete" ? (
                    <MdOutlineDelete
                      className="icons delete"
                      onClick={() => handleDeleteClick(entry.id)}
                    />
                  ) : (
                    entry[column]
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function Modal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const columns = [
    "firstname",
    "lastname",
    "dob",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
    "gender",
    "view",
    "edit",
    "delete",
  ];

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function getUsers() {
    try {
      const response = await axios.get(`http://localhost:8800/users`);
      // const formattedDate = response.data.dob.split("T")[0];
      const updatedData = response.data?.map((data) => {
        return { ...data, dob: data.dob.split("T")[0] };
      });

      setUsers(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  async function handleDeleteConfirm() {
    try {
      await axios.delete(`http://localhost:8800/users/${deleteId}`);
      window.location.reload();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2>{`List of Employee's`}</h2>
      <div className="main">
        <div className="row">
          <input
            type="text"
            placeholder="Search by Firstname"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/create">
            <button className="btn primary">+ Create</button>
          </Link>
        </div>
        {users.length === 0 ? (
          <h2 style={{textAlign:"center"}}>No Records Found</h2>
        ) : (
          <table>
            <Header columns={columns} />
            <Content
              entries={filteredUsers}
              columns={columns}
              handleDeleteClick={handleDeleteClick}
            />
          </table>
        )}
        <Modal
          show={showModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  );
}

export default Home;
