"use client";
import React, { useState } from "react";

interface SignUpFormProps {
  onSubmit: (values: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = event.target;
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    switch (fieldName) {
      case "username":
        if (value.length < 5) {
          setErrors({
            ...errors,
            username: "Username must be at least 5 characters.",
          });
        } else {
          setErrors({ ...errors, username: "" });
        }
        break;

      case "email":
        if (!regex.test(value)) {
          setErrors({
            ...errors,
            email: "Please enter a valid email address.",
          });
        } else {
          setErrors({ ...errors, email: "" });
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors({
            ...errors,
            password: "Password must be at least 8 characters.",
          });
        } else {
          setErrors({ ...errors, password: "" });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({});
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper" noValidate>
      <h2>Sign Up</h2>
      <div className="username">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            handleValidation(event, "username");
          }}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div className="email">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            handleValidation(event, "email");
          }}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="password">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            handleValidation(event, "password");
          }}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit" className="submit-button">
        Register Me
      </button>
    </form>
  );
};

export default SignUpForm;
