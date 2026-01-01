export interface MemoryBlock {
  address: number;
  hexAddress: string;
  value: number | string | null;
  variableName?: string;
  isPointer: boolean;
  highlight: boolean;
  color?: string;
}

export interface Variable {
  id: string;
  name: string;
  type: 'int' | 'int*';
  value: any;
  address: number;
}

export enum Section {
  DEFINITION = 'definition',
  ANALOGY = 'analogy',
  SIMULATOR = 'simulator',
  PITFALLS = 'pitfalls',
  TUTOR = 'tutor'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}