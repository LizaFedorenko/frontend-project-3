import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [is_register, set_is_register] = useState(false);
  const [regist_data, set_regist_data] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [login_data, set_login_data] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3001/register", regist_data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Registration successful!");
      navigate("/forum");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", login_data);
      set_user(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/forum");
    } catch (error) {
      console.error("Помилка при вході:", error.response?.data || error.message);
    }
  };

  const [user, set_user] = useState(null);

  return (
    <div>
      <h3>{is_register ? "Реєстрація" : "Вхід"}</h3>

      {is_register ? (
        <>
          <input class = "login"
            type="text"
            placeholder="Ім'я"
            value={regist_data.username}
            onChange={(e) => set_regist_data({ ...regist_data, username: e.target.value })}
          />
          <input class = "login"
            type="email"
            placeholder="Електронна пошта"
            value={regist_data.email}
            onChange={(e) => set_regist_data({ ...regist_data, email: e.target.value })}
          />
          <input class = "login"
            type="password"
            placeholder="Пароль"
            value={regist_data.password}
            onChange={(e) => set_regist_data({ ...regist_data, password: e.target.value })}
          />
          <button className="back-button" onClick={register}>Зареєструватися</button>
        </>
      ) : (
        <>
          <input class = "login"
            type="email"
            placeholder="Електронна пошта"
            value={login_data.email}
            onChange={(e) => set_login_data({ ...login_data, email: e.target.value })}
          />
          <input class = "login"
            type="password"
            placeholder="Пароль"
            value={login_data.password}
            onChange={(e) => set_login_data({ ...login_data, password: e.target.value })}
          />
          <button className="back-button" onClick={login}>Увійти</button>
        </>
      )}

      <button className="btn-switch" onClick={() => set_is_register(!is_register)}>
        {is_register ? "Вже є акаунт? Увійти" : "Немає акаунту? Реєструйтесь"}
      </button>
    </div>
  );
};

export default Auth;
