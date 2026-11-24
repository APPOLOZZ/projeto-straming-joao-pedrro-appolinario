/* =====================================================================
   AV2 Prática – Projeto Final (MongoDB / NoSQL)
   Cenário A: Plataforma de Streaming de Animes
   Disciplina: Banco de Dados – 2ª Série EM TI – 4º Bimestre/2026
   Aluno(s): ______________________________   Turma: ________

   Como executar: abra este arquivo no VS Code (extensão MongoDB),
   conecte-se ao servidor e clique em "Play". O script roda do início
   ao fim e pode ser executado várias vezes (ele limpa as coleções
   antes de começar).
   ===================================================================== */


/* =====================================================================
   ETAPA 1 – ARQUITETURA, MODELAGEM E POVOAMENTO
   ===================================================================== */

// 1.1 Criar/selecionar o banco de dados dedicado ao projeto
use('ProjetoAV2_AnimeStreamingDB');

// 1.2 Limpeza para o script poder ser reexecutado sem erros
db.getCollection('catalogo').drop();
db.getCollection('usuarios').drop();

// 1.3 Coleção "catalogo" – povoada com insertMany()
//     Modelagem: ARRAYS (generos, avaliacoes) e DOCUMENTOS INCORPORADOS
//     (estudio, avaliacoes[]). SCHEMA-LESS: cada documento pode ter
//     atributos diferentes (series têm "episodios"; filmes têm
//     "duracao_min"; alguns têm "dublado" ou "premios").
db.getCollection('catalogo').insertMany([
  {
    codigo: 'AN001',
    titulo: 'Fullmetal Alchemist: Brotherhood',
    tipo: 'Serie',
    generos: ['Acao', 'Aventura', 'Fantasia'],
    ano: 2009,
    status: 'Finalizado',
    episodios: 64,                       // atributo exclusivo de séries
    nota_media: 9.1,
    visualizacoes: 15800,
    classificacao: 14,
    estudio: { nome: 'Bones', pais: 'Japao' },          // documento incorporado
    avaliacoes: [                                        // array de documentos
      { usuario: 'lucas@email.com', nota: 10, comentario: 'Obra-prima!' },
      { usuario: 'marina@email.com', nota: 9, comentario: 'Historia incrivel.' }
    ],
    dublado: true                        // atributo que nem todos possuem
  },
  {
    codigo: 'AN002',
    titulo: 'Your Name',
    tipo: 'Filme',
    generos: ['Romance', 'Drama', 'Fantasia'],
    ano: 2016,
    status: 'Finalizado',
    duracao_min: 106,                    // atributo exclusivo de filmes
    nota_media: 8.9,
    visualizacoes: 9400,
    classificacao: 10,
    estudio: { nome: 'CoMix Wave Films', pais: 'Japao' },
    avaliacoes: [
      { usuario: 'marina@email.com', nota: 9, comentario: 'Emocionante.' }
    ],
    premios: ['Melhor Filme de Animacao 2016']          // só este possui
  },
  {
    codigo: 'AN003',
    titulo: 'Jujutsu Kaisen',
    tipo: 'Serie',
    generos: ['Acao', 'Sobrenatural'],
    ano: 2020,
    status: 'Em exibicao',
    episodios: 47,
    nota_media: 8.7,
    visualizacoes: 21300,
    classificacao: 16,
    estudio: { nome: 'MAPPA', pais: 'Japao' },
    avaliacoes: [
      { usuario: 'lucas@email.com', nota: 9, comentario: 'Lutas animadas demais.' },
      { usuario: 'julia@email.com', nota: 8, comentario: 'Muito bom.' }
    ],
    dublado: true
  },
  {
    codigo: 'AN004',
    titulo: 'Cowboy Bebop',
    tipo: 'Serie',
    generos: ['Acao', 'Ficcao Cientifica'],
    ano: 1998,
    status: 'Finalizado',
    episodios: 26,
    nota_media: 8.8,
    visualizacoes: 6200,
    classificacao: 14,
    estudio: { nome: 'Sunrise', pais: 'Japao' },
    avaliacoes: []
  },
  {
    codigo: 'AN005',
    titulo: 'Spy x Family',
    tipo: 'Serie',
    generos: ['Comedia', 'Acao'],
    ano: 2022,
    status: 'Em exibicao',
    episodios: 37,
    nota_media: 8.6,
    visualizacoes: 18700,
    classificacao: 10,
    estudio: { nome: 'Wit Studio', pais: 'Japao' },
    avaliacoes: [
      { usuario: 'julia@email.com', nota: 9, comentario: 'Anya e demais!' }
    ],
    dublado: true
  },
  {
    codigo: 'AN006',
    titulo: 'Anime Antigo Sem Licenca',
    tipo: 'Serie',
    generos: ['Drama'],
    ano: 1995,
    status: 'Descontinuado',             // será removido na Etapa 3
    episodios: 12,
    nota_media: 5.2,
    visualizacoes: 150,
    classificacao: 12,
    estudio: { nome: 'Estudio Desconhecido', pais: 'Japao' },
    avaliacoes: []
  }
]);

