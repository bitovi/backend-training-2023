create extension if not exists "uuid-ossp";

create database tax;

\c tax

create table tax
(
  taxid          UUID primary key DEFAULT gen_random_uuid(),
  product_type text not null,
  percentage float not null
);

CREATE UNIQUE INDEX product_type_unique ON tax (product_type);