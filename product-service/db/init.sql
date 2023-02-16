create extension if not exists "uuid-ossp";

create database product;

\c product

create table product
(
  id            int primary key,
  name          text,
  price         text,
  quantity      int CHECK (quantity >= 0)
);
