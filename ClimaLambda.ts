import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({ region: process.env.AWS_REGION });

async function invocarLambda() {
  const functionName = "HelloWord";
  const payload = JSON.stringify({ key: "value" });

  const command = new InvokeCommand({
    FunctionName: functionName,
    Payload: Buffer.from(payload),
    InvocationType: "RequestResponse"
  });

  try {
    const response = await lambda.send(command);
    const responsePayload = JSON.parse(Buffer.from(response.Payload as Uint8Array).toString());

    console.log("Respuesta del lambda: ", responsePayload);

    // Validaciones
    if (responsePayload.errorMessage) {
      console.error("ERROR EN LA RESPUESTA: ", responsePayload.errorMessage);
    } else {
      console.log("Todo salió de lujo");
    }
  } catch (error) {
    console.error("Error al invocar el Lambda, revisemos la configuración", error);
  }
}

invocarLambda()