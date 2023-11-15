# EVALUACION FINAL MODULO 4 ADALAB

 El ejercicio consiste en desarrollar un API que permita insertar,
modificar, listar y eliminar información utilizando Express.js, Node.js y una bases de datos a elegir entre Mongo y MySQL.

## Instrucciones:

1.Selecciona un tema de tu interés para crear una API. Podría ser una API para gestionar una librería, un
sistema de inventario, una aplicación para manejar eventos, etc.

2.Desarrolla una API REST que permita realizar operaciones CRUD sobre una entidad principal del tema
seleccionado.

3.Asegúrate de utilizar Express.js para el servidor, Node.js para el manejo del backend, y MySQL oMongo para la base de datos.

4.Proporciona la documentación básica de cómo un cliente podría consumir el API.

## Objetivos principales:

### Sección 1: Diseño de la Base de Datos
- [X] Crea el esquema de la base de datos para su API, incluyendo tablas, columnas y relaciones. Debes incluir el
código para crear este esquema en tu repositorio.

### Sección 2: Configuración del Servidor
- [X] Escribe el código para configurar un servidor Express.js y conectarse a la base de datos.Implementa las funciones necesarias para el manejo de JSON y para cualquier otra funcionalidad que considere necesaria.

### Sección 3: API RESTful
- [X] Define las rutas para las siguientes operaciones y escriba los endpoints correspondientes:
Insertar una entrada en su entidad principal.
Leer/Listar todas las entradas existentes.
Actualizar una entrada existente.
Eliminar una entrada existente.

## Bonus

Si os sobra tiempo, os proponemos otros endpoints para realizar que no son obligatorios. Consiste en implementar un sistema de autenticación con JWT (JSON Web Tokens) que incluya las funcionalidades de registro y inicio de sesión.

- [X] Crear tabla de usuarios.
  Esta tabla debe tener los siguientes campos:
 * "id": un identificador único para cada usuario (tipo: INT y es clave primaria).
 * "email": el correo electrónico del usuario (tipo: VARCHAR, único).
 * "nombre": el nombre del usuario (tipo: VARCHAR).
 * "password": la contraseña del usuario (tipo: VARCHAR)

- [X] Crear endpoint de registro de usuario (POST /registro): esta ruta debe permitir el registro de un nuevo usuario. El
cuerpo de la solicitud debe incluir el nombre, el correo electrónico y la contraseña del usuario.

- [X] Crear endpoint de login de usuario (POST /login): esta ruta debe permitir que un usuario existente inicie sesión. El
cuerpo de la solicitud debe incluir el correo electrónico y la contraseña del usuario.Verifica las credenciales proporcionadas con los registros de la base de datos. Si son válidas, genera
y devuelve un token JWT para autenticar al usuario.

- [X] Implementa un middleware de autenticación que verifique el token JWT en cada solicitud del API. Si el token es válido, permite que la solicitud continúe; de lo contrario, devuelve un error de
autenticación.

## Otros Bonus

Algunas ideas que os proponemos como ejercicios de repaso para cuando os pongáis a repasar el módulo de programación backend que visten y completan vuestro proyecto:

- [X] Instala alguna librería como dotenv para gestionar la contraseña y datos de acceso a la base de
datos con variables de entorno.

- [X]  Puedes subir el servidor de la API a algún servicio como Render para que esté disponible en Internet: https://api-spells-of-harry-potter.onrender.com/spells

- [ ]  Puedes agregar un carpeta configurada con un servidor de estáticos en el que haya una pequeña
aplicación Frontend que permita cosultar alguno de los endpoint del API.
- [ ]  Puedes instalar y configurar la librería Swagger para generar una página web con la documentación
de los endpoints de vuestra API.


## Author

[![Autor](https://img.shields.io/badge/-%20Ysabel%20Valencia%20-%20pink?logo=github&labelColor=grey&color=rgb(59%2C%202%2C%2061))](https://github.com/ysabelvalencia)

