defmodule TodoPalmServer.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :username, :string
      add :name, :string
      add :email, :string, unique: true
      add :password, :string, comment: "Hashed password for security"
      add :created_at, :utc_datetime
      add :auth_type, :string

      timestamps()
    end

    unique_index(:users, [:email])
  end
end
