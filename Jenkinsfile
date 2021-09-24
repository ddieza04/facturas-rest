pipeline{

    agent any

    stages{

        stage("Descargar código de la aplicación"){
            steps{
                git "url"
            }
        }

        stage("Creación de imagen"){
            steps{
                bat "docker build -t app1 ."
            }
        }
        stage("Ejecución de contenedor"){
            steps{
               bat "docker run -d --name app1 -p 8080:8080 app1"
            }
        }
        stage("Test del servicio"){
            steps{
               echo ("Probando el servicio")
            }
        }
        stage("Cerrar recursos"){
            steps{
               bat "docker stop app1"
               bat "docker container rm app1"
               bat "docker image rm app1"
            }
        }
    }
}