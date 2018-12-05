import { Request, Response } from 'express';
import { v1 as Neo } from 'neo4j-driver';

export const controller = _ => (req: Request, res: Response, _next) => {
  console.log(req.body);
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'), {
    disableLosslessIntegers: true,
  } as any);
  const session = driver.session();
  session
    .run(
      `MATCH (r:Recipe)
  RETURN r.code as name`
    )
    .then(
      dbRes => {
        res.json(
          dbRes.records.map(rec => ({
            name: rec.get('name'),
            code: rec.get('name'),
          }))
        );
        driver.close();
      },
      e => {
        console.log(e);
        driver.close();
      }
    );
};
