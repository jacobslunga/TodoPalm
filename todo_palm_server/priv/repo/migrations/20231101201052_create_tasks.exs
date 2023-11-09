defmodule TodoPalmServer.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :description, :text
      add :due_date, :naive_datetime
      add :category_id, :uuid
      add :user_id, :uuid
      add :status, :string, default: "pending"
      add :created_at, :naive_datetime

      # Foreign Keys
      foreign_key(:user_id, :users, on_delete: :delete_all)
      foreign_key(:category_id, :categories, on_delete: :delete_all)
    end
  end
end
