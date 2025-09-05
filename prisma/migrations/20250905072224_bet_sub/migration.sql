-- AlterTable
ALTER TABLE "public"."Bet" ADD COLUMN     "subjectId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Bet" ADD CONSTRAINT "Bet_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
