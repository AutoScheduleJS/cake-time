import { v1 as Neo } from 'neo4j-driver';
import { Request, Response } from 'express';

export const controller = _ => (req: Request, res: Response, _next) => {
  console.log(req.body);
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'));
  const session = driver.session();
  session
    .run(
      `MATCH (r:Recipe)
  WITH r, rand() AS nb
  RETURN r.code as name
  ORDER BY nb
  LIMIT 3`
    )
    .then(
      dbRes => {
        res.json(
          dbRes.records.map(rec => ({
            name: rec.get('name'),
            code: rec.get('name')
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
