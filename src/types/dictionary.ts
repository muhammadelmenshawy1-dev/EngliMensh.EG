export type TranslationStyle = 'msa' | 'egyptian_arabic' | 'en';

export type LexicalCategory =
  | 'education'
  | 'culture_arts'
  | 'politics_law'
  | 'economy_trade'
  | 'science_tech'
  | 'health_body'
  | 'environment'
  | 'daily_life'
  | 'All';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'idiom'
  | 'phrase'
  | 'preposition'
  | 'conjunction';

export type DictionarySortOption = 'a-z' | 'z-a' | 'category' | 'pos';

export interface DictionaryEntry {
  id: string;
  word?: string;
  english?: string;
  arabic?: string;
  phonetics?: string;
  ipa?: string | { us?: string; uk?: string; [key: string]: any };
  pos?: PartOfSpeech;
  partOfSpeech?: PartOfSpeech;
  category?: LexicalCategory;
  definitionEn?: string;
  definitionAr?: string;
  exampleSentenceEn?: string;
  exampleSentenceAr?: string;
  exampleEn?: string;
  exampleAr?: string;
  synonyms?: string[];
  antonyms?: string[];
  gradeLevel?: string;
  unitNumber?: number;
  [key: string]: any;
}

export interface GradeCurriculumManifest {
  id?: string;
  gradeId?: string;
  gradeNameEn?: string;
  gradeNameAr?: string;
  gradeLabel?: string;
  stage?: string;
  textbook?: string;
  edition?: string;
  expectedUnits?: number;
  processedSections?: number;
  expectedSections?: number;
  extractedItems?: number;
  validatedItems?: number;
  importedItems?: number;
  totalWords?: number;
  [key: string]: any;
}

export interface DictionaryCoverageReport {
  totalEntries?: number;
  totalGradesCount?: number;
  totalUnitsCount?: number;
  totalImportedCount?: number;
  totalExtractedCount?: number;
  totalValidatedCount?: number;
  categoriesCount?: Record<string, number>;
  partsOfSpeechCount?: Record<string, number>;
  generatedAt?: string;
  manifests?: GradeCurriculumManifest[];
  [key: string]: any;
}

export interface AlternativeSense {
  meaning: string;
  context: string;
  partOfSpeech?: string;
  exampleEn?: string;
  exampleAr?: string;
}

export interface TranslationRequest {
  text: string;
  sourceLang?: 'auto' | 'en' | 'ar';
  targetLang?: 'en' | 'ar';
  style?: TranslationStyle;
}

export interface TranslationResponse {
  success: boolean;
  translation: string;
  detectedSourceLang: 'English' | 'Arabic' | string;
  styleUsed?: TranslationStyle;
  alternativeSenses?: AlternativeSense[];
  note?: string;
  error?: string;
  requiresApiKey?: boolean;
  fromCache?: boolean;
}
