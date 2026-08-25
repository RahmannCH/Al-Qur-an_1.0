// Web Speech API wrapper for Quran memorization voice testing
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface VoiceEngineOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (result: SpeechRecognitionResult) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
  onStart?: () => void;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}

export function createVoiceEngine(options: VoiceEngineOptions = {}) {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = options.lang || "ar-SA";
  recognition.continuous = options.continuous ?? false;
  recognition.interimResults = options.interimResults ?? true;
  recognition.maxAlternatives = 3;

  recognition.onresult = (event: any) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      options.onResult?.({
        transcript: result[0].transcript,
        confidence: result[0].confidence,
        isFinal: result.isFinal,
      });
    }
  };

  recognition.onerror = (event: any) => {
    options.onError?.(event.error);
  };

  recognition.onend = () => {
    options.onEnd?.();
  };

  recognition.onstart = () => {
    options.onStart?.();
  };

  return {
    start: () => recognition.start(),
    stop: () => recognition.stop(),
    abort: () => recognition.abort(),
  };
}

export function normalizeArabicText(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, "")
    .replace(/\u0671/g, "\u0627")
    .replace(/[\u0622\u0623\u0625]/g, "\u0627")
    .replace(/\u0629/g, "\u0647")
    .replace(/\s+/g, " ")
    .trim();
}

export function compareArabicTexts(
  spoken: string,
  expected: string
): { accuracy: number; matchedWords: boolean[]; totalWords: number } {
  const spokenNorm = normalizeArabicText(spoken);
  const expectedNorm = normalizeArabicText(expected);

  const expectedWords = expectedNorm.split(/\s+/);
  const spokenWords = spokenNorm.split(/\s+/);
  const totalWords = expectedWords.length;

  const matchedWords = expectedWords.map((word, idx) => {
    if (idx < spokenWords.length) {
      return spokenWords[idx] === word;
    }
    return false;
  });

  const matched = matchedWords.filter(Boolean).length;
  const accuracy = totalWords > 0 ? Math.round((matched / totalWords) * 100) : 0;

  return { accuracy, matchedWords, totalWords };
}
