import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import style from "./Style.module.css";
import { server } from "../../App";

const Signup = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${server}api/user/signup`,
        formData
      );

      const { token, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/dashboard-page");
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(
        "Signup error:",
        error.response.data.error || "Internal Server Error"
      );
    }
  };

  return (
    <div className={style.main}>
      <form onSubmit={handleSubmit}>
        <label className={style.label}>
          Name
          <input
            className={style.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className={style.label}>
          Email
          <input
            className={style.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className={style.label}>
          Password
          <input
            className={style.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={style.label}>
          Confirm Password
          <input
            className={style.input}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className={style.signup_btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
