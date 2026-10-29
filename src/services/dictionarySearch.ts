import {
  DictionaryEntry,
  PartOfSpeech,
  DictionarySortOption,
  LexicalCategory,
} from '../types/dictionary';

export const normalizeArabicText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip diacritics
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim()
    .toLowerCase();
};

export const normalizeEnglishText = (text: string): string => {
  if (!text) return '';
  return text.trim().toLowerCase();
};

export const detectLanguage = (text: string): 'ar' | 'en' => {
  if (!text || !text.trim()) return 'en';
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text) ? 'ar' : 'en';
};

export interface ComprehensiveSearchOptions {
  query?: string;
  category?: LexicalCategory | 'All';
  letter?: string; // 'A' through 'Z' or 'All'
  pos?: PartOfSpeech | 'All';
  favoritesOnly?: boolean;
  favoritesList?: string[];
  sort?: DictionarySortOption;
}

export interface SearchResultSummary {
  entries: DictionaryEntry[];
  totalMatches: number;
  detectedLang: 'ar' | 'en';
  suggestions: string[];
}

export const filterAndRankDictionaryEntries = (
  entries: DictionaryEntry[],
  options: ComprehensiveSearchOptions
): SearchResultSummary => {
  const {
    query = '',
    category = 'All',
    letter = 'All',
    pos = 'All',
    favoritesOnly = false,
    favoritesList = [],
    sort = 'a-z',
  } = options;

  const detectedLang = detectLanguage(query);
  const normQueryEn = normalizeEnglishText(query);
  const normQueryAr = normalizeArabicText(query);

  const matchedEntries: { entry: DictionaryEntry; score: number }[] = [];

  entries.forEach((entry) => {
    // 1. Favorites check
    if (favoritesOnly) {
      const isFav =
        favoritesList.includes(entry.id) ||
        favoritesList.includes((entry.english || entry.word || '').toLowerCase());
      if (!isFav) return;
    }

    // 2. Thematic Category Filter
    if (category !== 'All' && entry.category !== category) {
      return;
    }

    // 3. Letter filter
    if (letter !== 'All' && letter.length === 1) {
      const headword = entry.english || entry.word || '';
      const firstChar = headword.charAt(0).toUpperCase();
      if (firstChar !== letter.toUpperCase()) return;
    }

    // 4. Part of Speech filter
    if (pos !== 'All' && entry.partOfSpeech !== pos && entry.pos !== pos) {
      return;
    }

    // 5. Search Query Scoring & Relevance Matching
    let score = 0;

    if (!normQueryEn && !normQueryAr) {
      score = 1;
    } else {
      const englishHeadword = normalizeEnglishText(entry.english || entry.word || '');
      const arabicTranslation = normalizeArabicText(entry.arabic || '');

      if (detectedLang === 'en') {
        // Priority 1: Exact English match
        if (englishHeadword === normQueryEn) {
          score += 100;
        }
        // Priority 2: English prefix match
        else if (englishHeadword.startsWith(normQueryEn)) {
          score += 50;
        }
        // Priority 3: English substring match
        else if (englishHeadword.includes(normQueryEn)) {
          score += 30;
        }

        if (entry.exampleSentenceEn && normalizeEnglishText(entry.exampleSentenceEn).includes(normQueryEn)) {
          score += 10;
        }
        if (entry.synonyms?.some((s: string) => normalizeEnglishText(s).includes(normQueryEn))) {
          score += 15;
        }
      } else {
        // Arabic query
        // Priority 1: Exact Arabic match
        if (arabicTranslation === normQueryAr) {
          score += 100;
        }
        // Priority 2: Arabic prefix match
        else if (arabicTranslation.startsWith(normQueryAr)) {
          score += 50;
        }
        // Priority 3: Arabic substring match
        else if (arabicTranslation.includes(normQueryAr)) {
          score += 30;
        }

        if (entry.exampleSentenceAr && normalizeArabicText(entry.exampleSentenceAr).includes(normQueryAr)) {
          score += 10;
        }
      }
    }

    if (score > 0) {
      matchedEntries.push({ entry, score });
    }
  });

  // Sort matched entries by score first, then by selected sort option
  matchedEntries.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const headA = a.entry.english || a.entry.word || '';
    const headB = b.entry.english || b.entry.word || '';

    if (sort === 'a-z') {
      return headA.localeCompare(headB);
    } else if (sort === 'z-a') {
      return headB.localeCompare(headA);
    } else if (sort === 'category') {
      const catA = a.entry.category || 'education';
      const catB = b.entry.category || 'education';
      return catA.localeCompare(catB);
    }
    return 0;
  });

  const finalEntries = matchedEntries.map((m) => m.entry);

  const suggestions: string[] = [];
  if (normQueryEn && finalEntries.length < 3) {
    entries.slice(0, 5).forEach((e) => {
      const word = e.english || e.word || '';
      if (word && !suggestions.includes(word)) {
        suggestions.push(word);
      }
    });
  }

  return {
    entries: finalEntries,
    totalMatches: finalEntries.length,
    detectedLang,
    suggestions: suggestions.slice(0, 4),
  };
};
