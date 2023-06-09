import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });

      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };

// const validate = (schema: AnyZodObject) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       schema.parse({ body: req.body, query: req.query, params: req.params });

//       next();
//     } catch (error: any) {
//       return res.status(400).send(error.errors);
//     }
//   };
// };

// function validate(schema: AnyZodObject) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     try {
//       schema.parse({ body: req.body, query: req.query, params: req.params });
//
//       next()
//     } catch (error: any) {
//       return res.status(400).send(error.errors);
//     }
//   };
// }

export default validate;
