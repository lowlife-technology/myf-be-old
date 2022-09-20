import express from 'express';
import { prisma } from '../../../../prisma';

const router = express.Router();

router.get('/balance', async (request, response) => {
  const bearerToken = request.headers.authorization.split(' ')[1];

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

  const monthsSet: any = new Set([]);
  balances.forEach((balance) => monthsSet.add(balance.eventDate.getMonth()));
  const balanceList: any[] = [];
  const months = [...monthsSet];

  months.forEach((month: any, monthIndex: any) => {
    balances.forEach((balance) => {
      const category = categories.find((categoryItem) => categoryItem.id === balance.categoryId);
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
});

export default router;
