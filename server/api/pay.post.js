import { Client } from "square";
import { randomUUID } from "crypto";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

export default defineEventHandler(async (event) => {
  const { locationId, sourceId, total } = await readBody(event);

  try {
    const { result } = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: total,
        currency: "CAD",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
});
