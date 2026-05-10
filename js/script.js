const API_URL = "https://dummyjson.com/auth/login";

const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");
const togglePassword = document.getElementById("togglePassword");


//Ocultar/mostrar contraseña
togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "Ocultar" : "Ver";
  togglePassword.setAttribute(
    "aria-label",
    isPassword ? "Ocultar contraseña" : "Mostrar contraseña"
  );
});

[usernameInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => clearFieldError(input));
});

function clearFieldError(input) {
  input.classList.remove("input-invalid");
  const errorEl =
    input.id === "username" ? usernameError : passwordError;
  errorEl.classList.remove("visible");
  errorEl.textContent = "";
}

function showFieldError(input, message) {
  input.classList.add("input-invalid");
  const errorEl =
    input.id === "username" ? usernameError : passwordError;
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function showFormMessage(type, message) {
  formMessage.innerHTML = "";
  if (!message) return;
  const div = document.createElement("div");
  div.className = type === "error" ? "alert-error" : "alert-success";
  div.textContent = message;
  formMessage.appendChild(div);
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle("is-loading", isLoading);
  submitBtn.querySelector(".btn-label").textContent = isLoading
    ? "Verificando..."
    : "Iniciar sesión";
}

function validate(username, password) {
  let valid = true;

  if (!username) {
    showFieldError(usernameInput, "El usuario es obligatorio");
    valid = false;
  } else if (username.length < 3) {
    showFieldError(usernameInput, "Mínimo 3 caracteres");
    valid = false;
  }

  if (!password) {
    showFieldError(passwordInput, "La contraseña es obligatoria");
    valid = false;
  } else if (password.length < 4) {
    showFieldError(passwordInput, "Mínimo 4 caracteres");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showFormMessage(null, "");

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!validate(username, password)) return;

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Credenciales inválidas");
    }

    sessionStorage.setItem("authToken", data.accessToken || data.token || "");
    sessionStorage.setItem("authUser", JSON.stringify(data));

    showFormMessage(
      "success",
      `¡Bienvenido, ${data.firstName || data.username}! Redirigiendo...`
    );

    setTimeout(() => {
      window.location.href = "landing.html";
    }, 800);
  } catch (error) {
    showFormMessage("error", error.message || "Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
});

