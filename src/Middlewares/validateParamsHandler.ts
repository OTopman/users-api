import { NextFunction, Request, Response } from 'express';
import AppError from '@helpers/AppError';
import { inputValidation } from '@helpers/util';

/**
 * Check if the required fields are present
 * @param {Array | string} props - Array or comma separated list of required fields
 * @return {function}
 */
export default function validateParamsHandler(props: string | Array<string>) {
  if (typeof props === 'string') {
    props = props.replace(/\s/g, '').split(',');
  }
  props = props instanceof Array ? props : [props];

  return (req: Request, res: Response, next: NextFunction) => {
    let message = '(';
    for (let i = 0; i < props.length; i++) {
      let propNotExists = true;
      if (req.method.toUpperCase() === 'GET') {
        // propNotExists = !req.params[props[i]] && !req.query[props[i]];
        propNotExists = req.body[props[i]] ? false : !req.params[props[i]];
        // eslint-disable-next-line guard-for-in
        for (const key in { ...req.params, ...req.query }) {
          if (req.params[key] && typeof req.params[key] !== 'object') {
            req.params[key] = inputValidation(req.params[key]);
          }

          if (req.query[key] && typeof req.query[key] !== 'object') {
            const element: any = req.query[key];
            req.query[key] = inputValidation(element);
          }
        }
      } else {
        for (const key in req.body) {
          propNotExists = req.body[props[i]] ? false : !req.params[props[i]];
          if ((req.body[key] && typeof req.body[key] !== 'object')) {
            req.body[key] = inputValidation(req.body[key]);
          }

          if ((req.params[key] && typeof req.params[key] !== 'object')) {
            req.params[key] = inputValidation(req.params[key]);
          }
        }
      }
      if (propNotExists) {
        message += props[i] + ', ';
      }
    }
    if (message !== '(') {
      return next(new AppError(`These fields are required: ${message.slice(0, -2)})`, 400));
    }
    next();
  };
};
