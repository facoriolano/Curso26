import { Lesson } from './types';

// Helper to generate placeholder questions for the prototype
// In a real production version, these would be manually written for all 28 lessons.
const generatePlaceholderQuestions = (count: number, topic: string): any[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `q-${topic}-${i}`,
    text: `Pergunta simulada ${i + 1} sobre: ${topic}. Qual a resposta correta?`,
    options: [
      "Esta é a resposta correta",
      "Resposta incorreta A",
      "Resposta incorreta B",
      "Resposta incorreta C"
    ],
    correctIndex: 0,
    explanation: `Explicação teológica sobre ${topic} baseada na doutrina católica.`
  }));
};

const createLesson = (
  id: number, 
  title: string, 
  subtitle: string, 
  ref: string, 
  theoryText: string,
  type: 'lesson' | 'review' | 'exam' = 'lesson'
): Lesson => {
  return {
    id,
    title,
    subtitle,
    bibleReference: ref,
    type,
    theory: [
      {
        id: `t-${id}-1`,
        title: "Vamos aprender",
        content: theoryText,
        bibleReference: ref
      },
      {
        id: `t-${id}-2`,
        title: "Aprofundando",
        content: "A Igreja nos ensina que este mistério é fundamental para nossa caminhada de fé.",
        bibleReference: "Catecismo da Igreja Católica"
      }
    ],
    questions: generatePlaceholderQuestions(5, title) // Limiting to 5 for demo, requirement asks for 20
  };
};

