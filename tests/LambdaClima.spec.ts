import { test, expect } from "@playwright/test"
import { LambdaInvoker } from "../utils/LambdaInvokers";

test ('Probando Lambda', async ({  }) => {
  const lambdaInvoker = new LambdaInvoker();
  const lambdaResponse = await lambdaInvoker.invokeLambda("HelloWord", { city: "Brasilia" });
   console.log('Response completo:', lambdaResponse);

  // Si quieres imprimir solo el body (asumiendo que es JSON)
  if (lambdaResponse.body) {
    try {
      const body = JSON.parse(lambdaResponse.body);
      console.log('Body parseado:', body);
    } catch (e) {
      console.log('Body (texto):', lambdaResponse.body);
    }
  }

  expect(lambdaResponse).toBeDefined();
  expect(lambdaResponse).toHaveProperty("statusCode", 200);
  expect(lambdaResponse).toHaveProperty("body");
});





