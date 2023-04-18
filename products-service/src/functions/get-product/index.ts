import { handlerPath } from "@libs/handler-resolver";

export const getProductsById = {
    handler: `${handlerPath(__dirname)}/handler.getProduct`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{id}',
            },
        },
    ],
  };