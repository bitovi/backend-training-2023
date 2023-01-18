create extension if not exists "uuid-ossp";

create database cart;

\c cart

create table cart
(
  cartId          UUID primary key,
  products JSON
);
