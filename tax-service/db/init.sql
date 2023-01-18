create extension if not exists "uuid-ossp";

create database tax;

\c tax

create table tax
(
  id          UUID primary key
);
