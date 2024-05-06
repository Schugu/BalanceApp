<h1 align='center'>🌟 BalanceApp💰🌟</h1>

> Práctica de HTML, CSS, JavaScript, React, Node.js, Express y MongoDB. ✨

🎯 Objetivo: Desarrollar una aplicación tipo Wallet virtual.

Esta idea de proyecto está basada en un proyecto anterior en el que aprendí a hacer un sistema de usuarios en la base de datos MongoDB y un CRUD. 

Esta aplicación te permite registrarte y acceder con tus credenciales, con validaciones tanto en el frontend como en el backend. Una vez iniciada la sesión, te lleva al dashboard, donde puedes agregar ingresos y registrar gastos. El sistema de ingresos simula la acción de recibir dinero, permitiéndote especificar la cantidad y el título de la transacción. De manera similar, en el sistema de gastos puedes registrar tus egresos, indicando la cantidad y una breve descripción. Ambos sistemas cuentan con validaciones en el frontend y realizan el cálculo correspondiente para mantener actualizado el balance. Es importante destacar que esta aplicación es únicamente con fines prácticos y de aprendizaje, por lo que no es tan específica ni complicada como una aplicación financiera real.


### Instalación y ejecución del back end del proyecto (Node.js y Express) 🛠️💻

Sigue estos pasos para clonar y ejecutar el back end del proyecto localmente:

1. Abre la consola en la ubicación deseada para clonar el repositorio.

2. Clona este repositorio en tu máquina local utilizando Git:

    ```bash
    git clone https://github.com/Schugu/BalanceApp.git
    ```

3. Navega al directorio del proyecto clonado:

    ```bash
    cd BalanceApp
    ```

4. Navega al directorio del back end:

    ```bash
    cd backend
    ```

5. Instala las dependencias del back end utilizando npm o yarn:

    ```bash
    npm install
    # o
    yarn
    ```

6. Inicia el servidor del back end utilizando npm:

    ```bash
    npm run dev // Configurado así en el package.json
    ```

7. Una vez que el servidor del back end esté en funcionamiento, puedes proceder con la instalación y ejecución del front end.

### Instalación y ejecución del front end del proyecto (React) 🛠️💻

Sigue estos pasos para ejecutar el front end del proyecto localmente:

1. Abre otra consola o terminal en la ubicación del proyecto clonado.

2. Navega al directorio del back end:

    ```bash
    cd frontend
    ```

3. Instala las dependencias del front end utilizando npm o yarn:

    ```bash
    npm install
    # o
    yarn
    ```

4. Inicia el servidor de desarrollo del front end utilizando npm:

    ```bash
    npm run dev
    ```

5. Una vez que el servidor de desarrollo del front end esté en funcionamiento, abre tu navegador web y navega a la dirección local para ver el proyecto en acción.

### Personalización y comprensión del proyecto 🎨🧠

Para personalizar y comprender el proyecto, sigue estas instrucciones:

- **Back end**: Si deseas modificar o entender cómo funciona el back end, te recomiendo revisar los archivos y carpetas dentro de `backend`. La lógica de la aplicación se encuentra principalmente en estos archivos.

- **Front end**: Si deseas modificar o entender cómo funciona el front end, te recomiendo revisar los archivos y carpetas dentro de `src`. La lógica de la aplicación se encuentra principalmente en los archivos `App.jsx` y `Main.jsx`, mientras que los componentes individuales se encuentran en la carpeta `src/components`.
