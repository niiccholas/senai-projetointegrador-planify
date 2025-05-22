CREATE DATABASE db_planify;

USE db_planify

CREATE TABLE tbl_usuario (
    id          INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(60) NOT NULL,
    senha       VARCHAR(30) NOT NULL,
    cpf         VARCHAR(15),
    nome        VARCHAR(45) NOT NULL,
    nickname    VARCHAR(20) NOT NULL,
    numero      VARCHAR(20),
    foto_perfil VARCHAR(200)
);