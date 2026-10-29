import { StudentProfile, ExamHistoryRecord, BadgeDefinition, SubjectiveSubmission } from '../types.ts';

const STUDENT_STORAGE_KEY = 'englimensh_student_profile_v3';
const ALL_STUDENTS_KEY = 'englimensh_all_registered_students_v1';
const SUBMISSIONS_KEY = 'englimensh_subjective_submissions_v1';
const LEGACY_NAME_KEY = 'englimensh_student_name';
const LEGACY_GROUP_KEY = 'englimensh_student_group';



export const ALL_BADGES: BadgeDefinition[] = [
  {
    id: 'first_step',
    title: 'New Explorer',
    titleAr: 'مستكشف جديد',
    description: 'Registered on EngliMensh and commenced secondary English mastery.',
    icon: '🚀',
    requiredPoints: 0,
  },
  {
    id: 'word_master',
    title: 'Word Master',
    titleAr: 'سيد المفردات',
    description: 'Mastered speed vocabulary and collocation challenges.',
    icon: '📚',
    requiredPoints: 100,
  },
  {
    id: 'grammar_champion',
    title: 'Grammar Champion',
    titleAr: 'بطل القواعد',
    description: 'Scored excellent marks in comprehensive structure and syntax drills.',
    icon: '⚡',
    requiredPoints: 200,
  },
  {
    id: 'high_achiever',
    title: 'High Achiever',
    titleAr: 'المتفوق المتميز',
    description: 'Scored 90% or higher in official ministerial examinations.',
    icon: '🏆',
    requiredPoints: 300,
  },
  {
    id: 'exam_ace',
    title: 'Exam Ace',
    titleAr: 'خبير البوكليت',
    description: 'Completed 3 or more full ministry-standard exam booklets.',
    icon: '🎯',
    requiredPoints: 400,
  },
  {
    id: 'streak_hero',
    title: 'Streak Hero',
    titleAr: 'بطل التحدي المتواصل',
    description: 'Maintained 5x or higher combo streak in educational games.',
    icon: '🔥',
    requiredPoints: 250,
  },
  {
    id: 'centurion',
    title: 'Centurion 500',
    titleAr: 'نادي الـ 500 نقطة',
    description: 'Earned 500+ XP points across testing modules and games.',
    icon: '👑',
    requiredPoints: 500,
  },
  {
    id: 'grand_master',
    title: 'EngliMensh Master',
    titleAr: 'ماستر المنشاوي',
    description: 'Accumulated over 1,000 XP points and reached the top ranking tiers.',
    icon: '🌟',
    requiredPoints: 1000,
  },
];

/**
 * Retrieve the current persistent student profile from localStorage.
 */
