export type Bet = {
question: {
        subject: {
            name: string;
            id: number;
        };
    } & {
        id: number;
        gradeId: number;
        text: string;
        set: number;
        subjectId: number;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    set: number;
    userId: string;
    amount: number;
    questionId: number;
}