require("dotenv").config();
const mongoose = require("mongoose");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { searchQuestions } = require("./src/services/questionService");

const PROTO_PATH = path.join(__dirname, "./proto/question.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const questionProto =
    grpc.loadPackageDefinition(packageDefinition).QuestionService;

const server = new grpc.Server();

server.addService(questionProto.service, {
    SearchQuestions: searchQuestions,
});
const PORT = process.env.GRPC_PORT || "50051";
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.bindAsync(
            `0.0.0.0:${PORT}`,
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.error("Failed to start gRPC server", err);
                    return;
                }
                console.log(`gRPC server running at http://localhost:${port}`);
            }
        );
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
