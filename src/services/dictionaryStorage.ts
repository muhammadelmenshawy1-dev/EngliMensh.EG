const ENG_DICT_FAVORITES_KEY = 'englimensh_dictionary_favorites_v1';
const ENG_DICT_RECENT_KEY = 'englimensh_dictionary_recent_v1';
const ENG_DICT_PREFS_KEY = 'englimensh_dictionary_preferences_v1';

export interface DictionaryPreferences {
  preferredAccent: 'us' | 'uk';
  speechRate: number; // 0.8 to 1.0
}

export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(ENG_DICT_FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load dictionary favorites:', err);
    return [];
  }
};

export const toggleFavorite = (wordId: string): string[] => {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(wordId);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter((id) => id !== wordId);
    } else {
      updated = [...favorites, wordId];
    }
    localStorage.setItem(ENG_DICT_FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update dictionary favorites:', err);
    return getFavorites();
  }
};

export const isFavorite = (wordId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(wordId);
};

export const getRecentSearches = (): string[] => {
  try {
    const data = localStorage.getItem(ENG_DICT_RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load recent searches:', err);
    return [];
  }
};

export const addRecentSearch = (term: string): string[] => {
  if (!term || !term.trim()) return getRecentSearches();
  const trimmed = term.trim();
  try {
    const recent = getRecentSearches().filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...recent].slice(0, 10); // Keep top 10
    localStorage.setItem(ENG_DICT_RECENT_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save recent search:', err);
    return getRecentSearches();
  }
};

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(ENG_DICT_RECENT_KEY);
  } catch (err) {
    console.error('Failed to clear recent searches:', err);
  }
};

export const getDictionaryPreferences = (): DictionaryPreferences => {
  try {
    const data = localStorage.getItem(ENG_DICT_PREFS_KEY);
    if (data) return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load preferences:', err);
  }
  return { preferredAccent: 'us', speechRate: 0.85 };
};

export const saveDictionaryPreferences = (prefs: Partial<DictionaryPreferences>): DictionaryPreferences => {
  const current = getDictionaryPreferences();
  const updated = { ...current, ...prefs };
  try {
    localStorage.setItem(ENG_DICT_PREFS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save preferences:', err);
  }
  return updated;
};