// 1.4 Coleção "usuarios" – povoada com insertOne() e insertMany()
//     Modelagem: documento incorporado (perfil), arrays de strings
//     (favoritos, telefones) e array de documentos (historico).
//     SCHEMA-LESS: só alguns usuários possuem "telefones" ou "perfil.legenda".

// insertOne(): um usuário
db.getCollection('usuarios').insertOne({
  nome: 'Lucas Almeida',
  email: 'lucas@email.com',
  cidade: 'Sao Paulo',
  plano: 'Premium',
  ativo: true,
  data_cadastro: new Date('2024-03-15'),
  perfil: { idioma: 'pt-BR', legenda: true, tema: 'escuro' },
  favoritos: ['AN001', 'AN003'],
  telefones: ['11988887777'],
  historico: [
    { codigo: 'AN001', episodio: 12, minutos_assistidos: 24, data: new Date('2026-11-10') },
    { codigo: 'AN003', episodio: 5,  minutos_assistidos: 23, data: new Date('2026-11-12') }
  ]
});

// insertMany(): vários usuários de uma vez
db.getCollection('usuarios').insertMany([
  {
    nome: 'Marina Costa',
    email: 'marina@email.com',
    cidade: 'Curitiba',
    plano: 'Premium',
    ativo: true,
    data_cadastro: new Date('2023-08-02'),
    perfil: { idioma: 'ja-JP', legenda: true },          // sem "tema"
    favoritos: ['AN002'],
    historico: [
      { codigo: 'AN002', episodio: 1, minutos_assistidos: 106, data: new Date('2026-11-05') },
      { codigo: 'AN001', episodio: 30, minutos_assistidos: 24, data: new Date('2026-11-08') }
    ]
  },
  {
    nome: 'Julia Ferreira',
    email: 'julia@email.com',
    cidade: 'Sao Paulo',
    plano: 'Gratuito',
    ativo: true,
    data_cadastro: new Date('2025-01-20'),
    perfil: { idioma: 'pt-BR', legenda: false },
    favoritos: ['AN005'],
    telefones: ['11977776666', '11966665555'],
    historico: [
      { codigo: 'AN005', episodio: 8, minutos_assistidos: 24, data: new Date('2026-11-15') },
      { codigo: 'AN003', episodio: 2, minutos_assistidos: 20, data: new Date('2026-11-16') },
      { codigo: 'AN005', episodio: 9, minutos_assistidos: 24, data: new Date('2026-11-17') }
    ]
  },
  {
    nome: 'Pedro Santos',
    email: 'pedro@email.com',
    cidade: 'Recife',
    plano: 'Gratuito',
    ativo: false,                                         // usuário inativo
    data_cadastro: new Date('2022-05-30'),
    perfil: { idioma: 'pt-BR', legenda: true },
    favoritos: [],
    historico: [
      { codigo: 'AN004', episodio: 3, minutos_assistidos: 25, data: new Date('2025-02-01') }
    ]
  }
]);

// Conferência: 6 animes + 4 usuários = 10 documentos inseridos
print('Animes no catalogo: ' + db.getCollection('catalogo').countDocuments());
print('Usuarios cadastrados: ' + db.getCollection('usuarios').countDocuments());


/* =====================================================================
   ETAPA 2 – CONSULTAS DE LEITURA (find + operadores)
   ===================================================================== */

