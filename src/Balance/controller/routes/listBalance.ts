import express from 'express';
import { prisma } from '../../../../prisma';

const router = express.Router();

router.get('/balance', async (request, response) => {
  const bearerToken = request.headers.authorization;

  if (!bearerToken) return response.status(401).send();

  const userData = await prisma.identity.findFirst({
    where: {
      bearer: {
        token: bearerToken as string,
      },
    },
    include: {
      balances: true,
    },
  });

  if (!userData.id) return response.status(401).send();

  const { balances } = userData;

  const monthsSet: any = new Set([]);
  balances.forEach((balance) => monthsSet.add(balance.eventDate.getMonth()));
  const balanceList: any[] = [];
  const months = [...monthsSet];

  months.forEach((month: any, monthIndex: any) => {
    balances.forEach((balance) => {
      if (balance.eventDate.getMonth() === month) {
        if (balanceList[monthIndex]) {
          balanceList[monthIndex]?.data.push({
            balanceDay: balance.eventDate,
          });
        } else {
          balanceList.push({
            balanceMonth: balance.eventDate,
            data: [
              {
                balanceDay: balance.eventDate,
              },
            ],
          });
        }
      }
    });
  });

  return response.status(200).send(balanceList);
});

export default router;
