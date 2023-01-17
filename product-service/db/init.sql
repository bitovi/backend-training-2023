CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create database tax;

\c tax

create table tax_rules
(
  id          UUID primary key,
  name        text not null,
  percentage  decimal not null,
  deleted     boolean not null default false
);

create table event_log
(
  id          SERIAL PRIMARY KEY,
  entity      text not null,
  entity_id   UUID not null,
  version     integer not null,
  data        jsonb not null,
  unique(entity, entity_id, version)
);
