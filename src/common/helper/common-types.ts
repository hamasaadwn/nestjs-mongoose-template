import { Request } from 'express';
import { TUser } from '../../modules/users/user.model';
import { getSchemaPath } from '@nestjs/swagger';

export interface SearchObj {
  [key: string]:
    | number
    | {
        $regex: string;
        $options: string;
      };
}

interface DateQuery {
  [key: string]: {
    $gte: string;
    $lte: string;
  };
}

export interface IRequest extends Request {
  searchObj: SearchObj;
  dateQr: DateQuery;
  skip: number;
  user: TUser;
}

export const getResponseType = (Type: any) => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            result: {
              type: 'array',
              items: { $ref: getSchemaPath(Type) },
            },

            count: {
              type: 'number',
              default: 0,
            },
            page: {
              type: 'number',
              default: 0,
            },
            limit: {
              type: 'number',
              default: 0,
            },
          },
        },
      ],
    },
  };
};
