/*
  Warnings:

  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "grade" INTEGER NOT NULL;