export const getStoredStudent = (): StudentProfile | null => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STUDENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name) {
        const email = parsed.email || '';
        const role = 'student';

        const studentId = parsed.id || `std_${Date.now()}`;
        const storedAvatar = getStudentAvatar(studentId) || parsed.avatarUrl;

        return {
          id: studentId,
          name: parsed.name,
          email: email,
          role: role,
          grade: parsed.grade || '1st Secondary',
          school: parsed.school || 'General Secondary School',
          group: parsed.group || 'Group A',
          totalScore: Number(parsed.totalScore) || 0,
          badges: Array.isArray(parsed.badges) ? parsed.badges : ['first_step'],
          lastActive: parsed.lastActive || new Date().toISOString(),
          createdAt: parsed.createdAt || new Date().toISOString(),
          examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
          gamesPlayed: Number(parsed.gamesPlayed) || 0,
          highStreak: Number(parsed.highStreak) || 0,
          avatarUrl: storedAvatar || undefined,
        };
      }
    }

    // Check legacy stored values
    const legacyName = localStorage.getItem(LEGACY_NAME_KEY);
    const legacyGroup = localStorage.getItem(LEGACY_GROUP_KEY);
    if (legacyName && legacyName.trim()) {
      const migrated: StudentProfile = {
        id: `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: legacyName.trim(),
        email: '',
        role: 'student',
        grade: '1st Secondary',
        school: 'General Secondary School',
        group: legacyGroup && legacyGroup.trim() ? legacyGroup.trim() : 'Group A',
        totalScore: 100,
        badges: ['first_step'],
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        examHistory: [],
        gamesPlayed: 0,
        highStreak: 0,
      };
      saveStudent(migrated);
      return migrated;
    }
  } catch (err) {
    console.error('Error reading student profile from localStorage:', err);
  }

  return null;
};

/**
 * Quota recovery helper to purge obsolete or oversized cached items if localStorage quota is exceeded.
 */
export const cleanStorageQuota = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const val = localStorage.getItem(key);
        // Identify oversized cached items or stale avatar strings
        if (val && val.length > 80000 && (key.startsWith('student_profile_avatar_') || key.includes('temp') || key.includes('cache'))) {
          keysToRemove.push(key);
        }
      } catch {
        // ignore
      }
    }
    keysToRemove.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    });
  } catch (e) {
    console.warn('Storage quota cleanup exception:', e);
  }
};

/**
 * Save student profile into localStorage and sync to the students registry.
 */
export const saveStudent = (profile: StudentProfile): void => {
  if (typeof window === 'undefined') return;
  try {
    const email = profile.email || '';
    const role = 'student';
    const updated: StudentProfile = {
      ...profile,
      email,
      role,
      lastActive: new Date().toISOString(),
    };

    // To prevent QuotaExceededError, ensure avatarUrl is not bloated in the main profile JSON.
    // Avatar is already independently persisted in `student_profile_avatar_${id}`.
    const storageProfile: StudentProfile = { ...updated };
    if (storageProfile.avatarUrl && storageProfile.avatarUrl.length > 25000) {
      delete storageProfile.avatarUrl;
    }

    try {
      localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(storageProfile));
    } catch (quotaErr) {
      console.warn('Storage quota exceeded in saveStudent, performing cleanup and retrying...', quotaErr);
      cleanStorageQuota();
      // Remove avatarUrl unconditionally from the storage object to minimize payload
      delete storageProfile.avatarUrl;
      if (storageProfile.examHistory && storageProfile.examHistory.length > 25) {
        storageProfile.examHistory = storageProfile.examHistory.slice(0, 25);
      }
      try {
        localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(storageProfile));
      } catch (innerErr) {
        console.warn('Critical quota retry in saveStudent:', innerErr);
      }
    }

    try {
      localStorage.setItem(LEGACY_NAME_KEY, updated.name);
      localStorage.setItem(LEGACY_GROUP_KEY, updated.group);
    } catch {
      // Non-fatal legacy mirrors
    }

    // Save into all registered students directory
    updateStudentInRegistry(updated);
  } catch (err) {
    console.error('Error saving student profile:', err);
  }
};

/**
 * Create a new student or update an existing one.
 */
export const createOrUpdateStudent = (data: Partial<StudentProfile>): StudentProfile => {
  const current = getStoredStudent();
  const now = new Date().toISOString();
  const email = data.email !== undefined ? data.email.trim() : (current?.email || '');
  const role = 'student';

  const profile: StudentProfile = {
    id: current?.id || data.id || `std_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: data.name ? data.name.trim() : current?.name || 'Student',
    email,
    role,
    grade: data.grade ? data.grade.trim() : current?.grade || '1st Secondary',
    school: data.school ? data.school.trim() : current?.school || 'General Secondary School',
    group: data.group ? data.group.trim() : current?.group || 'Group A',
    totalScore: data.totalScore !== undefined ? data.totalScore : (current?.totalScore || 0),
    badges: current?.badges && current.badges.length > 0 ? current.badges : ['first_step'],
    lastActive: now,
    createdAt: current?.createdAt || now,
    examHistory: current?.examHistory || [],
    gamesPlayed: data.gamesPlayed !== undefined ? data.gamesPlayed : (current?.gamesPlayed || 0),
    highStreak: data.highStreak !== undefined ? data.highStreak : (current?.highStreak || 0),
    avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : (current?.avatarUrl || (current?.id ? getStudentAvatar(current.id) || undefined : undefined)),
  };

  saveStudent(profile);
  return profile;
};

/**
 * Get the stored Base64 avatar for a student.
 */
export const getStudentAvatar = (studentId?: string): string | null => {
  if (typeof window === 'undefined') return null;
  const id = studentId || getStoredStudent()?.id;
  if (!id) return null;
  try {
    return (
      localStorage.getItem(`student_profile_avatar_${id}`) ||
      sessionStorage.getItem(`student_profile_avatar_${id}`) ||
      null
    );
  } catch {
    return null;
  }
};

/**
 * Save Base64 avatar image string to localStorage and update active student profile.
 */
