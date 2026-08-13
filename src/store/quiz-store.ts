import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSession {
  quizId: string;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  score: number;
  timeStarted: number;
  completed: boolean;
}

export interface QuizResult {
  quizId: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  badge?: string;
}

interface QuizState {
  currentSession: QuizSession | null;
  results: QuizResult[];
  startQuiz: (questions: QuizQuestion[]) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  addResult: (result: QuizResult) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      results: [],

      startQuiz: (questions) =>
        set({
          currentSession: {
            quizId: Date.now().toString(),
            questions,
            currentIndex: 0,
            answers: new Array(questions.length).fill(null),
            score: 0,
            timeStarted: Date.now(),
            completed: false,
          },
        }),

      answerQuestion: (answerIndex) =>
        set((state) => {
          if (!state.currentSession) return state;
          const session = { ...state.currentSession };
          const currentQuestion = session.questions[session.currentIndex];
          session.answers[session.currentIndex] = answerIndex;

          if (answerIndex === currentQuestion.correctIndex) {
            session.score += 1;
          }

          return { currentSession: session };
        }),

      nextQuestion: () =>
        set((state) => {
          if (!state.currentSession) return state;
          const session = { ...state.currentSession };
          if (session.currentIndex < session.questions.length - 1) {
            session.currentIndex += 1;
          }
          return { currentSession: session };
        }),

      completeQuiz: () =>
        set((state) => {
          if (!state.currentSession) return state;
          const session = { ...state.currentSession };
          session.completed = true;
          return { currentSession: session };
        }),

      resetQuiz: () => set({ currentSession: null }),

      addResult: (result) =>
        set((state) => ({
          results: [...state.results, result],
        })),
    }),
    {
      name: "quiz-storage",
    }
  )
);
