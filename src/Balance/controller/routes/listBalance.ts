import { Request, Response } from 'express';
import { prisma } from '../../../../prisma';

export const listBalance = async (
  request: Request<any, any, any, { search: any }>,
  response: Response,
) => {
  const bearerToken = request.headers.authorization?.split(' ')[1];
  const { search } = request.query;

  if (!bearerToken) return response.status(401).send();

  const userData = await prisma.identity.findFirst({
    where: {
      bearer: {
        token: bearerToken as string,
      },
    },
    include: {
      balances: true,
      categories: true,
    },
  });

  if (!userData.id) return response.status(401).send();

  const { categories } = userData;
  const balances = userData.balances.filter(({ deletedAt }) => !deletedAt);

  const balanceWithCategoryData = balances.map((balance) => ({
    balance,
    category: categories.find((category) => category.id === balance.categoryId),
  }));

  const categoryNameFilter = balanceWithCategoryData.filter(({ category }) =>
    category.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase()),
  );

  const filterByCategoryName = categoryNameFilter.length
    ? categoryNameFilter
    : balanceWithCategoryData;

  const filterByBalanceDescription = filterByCategoryName.filter(({ balance }) =>
    balance.description?.toLocaleLowerCase().includes(search?.toLowerCase()),
  );

  const filteredBalanceWithCategory = filterByBalanceDescription.length
    ? filterByBalanceDescription
    : filterByCategoryName;

  const monthsSet: any = new Set([]);
  filteredBalanceWithCategory.forEach(({ balance }) => monthsSet.add(balance.eventDate.getMonth()));
  const balanceList: any[] = [];
  const months = [...monthsSet];

  months.forEach((month: any, monthIndex: any) => {
    filteredBalanceWithCategory.forEach(({ balance, category }) => {
      const balanceData = {
        name: category.name,
        description: balance.description,
        amount: balance.amount,
        balanceId: balance.id,
        balanceType: category.balanceType,
        balanceDay: balance.eventDate,
      };

      if (balance.eventDate.getMonth() !== month) return;

      if (balanceList[monthIndex]) {
        balanceList[monthIndex]?.data.push(balanceData);
        return;
      }

      balanceList.push({
        balanceMonth: balance.eventDate,
        data: [balanceData],
      });
    });
  });

  const balanceListOrdered = balanceList.sort(
    (a, b) => new Date(a.balanceMonth).getMonth() - new Date(b.balanceMonth).getMonth(),
  );

  return response.status(200).send(balanceListOrdered);
};
