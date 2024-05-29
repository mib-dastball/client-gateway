import * as joi from 'joi';
import 'dotenv/config';
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string().required()).required(),
  })
  .unknown(true);
const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(` meessage Error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  nastsServers: envVars.NATS_SERVERS,
};

// import * as joi from 'joi';
// import 'dotenv/config'
// interface EnvVars {
//   PORT: number;
//   PRODUCTS_MICROSERVICE_HOST:string
// PRODUCTS_MICROSERVICE_PORT:number
//   ORDERS_MICROSERVICE_HOST:string
// ORDERS_MICROSERVICE_PORT:number
// }

// const envsSchema = joi
//   .object({
//     PORT: joi.number().required(),
//     PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
//     PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
//     ORDERS_MICROSERVICE_HOST: joi.string().required(),
//     ORDERS_MICROSERVICE_PORT: joi.number().required(),
//   })
//   .unknown(true);
// const { error, value } = envsSchema.validate(process.env);
// if (error) {
//   throw new Error(` meessage Error: ${error.message}`);
// }
// const envVars: EnvVars = value;

// export const envs = {
//   port: envVars.PORT,
//   productsHost: envVars.PRODUCTS_MICROSERVICE_HOST,
//   productsPort: envVars.PRODUCTS_MICROSERVICE_PORT,
//   ordersHost: envVars.ORDERS_MICROSERVICE_HOST,
//   ordersPort: envVars.ORDERS_MICROSERVICE_PORT,
// };
