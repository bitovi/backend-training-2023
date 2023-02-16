create extension if not exists "uuid-ossp";

create database product;

\c product

create table product
(
  id            int primary key,
  name          text,
  price   text,
  available_quantity int
);
