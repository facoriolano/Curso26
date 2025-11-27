import { Lesson } from './types';

// Helper to generate 20 placeholder questions per lesson requirements
const generateQuestions = (count: number, topic: string, specificQuestions: any[] = []): any[] => {
  const placeholders = Array.from({ length: Math.max(0, count - specificQuestions.length) }).map((_, i) => ({
    id: `q-${topic}-${i + specificQuestions.length}`,
    text: `Pergunta ${i + 1 + specificQuestions.length} sobre ${topic}. Selecione a correta:`,
    options: [
      "Esta afirmação é verdadeira e está de acordo com a doutrina.",
      "Esta opção está incorreta.",
      "Esta também está errada.",
      "Totalmente fora de contexto."
    ],
    correctIndex: 0,
    explanation: `Explicação detalhada sobre ${topic} baseada na Bíblia e no Catecismo.`
  }));
  return [...specificQuestions, ...placeholders];
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
        title: "Ensinamento Principal",
        content: theoryText,
        bibleReference: ref
      },
      {
        id: `t-${id}-2`,
        title: "Para Refletir",
        content: "Como este ensinamento se aplica na sua vida de jovem católico hoje?",
        bibleReference: "Catecismo & Vida"
      }
    ],
    questions: generateQuestions(20, title) 
  };
};

