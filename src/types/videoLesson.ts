// =========================================================================
// EngliMensh.EG - AI-Generated Cartoon Video Engine Types & Data Models
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Aligned with the Egyptian Ministry of Education (Connect & Connect Plus)
// =========================================================================

export type BoyCharacterId = 'adam' | 'omar';

export interface CharacterVisualProfile {
  id: BoyCharacterId;
  nameEn: string;
  nameAr: string;
  role: string;
  ageApprox: number;
  visualDescription: string;
  defaultPosition: 'left' | 'right';
  voiceConfig: {
    voiceName: string;
    pitch: number;
    rate: number;
    lang: string;
  };
  styleGuide: {
    shirtColor: string;
    hairColor: string;
    badgeLabel: string;
  };
}

export interface DialogueScene {
  sceneIndex: number;
  speakerId: BoyCharacterId;
  speakerNameEn: string;
  speakerNameAr: string;
  en: string;
  ar: string;
  startTime: number;
  endTime: number;
  actionDescription?: string;
}

export interface SubtitleEntry {
  id: string;
  speakerId: BoyCharacterId;
  speakerNameEn: string;
  speakerNameAr: string;
  en: string;
  ar: string;
  startTime: number;
  endTime: number;
}

export interface AudioTrackReference {
  id: string;
  speakerId: BoyCharacterId;
  audioUrl: string;
  durationSeconds: number;
  format: 'audio/aac' | 'audio/mp3' | 'audio/wav';
}

export type VideoLessonStatus = 'ready' | 'generating' | 'failed' | 'unrendered' | 'rejected';

export interface GenerationJob {
  jobId: string;
  lessonId: string;
  provider: 'gemini_omni_veo' | 'external_render' | 'pre_rendered_official';
  model: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progressPercentage: number;
  estimatedCostUsd: number;
  actualCostUsd?: number;
  error?: string;
  retryCount: number;
  createdAt: string;
  completedAt?: string;
  promptSnippet?: string;
}

export interface VideoLesson {
  id: string; // e.g., 'p1_t1_c_u1'
  unitId: string;
  grade: string;
  unitNumber: number;
  unitTitleEn: string;
  unitTitleAr: string;
  version: number;
  status: VideoLessonStatus;
  videoUrl: string;
  posterUrl?: string;
  thumbnailUrl?: string;
  videoFormat: 'video/mp4' | 'video/webm';
  durationSeconds: number;
  aspectRatio: '16:9';
  characters: CharacterVisualProfile[];
  scenes: DialogueScene[];
  subtitles: SubtitleEntry[];
  audioTracks: AudioTrackReference[];
  providerMetadata: {
    provider: string;
    model: string;
    costEstimateUsd: number;
    actualCostUsd?: number;
    generatedAt?: string;
    approvedBy?: string;
    approvedAt?: string;
    validated: boolean;
    validationNotes?: string;
  };
  generationJob?: GenerationJob;
}

export interface CostControlBudget {
  dailyLimitUsd: number;
  usedTodayUsd: number;
  maxJobsPerDay: number;
  jobsCompletedToday: number;
  requiresTeacherApproval: boolean;
}
