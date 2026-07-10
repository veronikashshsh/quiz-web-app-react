export interface Flashcard {
  question: string;
  answer: string;
}

export interface Quiz {
  id?: string;
  name: string;
  flashcards: Flashcard[];
  successRate?: number;
}

export interface QuizEditorModalProps {
  quiz: Quiz;
  isGuest: boolean;
  onClose: () => void;
}

export interface CreateQuizModalProps {
  isOpen: boolean;
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export interface UserQuizAreaProps {
  Rate: number;
}

export interface QuizCardProps {
  quiz: Quiz;         
  isGuest: boolean;
  onDelete: () => void;
  onEdit: (quiz: Quiz) => void;
}