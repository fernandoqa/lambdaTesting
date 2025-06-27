import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { config } from "dotenv";
config();   

export class LambdaInvoker {

    private lambdaClient: LambdaClient;

    constructor() {
        this.lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });
    }

    async invokeLambda(functionName: string, payload: object): Promise<any> {
        const command = new InvokeCommand({
            FunctionName: functionName,
            Payload: Buffer.from(JSON.stringify(payload)),
            InvocationType: "RequestResponse"
        });

        try {
            const response = await this.lambdaClient.send(command);
            return JSON.parse(Buffer.from(response.Payload as Uint8Array).toString());
        } catch (error) {
            console.error("Error invoking Lambda function:", error);
            throw error;
        }
    }
}
