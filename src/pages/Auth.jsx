import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        if (pagina === "signup") {
            if (formData.name.length < 3) {
                errorMessage = "El nombre debe tener al menos 3 caracteres"
            } else if (formData.email.length < 6) {
                errorMessage = "El email. debe tener al menos 6 caracteres"
            } else if (!formData.email.includes("@")) {
                errorMessage = "El email debe incluir el carácter @"
            } else if (formData.password.length < 6) {
                errorMessage = "La contraseña es demasiado corta debe tener al menos 6 caracteres"
            } else if (formData.password !== formData.confirmPassword) {
                errorMessage = "Las contraseñas no coinciden"
            }
        } else if (pagina === "signin") {
            if (formData.email.length < 6) {
                errorMessage = "El email. debe tener al menos 6 caracteres"
            } else if (!formData.email.includes("@")) {
                errorMessage = "El email debe incluir el carácter @"
            } else if (formData.password.length < 6) {
                errorMessage = "La contraseña es demasiado corta debe tener al menos 6 caracteres"
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

                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />

                    {errors && <div>{errors}</div>}

                    <button type="submit">Enviar</button>

                    <button type="button" onClick={handleBack}>Cncelar </button>

                </form>
            }

            {pagina === "signin" &&
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

                    <button type="submit">Iniciar sesion</button>

                    <button type="button" onClick={handleBack}>Volver </button>
                </form>}

        </div>

    )
}