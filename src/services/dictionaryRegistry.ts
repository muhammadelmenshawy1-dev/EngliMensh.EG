import { DictionaryEntry, LexicalCategory } from '../types/dictionary';
import { THEMATIC_DICTIONARY_ENTRIES } from '../data/thematicDictionaryDatabase';

class DictionaryRegistry {
  private entriesMap: Map<string, DictionaryEntry> = new Map();
  private englishWordIndexMap: Map<string, string> = new Map();
  private isLoaded: boolean = false;

  constructor() {
    this.initializeRegistry();
  }

  private initializeRegistry() {
    if (this.isLoaded) return;

    THEMATIC_DICTIONARY_ENTRIES.forEach((entry) => {
      this.registerEntry(entry);
    });

    this.isLoaded = true;
  }

  public registerEntry(entry: DictionaryEntry): void {
    const rawEnglish = entry.english || entry.word || '';
    if (!rawEnglish) return;

    const normEn = rawEnglish.trim().toLowerCase();

    if (this.englishWordIndexMap.has(normEn)) {
      const existingId = this.englishWordIndexMap.get(normEn)!;
      const existing = this.entriesMap.get(existingId);

      if (existing) {
        const mergedSynonyms = Array.from(new Set([...(existing.synonyms || []), ...(entry.synonyms || [])]));
        const updatedEntry: DictionaryEntry = {
          ...existing,
          synonyms: mergedSynonyms,
          exampleSentenceEn: existing.exampleSentenceEn || entry.exampleSentenceEn,
          exampleSentenceAr: existing.exampleSentenceAr || entry.exampleSentenceAr,
          phonetics: existing.phonetics || entry.phonetics,
        };
        this.entriesMap.set(existingId, updatedEntry);
        return;
      }
    }

    const formattedEntry: DictionaryEntry = {
      ...entry,
      english: rawEnglish,
      arabic: entry.arabic || '',
      word: rawEnglish,
    };

    this.entriesMap.set(entry.id, formattedEntry);
    this.englishWordIndexMap.set(normEn, entry.id);
  }

  public getAllEntries(): DictionaryEntry[] {
    this.initializeRegistry();
    return Array.from(this.entriesMap.values());
  }

  public getEntryById(id: string): DictionaryEntry | undefined {
    this.initializeRegistry();
    return this.entriesMap.get(id);
  }

  public getEntryByEnglish(english: string): DictionaryEntry | undefined {
    this.initializeRegistry();
    const id = this.englishWordIndexMap.get(english.trim().toLowerCase());
    return id ? this.entriesMap.get(id) : undefined;
  }

  public getEntriesByCategory(category: LexicalCategory | 'All'): DictionaryEntry[] {
    const all = this.getAllEntries();
    if (category === 'All') return all;
    return all.filter((e) => e.category === category);
  }
}

export const dictionaryRegistry = new DictionaryRegistry();
