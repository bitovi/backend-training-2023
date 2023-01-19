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

CREATE OR REPLACE FUNCTION get_tax(
  pt text
) RETURNS TABLE (
	tax tax
) AS
$BODY$ 
begin
	-- sleep
  -- get the tax
  return query (
    select t.* from tax t, (select pg_sleep(2)) as sleep
    where product_type = pt
  );
END;
$BODY$
LANGUAGE plpgsql;