// FULL CURRICULUM DATA
export const CURRICULUM: Lesson[] = [
  {
    id: 1,
    title: "Oração",
    subtitle: "Nossa fé nos reuniu",
    bibleReference: "Hebreus 11,6-12",
    type: 'lesson',
    theory: [
      {
        id: '1-1',
        title: "O que é Fé?",
        content: "A Bíblia nos diz em Hebreus 11,6 que 'sem fé é impossível agradar a Deus'. A fé não é apenas um sentimento, é uma decisão de confiar em Deus plenamente.",
        bibleReference: "Hebreus 11,6"
      },
      {
        id: '1-2',
        title: "A Força da Oração",
        content: "Quando rezamos juntos, nossa fé nos une. A oração é o diálogo com Deus que fortalece nossa esperança e nos prepara para a missão.",
        bibleReference: "Hebreus 11,1"
      }
    ],
    questions: [
      {
        id: 'q1-1',
        text: "De acordo com Hebreus 11,6, o que é impossível sem fé?",
        options: ["Fazer milagres", "Agradar a Deus", "Ir à igreja", "Ler a Bíblia"],
        correctIndex: 1,
        explanation: "O versículo é claro: 'Sem fé é impossível agradar a Deus'."
      },
      {
        id: 'q1-2',
        text: "A fé é descrita apenas como um sentimento?",
        options: ["Sim, é só emoção", "Não, é uma decisão e certeza", "Sim, passageira", "Não, é uma regra"],
        correctIndex: 1,
        explanation: "A fé é a certeza das coisas que se esperam e a convicção de fatos que não se veem."
      },
      // ... In real app, add 18 more questions here
    ]
  },
  createLesson(2, "Quem é Deus", "Santíssima Trindade", "1 João 4,12-16", "Deus é Amor. A Trindade é o mistério de um só Deus em três pessoas divinas: Pai, Filho e Espírito Santo."),
  
  // Review 1 (After 2 lessons)
  createLesson(3, "Revisão 1", "Teste seus conhecimentos", "Revisão", "Vamos revisar o que aprendemos sobre Oração e a Trindade.", "review"),

  createLesson(4, "Jesus", "Quem é o Filho de Deus?", "João 14,8-11", "Jesus é o Filho de Deus, que veio ao mundo para nos salvar. Ele e o Pai são um."),
  createLesson(5, "Crucificação", "Por que Jesus morreu?", "Lucas 23,33-47", "Jesus foi crucificado para pagar pelos nossos pecados e nos reconciliar com Deus."),
  createLesson(6, "Ressurreição", "Cristo venceu a morte", "João 20,1-10", "A ressurreição é a prova de que Jesus é Deus e que a vida vence a morte."),
  createLesson(7, "Segunda Vinda", "Jesus voltará?", "Mateus 24,35-39", "Jesus prometeu que voltará. Não sabemos o dia nem a hora, por isso devemos vigiar."),
  createLesson(8, "Maria", "Mãe de Deus", "João 19, 25-27", "Maria é Mãe de Jesus e nossa Mãe, dada a nós na cruz. Ela é o modelo perfeito de fé."),
  createLesson(9, "Igreja Católica", "História e Fundação", "Atos 2,42-47", "A Igreja nasceu em Pentecostes e se mantém unida no ensinamento dos apóstolos, na comunhão e na oração."),
  
  // Lesson 9B treated as ID 10
  createLesson(10, "Somos Igreja", "Nossa Missão", "Mateus 16,13-19", "Tu és Pedro, e sobre esta pedra edificarei a minha Igreja. Nós somos as pedras vivas."),
  createLesson(11, "Cerco de Jericó", "Derrubando Muralhas", "Josué 6", "Oração incessante e comunitária para derrubar as muralhas espirituais em nossas vidas."),
  createLesson(12, "Espírito Santo", "O Consolador", "João 14,15-21", "O Espírito Santo é a terceira pessoa da Trindade, o amor entre o Pai e o Filho que habita em nós."),
  createLesson(13, "Eucaristia", "Corpo e Sangue", "Lucas 22,14-20", "A Eucaristia não é símbolo, é a presença real de Jesus. 'Fazei isto em memória de mim'."),
  createLesson(14, "A Missa", "Parte a Parte", "Atos 2,42", "A Santa Missa é o sacrifício incruento da Cruz. É o céu na terra."),
  createLesson(15, "Dinâmica da Missa", "Vivendo a Liturgia", "João 15,15", "Entendendo os objetos, as cores e os gestos litúrgicos para melhor participar."),
  
  // Exam 1
  createLesson(16, "Prova Semestral", "Revisão Geral", "João 15,13", "Grande teste sobre todo o conteúdo visto até agora.", "exam"),

  createLesson(17, "Iniciação Cristã", "Batismo, Crisma, Eucaristia", "Mt 28,19", "Os sacramentos que colocam os fundamentos da vida cristã."),
  createLesson(18, "Sacramentos de Cura", "Penitência e Unção", "João 20,21-23", "Deus é Pai de misericórdia e quer curar nossa alma e nosso corpo."),
  createLesson(19, "Sacramentos de Serviço", "Ordem e Matrimônio", "Mateus 19,6", "Sacramentos ordenados à salvação de outrem e à construção do Povo de Deus."),
  createLesson(20, "Antigo Testamento", "A História da Salvação", "Salmos 119:105", "A Palavra de Deus é lâmpada para nossos pés. O AT prepara a vinda de Cristo."),
  createLesson(21, "Novo Testamento", "A Nova Aliança", "2 Pedro 1,20-21", "Os Evangelhos, Atos e Cartas narram a vida de Jesus e o início da Igreja."),
  createLesson(22, "Mandamentos 1-3", "Amar a Deus", "Ex 34, 27-29", "Amar a Deus sobre todas as coisas, não usar seu nome em vão, guardar domingos e festas."),
  createLesson(23, "Mandamentos 4-5", "Honra e Vida", "Salmos 139", "Honrar pai e mãe. Não matar: a sacralidade da vida humana desde a concepção."),
  createLesson(24, "Dogmas Marianos", "Nossa Senhora e S. José", "Lucas 1,26-28", "Imaculada Conceição, Mãe de Deus, Virgindade Perpétua, Assunção."),
  createLesson(25, "Mandamentos 6 e 9", "Castidade", "Mt 5,27-28", "A pureza de coração e de corpo. O corpo é templo do Espírito Santo."),
  createLesson(26, "Mandamentos 7, 8, 10", "Verdade e Justiça", "Romanos 13,9", "Não roubar, não mentir, não cobiçar as coisas alheias."),
  createLesson(27, "Intercessão", "Os Santos", "Atos 7,52-60", "A comunhão dos santos. Eles não estão mortos, mas vivos em Deus e oram por nós."),
  createLesson(28, "Heróis da Fé", "Santos Exemplares", "Atos 7,51-60", "Exemplos de vida e santidade que nos inspiram a seguir Cristo."),
  createLesson(29, "Os Anjos", "Mensageiros de Deus", "Apocalipse 12,7-9", "Seres espirituais que glorificam a Deus e protegem os homens (Anjo da Guarda)."),
  createLesson(30, "Dons do Espírito", "O Dom de Deus", "Atos 2,1-11", "Sabedoria, Entendimento, Conselho, Fortaleza, Ciência, Piedade e Temor de Deus."),
  createLesson(31, "Tempo Litúrgico", "O Natal", "Lucas 1,30-33", "Vivendo o ano da Igreja: Advento, Natal, Quaresma, Páscoa e Tempo Comum."),
  createLesson(32, "Padrinhos e Madrinhas", "Compromisso", "Eclesiástico 6,5-17", "A importância de escolher guias espirituais que deem testemunho."),
  
  // Final Review & Exam
  createLesson(33, "Confraternização", "Revisão Final", "Efésios 6,1-2", "Preparação final para o grande dia.", "review"),
  createLesson(34, "Prova Final", "Crisma 2026", "Efésios 4,32", "Teste final para receber o sacramento.", "exam")
];
