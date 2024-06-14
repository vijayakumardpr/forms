import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
// import { MdArrowBackIosNew } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/view/${id}`);
      const employeeData = response.data[0];
      // Set the form values
      const formattedDate = employeeData.dob.split("T")[0];

      for (const [key, value] of Object.entries(employeeData)) {
        setValue(key, key === "dob" ? formattedDate : value);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  function onSubmit(data) {
    try {
      if (id) {
        handleUpdate(data);
      } else {
        handlePost(data);
      }
      reset();
      window.location.assign("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleReset() {
    reset();
    clearErrors();
  }

  async function handlePost(data) {
    try {
      const response = await axios.post("http://localhost:8800/employee", data);
      console.log("Post created", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  async function handleUpdate(data) {
    await axios.put(`http://localhost:8800/update/${id}`, data);
    console.log("Employee updated successfully");
  }

  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18 || "You must be at least 18 years old";
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Link to={"/"}>
          <IoArrowBack className="icons back" />
        </Link>
        <h2>Employee Registration Form</h2>
        <div className="row">
          <div className="row1">
            <div className="col">
              <label htmlFor="firstname">First Name</label>
              <input
                // style={{ backgroundColor: errors?.firstname ? "red" : "" }}
                className={errors?.firstname ? "error" : ""}
                type="text"
                {...register("firstname", {
                  required: "*Firstname is required",
                  pattern: {
                    value: /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
                    message: "Name should contain only characters",
                  },
                })}
              />
              {errors.firstname && (
                <p className="red">{errors?.firstname.message}</p>
              )}
            </div>
            <div className="col">
              <label htmlFor="lastname">Last Name</label>
              <input
                className={errors?.lastname ? "error" : ""}
                type="text"
                {...register("lastname", {
                  required: "*Lastname is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Name should contain only characters",
                  },
                })}
              />
              {errors?.lastname && (
                <p className="red">{errors?.lastname?.message}</p>
              )}
            </div>
          </div>
          <div className="col">
            <label htmlFor="dob">Date of Birth</label>
            <input
              className={errors?.dob ? "error" : ""}
              type="date"
              {...register("dob", {
                required: "*Date of birth is required",
                validate: validateAge,
              })}
            />
            {errors?.dob && <p className="red">{errors?.dob?.message}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              className={errors?.email ? "error" : ""}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Entered value does not match email format",
                },
              })}
            />
            {errors?.email && <p className="red">{errors?.email?.message}</p>}
          </div>
          <div className="col">
            <label htmlFor="phone">Phone Number</label>
            <input
              className={errors?.phone ? "error" : ""}
              type="number"
              {...register("phone", {
                required: "*  Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must contain only numbers",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number cannot exceed 10 digits",
                },
              })}
            />
            {errors?.phone && <p className="red">{errors?.phone?.message}</p>}
          </div>
        </div>
        <div className="col">
          <label htmlFor="address">Address</label>
          <input
            className={errors?.address ? "error" : ""}
            type="text"
            {...register("address", {
              required: "*Address is required",
            })}
          />
          {errors.address && <p className="red">{errors?.address?.message}</p>}
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="city">City</label>
            <select
              className={errors?.city ? "error" : ""}
              {...register("city", {
                required: "*City is required",
              })}
            >
              <option value="">Select City</option>
              <option value="chennai">Chennai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
            {errors.city && <p className="red">{errors?.city?.message}</p>}
          </div>
          <div className="col">
            <label htmlFor="state">State</label>
            <select
              className={errors?.state ? "error" : ""}
              {...register("state", {
                required: "*State is required",
              })}
            >
              <option value="">Select State</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="karnataka">Karnataka</option>
              <option value="andrapradesh">Andra Pradesh</option>
            </select>
            {errors.state && <p className="red">{errors?.state?.message}</p>}
          </div>
        </div>
        <div className="col">
          <label htmlFor="pincode">Pincode</label>
          <input
            className={errors?.pincode ? "error" : ""}
            type="number"
            {...register("pincode", {
              required: "*Pincode is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Pincode must contain only numbers",
              },
              maxLength: {
                value: 6,
                message: "Pincode cannot exceed 6 digits",
              },
            })}
          />
          {errors.pincode && <p className="red">{errors?.pincode?.message}</p>}
        </div>
        <div className="col">
          Gender
          <div className="row">
            <label className="radio-group">
              <input
                className={errors?.gender ? "error" : ""}
                type="radio"
                {...register("gender", {
                  required: "*Gender is required",
                })}
                value="male"
              />
              Male
            </label>
            <label className="radio-group">
              <input
                className={errors?.gender ? "error" : ""}
                type="radio"
                {...register("gender", {
                  required: "*Gender is required",
                })}
                value="female"
              />
              Female
            </label>
          </div>
          {errors.gender && <p className="red">{errors?.gender?.message}</p>}
        </div>
        <div className="radio-group">
          <label htmlFor="terms">Terms & Condition</label>
          <input
            className={errors?.terms ? "error" : ""}
            type="checkbox"
            {...register("terms", {
              required: "You must accept the terms and conditions",
            })}
          />
        </div>
        {errors.terms && <p className="red">{errors?.terms?.message}</p>}
        <div className="row justify-center">
          <button className="btn primary">{id ? "Update" : "Submit"}</button>
          {!id && (
            <button className="btn secondary" onClick={() => handleReset()}>
              Reset
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default Create;
