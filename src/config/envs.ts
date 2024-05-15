import * as joi from 'joi';
import 'dotenv/config'
interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST:string
PRODUCTS_MICROSERVICE_PORT:number
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);
const { error, value } = envsSchema.validate(process.env);
if (error) {
  throw new Error(` meessage Error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsPort: envVars.PRODUCTS_MICROSERVICE_PORT,
};
