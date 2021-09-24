pipeline{

    agent any

    stages{

        stage("Descargar código de la aplicación"){
            steps{
                git "https://github.com/ddieza04/facturas-rest.git"
            }
        }

        stage("Creación de imagen"){
            steps{
                bat "docker build -t facturas-node-16 ."
            }
        }
        stage("Ejecución de contenedor"){
            steps{
               bat "docker run -d --name app-facturas-node -p 8081:8080 facturas-node-16"
            }
        }
        stage("Test del servicio"){
            steps{
               echo ("Probando el servicio")
            }
        }
        stage("Cerrar recursos"){
            steps{
               bat "docker stop app-facturas-node"
               bat "docker container rm app-facturas-node"
               bat "docker image rm facturas-node-16"
            }
        }
    }
}