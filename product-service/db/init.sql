create extension if not exists "uuid-ossp";

create database product;

\c product

create table product
(
  id            int primary key,
  name          text not null,
  price         text not null,
  'inStock'       boolean not null

);
