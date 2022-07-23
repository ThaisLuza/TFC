# :soccer: TFC

O TFC é um site informativo sobre partidas e classificações de futebol! 

Aqui o desafio foi desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - 
as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, o back-end dockerizado utiliza modelagem de dados através do Sequelize.
Seu desenvolvimento respeita as regras de negócio providas no projeto e a API é consumida por um front-end.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. 


O  back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end
que é exibida para a pessoa usuária do sistema.

:goal_net: Tecnologias utilizadas:
- Typescript
- Javascript
- Docker
- Node.js
- Sequelize
- TDD
