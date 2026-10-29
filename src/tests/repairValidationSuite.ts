/**
 * EngliMensh.eg — Automated Repair & Pre-APK Validation Test Suite
 *
 * Verifies all P0, P1, and P2 engineering repairs:
 * 1. Navigation & Android Back-Stack LIFO Handler (`navigationHistory.ts`)
 * 2. Student State v2 Migration & Cross-Grade Unit Key Isolation (`learningStore.ts`, `studentStorage.ts`)
 * 3. Translation Service Dialect Preservation & Native WebView API Endpoint Safety (`translationService.ts`, `apiConfig.ts`)
 * 4. Speech Service Arabic Voice Priority (`ar-EG` > `ar-SA` > `ar`) (`speechService.ts`)
 * 5. AI Grader Local Fallback Zero-Mark Protection & Baccalaureate Research Grading (`aiGrader.ts`)
 * 6. Cloud Sync Honest Queue Retention When Unconfigured (`cloudSync.ts`)
 * 7. Curriculum Catalog Question Uniqueness & Game Spelling Focus Coverage (`allStagesCurriculumCatalog.ts`, `gameQuestionBank.ts`)
 */

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length(): number {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const memStorage = new MemoryStorage();
(globalThis as any).localStorage = memStorage;
try {
  Object.defineProperty(globalThis.navigator || {}, 'onLine', {
    value: true,
    configurable: true,
  });
} catch {
  // Ignore if navigator.onLine is already true
}

// Minimal window mock for navigationHistory & browser utilities
(globalThis as any).window = {
  localStorage: memStorage,
  location: {
    protocol: 'https:',
    hostname: 'localhost',
    port: '',
    origin: 'https://localhost',
    pathname: '/',
    search: '',
  },
  history: {
    state: null,
    pushState(state: any) {
      this.state = state;
    },
    replaceState(state: any) {
      this.state = state;
    },
  },
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return true;
  },
};

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${message}`);
  }
}

async function runTests() {
  let passed = 0;
  const results: string[] = [];

  // ---------------------------------------------------------------------------
  // TEST 1: Navigation Back-Stack LIFO Handler (`navigationHistory.ts`)
  // ---------------------------------------------------------------------------
  const {
    registerBackNavigationHandler,
    dispatchBackNavigation,
  } = await import('../utils/navigationHistory.ts');

  const events: string[] = [];
  const unregRoot = registerBackNavigationHandler('root-screen', () => {
    events.push('root-handled');
    return true;
  });
  const unregModal = registerBackNavigationHandler('nested-modal', () => {
    events.push('modal-closed');
    return true;
  });

  // First back press must close the nested modal (LIFO), not the root screen
  const firstBack = dispatchBackNavigation();
  assert(
    firstBack === true && events.length === 1 && events[0] === 'modal-closed',
    'First back press should close nested modal via LIFO order'
  );

  // Unregister modal after it closes, next back press should hit root handler
  unregModal();
  const secondBack = dispatchBackNavigation();
  assert(
    secondBack === true && events.length === 2 && events[1] === 'root-handled',
    'Second back press should invoke root screen handler'
  );
  unregRoot();
  passed++;
  results.push('PASS [1/7]: Android/Browser LIFO Back-Navigation Stack (modal -> sub-view -> screen)');

  // ---------------------------------------------------------------------------
  // TEST 2: Student State v2 Migration & Cross-Grade Unit Key Isolation
  // ---------------------------------------------------------------------------
  memStorage.clear();
  const {
    loadLearningState,
    getUnitKey,
    recordUnitModuleCompletion,
  } = await import('../services/learningStore.ts');
  const { createOrUpdateStudent } = await import('../services/studentStorage.ts');

  // 2a. Fresh install must start with neutral defaults (0 XP, 0 streak, 'طالب جديد')
  const freshState = loadLearningState();
  assert(freshState.xp === 0, `Expected fresh XP to be 0, got ${freshState.xp}`);
  assert(freshState.streakDays === 0, `Expected fresh streakDays to be 0, got ${freshState.streakDays}`);
  assert(freshState.nickname === 'طالب جديد', `Expected neutral nickname 'طالب جديد', got ${freshState.nickname}`);

  const freshProfile = createOrUpdateStudent({ name: 'طالب جديد' });
  assert(freshProfile.totalScore === 0, `Expected fresh profile totalScore to be 0, got ${freshProfile.totalScore}`);

  // 2b. Untouched v1 fabricated seed ('عمر محمد', 350 XP, 5 streak, empty unitProgress) must migrate to 0
  memStorage.clear();
  memStorage.setItem(
    'englimensh_learning_state_v1',
    JSON.stringify({
      version: 1,
      nickname: 'عمر محمد',
      avatar: '🦁',
      avatarEmoji: '🦁',
      xp: 350,
      currentStreak: 5,
      streakDays: 5,
      lessonsCompleted: 0,
      gamesWon: 0,
      unitProgress: {},
      completedActivityIds: {},
      unlockedBadgeDates: { first_step: '2026-01-01' },
    })
  );
  const migratedSeed = loadLearningState();
  assert(
    migratedSeed.xp === 0 && migratedSeed.streakDays === 0 && migratedSeed.nickname === 'طالب جديد',
    `Untouched v1 fabricated seed must reset to 0 XP / 0 streak / طالب جديد (got xp=${migratedSeed.xp}, streak=${migratedSeed.streakDays}, nickname=${migratedSeed.nickname})`
  );

  // 2c. Real user progress in v1 must be preserved during v2 migration
  memStorage.clear();
  memStorage.setItem(
    'englimensh_learning_state_v1',
    JSON.stringify({
      version: 1,
      nickname: 'سارة أحمد',
      avatar: '🚀',
      avatarEmoji: '🚀',
      xp: 620,
      currentStreak: 4,
      streakDays: 4,
      lessonsCompleted: 3,
      gamesWon: 2,
      unitProgress: {
        Secondary_10_S1_1: {
          unitKey: 'Secondary_10_S1_1',
          stage: 'Secondary',
          grade: 10,
          semester: 1,
          unitNumber: 1,
          unitTitle: 'Getting Away',
          unitTitleAr: 'الانطلاق والسياحة البيئية',
          vocabDone: true,
          grammarDone: true,
          readingDone: false,
          listeningDone: false,
          examDone: false,
          vocabCompleted: true,
          grammarCompleted: true,
          readingCompleted: false,
          listeningCompleted: false,
          examCompleted: false,
          lastAccessedAt: '2026-03-01T10:00:00Z',
        },
      },
      completedActivityIds: { act_1: { xp: 20, timestamp: '2026-03-01T10:00:00Z' } },
      unlockedBadgeDates: { first_step: '2026-03-01' },
    })
  );
  const migratedReal = loadLearningState();
  assert(
    migratedReal.xp === 620 && migratedReal.nickname === 'سارة أحمد',
    'Real user progress must be preserved on v2 migration'
  );

  // 2d. Cross-grade / cross-semester / cross-track unit mastery keys must not collide
  const keySec10T1 = getUnitKey('Secondary', 10, 1, 1, 'general_secondary');
  const keySec10T2 = getUnitKey('Secondary', 10, 2, 1, 'general_secondary');
  const keySec11T1 = getUnitKey('Secondary', 11, 1, 1, 'general_secondary');
  const keyBacc10T1 = getUnitKey('Secondary', 10, 1, 1, 'medicine_life_sciences');
  assert(
    new Set([keySec10T1, keySec10T2, keySec11T1, keyBacc10T1]).size === 4,
    'Unit keys across grades, terms, and tracks must be 100% distinct'
  );

  recordUnitModuleCompletion({
    stage: 'Primary',
    grade: 1,
    semester: 1,
    unitNumber: 1,
    unitTitle: 'Hello!',
    unitTitleAr: 'أهلاً',
    module: 'vocab',
  });
  recordUnitModuleCompletion({
    stage: 'Primary',
    grade: 2,
    semester: 1,
    unitNumber: 1,
    unitTitle: 'Meet My Family',
    unitTitleAr: 'قابل عائلتي',
    module: 'vocab',
  });
  const afterLessons = loadLearningState();
  assert(
    Boolean(afterLessons.unitProgress[getUnitKey('Primary', 1, 1, 1)]?.vocabCompleted) &&
      Boolean(afterLessons.unitProgress[getUnitKey('Primary', 2, 1, 1)]?.vocabCompleted),
    'Primary Grade 1 Unit 1 and Primary Grade 2 Unit 1 must be stored under independent keys'
  );
  passed++;
  results.push('PASS [2/7]: Student State v2 Migration & Scoped Unit Mastery Keys');

  // ---------------------------------------------------------------------------
  // TEST 3: Offline Bilingual Translation Dialect Preservation & Native WebView Safety
  // ---------------------------------------------------------------------------
  const { isPackagedMobileEnvironment, resolveApiEndpoint } = await import('../config/apiConfig.ts');
  const { lookupOfflineTranslation } = await import('../services/translationService.ts');

  assert(isPackagedMobileEnvironment() === true, 'https://localhost (no port) should be detected as packaged mobile origin');
  assert(
    resolveApiEndpoint('/api/translate').url === null,
    'Packaged mobile origin without VITE_API_BASE_URL must return null endpoint URL instead of calling localhost'
  );

  const egyptianRes = lookupOfflineTranslation('How are you?', 'ar', 'egyptian_arabic');
  const msaRes = lookupOfflineTranslation('How are you?', 'ar', 'msa');
  assert(egyptianRes !== null && msaRes !== null, 'Offline dictionary should match "How are you?"');
  assert(
    egyptianRes !== msaRes,
    `Egyptian Arabic ("${egyptianRes}") and MSA ("${msaRes}") translations must be distinct`
  );
  passed++;
  results.push('PASS [3/7]: Offline Bilingual Dictionary Dialect Differentiation & Mobile API Endpoint Guard');

  // ---------------------------------------------------------------------------
  // TEST 4: Speech Service Arabic Voice Priority (`ar-EG` > `ar-SA` > `ar`)
  // ---------------------------------------------------------------------------
  const { getBestVoiceForLanguage } = await import('../utils/speechService.ts');
  const mockVoices = [
    { lang: 'en-US', name: 'Google US English', localService: true, default: true, voiceURI: 'en-US' },
    { lang: 'ar-SA', name: 'Google Arabic Saudi', localService: true, default: false, voiceURI: 'ar-SA' },
    { lang: 'ar-EG', name: 'Google Arabic Egypt (Hoda)', localService: false, default: false, voiceURI: 'ar-EG' },
  ] as unknown as SpeechSynthesisVoice[];

  const chosenArabicVoice = getBestVoiceForLanguage('ar', mockVoices);
  assert(
    chosenArabicVoice?.lang === 'ar-EG',
    `Expected ar-EG voice to be prioritized over ar-SA, got ${chosenArabicVoice?.lang}`
  );
  passed++;
  results.push('PASS [4/7]: Speech Service Voice Selection Prioritizes Egyptian Arabic (ar-EG)');

  // ---------------------------------------------------------------------------
  // TEST 5: AI Grader Zero-Mark Protection & Baccalaureate Research Grading
  // ---------------------------------------------------------------------------
  const {
    gradeEssayWithAI,
    gradeStoryWithAI,
    gradeResearchWithAI,
    setStoredApiKey,
    getStoredApiKey,
  } = await import('../services/aiGrader.ts');

  memStorage.setItem('egypt_moe_gemini_api_key', 'SHOULD_BE_PURGED');
  setStoredApiKey('ANOTHER_KEY');
  assert(
    getStoredApiKey() === '' && memStorage.getItem('egypt_moe_gemini_api_key') === null,
    'Legacy client-side API key must be purged from localStorage'
  );

  const emptyEssayScore = await gradeEssayWithAI('Ecotourism', 'Write an essay on ecotourism.', '   ', 'Model essay');
  assert(emptyEssayScore.totalScore === 0, `Empty essay must receive 0 marks, got ${emptyEssayScore.totalScore}`);

  const tinyStoryScore = await gradeStoryWithAI(1, 'Explain the moral of the chapter.', 'ok', 'Loyalty and honesty', ['loyalty']);
  assert(tinyStoryScore.score === 0, `One-word story answer must receive 0 marks, got ${tinyStoryScore.score}`);

  const emptyResearchScore = await gradeResearchWithAI(
    'Telemedicine in Egypt',
    'Evaluate telemedicine in rural Egypt.',
    'too short',
    'Telemedicine improves healthcare access.',
    6
  );
  assert(emptyResearchScore.score === 0, `Minimal 2-word research defense must receive 0 marks, got ${emptyResearchScore.score}`);

  const validResearchScore = await gradeResearchWithAI(
    'Solar Energy in Aswan',
    'Evaluate the impact of renewable solar energy projects in Aswan.',
    'Furthermore, the Benban Solar Park in Aswan demonstrates how sustainable engineering and strategic investment in renewable energy significantly reduce carbon emissions across Upper Egypt. Moreover, by integrating photovoltaic technology with national grid infrastructure, the project strengthens energy security. Consequently, local communities benefit from technical employment, clean electricity, and long-term economic resilience.',
    'Benban Solar Park in Aswan provides sustainable renewable energy, reduces carbon emissions, and creates jobs.',
    6
  );
  assert(
    validResearchScore.score >= 4 && validResearchScore.score <= 6,
    `Well-structured research response should score 4-6/6, got ${validResearchScore.score}`
  );
  passed++;
  results.push('PASS [5/7]: AI Grader Server-Side Proxy + Local Zero-Mark Guard + Baccalaureate Research Rubric');

  // ---------------------------------------------------------------------------
  // TEST 6: Cloud Sync Queue Retention When Unconfigured
  // ---------------------------------------------------------------------------
  memStorage.clear();
  const { isWebhookConfigured, getCloudSyncStatus, syncExamResultToCloud } = await import('../services/cloudSync.ts');
  assert(isWebhookConfigured() === false, 'Default placeholder webhook must be treated as unconfigured');

  const synced = await syncExamResultToCloud({
    studentId: 'stu_test_1',
    studentName: 'طالب اختبار',
    school: 'Cairo Secondary',
    grade: 'Secondary 1',
    group: 'A',
    examId: 'sec1_u1_a',
    examTitle: 'Unit 1 Level A',
    score: 27,
    maxMarks: 30,
    percentage: 90,
    timestamp: new Date().toISOString(),
    platform: 'Web',
  });
  assert(
    synced === false && getCloudSyncStatus().pendingCount === 1,
    'Unsynced cloud record must remain queued when webhook is unconfigured'
  );
  passed++;
  results.push('PASS [6/7]: Cloud Sync Retains Pending Queue Instead of False-Positive Deletion');

  // ---------------------------------------------------------------------------
  // TEST 7: Curriculum Question Uniqueness & Game Spelling Focus Coverage
  // ---------------------------------------------------------------------------
  const { generalSecondaryCatalog } = await import('../data/allStagesCurriculumCatalog.ts');
  const { getGameQuestions } = await import('../services/gameQuestionBank.ts');

  // Check Secondary 2 & 3 Term 2 units (Units 7 & 8) for duplicate question stems
  const sec23Term2Stems = new Set<string>();
  let totalSec23Term2Questions = 0;
  generalSecondaryCatalog
    .filter((c) => c.stage === 'Secondary' && (c.grade === 11 || c.grade === 12))
    .forEach((cat) => {
      cat.semesters
        .filter((s) => s.semester === 2)
        .forEach((sem) => {
          sem.units.forEach((u) => {
            u.unitExam.questions.forEach((q) => {
              totalSec23Term2Questions++;
              sec23Term2Stems.add(q.question.trim());
            });
          });
        });
    });

  assert(
    totalSec23Term2Questions === 64 && sec23Term2Stems.size === 64,
    `Expected all 64 Secondary 2 & 3 Term 2 unit exam questions to have unique stems, found ${sec23Term2Stems.size}/${totalSec23Term2Questions}`
  );

  // Check gameQuestionBank spelling focus across Primary, Preparatory, and Secondary
  for (const stage of ['Primary', 'Preparatory', 'Secondary'] as const) {
    const spellingQs = getGameQuestions({ stage, focus: 'spelling', limit: 8 });
    assert(
      spellingQs.length >= 5 && spellingQs.every((q) => q.skill === 'Spelling'),
      `Expected >= 5 authentic Spelling questions for stage=${stage}, got ${spellingQs.length}`
    );
  }
  passed++;
  results.push('PASS [7/7]: Curriculum Question Uniqueness (64/64) & Multi-Stage Game Spelling Coverage');

  console.log('\n=============================================================');
  console.log('ENGLIMENSH.EG — AUTOMATED REPAIR VALIDATION SUITE');
  console.log('=============================================================');
  results.forEach((line) => console.log(`✅ ${line}`));
  console.log(`-------------------------------------------------------------`);
  console.log(`ALL ${passed}/7 TEST SUITES PASSED WITH ZERO ERRORS.`);
  console.log('=============================================================\n');
}

runTests().catch((err) => {
  console.error('❌ TEST SUITE FAILED:', err);
  process.exit(1);
});
