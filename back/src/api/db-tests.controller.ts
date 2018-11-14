import { v1 as Neo } from 'neo4j-driver';
import { Request, Response } from 'express';

export const controller = _ => (_req: Request, res: Response, _next) => {
  const driver = Neo.driver('bolt://localhost', Neo.auth.basic('neo4j', 'admin'));
  const session = driver.session();
  session
    .run(`CREATE (bol:Ustensil {code:"bol"}),
  (saladier:Ustensil {code:"saladier"}),
  (spatule:Ustensil {code:"spatule"}),
  (beurreBattu:Subrecipe {
    code:"beurre battu",
    preparationTime:5,
    cost:0.015,
    directions:["{code: 'coupezX', x: 'beurreDoux'}", "..."]
  }),
  (lait:Merchandise {code:"laitEntier"}),
  (eau:Merchandise {code:"eau"}),
  (beurre:Merchandise {code:"beurreDoux"}),
  (sel:Merchandise {code:"selFin"}),
  (farineTamisee:Subrecipe {
    code:"farineTamisée",
    preparationTime:2,
    cost: 0.001
  }),
  (pateBrisee:Subrecipe {
    code:"pate brisée",
    baseQuantity:500,
    preparationTime: 15,
    restTime: 120,
    cost: 0.03,
    directions: ["..."]
  })
  CREATE (beurreBattu)-[:REQUIREMENTS]->(beurre)
  CREATE (beurreBattu)-[:REQUIREMENTS]->(spatule)
  CREATE (beurreBattu)-[:REQUIREMENTS]->(saladier)
  CREATE (pateBrisee)-[:REQUIREMENTS { factor: 0.38 }]->(beurreBattu)
  CREATE (pateBrisee)-[:REQUIREMENTS { factor: 0.5 }]->(farineTamisee)
  CREATE (pateBrisee)-[:REQUIREMENTS { factor: 0.1 }]->(lait)
  CREATE (pateBrisee)-[:REQUIREMENTS { factor: 0.1 }]->(sel)
  CREATE (pateBrisee)-[:REQUIREMENTS]->(spatule)
  CREATE (pateBrisee)-[:REQUIREMENTS]->(bol)
  CREATE (tarteMyrtilles:Recipe {
    code: "tarteMyrtilles",
    preparationTime: 20,
    bakeTime: 30,
    cost: 3
  }),
  (pateBriseeP :Product {code:"pate brisée product"}),
  (pateBriseeM :Merchandise {code:"pate brisée merchandise", cost: 0.0036}),
  (baieBleue :Product {code:"baie bleue"}),
  (myrtilles :Merchandise {code:"myrtille", cost: 0.02}),
  (bleuet :Merchandise {code:"bleuet", cost: 0.01}),
  (sucre :Product {code:"sucre en poudre"}),
  (sucreDeCanne :Merchandise {code:"sucre de canne en poudre", cost:0.0022}),
  (sucreGlace :Merchandise {code:"sucre glace", cost:0.0032})
  CREATE (baieBleue)-[:SATISFY]->(myrtilles)
  CREATE (baieBleue)-[:SATISFY]->(bleuet)
  CREATE (pateBriseeP)-[:SATISFY]->(pateBriseeM)
  CREATE (pateBriseeP)-[:SATISFY]->(pateBrisee)
  CREATE (sucre)-[:SATISFY]->(sucreDeCanne)
  CREATE (tarteMyrtilles)-[:REQUIREMENTS { factor: 12}]->(sucre)
  CREATE (tarteMyrtilles)-[:REQUIREMENTS { factor: 2}]->(sucreGlace)
  CREATE (tarteMyrtilles)-[:REQUIREMENTS { factor: 80}]->(baieBleue)
  CREATE (tarteMyrtilles)-[:REQUIREMENTS { factor: 70}]->(pateBriseeP)`)
    .then(res => {
        console.log('results:');
        console.log(res);
        driver.close();
      }, e => {
        console.log(e);
        driver.close();
      });
  res.json([{ name: 'direction1', id: 1 }, { name: 'direction2', id: 2 }]);
};