export const saveStudentAvatar = (studentId: string, base64Data: string): StudentProfile | null => {
  if (typeof window === 'undefined') return null;
  try {
    try {
      localStorage.setItem(`student_profile_avatar_${studentId}`, base64Data);
    } catch (quotaErr) {
      console.warn('Quota exceeded on avatar key, running quota cleanup...', quotaErr);
      cleanStorageQuota();
      try {
        localStorage.setItem(`student_profile_avatar_${studentId}`, base64Data);
      } catch (innerErr) {
        console.warn('localStorage exhausted for avatar, falling back to sessionStorage:', innerErr);
        try {
          sessionStorage.setItem(`student_profile_avatar_${studentId}`, base64Data);
        } catch {
          // ignore
        }
      }
    }

    const current = getStoredStudent();
    if (current && current.id === studentId) {
      current.avatarUrl = base64Data;
      saveStudent(current);
      return current;
    }
    return current;
  } catch (err) {
    console.error('Failed to save student avatar:', err);
    return null;
  }
};

/**
 * Remove stored avatar for a student.
 */
export const removeStudentAvatar = (studentId: string): StudentProfile | null => {
  if (typeof window === 'undefined') return null;
  try {
    try {
      localStorage.removeItem(`student_profile_avatar_${studentId}`);
      sessionStorage.removeItem(`student_profile_avatar_${studentId}`);
    } catch {
      // ignore
    }
    const current = getStoredStudent();
    if (current && current.id === studentId) {
      delete current.avatarUrl;
      saveStudent(current);
      return current;
    }
    return current;
  } catch (err) {
    console.error('Failed to remove student avatar from localStorage:', err);
    return null;
  }
};

/**
 * Add points to student and check if any point-based badges are unlocked.
 */
export const addStudentPoints = (points: number): { student: StudentProfile; newBadges: string[] } => {
  let student = getStoredStudent();
  if (!student) {
    student = createOrUpdateStudent({ totalScore: points });
  } else {
    student.totalScore = (student.totalScore || 0) + points;
  }

  const newBadges: string[] = [];
  const currentBadges = new Set(student.badges);

  if (student.totalScore >= 500 && !currentBadges.has('centurion')) {
    student.badges.push('centurion');
    newBadges.push('centurion');
  }

  if (student.totalScore >= 1000 && !currentBadges.has('grand_master')) {
    student.badges.push('grand_master');
    newBadges.push('grand_master');
  }

  saveStudent(student);
  return { student, newBadges };
};

/**
 * Record an exam completion in student history and calculate points and rewards.
 */
