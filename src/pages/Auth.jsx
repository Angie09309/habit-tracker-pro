import { useState } from "react";
import { useNavigate } from "react-router-dom";

function validateEmail(email) {
    if (email.length < 6) {
        return "El email. debe tener al menos 6 caracteres"
    }

    if (!email.includes("@")) {
        return "El email debe incluir el carácter @"
    }
    return ""
}


function validatePassword(password, confirmPassword) {
    if (password.length < 6) {
        return "La contraseña es demasiado corta debe tener al menos 6 caracteres"
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
        return "Las contraseñas no coinciden"
    }
    return ""
}

export function Auth() {
    const navigate = useNavigate()

    const [pagina, setPagina] = useState("landing")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleInputChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        setFormData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue
        })
        )
    }

    const [errors, setErrors] = useState("")

    function handleSubmit(event) {
        event.preventDefault()

        let errorMessage = ""

        errorMessage = validateEmail(formData.email);

        if (errorMessage === "") { errorMessage = validatePassword(formData.password, formData.confirmPassword) }

        if (errorMessage === "" && pagina === "signup") {
            if (formData.name.length < 3) {
                errorMessage = "El nombre debe tener al menos 3 caracteres";
            }
        }

        setErrors(errorMessage)

        if (errorMessage === "") navigate("/dashboard")
    }

    const initialFormData = {
        name: "", email: "", password: "", confirmPassword: ""
    }

    const handleBack = () => {
        setPagina("landing")
        setErrors("")
        setFormData(initialFormData);
    }

    return (
        <div>

            <button onClick={() => setPagina("signup")}>Crear cuenta</button>
            <button onClick={() => setPagina("signin")}>Iniciar sesion</button>

            {pagina === "landing" && <div>Bienvenido </div>}

            {pagina === "signup" &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre completo: </label>
                    <input
                        id="name"
                        name="name"
                        placeholder=" Ej. Ana García"
                        aria-label="Nombre completo"
                        type="text" value={formData.name}
                        onChange={handleInputChange}
                        autoComplete="name"
                        aria-invalid={!!errors}
                        required
                    />

                    <label htmlFor="email">Correo electrónico: </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        aria-label="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        aria-invalid={!!errors}
                        required
                    />

                    <label htmlFor="password">Contraseña: </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres y una @"
                        aria-label="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                        aria-invalid={!!errors}
                        required
                    />

                    <label htmlFor="confirmPassword">confirme la contraseña </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Mínimo 6 caracteres y una @"
                        aria-label="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                        aria-invalid={!!errors}
                        required
                    />

                    {errors && <div role="alert" aria-live="assertive">{errors}</div>}

                    <button type="submit">Enviar</button>

                    <button type="button" onClick={handleBack}>Cancelar </button>

                </form>
            }

            {pagina === "signin" &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor="signin-email">Correo electrónico: </label>
                    <input
                        id="signin-email"
                        name="email" type="email"
                        placeholder="tu@correo.com"
                        aria-label="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        aria-invalid={!!errors}
                        required
                    />

                    <label htmlFor="signin-password">Contraseña: </label>
                    <input
                        id="signin-password"
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres y una @"
                        aria-label="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        aria-invalid={!!errors}
                        required
                    />

                    <button type="submit">Iniciar sesion</button>

                    <button type="button" onClick={handleBack}>Volver </button>
                </form>}
        </div>
    )
}