-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todo_group_id" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_type" TEXT NOT NULL DEFAULT 'email';

-- CreateTable
CREATE TABLE "TodoGroup" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "TodoGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todo_group_id_fkey" FOREIGN KEY ("todo_group_id") REFERENCES "TodoGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoGroup" ADD CONSTRAINT "TodoGroup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
