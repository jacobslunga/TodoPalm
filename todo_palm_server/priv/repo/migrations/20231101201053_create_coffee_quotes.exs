defmodule TodoPalmServer.Repo.Migrations.CreateCoffeeQuotes do
  use Ecto.Migration

  def change do
    create table(:coffee_quotes, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :quote, :text
      add :author, :string
      add :created_at, :naive_datetime
    end
  end
end
