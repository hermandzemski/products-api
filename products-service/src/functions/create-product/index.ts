import { handlerPath } from "@libs/handler-resolver";

export const createProduct = {
    handler: `${handlerPath(__dirname)}/handler.createProduct`,
    events: [
        {
            http: {
                method: 'post',
                path: 'products',
            },
        },
    ],
  };