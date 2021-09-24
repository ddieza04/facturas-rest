pipeline{

    agent any

    stages{

        stage("Descargar codigo de la aplicacion"){
            steps{
                git "https://github.com/ddieza04/facturas-rest.git"
            }
        }

        stage("Creacion de imagen"){
            steps{
                script {
                    if(isUnix()){
                        sh "docker build -t facturas-node-16 ."
                    }else{
                        bat "docker build -t facturas-node-16 ."
                    }
                }
            }
        }
        stage("Ejecucion de contenedor"){
            steps{
                script {
                    if(isUnix()){
                        sh "docker run -d --name app-facturas-node -p 8081:8080 facturas-node-16"
                    }else{
                        bat "docker run -d --name app-facturas-node -p 8081:8080 facturas-node-16"
                    }
                }
            }
        }
        stage("Test del servicio"){
            steps{
               echo ("Probando el servicio")
            }
        }
        stage("Cerrar recursos"){
            steps{
                script {
                    if(isUnix()){
                        sh "docker stop app-facturas-node"
                        sh "docker container rm app-facturas-node"
                        sh "docker image rm facturas-node-16"
                    }else{
                        bat "docker stop app-facturas-node"
                        bat "docker container rm app-facturas-node"
                        bat "docker image rm facturas-node-16"
                    }
                }
               
            }
        }
    }
}