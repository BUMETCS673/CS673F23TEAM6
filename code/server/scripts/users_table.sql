create table
  public.users (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    email character varying not null,
    password character varying null,
    last_login timestamp with time zone null,
    constraint users_pkey primary key (id, email)
  ) tablespace pg_default;