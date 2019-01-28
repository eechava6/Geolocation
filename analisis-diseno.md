# Proyecto 1 - Tópicos especiales en Telemática.


By: Esteban Echavarría - eechava6@eafit.edu.co


# Descripción de aplicación

Aplicación de registro de posición (tracking-gps) en tiempo real (tipo IoT) utilizando *NodeJs conjunto a express* y las mejores prácticas DevOps para integración y entrega continua.


El siguiente proyecto contiene:

* Aplicación del patron MVC a una aplicación Web
* Uso de un framework backend moderno -> NodeJS
* Configuración de ambientes: Desarrollo, Pruebas y Producción.
* Creación del proyecto como una API REST (usa peticiones HTTP tales como :GET, PUT, POST, DELETE para manejar los datos.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Crear Usuario.
2. Ingresar 
3. Guardar ubicación
4. Buscar ubicación

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:
* Middleware de Node:  body-parser(Parser antes de Handlers) , morgan (HTTP request logger), Bcrypt
* Seguridad: JWT (Json Web Token), Bcrypt (Hashing de contraseñas).
* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: no se usa - se utilizará Templates HTML para Vista (V)
* Base de datos: MongoDB
* Web App Server: NodeJS
* Extra: nodemon (Reinicia el servidor automaticamente una vez los archivos cambian) 

-----Web Server: NGINX y Apache Web Server

# 2. Desarrollo

No se generó ninguna base, todo fue creado manualmente.

# 3. Diseño:

## 3.1 Modelo de datos:

User:
{
    username: String,
    password: String,
    email: String
}

Location:
{
    username: String,
    latitude: String,
    longitude: String,
    hour: String,
    date: String
}

## 3.2 Servicios Web

/* Servicio Web: Crea un usuario en la base de datos
  Método: POST
  URI: /users/createUser
*/

/* Servicio Web: Autentica un usuario
  Método: POST
  URI: /users/authenticateUser
*/

/* Servicio Web: Guarda una ubicación con su respectiva hora y fecha
  Método: POST
  URI: /locations/saveLocation
*/

/* Servicio Web: Busca las ubicaciones que ha guardado un usuario 
  Método: GET
  URI: /locations/searchLocation?username=val
*/
