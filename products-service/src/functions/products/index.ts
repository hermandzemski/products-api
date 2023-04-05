import { handlerPath } from '@libs/handler-resolver';

export const getAllProducts = {
  handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/'
      },
    },
  ],
};
