import { Request, Response } from 'express';
import { v1 as Neo } from 'neo4j-driver';

interface RecipeInfo {
  requirements: Array<{
    factor: number;
    required: string;
    choices?: Array<string>;
  }>;
}

export const controller = _ => (req: Request, res: Response, _next) => {
  console.log('recipe-info body', req.body);
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'), {
    disableLosslessIntegers: true,
  } as any);
  const code = req.body.code;
  const session = driver.session();
  Promise.all([
    session.run(
      `MATCH (sb)<-[SATISFY]-(pr:Product)<-[r:REQUIREMENTS]-(n:Recipe { code: $code })
      RETURN r.factor as factor, pr.code as required, collect(sb.code) as choices`,
      { code }
    ),
    session.run(
      `MATCH (n:Recipe { code: $code })-[r:REQUIREMENTS]->(m:Merchandise)
      RETURN r.factor as factor, m.code as required`,
      { code }
    ),
  ]).then(
    ([choices, ingredients]) => {
      const response: RecipeInfo = {
        requirements: [],
      };
      choices.records.forEach(rec => {
        console.log(rec);
        const res = rec.toObject();
        response.requirements.push(res as any);
      });
      ingredients.records.forEach(rec => {
        console.log(rec);
        const res = rec.toObject();
        response.requirements.push(res as any);
      });
      res.json(response);
      driver.close();
    },
    e => {
      console.log(e);
      driver.close();
    }
  );
};
