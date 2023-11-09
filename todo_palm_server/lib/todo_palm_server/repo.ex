defmodule TodoPalmServer.Repo do
  use Ecto.Repo,
    otp_app: :todo_palm_server,
    adapter: Ecto.Adapters.MyXQL
end
