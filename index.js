const express = require("express");
const cors = require("cors");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;

const app = express();

//Para poder usar CORS
app.use(cors());

//Para que express interprete formato JSON:
app.use(express.json());

const port = 8080;

const connectionString = "mongodb+srv://admin:admin@clustercurso.fzl2d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {

        //Todo el codigo de acceso a base de datos
        console.log("Conectado a la base de datos.");

        const db = client.db("myFirstDatabase");
        let facturas = db.collection('facturas');

        //De forma compacta:
        //let facturas = client.db("myFirstDatabase").collections('facturas');

        // Gestión de facturas

        // Crear factura
        app.post('/facturas', function (request, response) {

            let factura = request.body;

            // Inserta la factura en la base de datos
            facturas.insertOne(factura).then(result => {
                console.log(result);
            }).catch(err => {
                console.error(err)
            });

            response.send("Operación de inserción realizada correctamente");

        });

        // Recuperar todas las facturas
        app.get("/facturas", (request, response) => {

            // recuperar la factura de la base de datos
            facturas.find().toArray().then(facturas => {
                response.json(facturas);
            }).catch(err => {
                console.error(err);
            });
        });

        // Recuperar factura or id
        app.get("/facturas/:facturaId", (request, response) => {

            let facturaId = request.params.facturaId;

            let o_id = new mongo.ObjectId(facturaId);
            let query = { _id: o_id };

            // recuperar la factura de la base de datos
            facturas.findOne(query).then(factura => {
                response.json(factura);
            }).catch(err => {
                console.error(err);
            });
        });


        // Actualizar factura
        app.put('/facturas/:facturaId', function (request, response) {

            // Recuperar el id de la factura
            let facturaId = request.params.facturaId;

            //..

            response.json();
        });

        // Eliminar factura
        app.delete('/facturas/:facturaId', function (request, response) {

            // Recuperar el id de la factura
            let facturaId = request.params.facturaId;

            //..

            response.send('DELETE - request');
        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });


    }).catch(error => console.error(err));