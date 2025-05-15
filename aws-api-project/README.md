# AWS API Project

Este proyecto es una API que permite crear y gestionar usuarios utilizando AWS Cognito para la autenticación y DynamoDB para el almacenamiento de información del usuario.

## Estructura del Proyecto

```
aws-api-project
├── src
│   ├── controllers
│   │   └── userController.ts       # Controlador para manejar las solicitudes de usuario
│   ├── models
│   │   └── userModel.ts             # Modelo de usuario que define la estructura de los datos
│   ├── routes
│   │   └── userRoutes.ts            # Rutas para las solicitudes relacionadas con los usuarios
│   ├── services
│   │   ├── cognitoService.ts        # Servicio para manejar la integración con AWS Cognito
│   │   └── dynamoDBService.ts       # Servicio para interactuar con DynamoDB
│   ├── app.ts                       # Punto de entrada de la aplicación
│   └── types
│       └── index.ts                 # Definición de tipos e interfaces
├── package.json                      # Configuración de npm y dependencias
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Documentación del proyecto
```

## Requisitos

- Node.js
- TypeScript
- AWS SDK

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd aws-api-project
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las credenciales de AWS en tu entorno.

## Ejecución

Para iniciar la API, ejecuta el siguiente comando:

```
npm start
```

La API estará disponible en `http://localhost:3000`.

## Endpoints

- `POST /users` - Crear un nuevo usuario
- `GET /users/:id` - Obtener información de un usuario

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.