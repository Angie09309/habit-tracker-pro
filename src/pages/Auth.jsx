import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function validateEmail(email) {

    if (email.length < 6) {
        return {
            message: "El email. debe tener al menos 6 caracteres",
            field: "email"
        }
    }

    if (!email.includes("@")) {
        return {
            message: "El email debe incluir el carácter @",
            field: "email"
        }
    }
    return null
}


function validatePassword(password, confirmPassword) {
    if (password.length < 6) {
        return {
            message: "La contraseña es demasiado corta debe tener al menos 6 caracteres",
            field: "password"
        }
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
        return {
            message: "Las contraseñas no coinciden",
            field: "confirmPassword"
        }
    }
    return null
}

const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export function Auth() {

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const navigate = useNavigate()

    const [pagina, setPagina] = useState("landing")

    const [formData, setFormData] = useState(initialFormData)

    function handleInputChange(event) {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        setFormData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue
        })
        )
    }

    const [errors, setErrors] = useState(null)

    function handleSubmit(event) {
        event.preventDefault()

        let error = null

        error = validateEmail(formData.email);

        if (error && error.field === "email") {
            emailRef.current.focus();
        }

        if (!error) {
            const confirmParam = pagina === "signup" ? formData.confirmPassword : undefined;
            error = validatePassword(formData.password, confirmParam)

            if (error && error.field === "password") {
                passwordRef.current.focus()
            }

            if (error && error.field === "confirmPassword") {
                confirmPasswordRef.current.focus()
            }
        }

        if (!error && pagina === "signup") {
            if (formData.name.length < 3) {
                error = {
                    message: "El nombre debe tener al menos 3 caracteres",
                    field: "name"
                }
                nameRef.current.focus();
            }
        }

        setErrors(error)
        if (error === null) navigate("/dashboard")
    }

    const handleBack = () => {
        setPagina("landing")
        setErrors(null)
        setFormData(initialFormData);
    }

    return (
        <div>
            <button
                onClick={() => {
                    setPagina("signup");
                    setErrors(null);
                }}>
                Crear cuenta
            </button>

            <button
                onClick={() => {
                    setPagina("signin");
                    setErrors(null);
                }}>
                Iniciar sesión
            </button>

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
                        ref={nameRef}
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
                        ref={emailRef}
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
                        ref={passwordRef}
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
                        ref={confirmPasswordRef}
                    />

                    {errors && (<div role="alert" aria-live="assertive">{errors.message}</div>)}

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
                        ref={emailRef}
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
                        ref={passwordRef}
                    />

                    <button type="submit">Iniciar sesion</button>

                    <button type="button" onClick={handleBack}>Volver </button>
                </form>}
        </div>
    )
}