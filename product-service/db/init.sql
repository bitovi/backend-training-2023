create extension if not exists "uuid-ossp";

create database product;

\c product

create table product
(
  id          UUID primary key
);
