create extension if not exists "uuid-ossp";

create database product;

\c product

create table product
(
  "productId" UUID primary key DEFAULT gen_random_uuid(),
  name text not null,
  price int not null
);
