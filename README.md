<<<<<<< HEAD
# AV2 Prática – Streaming de Animes (MongoDB)

**Disciplina:** Banco de Dados – 2ª Série EM TI – 4º Bimestre/2026
**Aluno:** João Pedro Appolinario de Souza  **Turma:** 2ATI
**Cenário escolhido:** A – Plataforma de Streaming e Entretenimento (animes)

## Sobre o projeto
Banco `ProjetoAV2_AnimeStreamingDB` de uma plataforma de streaming de animes, com duas coleções:

- **`catalogo`** – animes e filmes (título, gêneros, estúdio, nota, visualizações, avaliações).
- **`usuarios`** – perfis, plano, favoritos e histórico de visualizações.

## Modelagem
- **Documentos incorporados:** `estudio`, `perfil` e cada item de `avaliacoes`/`historico`.
- **Arrays:** `generos`, `favoritos`, `telefones`, `avaliacoes`, `historico`.
- **Schema-less:** séries têm `episodios`, filmes têm `duracao_min`; só alguns animes têm `dublado` ou `premios`; só alguns usuários têm `telefones`.

## O que o script faz
1. **Etapa 1:** cria o banco e as coleções, insere 10 documentos (insertOne e insertMany).
2. **Etapa 2:** 3 consultas com `$gt`, `$in` e projeção sem `_id`.
3. **Etapa 3:** `updateOne` + `$set`, `updateMany` + `$set`, `updateOne` + `$push`, `deleteMany` com filtro.
4. **Etapa 4:** Pipeline 1 (audiência e nota por gênero) e Pipeline 2 (minutos assistidos por plano, com saída formatada).

## Por que NoSQL (MongoDB) e não banco relacional?
- **Flexibilidade de esquema:** um catálogo mistura séries, filmes e OVAs com atributos diferentes. No modelo relacional isso exigiria muitas colunas nulas ou várias tabelas com `JOIN`; no MongoDB cada documento guarda só o que precisa.
- **Dados aninhados em um só documento:** o histórico e os favoritos do usuário ficam dentro do próprio documento, evitando `JOIN`s e deixando a leitura do perfil mais rápida.
- **Escalabilidade horizontal:** o volume de visualizações cresce muito; o MongoDB distribui dados em vários servidores (sharding), enquanto bancos relacionais costumam escalar principalmente de forma vertical.
- **Evolução rápida:** novos recursos (ex.: legendas, dublagens) entram sem `ALTER TABLE` nem migração.

## Como executar
Abra `AV2_AnimeStreaming.mongodb.js` no VS Code com a extensão MongoDB, conecte-se ao servidor e clique em *Play*. O script pode ser rodado várias vezes.
=======
# projeto-straming-joao-pedrro-appolinario
>>>>>>> 6d098843b8344fe1bc3571b33daad5afb58d5b95
