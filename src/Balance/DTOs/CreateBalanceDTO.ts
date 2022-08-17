export interface ICreateBalanceDTO {
  amount: number;
  description?: string;
  eventDate?: Date;
  categoryId: string;
}
