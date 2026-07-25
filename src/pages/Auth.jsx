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
        <div className="flex flex-col md:flex-row min-h-screen p-6 md:p-0">
            <div className={pagina !== "landing" ? "hidden md:block" : "block"}>
                <div className="md:w-1/2 md:p-16 flex flex-col justify-center">
                    <p>Habit Tracker</p>
                    <h1 className="text-5xl font-bold">Diseña tu día con la disciplina de una rutina precisa.</h1>
                    <p>Habit Tracker combina hábitos, estados de ánimo y notas contextuales en un solo espacio oscuro y profesional. Observa tu progreso sin distracción</p>
                    <div className="grid grid-cols-2 gap-6 ">
                        <div className="border-2 border-border rounded-lg p-5" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>
                            <h2>Hábitos con subtareas</h2>
                            <p>Desglosa cada hábito en pasos concretos y observa la barra de cumplimiento del día.</p>
                        </div>

                        <div className="border-2 border-border rounded-lg p-5" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>
                            <h2>Estado de ánimo multi-registro</h2>
                            <p>Anota cómo te sientes tantas veces como quieras. Cada emoción con hora, lugar y color.</p>
                        </div>

                        <div className="border-2 border-border rounded-lg p-5" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-chart-line-icon lucide-file-chart-line"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="m16 13-3.5 3.5-2-2L8 17" /></svg>
                            <h2>Notas y analíticas</h2>
                            <p>Escribe reflexiones detalladas y consulta gráficas mensuales de cumplimiento y ánimo.</p>
                        </div>

                        <div className="border-2 border-border rounded-lg p-5" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-heart-icon lucide-calendar-heart"><path d="M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125" /><path d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" /><path d="M16 2v4" /><path d="M3 10h18" /><path d="M8 2v4" /></svg>
                            <h2>Calendario emocional</h2>
                            <p>Cada día muestra la mezcla de tus emociones. Toca uno para ver el detalle completo.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={pagina !== "landing" ? "block" : "hidden md:block"} >
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

        </div>
    )
}