create extension if not exists "uuid-ossp";

create database tax;

\c tax

create table tax
(
  taxid          UUID primary key,
  productid uuid not null,
  amount int not null
);

CREATE UNIQUE INDEX productid_unique ON tax (productid);