// 2.1 Operador de comparação numérica ($gt):
//     animes com nota média MAIOR que 8.8
db.getCollection('catalogo').find({ nota_media: { $gt: 8.8 } }).toArray();

// 2.2 Operador de lista ($in):
//     animes cujo status seja "Em exibicao" OU "Finalizado"
db.getCollection('catalogo').find({
  status: { $in: ['Em exibicao', 'Finalizado'] }
}).toArray();

// 2.3 Projeção: mostra só titulo, ano e nota_media e oculta o _id
db.getCollection('catalogo').find(
  { tipo: 'Serie' },                                      // filtro
  { _id: 0, titulo: 1, ano: 1, nota_media: 1 }            // projeção
).toArray();


/* =====================================================================
   ETAPA 3 – MANIPULAÇÃO E MANUTENÇÃO DOS DADOS
   ===================================================================== */

// 3.1 updateOne() + $set: muda só o plano da Julia; o resto do
//     documento permanece intacto
db.getCollection('usuarios').updateOne(
  { email: 'julia@email.com' },
  { $set: { plano: 'Premium' } }
);

// 3.2 updateMany() + $set: marca todos os animes lançados antes de
//     2010 como "classico" (atualização em lote)
db.getCollection('catalogo').updateMany(
  { ano: { $lt: 2010 } },
  { $set: { classico: true } }
);

// 3.3 updateOne() + $push: adiciona um novo favorito ao Lucas sem
//     apagar os favoritos que ele já tinha
db.getCollection('usuarios').updateOne(
  { email: 'lucas@email.com' },
  { $push: { favoritos: 'AN005' } }
);

// 3.4 deleteMany() com filtro: remove animes descontinuados
//     (filtro específico – nunca usar {} vazio)
db.getCollection('catalogo').deleteMany({ status: 'Descontinuado' });

// Conferência após as alterações
db.getCollection('usuarios').find(
  { email: { $in: ['julia@email.com', 'lucas@email.com'] } },
  { _id: 0, nome: 1, plano: 1, favoritos: 1 }
).toArray();


/* =====================================================================
   ETAPA 4 – AGGREGATION PIPELINE
   ===================================================================== */

// ---------------------------------------------------------------------
// PIPELINE 1 – Quais gêneros têm mais audiência e melhor nota?
// Funil: $match -> $unwind -> $group -> $sort
// ---------------------------------------------------------------------
db.getCollection('catalogo').aggregate([
  // 1) Filtra na entrada apenas animes com status válido
  { $match: { status: { $in: ['Em exibicao', 'Finalizado'] } } },

  // 2) Cada anime tem vários gêneros; $unwind gera 1 documento por gênero
  { $unwind: '$generos' },

  // 3) Agrupa por gênero: soma as visualizações e calcula a nota média
  { $group: {
      _id: '$generos',
      total_visualizacoes: { $sum: '$visualizacoes' },
      nota_media_genero: { $avg: '$nota_media' },
      qtd_animes: { $sum: 1 }
  } },

  // 4) Ordena do gênero mais assistido para o menos assistido
  { $sort: { total_visualizacoes: -1 } }
]).toArray();

// ---------------------------------------------------------------------
// PIPELINE 2 – Relatório para o usuário final: consumo por plano
// Funil: $match -> $unwind -> $group -> $project (+ $sort)
// ---------------------------------------------------------------------
db.getCollection('usuarios').aggregate([
  // 1) Considera só usuários ativos
  { $match: { ativo: true } },

  // 2) Separa cada sessão do array historico em um documento
  { $unwind: '$historico' },

  // 3) Agrupa por plano
  { $group: {
      _id: '$plano',
      total_minutos: { $sum: '$historico.minutos_assistidos' },
      media_minutos_sessao: { $avg: '$historico.minutos_assistidos' },
      total_sessoes: { $sum: 1 }
  } },

  // 4) Formata a saída: esconde o _id e usa nomes amigáveis
  { $project: {
      _id: 0,
      'Plano': '$_id',
      'Minutos assistidos': '$total_minutos',
      'Media por sessao (min)': { $round: ['$media_minutos_sessao', 1] },
      'Sessoes assistidas': '$total_sessoes'
  } },

  // 5) Quem assistiu mais aparece primeiro
  { $sort: { 'Minutos assistidos': -1 } }
]).toArray();