// FULL CURRICULUM DATA - CRISMA 2026
export const CURRICULUM: Lesson[] = [
  // 1. Tema: Oração - Nossa fé nos reuniu (Hebreus 11,6-12)
  {
    id: 1,
    title: "Oração",
    subtitle: "Nossa fé nos reuniu",
    bibleReference: "Hebreus 11,6-12",
    type: 'lesson',
    theory: [
      {
        id: '1-1',
        title: "O Fundamento da Fé",
        content: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos. Sem fé é impossível agradar a Deus.",
        bibleReference: "Hebreus 11,1-6"
      }
    ],
    questions: generateQuestions(20, "Fé e Oração", [
      {
        id: 'q1-1',
        text: "De acordo com Hebreus 11,6, o que é impossível fazer sem fé?",
        options: ["Agradar a Deus", "Fazer milagres", "Ir à Missa", "Ler a Bíblia"],
        correctIndex: 0,
        explanation: "O texto diz explicitamente: 'Sem fé é impossível agradar a Deus'."
      },
      {
        id: 'q1-2',
        text: "O que a oração comunitária faz conosco?",
        options: ["Nos reúne e fortalece", "Nos deixa cansados", "É apenas uma obrigação", "Não tem efeito"],
        correctIndex: 0,
        explanation: "Nossa fé nos reuniu. A oração em comum é um vínculo de união."
      }
    ])
  },
  
  // 2. Quem é Deus - Tema: Santissima trindade (1 João 4,12-16)
  createLesson(2, "Quem é Deus", "Santíssima Trindade", "1 João 4,12-16", "Deus é Amor. Quem permanece no amor, permanece em Deus. A Trindade é a comunhão perfeita de amor."),
  
  // 3. Tema: Jesus - Quem é o Filho de Deus? (João 14,8-11)
  createLesson(3, "Jesus", "O Filho de Deus", "João 14,8-11", "Quem vê Jesus, vê o Pai. Jesus está no Pai e o Pai está em Jesus. Ele é o caminho, a verdade e a vida."),
  
  // 4. Porque Jesus foi Crucificado - Tema: Pecados (Lucas 23,33-47)
  createLesson(4, "Crucificação", "O Preço do Amor", "Lucas 23,33-47", "Jesus foi crucificado não por seus crimes, mas pelos nossos pecados. Na cruz, Ele perdoou: 'Pai, perdoa-lhes'."),
  
  // 5. Tema: Ressureição de Jesus -Cristo ressuscitou dos mortos? (João 20,1-10)
  createLesson(5, "Ressurreição", "Ele Vive!", "João 20,1-10", "O túmulo está vazio! A ressurreição é o fundamento da nossa fé cristã. Ele venceu a morte."),
  
  // 6. Tema: Segunda Vinda de Jesus - Jesus Voltará? Quando? (Mateus 24,35-39)
  createLesson(6, "Segunda Vinda", "Vigiai e Orai", "Mateus 24,35-39", "O céu e a terra passarão, mas minhas palavras não passarão. Ninguém sabe o dia nem a hora, só o Pai."),
  
  // 7. Tema: Como Maria pode ser mãe de Deus? (João 19, 25-27)
  createLesson(7, "Maria", "Mãe de Deus e Nossa", "João 19, 25-27", "Aos pés da cruz, Jesus nos deu Maria por mãe: 'Mulher, eis aí o teu filho'. Ela gerou Jesus, que é Deus."),
  
  // 8. Tema: O que é a igreja Católica? História da Igreja (Atos 2,42-47)
  createLesson(8, "Igreja Católica", "Comunidade de Fé", "Atos 2,42-47", "Perseveravam na doutrina dos apóstolos, na comunhão, na fração do pão e nas orações."),
  
  // 9. Tema: Somos Igreja (Mateus 16,13-19)
  createLesson(9, "Somos Igreja", "Pedras Vivas", "Mateus 16,13-19", "Tu és Pedro, e sobre esta pedra edificarei a minha Igreja. Nós somos parte deste corpo místico."),
  
  // 9B. Cerco de Jericó - Participar -> Lesson 10
  createLesson(10, "Cerco de Jericó", "Oração de Poder", "Josué 6", "Uma semana de oração intensa diante do Santíssimo para derrubar as muralhas do pecado."),
  
  // 10. Tema: Quem é o Espirito Santo? (João 14,15-21) -> Lesson 11
  createLesson(11, "Espírito Santo", "O Consolador", "João 14,15-21", "Eu rogarei ao Pai, e ele vos dará outro Paráclito, para que fique eternamente convosco."),
  
  // 11. Tema: Eucaristia e Milagres Eucaristicos (Lucas 22,14-20) -> Lesson 12
  createLesson(12, "Eucaristia", "Presença Real", "Lucas 22,14-20", "Isto é o meu corpo, que é dado por vós. A Eucaristia é a fonte e o ápice da vida cristã."),
  
  // 12. Tema: Missa parte a parte - (Atos 2,42) -> Lesson 13
  createLesson(13, "Santa Missa", "Ritos e Significados", "Atos 2,42", "Entendendo a Liturgia da Palavra e a Liturgia Eucarística. O sacrifício do altar."),
  
  // 13. Tema: Missa - atividade a tarde -> Lesson 14
  createLesson(14, "Vivência Litúrgica", "Objetos e Gestos", "Salmos 100", "Conhecendo o cálice, a patena, as vestes e a postura correta na celebração."),
  
  // Revisão (João 15,15) -> Lesson 15
  createLesson(15, "Revisão Geral", "Fortalecendo a Base", "João 15,15", "Revisão dos conteúdos sobre Trindade, Igreja e Missa.", "review"),
  
  // Prova (João 15,13) -> Lesson 16
  createLesson(16, "Prova Semestral", "Teste de Fé", "João 15,13", "Ninguém tem maior amor do que aquele que dá a vida pelos amigos.", "exam"),
  
  // 14. Tema: Sacramentos Iniciação (Mt 28,19) -> Lesson 17
  createLesson(17, "Iniciação Cristã", "Batismo, Crisma, Eucaristia", "Mateus 28,19", "Ide e fazei discípulos, batizando-os em nome do Pai, do Filho e do Espírito Santo."),
  
  // 15. Tema: Sacramentos Cura (João 20,21-23) -> Lesson 18
  createLesson(18, "Sacramentos de Cura", "Confissão e Unção", "João 20,21-23", "Àqueles a quem perdoardes os pecados, ser-lhes-ão perdoados."),
  
  // 16. Tema: Sacramentos Serviço (2Tm 1,6) -> Lesson 19
  createLesson(19, "Sacramentos de Serviço", "Ordem e Matrimônio", "2 Timóteo 1,6", "Reaviva o dom de Deus que está em ti. O serviço à comunidade e à família."),
  
  // 17. Tema: Bíblia - Antigo Testamento (Salmos 119:105) -> Lesson 20
  createLesson(20, "Antigo Testamento", "Promessa de Deus", "Salmos 119:105", "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho."),
  
  // 18. Tema: Bíblia - Novo Testamento (2 Pedro 1,20-21) -> Lesson 21
  createLesson(21, "Novo Testamento", "A Boa Nova", "2 Pedro 1,20-21", "Nenhuma profecia da Escritura provém de interpretação particular, mas inspirada pelo Espírito Santo."),
  
  // 19. Tema: Os 10 Mandamentos 1, 2, 3 (Ex 34, 27-29) -> Lesson 22
  createLesson(22, "Mandamentos 1-3", "Amor a Deus", "Êxodo 34,27-29", "Amar a Deus sobre todas as coisas e santificar o Seu Nome e o Seu Dia."),
  
  // 20. Mandamentos 4 e 5 (Ex 20,12) -> Lesson 23
  createLesson(23, "Mandamentos 4-5", "Honra e Vida", "Êxodo 20,12", "Honra teu pai e tua mãe. Não matarás: a defesa da vida desde a concepção."),
  
  // Dogmas Marianos -> Lesson 24
  createLesson(24, "Dogmas Marianos", "Verdades de Fé", "Lucas 1,26-28", "Imaculada Conceição, Mãe de Deus, Sempre Virgem e Assunção aos Céus."),
  
  // 21. Tema: Os 10 Mandamentos 6,9 (Mt 5,27-28) -> Lesson 25
  createLesson(25, "Mandamentos 6 e 9", "Pureza e Castidade", "Mateus 5,27-28", "Bem-aventurados os puros de coração. O corpo como templo do Espírito Santo."),
  
  // 22.Tema:  Os 10 Mandamentos 7, 8, 10 (Romanos 13,9) -> Lesson 26
  createLesson(26, "Mandamentos 7, 8, 10", "Justiça e Verdade", "Romanos 13,9", "Não furtarás, não levantarás falso testemunho, não cobiçarás as coisas alheias."),
  
  // 23.Tema:  Intercessão - Os Santos rezam por nós? -> Lesson 27
  createLesson(27, "Intercessão", "Comunhão dos Santos", "Atos 7,52-60", "Os santos no céu intercedem por nós diante de Deus, como uma grande nuvem de testemunhas."),
  
  // 24. Tema: Santos, Herois da fé -> Lesson 28
  createLesson(28, "Heróis da Fé", "Modelos de Vida", "Hebreus 11", "Exemplos de homens e mulheres que deram a vida pelo Evangelho."),
  
  // 25. Tema: Os anjos (Apocalipse 12,7-9) -> Lesson 29
  createLesson(29, "Os Anjos", "Exército Celeste", "Apocalipse 12,7-9", "Miguel e seus anjos batalhavam contra o dragão. Eles são mensageiros e protetores."),
  
  // 26. Tema: O Espirito Santo, O DOM DE DEUS (Atos 2,1-11) -> Lesson 30
  createLesson(30, "Dons do Espírito", "Pentecostes", "Atos 2,1-11", "Recebei o poder do Espírito Santo. Os 7 dons para a santificação."),
  
  // 27. Tema: Tempo liturgico e o Natal (Lucas 1,30-33) -> Lesson 31
  createLesson(31, "Tempo Litúrgico", "O Ano da Igreja", "Lucas 1,30-33", "Vivendo os mistérios de Cristo no tempo: Advento, Natal, Quaresma, Páscoa."),
  
  // 28.Encontro com padrinhos e Madrinhas -> Lesson 32
  createLesson(32, "Padrinhos", "Guias na Fé", "Eclesiástico 6,5-17", "Amigo fiel é uma poderosa proteção. A responsabilidade dos padrinhos."),
  
  // Revisão e confraternização -> Lesson 33
  createLesson(33, "Revisão Final", "Preparação", "Efésios 6,1-2", "Revisão completa de todo o conteúdo para a Crisma.", "review"),
  
  // Prova -> Lesson 34
  createLesson(34, "Prova Final", "Crisma 2026", "Efésios 4,32", "Exame final para certificar a preparação do crismando.", "exam")
];
