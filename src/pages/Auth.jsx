import React, { useEffect } from "react";

function Auth() {
  useEffect(() => {
    document.title = "Script2Call | Менеджер скриптов";
  }, []);

  return (
    <div className="wrapper">
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card w-100" style={{ maxWidth: "400px" }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Вход в систему</h3>
            <form method="post">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  aria-describedby="usernameHelp"
                />
                <div id="usernameHelp" className="form-text">
                  Ваше имя пользователя останется конфиденциальным.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Запомнить меня
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