export const recordExamCompletion = (
  record: Omit<ExamHistoryRecord, 'id' | 'completedAt'>
): { student: StudentProfile; newBadges: string[]; pointsEarned: number } => {
  let student = getStoredStudent();
  if (!student) {
    student = createOrUpdateStudent({});
  }

  const pointsEarned = Math.round(record.score * 5); // 5 points per exam mark
  student.totalScore = (student.totalScore || 0) + pointsEarned;

  const newRecord: ExamHistoryRecord = {
    id: `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...record,
    completedAt: new Date().toISOString(),
  };

  student.examHistory = [newRecord, ...(student.examHistory || [])];

  const newBadges: string[] = [];
  const currentBadges = new Set(student.badges);

  if (record.percentage >= 90 && !currentBadges.has('high_achiever')) {
    student.badges.push('high_achiever');
    newBadges.push('high_achiever');
  }

  if (record.percentage >= 75 && !currentBadges.has('grammar_champion')) {
    student.badges.push('grammar_champion');
    newBadges.push('grammar_champion');
  }

  if (student.examHistory.length >= 3 && !currentBadges.has('exam_ace')) {
    student.badges.push('exam_ace');
    newBadges.push('exam_ace');
  }

  if (record.percentage >= 70) {
    student.highStreak = (student.highStreak || 0) + 1;
    if (student.highStreak >= 5 && !currentBadges.has('streak_hero')) {
      student.badges.push('streak_hero');
      newBadges.push('streak_hero');
    }
  }

  saveStudent(student);
  return { student, newBadges, pointsEarned };
};

/**
 * Record game completed, update game count, streak, and award points.
 */
export const recordGameCompletion = (
  points: number,
  streak: number
): { student: StudentProfile; newBadges: string[] } => {
  let student = getStoredStudent();
  if (!student) {
    student = createOrUpdateStudent({});
  }

  student.totalScore = (student.totalScore || 0) + points;
  student.gamesPlayed = (student.gamesPlayed || 0) + 1;
  if (streak > (student.highStreak || 0)) {
    student.highStreak = streak;
  }

  const newBadges: string[] = [];
  const currentBadges = new Set(student.badges);

  if (!currentBadges.has('word_master')) {
    student.badges.push('word_master');
    newBadges.push('word_master');
  }

  if (streak >= 5 && !currentBadges.has('streak_hero')) {
    student.badges.push('streak_hero');
    newBadges.push('streak_hero');
  }

  if (student.totalScore >= 500 && !currentBadges.has('centurion')) {
    student.badges.push('centurion');
    newBadges.push('centurion');
  }

  saveStudent(student);
  return { student, newBadges };
};

/**
 * Clear student session completely (Logout / Switch Student).
 */
export const clearStudentSession = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STUDENT_STORAGE_KEY);
    localStorage.removeItem(LEGACY_NAME_KEY);
    localStorage.removeItem(LEGACY_GROUP_KEY);
  } catch (err) {
    console.error('Error clearing student session:', err);
  }
};

/* =========================================================================
   TEACHER & ADMIN REGISTRY / ANALYTICS & SUBJECTIVE GRADING QUEUE
   ========================================================================= */

// Realistic seed students for Teacher Analytics Hub
const SEED_STUDENTS: StudentProfile[] = [
  {
    id: 'std_seed_1',
    name: 'Sarah Ahmed Mahmoud',
    email: 'sarah.ahmed@example.com',
    role: 'student',
    grade: '1st Secondary',
    school: 'STEM High School',
    group: 'Group Alpha',
    totalScore: 1420,
    badges: ['first_step', 'word_master', 'grammar_champion', 'high_achiever', 'centurion', 'grand_master'],
    lastActive: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    gamesPlayed: 18,
    highStreak: 12,
    examHistory: [
      {
        id: 'rec_s1_1',
        examId: 'u1_l5',
        examTitle: 'Unit 1 · Mastery Exam (Level 5)',
        score: 30,
        maxMarks: 32,
        percentage: 94,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
      {
        id: 'rec_s1_2',
        examId: 'gov_cairo_2026',
        examTitle: 'Cairo Directorate Official Exam 2026',
        score: 28,
        maxMarks: 30,
        percentage: 93,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
  },
  {
    id: 'std_seed_2',
    name: 'Omar Khaled El-Sawy',
    email: 'omar.khaled@example.com',
    role: 'student',
    grade: '1st Secondary',
    school: 'Abbasia Boys Secondary School',
    group: 'Group A',
    totalScore: 1280,
    badges: ['first_step', 'word_master', 'exam_ace', 'streak_hero', 'centurion'],
    lastActive: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    gamesPlayed: 14,
    highStreak: 9,
    examHistory: [
      {
        id: 'rec_s2_1',
        examId: 'u2_l4',
        examTitle: 'Unit 2 · Advanced Revision (Level 4)',
        score: 24,
        maxMarks: 28,
        percentage: 86,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      },
    ],
  },
  {
    id: 'std_seed_3',
    name: 'Mariam Tarek El-Naggar',
    email: 'mariam.tarek@example.com',
    role: 'student',
    grade: '1st Secondary',
    school: 'Hisham Barakat Secondary School',
    group: 'Group B',
    totalScore: 1190,
    badges: ['first_step', 'grammar_champion', 'streak_hero', 'centurion'],
    lastActive: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    gamesPlayed: 11,
    highStreak: 7,
    examHistory: [
      {
        id: 'rec_s3_1',
        examId: 'gov_giza_2026',
        examTitle: 'Giza Directorate Official Exam 2026',
        score: 27,
        maxMarks: 30,
        percentage: 90,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      },
    ],
  },
  {
    id: 'std_seed_4',
    name: 'Youssef Mostafa Osman',
    email: 'youssef.osman@example.com',
    role: 'student',
    grade: '1st Secondary',
    school: 'Mansoura Secondary School',
    group: 'Group A',
    totalScore: 1040,
    badges: ['first_step', 'word_master', 'centurion'],
    lastActive: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    gamesPlayed: 9,
    highStreak: 6,
    examHistory: [
      {
        id: 'rec_s4_1',
        examId: 'u1_l3',
        examTitle: 'Unit 1 · Intermediate (Level 3)',
        score: 20,
        maxMarks: 25,
        percentage: 80,
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      },
    ],
  },
  {
    id: 'std_seed_5',
    name: 'Nour El-Din Wael Hosny',
    email: 'nour.wael@example.com',
    role: 'student',
    grade: '1st Secondary',
    school: 'Ibrahimia Secondary School',
    group: 'Group C',
    totalScore: 960,
    badges: ['first_step', 'streak_hero', 'centurion'],
    lastActive: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    gamesPlayed: 8,
    highStreak: 5,
    examHistory: [],
  },
];

// Seed subjective submissions waiting for teacher review
const SEED_SUBMISSIONS: SubjectiveSubmission[] = [
  {
    id: 'sub_seed_1',
    studentId: 'std_seed_2',
    studentName: 'Omar Khaled El-Sawy',
    studentGrade: '1st Secondary',
    studentGroup: 'Group A',
    examId: 'u1_l5',
    examTitle: 'Unit 1 · Mastery Exam (Level 5)',
    type: 'story',
    questionId: 'u1_l5_st1',
    questionPrompt: 'In The Old Man and the Sea, Santiago remarks that "a man can be destroyed but not defeated." Analyze how this philosophical conviction is illustrated through his grueling struggle against the marlin.',
    studentResponse: 'Santiago demonstrates this belief when he refuses to give up despite physical exhaustion, bleeding hands, and cramped muscles. Even when the sharks consume the fish, his human dignity, spiritual endurance, and courage remain unbroken. Physical destruction did not break his spirit.',
    maxScore: 5,
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'sub_seed_2',
    studentId: 'std_seed_3',
    studentName: 'Mariam Tarek El-Naggar',
    studentGrade: '1st Secondary',
    studentGroup: 'Group B',
    examId: 'u2_l5',
    examTitle: 'Unit 2 · Mastery Exam (Level 5)',
    type: 'essay',
    questionId: 'u2_l5_w1',
    questionPrompt: 'Write an argumentative essay (120-150 words) on: "Preserving Egypt\'s Cultural Heritage in the Era of Digital Modernization: Balancing Progress and Identity."',
    studentResponse: 'Egypt possesses one of humanity\'s most magnificent civilizations. As we embrace artificial intelligence and smart cities, safeguarding our archaeological treasures becomes paramount. Virtual reality tours and digital archives can revive ancient monuments without causing wear and tear. Progress does not necessitate abandoning our national identity; rather, technological innovation should serve as a modern guardian of our glorious past.',
    maxScore: 14,
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'sub_seed_3',
    studentId: 'std_seed_4',
    studentName: 'Youssef Mostafa Osman',
    studentGrade: '1st Secondary',
    studentGroup: 'Group A',
    examId: 'gov_cairo_2026',
    examTitle: 'Cairo Directorate Official Exam 2026',
    type: 'story',
    questionId: 'cairo_st1',
    questionPrompt: 'Explain the symbolic role of the boy Manolin in Santiago\'s journey and psychological stamina.',
    studentResponse: 'Manolin represents Santiago\'s youth, legacy, and emotional lifeline. When Santiago is alone on the sea, he constantly thinks "I wish I had the boy." Manolin\'s unwavering faith sustains Santiago\'s hope and reaffirms his dignity as a master fisherman.',
    maxScore: 5,
    status: 'pending',
    submittedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'sub_seed_4',
    studentId: 'std_seed_1',
    studentName: 'Sarah Ahmed Mahmoud',
    studentGrade: '1st Secondary',
    studentGroup: 'Group Alpha',
    examId: 'u1_l4',
    examTitle: 'Unit 1 · Advanced Review (Level 4)',
    type: 'essay',
    questionId: 'u1_l4_w1',
    questionPrompt: 'Write a persuasive composition on the significance of volunteering in local community heritage restoration projects.',
    studentResponse: 'Community volunteering instills a profound sense of civic responsibility among youth. When students participate in restoring local historical landmarks, they forge personal connections with their cultural roots. This hands-on involvement transforms abstract history into living pride.',
    maxScore: 14,
    awardedScore: 13,
    teacherFeedback: 'Exceptional vocabulary selection, flawless cohesion, and well-structured argument. Well done, Sarah!',
    status: 'graded',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    gradedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
];

/**
 * Retrieve all registered students from localStorage.
 */
export const getAllRegisteredStudents = (): StudentProfile[] => {
  if (typeof window === 'undefined') return SEED_STUDENTS;

  try {
    const raw = localStorage.getItem(ALL_STUDENTS_KEY);
    if (!raw) {
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(SEED_STUDENTS));
      return SEED_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(SEED_STUDENTS));
    return SEED_STUDENTS;
  } catch (err) {
    console.error('Error fetching students registry:', err);
    return SEED_STUDENTS;
  }
};

/**
 * Update or insert a student into the registry.
 */
export const updateStudentInRegistry = (student: StudentProfile): void => {
  if (typeof window === 'undefined') return;

  try {
    const students = getAllRegisteredStudents();
    const idx = students.findIndex((s) => s.id === student.id || (s.email && s.email === student.email));
    
    // Strip heavy avatarUrl from the shared directory to keep ALL_STUDENTS_KEY lightweight
    const registryEntry: StudentProfile = { ...student };
    delete registryEntry.avatarUrl;

    if (idx >= 0) {
      students[idx] = { ...students[idx], ...registryEntry };
    } else {
      students.unshift(registryEntry);
    }
    
    // Cap at most 40 entries
    const capped = students.slice(0, 40);
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(capped));
  } catch (err) {
    console.warn('Error updating student in registry (quota-safe):', err);
  }
};

/**
 * Retrieve all subjective submissions for teacher manual grading.
 */
export const getSubjectiveSubmissions = (): SubjectiveSubmission[] => {
  if (typeof window === 'undefined') return SEED_SUBMISSIONS;

  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SEED_SUBMISSIONS));
      return SEED_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(SEED_SUBMISSIONS));
    return SEED_SUBMISSIONS;
  } catch (err) {
    console.error('Error fetching subjective submissions:', err);
    return SEED_SUBMISSIONS;
  }
};

/**
 * Submit a student's subjective answer (Story / Essay) for teacher review.
 */
export const submitSubjectiveExamTask = (
  submission: Omit<SubjectiveSubmission, 'id' | 'status' | 'submittedAt'>
): SubjectiveSubmission => {
  const submissions = getSubjectiveSubmissions();
  const newSub: SubjectiveSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    ...submission,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  submissions.unshift(newSub);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error('Failed to save submission:', e);
    }
  }
  return newSub;
};

/**
 * Grade a subjective submission and update student score and feedback.
 */
export const gradeSubjectiveSubmission = (
  submissionId: string,
  awardedScore: number,
  teacherFeedback: string
): boolean => {
  const submissions = getSubjectiveSubmissions();
  const subIndex = submissions.findIndex((s) => s.id === submissionId);
  if (subIndex === -1) return false;

  const target = submissions[subIndex];
  const safeScore = Math.min(target.maxScore, Math.max(0, awardedScore));

  target.awardedScore = safeScore;
  target.teacherFeedback = teacherFeedback.trim();
  target.status = 'graded';
  target.gradedAt = new Date().toISOString();

  submissions[subIndex] = target;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));

      // Update student points & feedback in registry
      const students = getAllRegisteredStudents();
      const stdIdx = students.findIndex((s) => s.id === target.studentId || s.name === target.studentName);
      if (stdIdx >= 0) {
        students[stdIdx].totalScore = (students[stdIdx].totalScore || 0) + safeScore * 5;
        // Also update any matching exam history record
        if (students[stdIdx].examHistory) {
          const examRec = students[stdIdx].examHistory.find((r) => r.examId === target.examId);
          if (examRec) {
            examRec.teacherFeedback = teacherFeedback;
            examRec.subjectiveScore = safeScore;
            examRec.isGradedByTeacher = true;
          }
        }
        localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
      }

      // If the current student is this student, update session too
      const current = getStoredStudent();
      if (current && (current.id === target.studentId || current.name === target.studentName)) {
        current.totalScore = (current.totalScore || 0) + safeScore * 5;
        if (current.examHistory) {
          const rec = current.examHistory.find((r) => r.examId === target.examId);
          if (rec) {
            rec.teacherFeedback = teacherFeedback;
            rec.subjectiveScore = safeScore;
            rec.isGradedByTeacher = true;
          }
        }
        localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(current));
      }
    } catch (e) {
      console.error('Failed to save graded submission:', e);
      return false;
    }
  }

  return true;
};
