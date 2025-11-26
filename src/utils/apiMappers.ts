export type ApiProblemType = 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE';
export type ApiReviewGate = 'GATE_1' | 'GATE_2' | 'GRADUATED';

export function mapUiQuestionTypeToApi(
  type: 'multiple' | 'ox' | 'short' | 'essay',
): ApiProblemType {
  switch (type) {
    case 'multiple':
      return 'MCQ';
    case 'ox':
      return 'OX';
    case 'short':
      return 'SHORT';
    case 'essay':
      return 'SUBJECTIVE';
    default:
      return 'MCQ';
  }
}

export function mapUiStageToGate(stage: '1차관문' | '2차관문' | '완료'): ApiReviewGate {
  if (stage === '1차관문') return 'GATE_1';
  if (stage === '2차관문') return 'GATE_2';
  return 'GRADUATED';
}

export function mapGateToDisplayLabel(gate: ApiReviewGate): '1차관문' | '2차관문' | '완료' {
  if (gate === 'GATE_1') return '1차관문';
  if (gate === 'GATE_2') return '2차관문';
  return '완료';
}

export function parseKeywordsToArray(input: string): string[] {
  if (!input) return [];
  return input
    .split(/[,\n]/g)
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

export function mapOxAnswerToBoolean(answer: 'O' | 'X'): boolean {
  return answer === 'O';
}
