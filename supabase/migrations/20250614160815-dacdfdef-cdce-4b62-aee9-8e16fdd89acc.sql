
-- Create a table to store app settings (like the logo url)
create table public.settings (
  id serial primary key,
  key text not null unique,
  value text,
  created_at timestamp with time zone default now()
);

-- Enable row level security (RLS) on the settings table
alter table public.settings enable row level security;

-- Allow everyone to SELECT settings (do not do this for sensitive values)
create policy "Allow public select on settings"
  on public.settings
  for select
  using (true);

-- Allow admins to insert/update/delete settings (optional, not required for just reading)
