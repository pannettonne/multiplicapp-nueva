import { Question } from './types';

export class QuestionGenerator {
  private static techniques = {
    // Técnicas para tablas del 2-5
    2: [
      (n: number) => `Dobla el número: ${n} × 2 = ${n} + ${n} = ${n * 2}`,
      (n: number) => `El doble de ${n} es ${n * 2}`
    ],
    3: [
      (n: number) => `${n} × 3 = ${n} + ${n} + ${n} = ${n * 3}`,
      (n: number) => `${n} × 2 = ${n * 2}, más ${n} = ${n * 3}`
    ],
    4: [
      (n: number) => `4 es como 2 × 2, así que: ${n} × 4 = (${n} × 2) × 2 = ${n * 2} × 2 = ${n * 4}`,
      (n: number) => `Dobla dos veces: ${n} → ${n * 2} → ${n * 4}`
    ],
    5: [
      (n: number) => `La tabla del 5 termina en 5 o 0: ${n} × 5 = ${n * 5}`,
      (n: number) => `${n} × 5 es media tabla del 10: (${n} × 10) / 2 = ${n * 10} / 2 = ${n * 5}`,
      (n: number) => `Si n es par: ${n} × 5 = ${n / 2}0. Si n es impar: ${n} × 5 = ...${5}`
    ],
    6: [
      (n: number) => `${n} × 6 = ${n} × 5 + ${n} = ${n * 5} + ${n} = ${n * 6}`,
      (n: number) => `${n} × 6 = ${n} × 3 × 2 = ${n * 3} × 2 = ${n * 6}`
    ],
    7: [
      (n: number) => `${n} × 7 = ${n} × 5 + ${n} × 2 = ${n * 5} + ${n * 2} = ${n * 7}`,
      (n: number) => `${n} × 7 = (${n} × 10) - (${n} × 3) = ${n * 10} - ${n * 3} = ${n * 7}`
    ],
    8: [
      (n: number) => `8 = 2 × 2 × 2. Dobla 3 veces: ${n} → ${n * 2} → ${n * 4} → ${n * 8}`,
      (n: number) => `${n} × 8 = ${n} × 10 - ${n} × 2 = ${n * 10} - ${n * 2} = ${n * 8}`
    ],
    9: [
      (n: number) => `${n} × 9 = ${n} × 10 - ${n} = ${n * 10} - ${n} = ${n * 9}`,
      (n: number) => `Truco del 9: ${n} × 9, la suma de dígitos siempre = 9 (ej: ${n * 9})`
    ],
    10: [
      (n: number) => `${n} × 10 = añade un 0: ${n}0`
    ]
  };

  static generateQuestion(level: number): Question {
    const ranges = {
      1: { min: 1, max: 5 },
      2: { min: 6, max: 7 },
      3: { min: 8, max: 9 },
      4: { min: 1, max: 10 }
    };

    const range = ranges[level as keyof typeof ranges] || ranges[1];
    const a = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const b = Math.floor(Math.random() * 10) + 1;
    const answer = a * b;

    const techniques = this.techniques[a as keyof typeof this.techniques] || [];
    const technique = techniques.length > 0 
      ? techniques[Math.floor(Math.random() * techniques.length)](b)
      : '';

    const explanation = this.getExplanation(a, b, answer);

    return {
      a,
      b,
      answer,
      explanation,
      technique: technique || explanation
    };
  }

  private static getExplanation(a: number, b: number, result: number): string {
    return `${a} × ${b} = ${a} repetido ${b} veces = ${result}`;
  }

  static getRandomQuestionInRange(min: number, max: number): Question {
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * 10) + 1;
    const answer = a * b;

    const techniques = this.techniques[a as keyof typeof this.techniques] || [];
    const technique = techniques.length > 0
      ? techniques[Math.floor(Math.random() * techniques.length)](b)
      : this.getExplanation(a, b, answer);

    return {
      a,
      b,
      answer,
      explanation: this.getExplanation(a, b, answer),
      technique
    };
  }
}
