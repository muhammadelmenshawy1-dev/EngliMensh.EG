// =========================================================================
// EngliMensh.EG - Approved AI Cartoon Video Lessons Database
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Official Egyptian MOE Connect Syllabus Video Curriculum
// =========================================================================

import type { CharacterVisualProfile, VideoLesson } from '../types/videoLesson.ts';

// Reusable Visual Profiles for the Two Consistent Boy Characters
export const ADAM_CHARACTER_PROFILE: CharacterVisualProfile = {
  id: 'adam',
  nameEn: 'Adam',
  nameAr: 'آدم',
  role: 'Boy 1 (Student)',
  ageApprox: 6,
  visualDescription: 'Friendly 6-year-old Egyptian primary schoolboy, dark wavy hair, expressive warm eyes, cheerful energetic expression, wearing an Egyptian MOE blue polo uniform with school star badge.',
  defaultPosition: 'left',
  voiceConfig: {
    voiceName: 'Adam-EnUS-ChildBoy-Clear',
    pitch: 1.15,
    rate: 0.9,
    lang: 'en-US'
  },
  styleGuide: {
    shirtColor: '#0284c7',
    hairColor: '#0f172a',
    badgeLabel: 'Adam • آدم'
  }
};

export const OMAR_CHARACTER_PROFILE: CharacterVisualProfile = {
  id: 'omar',
  nameEn: 'Omar',
  nameAr: 'عمر',
  role: 'Boy 2 (Student)',
  ageApprox: 6,
  visualDescription: 'Cheerful 6-year-old Egyptian primary schoolboy, light brown neatly parted hair, bright smiling eyes, friendly body language, wearing an Egyptian MOE golden-amber polo uniform with school crest.',
  defaultPosition: 'right',
  voiceConfig: {
    voiceName: 'Omar-EnUS-ChildBoy-Brisk',
    pitch: 1.25,
    rate: 0.9,
    lang: 'en-US'
  },
  styleGuide: {
    shirtColor: '#d97706',
    hairColor: '#78350f',
    badgeLabel: 'Omar • عمر'
  }
};

// Master Registry of Verified Video Lessons
export const masterVideoLessons: VideoLesson[] = [
  // -----------------------------------------------------------------------
  // PRIMARY 1 - UNIT 1: Hello! (Official AI-Generated Video Asset)
  // -----------------------------------------------------------------------
  {
    id: 'p1_t1_c_u1',
    unitId: 'p1_t1_c_u1',
    grade: 'primary_1',
    unitNumber: 1,
    unitTitleEn: 'Hello!',
    unitTitleAr: 'أهلاً وسهلاً والتعريف بالنفس',
    version: 1,
    status: 'ready',
    videoUrl: '/assets/videos/p1_u1_adam_omar.mp4',
    videoFormat: 'video/mp4',
    durationSeconds: 7.5,
    aspectRatio: '16:9',
    characters: [ADAM_CHARACTER_PROFILE, OMAR_CHARACTER_PROFILE],
    scenes: [
      {
        sceneIndex: 1,
        speakerId: 'adam',
        speakerNameEn: 'Adam',
        speakerNameAr: 'آدم',
        en: "Hello! I am Adam. What's your name?",
        ar: "أهلاً! أنا آدم. ما اسمك؟",
        startTime: 0.0,
        endTime: 3.5,
        actionDescription: 'Adam turns towards the camera with a friendly wave and speaks his greeting, while Omar listens attentively with a warm smile.'
      },
      {
        sceneIndex: 2,
        speakerId: 'omar',
        speakerNameEn: 'Omar',
        speakerNameAr: 'عمر',
        en: "Hello, Adam! I am Omar. Goodbye!",
        ar: "أهلاً يا آدم! أنا عمر. مع السلامة!",
        startTime: 3.5,
        endTime: 7.5,
        actionDescription: 'Omar smiles broadly, introduces himself to Adam, and gives a cheerful goodbye wave as Adam smiles in agreement.'
      }
    ],
    subtitles: [
      {
        id: 'sub_p1_u1_1',
        speakerId: 'adam',
        speakerNameEn: 'Adam',
        speakerNameAr: 'آدم',
        en: "Hello! I am Adam. What's your name?",
        ar: "أهلاً! أنا آدم. ما اسمك؟",
        startTime: 0.0,
        endTime: 3.5
      },
      {
        id: 'sub_p1_u1_2',
        speakerId: 'omar',
        speakerNameEn: 'Omar',
        speakerNameAr: 'عمر',
        en: "Hello, Adam! I am Omar. Goodbye!",
        ar: "أهلاً يا آدم! أنا عمر. مع السلامة!",
        startTime: 3.5,
        endTime: 7.5
      }
    ],
    audioTracks: [
      {
        id: 'aud_p1_u1_main',
        speakerId: 'adam',
        audioUrl: '/assets/videos/p1_u1_adam_omar.mp4',
        durationSeconds: 7.5,
        format: 'audio/aac'
      }
    ],
    providerMetadata: {
      provider: 'pre_rendered_official',
      model: 'gemini-omni-flash-preview',
      costEstimateUsd: 0.15,
      actualCostUsd: 0.0,
      generatedAt: '2026-10-27T08:00:00Z',
      approvedBy: 'MuhammadElMenshawy1@gmail.com',
      approvedAt: '2026-10-27T08:05:00Z',
      validated: true,
      validationNotes: 'H.264/AAC 720p 16:9 verified by ffprobe. Dialogue exactly matches Connect syllabus between Adam and Omar with zero third-party characters.'
    }
  }
];

export function getVideoLessonByUnitId(unitId: string): VideoLesson | undefined {
  // Normalize unitId if needed (e.g. primary_1_u1 or p1_t1_c_u1)
  return masterVideoLessons.find(
    v => v.unitId === unitId || v.id === unitId || v.unitId.includes(unitId)
  );
}

export function getAllVideoLessons(): VideoLesson[] {
  return masterVideoLessons;
}
