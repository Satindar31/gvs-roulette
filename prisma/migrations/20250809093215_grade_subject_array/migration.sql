/*
  Warnings:

  - You are about to drop the column `gradeId` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "dev"."Subject" DROP CONSTRAINT "Subject_gradeId_fkey";

-- AlterTable
ALTER TABLE "dev"."Subject" DROP COLUMN "gradeId";

-- CreateTable
CREATE TABLE "dev"."GradeToSubject" (
    "gradeId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "GradeToSubject_pkey" PRIMARY KEY ("gradeId","subjectId")
);

-- AddForeignKey
ALTER TABLE "dev"."GradeToSubject" ADD CONSTRAINT "GradeToSubject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "dev"."Grade"("grade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dev"."GradeToSubject" ADD CONSTRAINT "GradeToSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "dev"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
