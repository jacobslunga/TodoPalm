defmodule TodoPalmServer.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :user_id, :uuid
      add :created_at, :naive_datetime

      # Foreign Key
      foreign_key(:user_id, :users, on_delete: :delete_all)
    end
  end
end
