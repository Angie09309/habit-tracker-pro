import { useState } from "react";

export function Auth() {
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

    return (
        <div>
            <button onClick={() => setPagina("signup")}>Crear cuenta</button>
            <button onClick={() => setPagina("signin")}>Iniciar sesion</button>

            {pagina === "landing" && <div>Bienvenido </div>}
            {pagina === "signup" &&
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>}
            {pagina === "signin" && <div>Formulario de inicio de sesion</div>}


        </div>

    )
}