import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  Award,
  Layers,
  HelpCircle,
  Lightbulb,
  Headphones,
  PenTool,
  Star,
  Play,
  Pause,
  Video,
  Mic,
  User,
  Tv,
  Maximize,
  Subtitles,
  FileVideo
} from 'lucide-react';
import { PrimaryLessonContent, PrimaryExamQuestion } from '../data/primaryStageData.ts';
import { loadUnitProgress, saveLevelProgress, StoredUnitProgress } from '../services/progressStorage.ts';
import { MediaStorageService } from '../services/mediaStorageService.ts';
import { speakText, stopSpeaking } from '../utils/speechService.ts';
import type { VideoLesson } from '../types/videoLesson.ts';

interface Props {
  lesson: PrimaryLessonContent;
  onExamComplete?: (score: number, totalMarks: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

// Visual cue emoji map
const visualCueIcons: Record<string, string> = {
  hand_wave: '👋',
  goodbye_door: '🚪',
  school_bag: '🎒',
  open_book: '📖',
  cartoon_bee: '🐝',
  pencil_case: '👝',
  ruler_tool: '📏',
  sharpener_tool: '✏️',
  eraser_tool: '🧼',
  grandparents: '👵👴',
  family_parents: '👨‍👩‍👧',
  cousin_friend: '👦',
  nurse_uniform: '👩‍⚕️',
  happy_face: '😄',
  jumping_joy: '🎉',
  water_glass: '🥤',
  fruit_basket: '🍎🍌',
  digestive_diagram: '🫁',
  healthy_vitamins: '🥗',
  sugarcane_stalk: '🎋',
  beating_heart: '❤️',
  chickpea_grains: '🥣',
  fruit_orchard: '🌳🍊',
  golden_wheat: '🌾',
  recipe_bowl: '🍲',
  rooftop_garden: '🏡🌱',
  compost_plant: '🪴',
  crop_harvest: '🧺',
  volunteers_team: '🤝',
  body_shoulder: '💪',
  body_elbow: '🦾',
  skeleton_bones: '🦴',
  fennec_fox: '🦊',
  desert_camel: '🐪',
  steppe_eagle: '🦅',
  headache_head: '🤕',
  medicine_bottle: '💊',
  doctor_stethoscope: '🩺',
  sports_taekwondo: '🥋',
  sports_swimming: '🏊',
  sports_squash: '🎾',
  river_nile: '🌊',
  green_oasis: '🌴',
  desert_sand: '🏜️',
  friends_group: '👫',
  kind_smile: '😊',
  clothes_jacket: '🧥',
  sports_shoes: '👟',
  sun_hat: '👒',
  music_singing: '🎵',
  drawing_palette: '🎨',
  green_plant: '🌱',
  seed_grain: '🌰',
  egyptian_galabeya: '👘',
  desert_safari: '🚙',
  ancient_pyramids: '🏛️',
  sailing_felucca: '⛵',
  weather_sunny: '☀️'
};

// Official & Curated Connect Educational Dialogue Video Embeds
export const primaryDialogueVideoEmbeds: Record<string, string> = {
  // Primary 1 (Connect, Term 1)
  'primary_1_u1': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 1: Hello
  'primary_1_u2': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 2: My School Bag
  'primary_1_u3': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 3: This Is Me
  'primary_1_u4': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 4: It's My Birthday
  'primary_1_u5': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 5: With My Family
  'primary_1_u6': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 6: Let's Play Music
  // Primary 2 (Connect, Term 1)
  'primary_2_u1': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 1: Meet My Family
  'primary_2_u2': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 2: My Body
  'primary_2_u3': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 3: Off to School
  'primary_2_u4': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 4: Time for Sports
  'primary_2_u5': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 5: My Day
  'primary_2_u6': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 6: A Healthy Life
  // Primary 3 (Connect, Term 1)
  'primary_3_u1': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 1: I Feel Happy
  'primary_3_u2': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 2: What's the Matter
  'primary_3_u3': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 3: On the Weekend
  'primary_3_u4': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 4: I Love My Home
  'primary_3_u5': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 5: At the Zoo
  'primary_3_u6': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 6: Let's Go to the Circus
  // Primary 4 (Connect, Term 1)
  'primary_4_u1': 'https://www.youtube-nocookie.com/embed/L13_mK_YJCY', // Unit 1: I Feel Good
  'primary_4_u2': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 2: Desert Animals
  'primary_4_u3': 'https://www.youtube-nocookie.com/embed/V6jD1b7XmR8', // Unit 3: Why Are Plants Green
  'primary_4_u4': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 4: Where Do You Live
  'primary_4_u5': 'https://www.youtube-nocookie.com/embed/hT_nvWreIhg', // Unit 5: Where Do You Work
  'primary_4_u6': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 6: What Do You Do
  // Primary 5 (Connect, Term 1)
  'primary_5_u1': 'https://www.youtube-nocookie.com/embed/V6jD1b7XmR8', // Unit 1: We Plant Our Food
  'primary_5_u2': 'https://www.youtube-nocookie.com/embed/L13_mK_YJCY', // Unit 2: I Want to Be Healthy
  'primary_5_u3': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 3: How Do I Look
  'primary_5_u4': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 4: Looking After Our World
  'primary_5_u5': 'https://www.youtube-nocookie.com/embed/tVlcKp3bWH8', // Unit 5: Amazing Animals
  'primary_5_u6': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M', // Unit 6: What's the Weather Like
  // Primary 6 (Connect, Term 1)
  'primary_6_u1': 'https://www.youtube-nocookie.com/embed/hT_nvWreIhg', // Unit 1: Green Cities
  'primary_6_u2': 'https://www.youtube-nocookie.com/embed/V6jD1b7XmR8', // Unit 2: We Have Fun
  'primary_6_u3': 'https://www.youtube-nocookie.com/embed/L13_mK_YJCY', // Unit 3: Vacation Stories
  'primary_6_u4': 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c', // Unit 4: Celebrate Good Times
  'primary_6_u5': 'https://www.youtube-nocookie.com/embed/fN1CmbGTz-Y', // Unit 5: Amazing Journeys
  'primary_6_u6': 'https://www.youtube-nocookie.com/embed/q1xNzLO9K5M'  // Unit 6: Taking Care of Earth
};

// Text highlighting helper for dialogue utterances
const renderHighlightedText = (
  text: string,
  currentCharIndex: number | null,
  isSpeaking: boolean
) => {
  if (!text) return null;
  if (!isSpeaking || currentCharIndex === null || currentCharIndex < 0) {
    return <span>{text}</span>;
  }

  const words: { word: string; start: number; end: number }[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    words.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length
    });
  }

  const activeWordIdx = words.findIndex(
    w => currentCharIndex >= w.start && currentCharIndex <= w.end
  );

  return (
    <span>
      {words.map((w, idx) => {
        const isCurrent = idx === activeWordIdx;
        return (
          <React.Fragment key={idx}>
            <span
              className={`transition-all duration-150 inline-block px-1 rounded ${
                isCurrent
                  ? 'bg-amber-400 text-slate-950 font-black scale-110 shadow-sm ring-2 ring-amber-300'
                  : ''
              }`}
            >
              {w.word}
            </span>
            {idx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </span>
  );
};

// Animated Boy Avatar (Adam & Omar) with Realistic Blinking & Strictly Synced Mouth
interface BoyAvatarProps {
  type: 'adam' | 'omar';
  isSpeaking: boolean;
  isMyRole?: boolean;
}

const BoyAvatar: React.FC<BoyAvatarProps> = ({ type, isSpeaking, isMyRole }) => {
  const isAdam = type === 'adam';
  const nameEn = isAdam ? 'Adam' : 'Omar';
  const nameAr = isAdam ? 'آدم' : 'عمر';

  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-300 ${
        isSpeaking ? 'scale-105 z-10' : 'scale-95 opacity-90'
      }`}
    >
      {/* Speaking Active Glow Aura */}
      {isSpeaking && (
        <div
          className={`absolute -inset-3 rounded-full blur-md opacity-60 animate-pulse pointer-events-none ${
            isAdam ? 'bg-sky-400/40' : 'bg-amber-400/40'
          }`}
        />
      )}

      {/* Main Boy Circle Container with Egyptian Classroom School Badge */}
      <div
        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1.5 border-4 transition-all shadow-2xl relative bg-slate-900 ${
          isSpeaking
            ? isAdam
              ? 'border-sky-400 ring-4 ring-sky-400/50 shadow-sky-500/40'
              : 'border-amber-400 ring-4 ring-amber-400/50 shadow-amber-500/40'
            : 'border-slate-700/80'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full overflow-hidden"
        >
          {/* Background circle gradient */}
          <circle cx="50" cy="50" r="48" fill={isAdam ? '#0369a1' : '#92400e'} />
          {/* Subtle lighting shine */}
          <path d="M10 30 Q50 10 90 30 A48 48 0 0 0 10 30 Z" fill="#ffffff" opacity="0.1" />

          {/* School Desk foreground hint */}
          <rect x="15" y="88" width="70" height="12" rx="3" fill="#78350f" opacity="0.85" />
          <line x1="18" y1="90" x2="82" y2="90" stroke="#fef08a" strokeWidth="1" opacity="0.4" />

          {/* Torso: Egyptian School Polo Shirt */}
          <path
            d="M20 95 C24 66, 76 66, 80 95 Z"
            fill={isAdam ? '#0284c7' : '#d97706'}
          />
          {/* White Polo Collar */}
          <polygon points="50,71 36,60 50,58" fill="#f8fafc" />
          <polygon points="50,71 64,60 50,58" fill="#f8fafc" />
          {/* Connect School Crest Pin */}
          <circle cx="50" cy="75" r="3.2" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />

          {/* Neck */}
          <rect x="44" y="52" width="12" height="11" rx="3" fill="#fed7aa" />

          {/* Boy Head */}
          <ellipse cx="50" cy="40" rx="22" ry="24" fill="#fed7aa" />

          {/* Hair Styling */}
          {isAdam ? (
            /* Adam: Dark wavy styled hair */
            <g>
              <path
                d="M26 38 C26 18, 74 18, 74 38 C70 24, 60 21, 50 22 C40 21, 30 24, 26 38 Z"
                fill="#1e293b"
              />
              <path d="M42 22 Q48 17 56 21 Q48 23 42 22 Z" fill="#334155" />
            </g>
          ) : (
            /* Omar: Brown cheerful side-parted hair */
            <g>
              <path
                d="M25 36 C27 16, 73 16, 75 36 C68 22, 56 19, 48 23 C40 21, 30 23, 25 36 Z"
                fill="#78350f"
              />
              <path d="M40 20 Q48 15 58 19 Q48 22 40 20 Z" fill="#92400e" />
            </g>
          )}

          {/* Ears */}
          <circle cx="28" cy="40" r="4.5" fill="#fed7aa" />
          <circle cx="72" cy="40" r="4.5" fill="#fed7aa" />

          {/* Eyes with natural blinking animation */}
          <ellipse cx="42" cy="38" rx="2.8" ry="3.2" fill="#0f172a">
            <animate
              attributeName="ry"
              values="3.2;3.2;0.3;3.2"
              keyTimes="0;0.92;0.96;1"
              dur="3.8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <circle cx="43.2" cy="36.8" r="1" fill="#ffffff" />

          <ellipse cx="58" cy="38" rx="2.8" ry="3.2" fill="#0f172a">
            <animate
              attributeName="ry"
              values="3.2;3.2;0.3;3.2"
              keyTimes="0;0.92;0.96;1"
              dur="3.8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <circle cx="59.2" cy="36.8" r="1" fill="#ffffff" />

          {/* Eyebrows */}
          <path
            d={isSpeaking ? "M37 31 Q42 28 47 31" : "M38 33 Q42 31 46 33"}
            stroke={isAdam ? '#0f172a' : '#78350f'}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={isSpeaking ? "M53 31 Q58 28 63 31" : "M54 33 Q58 31 62 33"}
            stroke={isAdam ? '#0f172a' : '#78350f'}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheeks blush */}
          <circle cx="37" cy="43" r="3" fill="#fca5a5" opacity="0.6" />
          <circle cx="63" cy="43" r="3" fill="#fca5a5" opacity="0.6" />

          {/* Mouth: Strictly synchronizes with isSpeaking! */}
          {isSpeaking ? (
            <g>
              {/* Animated open mouth with teeth */}
              <ellipse cx="50" cy="48.5" rx="5.2" ry="4.5" fill="#991b1b">
                <animate
                  attributeName="ry"
                  values="2;5.2;2.5;4.8;2"
                  dur="0.22s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="rx"
                  values="4.5;5.5;4.2;5.4;4.5"
                  dur="0.22s"
                  repeatCount="indefinite"
                />
              </ellipse>
              {/* Upper teeth white strip */}
              <rect x="47" y="46.5" width="6" height="2" rx="0.8" fill="#ffffff" />
            </g>
          ) : (
            /* Silent cheerful smile — completely static when not speaking */
            <path
              d="M44 47.5 Q50 52.5 56 47.5"
              stroke="#991b1b"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Gesturing hand when speaking */}
          {isSpeaking && (
            <path
              d="M74 85 Q82 72 80 65 Q77 62 74 68 Z"
              fill="#fed7aa"
              stroke="#ea580c"
              strokeWidth="0.8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 74 85; 8 74 85; 0 74 85"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          )}
        </svg>

        {/* Live Soundwave Equalizer indicator on speaking boy */}
        {isSpeaking && (
          <div className="absolute -top-1 -right-1 bg-slate-900/90 rounded-full p-1 border border-emerald-400 shadow-md flex items-center gap-0.5 px-1.5">
            <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce" />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Boy Name Badge */}
      <div className="mt-2 text-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-md transition-all ${
            isSpeaking
              ? isAdam
                ? 'bg-sky-400 text-slate-950 ring-2 ring-sky-300'
                : 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          <span>{isAdam ? '👦' : '🧒'}</span>
          <span>{nameEn} ({nameAr})</span>
        </span>

        {isSpeaking && (
          <span className="block text-[10px] font-bold text-emerald-400 animate-pulse mt-0.5">
            🎙️ Speaking now / يتحدث الآن...
          </span>
        )}

        {isMyRole && (
          <span className="block text-[10px] font-bold text-amber-300 mt-0.5">
            ★ Your Role / دورك
          </span>
        )}
      </div>
    </div>
  );
};

export const PrimaryLessonViewer: React.FC<Props> = ({ lesson, onExamComplete, onBack, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'skills' | 'exams'>('vocab');
  const [currentExamLevel, setCurrentExamLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; note: string }>>({});
  const [levelScores, setLevelScores] = useState<Record<number, { score: number; total: number }>>({});
  const [isLevelSubmitted, setIsLevelSubmitted] = useState<Record<number, boolean>>({});
  const [playingAudioText, setPlayingAudioText] = useState<string | null>(null);
  const [savedProgress, setSavedProgress] = useState<StoredUnitProgress | null>(null);
  const [showGoldenTips, setShowGoldenTips] = useState<boolean>(false);

  // Hydrate persistent progress from localStorage on load & unit changes
  useEffect(() => {
    const data = loadUnitProgress(lesson.unitId);
    setSavedProgress(data);
    if (data && data.levels) {
      const initialScores: Record<number, { score: number; total: number }> = {};
      const initialSubmitted: Record<number, boolean> = {};
      for (const [lvlStr, rec] of Object.entries(data.levels)) {
        const lvlNum = Number(lvlStr);
        initialScores[lvlNum] = { score: rec.score, total: rec.totalMarks };
        initialSubmitted[lvlNum] = true;
      }
      setLevelScores(initialScores);
      setIsLevelSubmitted(initialSubmitted);
    } else {
      setLevelScores({});
      setIsLevelSubmitted({});
      setUserAnswers({});
      setFeedback({});
    }
  }, [lesson.unitId]);

  // Handle retaking a level according to progress policy
  const handleRetakeLevel = (lvl: number) => {
    setIsLevelSubmitted(prev => ({ ...prev, [lvl]: false }));
    const questions = getExamQuestions(lvl);
    setUserAnswers(prev => {
      const updated = { ...prev };
      questions.forEach(q => delete updated[q.id]);
      return updated;
    });
    setFeedback(prev => {
      const updated = { ...prev };
      questions.forEach(q => delete updated[q.id]);
      return updated;
    });
  };

  // Interactive Sentence Builder state (drill index -> list of clicked words)
  const [drillAnswers, setDrillAnswers] = useState<Record<number, string[]>>({});
  const [drillChecked, setDrillChecked] = useState<Record<number, boolean>>({});

  // Interactive Skills inputs
  const [skillsInputs, setSkillsInputs] = useState<Record<number, string>>({});
  const [skillsRevealed, setSkillsRevealed] = useState<Record<number, boolean>>({});

  // Speech Pronunciation Helper via unified speechService
  const playAudio = (text: string) => {
    setPlayingAudioText(text);
    speakText(text, 'en', {
      rate: 0.85,
      onStart: () => setPlayingAudioText(text),
      onEnd: () => setPlayingAudioText(null),
      onError: () => setPlayingAudioText(null),
    });
  };

  // Real Video Element Reference & Persistent Video Lesson Binding
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [registeredVideo, setRegisteredVideo] = useState<VideoLesson | undefined>(() =>
    MediaStorageService.getLessonByUnitId(lesson.unitId)
  );

  const [videoPlayerMode, setVideoPlayerMode] = useState<'real_video' | 'cartoon_studio' | 'embed'>(() => {
    const vid = MediaStorageService.getLessonByUnitId(lesson.unitId);
    return vid && vid.status === 'ready' && vid.videoUrl ? 'real_video' : 'cartoon_studio';
  });

  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isSpeakingActive, setIsSpeakingActive] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [videoPlaybackTime, setVideoPlaybackTime] = useState<number>(0);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const [dialogueSpeed, setDialogueSpeed] = useState<number>(1.0);
  const [showEnSubtitles, setShowEnSubtitles] = useState<boolean>(true);
  const [showArSubtitles, setShowArSubtitles] = useState<boolean>(true);
  const [isRoleplayMode, setIsRoleplayMode] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<'adam' | 'omar'>('adam');
  const [videoLoadError, setVideoLoadError] = useState<string | null>(null);

  // Initialize and cache browser TTS voices with listener
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setAvailableVoices(v);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Mobile Audio Unlock: Unlocks mobile browser autoplay restrictions
  const unlockAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch {
        // Safe fallback
      }
    }
  };

  // Sync registered video whenever unit changes
  useEffect(() => {
    const vid = MediaStorageService.getLessonByUnitId(lesson.unitId);
    setRegisteredVideo(vid);
    setVideoLoadError(null);
    if (vid && vid.status === 'ready' && vid.videoUrl) {
      setVideoPlayerMode('real_video');
    } else {
      setVideoPlayerMode('cartoon_studio');
    }
  }, [lesson.unitId]);

  // Video embed URL for the current unit
  const targetVideoUrl = primaryDialogueVideoEmbeds[lesson.unitId] || 'https://www.youtube-nocookie.com/embed/8v_4o74Vz8c';

  // Conversational contract: Two young students/boys (Adam & Omar)
  const rawTerms = lesson.tab1_Vocabulary.conversationTerms || [];
  const dialogueTurns = registeredVideo && registeredVideo.scenes.length > 0
    ? registeredVideo.scenes.map(s => ({
        id: s.sceneIndex - 1,
        speaker: s.speakerId,
        speakerNameEn: s.speakerNameEn,
        speakerNameAr: s.speakerNameAr,
        en: s.en,
        ar: s.ar
      }))
    : rawTerms.length >= 2
      ? rawTerms.map((t, idx) => ({
          id: idx,
          speaker: idx % 2 === 0 ? ('adam' as const) : ('omar' as const),
          speakerNameEn: idx % 2 === 0 ? 'Adam' : 'Omar',
          speakerNameAr: idx % 2 === 0 ? 'آدم' : 'عمر',
          en: t.en,
          ar: t.ar
        }))
      : [
          {
            id: 0,
            speaker: 'adam' as const,
            speakerNameEn: 'Adam',
            speakerNameAr: 'آدم',
            en: "Hello! I am Adam. What's your name?",
            ar: "أهلاً! أنا آدم. ما اسمك؟"
          },
          {
            id: 1,
            speaker: 'omar' as const,
            speakerNameEn: 'Omar',
            speakerNameAr: 'عمر',
            en: "Hello, Adam! I am Omar. Goodbye!",
            ar: "أهلاً يا آدم! أنا عمر. مع السلامة!"
          }
        ];

  const currentTurn = dialogueTurns[activeDialogueIndex] || dialogueTurns[0];

  // Helper to retrieve distinct character voices
  const getSpeakerVoice = (speaker: 'adam' | 'omar'): SpeechSynthesisVoice | undefined => {
    if (!availableVoices || availableVoices.length === 0) return undefined;
    const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));
    if (englishVoices.length === 0) return availableVoices[0];

    if (speaker === 'adam') {
      return (
        englishVoices.find(v => v.lang.includes('US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Alex') || v.name.includes('David') || v.name.includes('Aaron'))) ||
        englishVoices.find(v => v.lang.includes('US')) ||
        englishVoices[0]
      );
    } else {
      const adamV = englishVoices.find(v => v.lang.includes('US'));
      return (
        englishVoices.find(v => (v.lang.includes('GB') || v.lang.includes('AU') || v.name.includes('George') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Samantha') || v.name.includes('Victoria')) && v.name !== adamV?.name) ||
        englishVoices.find(v => v.lang.includes('GB')) ||
        (englishVoices.length > 1 ? englishVoices[1] : englishVoices[0])
      );
    }
  };

  // Video time synchronization using HTML5 video playback position as single source of truth
  const handleVideoTimeUpdate = (currentTime: number) => {
    setVideoPlaybackTime(currentTime);
    if (registeredVideo && registeredVideo.subtitles.length > 0) {
      const matchIdx = registeredVideo.subtitles.findIndex(
        sub => currentTime >= sub.startTime && currentTime < sub.endTime
      );
      if (matchIdx >= 0 && matchIdx !== activeDialogueIndex) {
        setActiveDialogueIndex(matchIdx);
      }
    }
  };

  const handleTogglePlayRealVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => setIsPlayingVideo(false));
    } else {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const handleRestartRealVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setActiveDialogueIndex(0);
    videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => {});
  };

  const handleSpeedChange = (speed: number) => {
    setDialogueSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    // If currently speaking, re-speak current turn at new pace
    if (isSpeakingActive) {
      playDialogueLine(activeDialogueIndex);
    }
  };

  const handleFullscreenVideo = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Core Native TTS Dialogue Engine: strictly synchronizes audio boundaries with mouth movement
  const playDialogueLine = (index: number) => {
    if (index >= dialogueTurns.length) {
      setIsPlayingVideo(false);
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);
      setActiveDialogueIndex(0);
      return;
    }

    setActiveDialogueIndex(index);
    if (!('speechSynthesis' in window)) return;

    unlockAudio();
    window.speechSynthesis.cancel();

    const turn = dialogueTurns[index];
    const utterance = new SpeechSynthesisUtterance(turn.en);
    utterance.lang = 'en-US';

    // Rate: Link speed control (0.85x / 1.0x / 1.25x) to speech rate for primary learners
    utterance.rate = Math.max(0.7, Math.min(1.2, 0.88 * dialogueSpeed));

    // Pitch: Adam (1.15 clear young tone) vs Omar (1.28 distinct bright tone)
    const isAdam = turn.speaker === 'adam';
    utterance.pitch = isAdam ? 1.15 : 1.28;

    const chosenVoice = getSpeakerVoice(turn.speaker);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      setIsSpeakingActive(true);
      setIsPlayingVideo(true);
      setCurrentCharIndex(0);
    };

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === 'number') {
        setCurrentCharIndex(event.charIndex);
      }
    };

    utterance.onend = () => {
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);

      if (isRoleplayMode && turn.speaker !== selectedRole && index + 1 < dialogueTurns.length) {
        // Partner just finished speaking; pause so student can speak their role!
        setIsPlayingVideo(false);
        setActiveDialogueIndex(index + 1);
      } else if (index + 1 < dialogueTurns.length) {
        // Brief natural pause between dialogue turns (mouth stays still during pause)
        setTimeout(() => {
          setActiveDialogueIndex(index + 1);
          playDialogueLine(index + 1);
        }, 850);
      } else {
        setIsPlayingVideo(false);
      }
    };

    utterance.onerror = () => {
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);
      setIsPlayingVideo(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Replay a single turn instantly on demand
  const playSingleTurn = (index: number) => {
    if (index < 0 || index >= dialogueTurns.length) return;
    setActiveDialogueIndex(index);
    if (!('speechSynthesis' in window)) return;

    unlockAudio();
    window.speechSynthesis.cancel();

    const turn = dialogueTurns[index];
    const utterance = new SpeechSynthesisUtterance(turn.en);
    utterance.lang = 'en-US';
    utterance.rate = Math.max(0.7, Math.min(1.2, 0.88 * dialogueSpeed));
    const isAdam = turn.speaker === 'adam';
    utterance.pitch = isAdam ? 1.15 : 1.28;

    const chosenVoice = getSpeakerVoice(turn.speaker);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      setIsSpeakingActive(true);
      setCurrentCharIndex(0);
    };

    utterance.onboundary = (event) => {
      if (typeof event.charIndex === 'number') {
        setCurrentCharIndex(event.charIndex);
      }
    };

    utterance.onend = () => {
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlayVideo = () => {
    unlockAudio();
    if (videoPlayerMode === 'real_video' && videoRef.current) {
      handleTogglePlayRealVideo();
      return;
    }

    if (isPlayingVideo) {
      window.speechSynthesis.cancel();
      setIsSpeakingActive(false);
      setCurrentCharIndex(null);
      setIsPlayingVideo(false);
    } else {
      setIsPlayingVideo(true);
      playDialogueLine(activeDialogueIndex);
    }
  };

  const handleRestartVideo = () => {
    unlockAudio();
    if (videoPlayerMode === 'real_video' && videoRef.current) {
      handleRestartRealVideo();
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeakingActive(false);
    setCurrentCharIndex(null);
    setActiveDialogueIndex(0);
    setIsPlayingVideo(true);
    playDialogueLine(0);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const evaluateLevel = (questions: PrimaryExamQuestion[]) => {
    let score = 0;
    let totalMarks = 0;
    const newFeedback: Record<string, { correct: boolean; note: string }> = {};

    questions.forEach(q => {
      totalMarks += q.marks;
      const rawInput = (userAnswers[q.id] || '').trim();
      const studentInput = rawInput.toLowerCase();
      let isCorrect = false;

      if (Array.isArray(q.correctAnswer)) {
        isCorrect = q.correctAnswer.some(ans => ans.trim().toLowerCase() === studentInput);
      } else {
        const rawTarget = q.correctAnswer.trim();
        const target = rawTarget.toLowerCase();
        const hasCaseOrPunctVariants =
          q.type === 'punctuation' ||
          (q.options &&
            q.options.length > 1 &&
            new Set(q.options.map(o => o.trim().toLowerCase().replace(/[.,?!]/g, ''))).size < q.options.length);

        if (hasCaseOrPunctVariants) {
          isCorrect = rawTarget === rawInput;
        } else {
          const targetClean = target.replace(/[.,?!]/g, '');
          const studentClean = studentInput.replace(/[.,?!]/g, '');
          isCorrect = target === studentInput || targetClean === studentClean;
        }
      }

      if (isCorrect) score += q.marks;

      newFeedback[q.id] = {
        correct: isCorrect,
        note: q.explanationAr
      };
    });

    setFeedback(prev => ({ ...prev, ...newFeedback }));
    setLevelScores(prev => ({ ...prev, [currentExamLevel]: { score, total: totalMarks } }));
    setIsLevelSubmitted(prev => ({ ...prev, [currentExamLevel]: true }));

    // Persist evaluation to localStorage
    const updated = saveLevelProgress(lesson.unitId, currentExamLevel, score, totalMarks);
    if (updated) {
      setSavedProgress(updated);
    }

    if (onExamComplete) {
      onExamComplete(score, totalMarks);
    }

    return { score, totalMarks };
  };

  const getExamQuestions = (level: number): PrimaryExamQuestion[] => {
    switch (level) {
      case 1: return lesson.examSuite.level1_Foundation;
      case 2: return lesson.examSuite.level2_Contextual;
      case 3: return lesson.examSuite.level3_AdvancedStructure;
      case 4: return lesson.examSuite.level4_MoeMockExam;
      case 5: return lesson.examSuite.level5_HigherThinking;
      default: return [];
    }
  };

  const getLevelTitle = (lvl: number): string => {
    switch (lvl) {
      case 1: return 'Level 1: Foundation (التعرف والذاكرة البصرية)';
      case 2: return 'Level 2: Contextual (السياق والربط)';
      case 3: return 'Level 3: Advanced Structure (القواعد والتركيب)';
      case 4: return 'Level 4: MOE Mock Exam (الامتحان الوزاري النموذجي)';
      case 5: return 'Level 5: Higher Thinking (التفكير الإبداعي والكتابة)';
      default: return `Level ${lvl}`;
    }
  };

  // Sentence Builder helpers
  const handleWordClickInDrill = (drillIdx: number, word: string) => {
    if (drillChecked[drillIdx]) return;
    setDrillAnswers(prev => {
      const current = prev[drillIdx] || [];
      return { ...prev, [drillIdx]: [...current, word] };
    });
  };

  const handleRemoveWordFromDrill = (drillIdx: number, wordIdx: number) => {
    if (drillChecked[drillIdx]) return;
    setDrillAnswers(prev => {
      const current = prev[drillIdx] || [];
      const updated = [...current];
      updated.splice(wordIdx, 1);
      return { ...prev, [drillIdx]: updated };
    });
  };

  const resetDrill = (drillIdx: number) => {
    setDrillAnswers(prev => ({ ...prev, [drillIdx]: [] }));
    setDrillChecked(prev => ({ ...prev, [drillIdx]: false }));
  };

  const checkDrill = (drillIdx: number, correctOrder: string[]) => {
    setDrillChecked(prev => ({ ...prev, [drillIdx]: true }));
  };

  const handleBack = onBack || onClose;

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans min-h-screen animate-in fade-in duration-200" dir="ltr">
      {/* 1. UNIFIED STICKY NAVIGATION WRAPPER (Single Container: Zero Clipping, Zero Overlap) */}
      <div className="sticky top-0 z-30 shadow-md bg-white">
        {/* Top Blue Breadcrumb & Unit Header */}
        <header className="bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white border-b border-blue-400/20 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {handleBack && (
              <button
                type="button"
                onClick={handleBack}
                className="min-w-[44px] min-h-[44px] px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer group active:scale-95 shrink-0"
                title="Back to Units / العودة للوحدات"
                aria-label="Back to Units"
              >
                <ArrowLeft className="w-5 h-5 text-[#FFC928] group-hover:-translate-x-1 transition-transform shrink-0" />
                <span className="hidden xs:inline">Back to Units / العودة للوحدات</span>
                <span className="xs:hidden">Back</span>
              </button>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#FFC928] text-[#0B397D] px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                  {lesson.grade.replace('_', ' ').toUpperCase()} • {lesson.track.toUpperCase()} • TERM {lesson.term}
                </span>
                <span className="text-[11px] font-bold text-blue-100 hidden md:inline truncate">
                  Egyptian Ministry of Education Connect Syllabus
                </span>
              </div>
              <h1 className="text-sm sm:text-lg md:text-xl font-black text-white mt-0.5 flex flex-wrap items-baseline gap-2 truncate">
                <span>Unit {lesson.unitNumber}: {lesson.unitTitleEn}</span>
                <span className="text-xs sm:text-sm font-normal text-blue-200" dir="rtl">({lesson.unitTitleAr})</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('exams')}
              className="min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Award className="w-4 h-4 text-amber-300 fill-current" />
              <span className="hidden sm:inline">5-Level Adaptive Exam</span>
              <span className="sm:hidden">Exam</span>
            </button>
          </div>
        </header>

        {/* 2. STICKY 4-TAB NAVIGATION BAR (Mobile-First Horizontally Scrollable) */}
        <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-2 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center overflow-x-auto scrollbar-none py-2 gap-2">
            {/* Tab 1 */}
            <button
              type="button"
              onClick={() => setActiveTab('vocab')}
              className={`min-h-[44px] shrink-0 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 text-left ${
                activeTab === 'vocab'
                  ? 'bg-[#0B397D] text-white shadow-sm ring-2 ring-[#FFC928]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🔤</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black leading-tight">Tab 1: Vocabulary &amp; Phonics</span>
                <span className={`text-[10px] leading-tight ${activeTab === 'vocab' ? 'text-blue-200' : 'text-slate-400'}`} dir="rtl">بطاقات المفردات والصوتيات</span>
              </div>
            </button>

            {/* Tab 2 */}
            <button
              type="button"
              onClick={() => setActiveTab('grammar')}
              className={`min-h-[44px] shrink-0 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 text-left ${
                activeTab === 'grammar'
                  ? 'bg-[#0B397D] text-white shadow-sm ring-2 ring-[#FFC928]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🧱</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black leading-tight">Tab 2: Grammar &amp; Sentences</span>
                <span className={`text-[10px] leading-tight ${activeTab === 'grammar' ? 'text-blue-200' : 'text-slate-400'}`} dir="rtl">القواعد والجمل والتركيب</span>
              </div>
            </button>

            {/* Tab 3 */}
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`min-h-[44px] shrink-0 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 text-left ${
                activeTab === 'skills'
                  ? 'bg-[#0B397D] text-white shadow-sm ring-2 ring-[#FFC928]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">🎬</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black leading-tight">Tab 3: Skills &amp; Dialogue Video</span>
                <span className={`text-[10px] leading-tight ${activeTab === 'skills' ? 'text-blue-200' : 'text-slate-400'}`} dir="rtl">المهارات ومحادثة الفيديو (آدم وعمر)</span>
              </div>
            </button>

            {/* Tab 4 */}
            <button
              type="button"
              onClick={() => setActiveTab('exams')}
              className={`min-h-[44px] shrink-0 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 text-left ${
                activeTab === 'exams'
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <span className="text-base">🎯</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-black leading-tight">Tab 4: 5-Level Adaptive Exam</span>
                <span className={`text-[10px] leading-tight ${activeTab === 'exams' ? 'text-emerald-100' : 'text-emerald-600'}`} dir="rtl">الاختبار المتدرج (5 مستويات)</span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* 3. MAIN IN-PAGE LESSON CONTENT (Clean vertical padding pt-4 below sticky navigation strip) */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-32 space-y-6">
        {/* TEACHER MOHAMMAD EL-MENSHAWY GOLDEN TIPS BANNER (Hidden by default, user-activated) */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-blue-900/5 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#0B397D] flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                💡
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-[#0B397D] flex items-center gap-1.5">
                  <span>Golden Study Tips • نصائح المنشاوي الذهبية</span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.2 rounded-full font-bold">MOE Guide</span>
                </div>
                <p className="text-[11px] text-slate-500" dir="rtl">
                  إرشادات مستر محمد المنشاوي لتثبيت الكلمات وتجنب الأخطاء الشائعة في الامتحانات
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGoldenTips(!showGoldenTips)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
              aria-expanded={showGoldenTips}
            >
              <span>{showGoldenTips ? 'إخفاء النصائح (Hide Tips)' : 'عرض النصائح الذهبية (Reveal Tips)'}</span>
            </button>
          </div>

          {showGoldenTips && (
            <div className="mt-3.5 pt-3.5 border-t border-amber-200/60 space-y-2.5 animate-in fade-in duration-200 text-xs text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                  <span className="font-black text-[#0B397D] block">1. الاستماع الصوتي والمطابقة:</span>
                  <p className="text-slate-600 leading-relaxed" dir="rtl">
                    استمع إلى نطق الكلمة عبر أيقونة الصوت 🔊 وكررها بصوت مسموع مع ملاحظة مثال الاستخدام العملي.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                  <span className="font-black text-[#0B397D] block">2. بناء الجملة والترتيب:</span>
                  <p className="text-slate-600 leading-relaxed" dir="rtl">
                    في تمرين ترتيب الجمل، تذكر دائماً البدء بالفاعل أو فعل الأمر وتأكد من علامات الترقيم الصحيحة.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                  <span className="font-black text-[#0B397D] block">3. التدرج في المستويات الخمسة:</span>
                  <p className="text-slate-600 leading-relaxed" dir="rtl">
                    يتم حفظ درجاتك تلقائياً في المتصفح. يمكنك إعادة أي مستوى لتحسين نتيجتك والحصول على 100%.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ==========================================================
            TAB 1: VOCABULARY & PHONICS VISUAL BANK
           ========================================================== */}
        {activeTab === 'vocab' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-indigo-950">
                    Vocabulary Bank &amp; Visual Flashcards
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click the speaker button <Volume2 className="w-3.5 h-3.5 inline text-indigo-600" /> on any card to hear the authentic pronunciation.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold bg-white text-indigo-700 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
                {lesson.tab1_Vocabulary.words.length} Target Words
              </span>
            </div>

            {/* Vocab Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.tab1_Vocabulary.words.map(w => {
                const cueEmoji = w.visualCue ? visualCueIcons[w.visualCue] || '✨' : '📖';
                return (
                  <div
                    key={w.id}
                    className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl p-1.5 bg-indigo-50 rounded-xl" title={w.visualCue}>
                            {cueEmoji}
                          </span>
                          <div>
                            <span className="text-xl font-black text-indigo-600 group-hover:text-indigo-700 block">
                              {w.word}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{w.phonetics}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 uppercase">
                            {w.partOfSpeech}
                          </span>
                          <button
                            type="button"
                            onClick={() => playAudio(w.word)}
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition cursor-pointer"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 p-2 rounded-xl bg-slate-50 text-sm font-black text-slate-800 text-right" dir="rtl">
                        {w.arabicMeaning}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <p className="text-xs text-slate-600 italic">
                        "{w.exampleSentence}"
                      </p>
                      <button
                        type="button"
                        onClick={() => playAudio(w.exampleSentence)}
                        className={`shrink-0 p-1 rounded-md transition cursor-pointer ${
                          playingAudioText === w.exampleSentence
                            ? 'text-indigo-600 font-bold animate-pulse scale-110'
                            : 'text-slate-400 hover:text-indigo-600'
                        }`}
                        title="Listen to sentence"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Phonics & Letter Sounds Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔤</span>
                <h3 className="text-base sm:text-lg font-black text-slate-800">
                  Phonics &amp; Letter Sounds (الأصوات اللغوية والتناغم الصوتي)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.tab1_Vocabulary.phonics.map((p, idx) => (
                  <div key={idx} className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-amber-900 text-base">
                        {p.letterSound}
                      </h4>
                      <button
                        type="button"
                        onClick={() => playAudio(p.sampleWords.join(', '))}
                        className="px-3 py-1 rounded-full bg-amber-200/70 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen All
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.sampleWords.map((sw, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => playAudio(sw)}
                          className="bg-white hover:bg-amber-100/60 px-3 py-1.5 rounded-xl shadow-2xs text-sm font-bold text-slate-800 border border-amber-200 flex items-center gap-1 transition cursor-pointer"
                        >
                          <span>{sw}</span>
                          <Volume2 className="w-3 h-3 text-amber-600 opacity-60" />
                        </button>
                      ))}
                    </div>

                    {p.rhymingPair && (
                      <div className="mt-2 p-2.5 bg-white/80 rounded-xl border border-amber-300 text-xs text-amber-950 flex items-center justify-between">
                        <span className="font-bold">🎵 Rhyming Pair (قافية متناغمة):</span>
                        <div className="flex items-center gap-2 font-mono font-black text-indigo-700">
                          <span>{p.rhymingPair[0]}</span>
                          <span>↔</span>
                          <span>{p.rhymingPair[1]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Terms */}
            {lesson.tab1_Vocabulary.conversationTerms && lesson.tab1_Vocabulary.conversationTerms.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-800">
                    Everyday Classroom &amp; Social Phrases (المحادثة اليومية)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {lesson.tab1_Vocabulary.conversationTerms.map((ct, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ct.en}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{ct.ar}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => playAudio(ct.en)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-indigo-600 cursor-pointer"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            TAB 2: GRAMMAR & INTUITIVE SENTENCE BUILDING
           ========================================================== */}
        {activeTab === 'grammar' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Rules */}
            <div className="space-y-6">
              {lesson.tab2_Grammar.rules.map((rule, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-indigo-800 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{rule.title}</span>
                    </h3>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                      Grammar Rule
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 font-medium leading-relaxed" dir="rtl">
                    {rule.ruleExplanationAr}
                  </p>

                  {/* Formula banner */}
                  <div className="bg-gradient-to-r from-indigo-900 to-[#0B397D] text-white p-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-between">
                    <span>{rule.structureFormula}</span>
                    <span className="text-[11px] text-amber-300 font-sans font-bold">Rule Blueprint</span>
                  </div>

                  {/* Visual Pattern Blocks */}
                  {rule.visualPatternBlocks && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Visual Sentence Chunks:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {rule.visualPatternBlocks.map((blk, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs border border-indigo-200"
                          >
                            {blk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Model Examples (أمثلة توضيحية):
                    </span>
                    <div className="space-y-2">
                      {rule.examples.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="text-sm flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 gap-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => playAudio(ex.en)}
                              className="text-indigo-600 hover:text-indigo-800 p-1 cursor-pointer"
                              title="Listen"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-black text-slate-900">{ex.en}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium" dir="rtl">{ex.ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Sentence Builder Drills */}
            {lesson.tab2_Grammar.sentenceBuilderDrills && lesson.tab2_Grammar.sentenceBuilderDrills.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-indigo-50/70 to-blue-50/70 rounded-3xl border border-indigo-200 space-y-6">
                <div className="flex items-center justify-between border-b border-indigo-200/70 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧱</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-indigo-950">
                        Interactive Sentence Builder (بناء الجمل التفاعلي)
                      </h3>
                      <p className="text-xs text-slate-600">
                        Tap words below to arrange them into the correct grammatical order!
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-white text-indigo-700 px-3 py-1 rounded-full shadow-2xs">
                    Hands-on
                  </span>
                </div>

                <div className="space-y-6">
                  {lesson.tab2_Grammar.sentenceBuilderDrills.map((drill, dIdx) => {
                    const currentChosen = drillAnswers[dIdx] || [];
                    const isChecked = drillChecked[dIdx];
                    const isCorrect = currentChosen.join(' ') === drill.correctOrder.join(' ');
                    const unusedWords = drill.jumbledParts.filter(
                      word => !currentChosen.includes(word) ||
                        currentChosen.filter(w => w === word).length < drill.jumbledParts.filter(w => w === word).length
                    );

                    return (
                      <div key={dIdx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-indigo-700">
                            Drill {dIdx + 1}:
                          </span>
                          <span className="text-xs text-slate-500 font-medium" dir="rtl">
                            المعنى المستهدف: <strong>{drill.translationAr}</strong>
                          </span>
                        </div>

                        {/* Drop Zone */}
                        <div className={`min-h-[56px] p-3 rounded-xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
                          isChecked
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-400'
                              : 'bg-rose-50 border-rose-300'
                            : 'bg-slate-50 border-indigo-200'
                        }`}>
                          {currentChosen.length === 0 ? (
                            <span className="text-xs text-slate-400 italic">
                              Click words below to assemble your sentence here...
                            </span>
                          ) : (
                            currentChosen.map((w, wIdx) => (
                              <button
                                key={wIdx}
                                type="button"
                                onClick={() => handleRemoveWordFromDrill(dIdx, wIdx)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-rose-500 text-white font-black text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-1 group"
                                title="Click to remove"
                              >
                                <span>{w}</span>
                                <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                              </button>
                            ))
                          )}
                        </div>

                        {/* Word bank buttons */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Available Words:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {drill.jumbledParts.map((part, pIdx) => {
                              // If word has been chosen up to its count, disable it
                              const countInChosen = currentChosen.filter(w => w === part).length;
                              const totalCount = drill.jumbledParts.filter(w => w === part).length;
                              const isDepleted = countInChosen >= totalCount;

                              return (
                                <button
                                  key={pIdx}
                                  type="button"
                                  disabled={isDepleted || isChecked}
                                  onClick={() => handleWordClickInDrill(dIdx, part)}
                                  className={`px-3.5 py-2 rounded-xl text-sm font-black border transition-all cursor-pointer ${
                                    isDepleted
                                      ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                                      : 'bg-slate-50 hover:bg-indigo-100 text-slate-800 border-slate-200 hover:border-indigo-300 shadow-2xs'
                                  }`}
                                >
                                  {part}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Feedback & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => resetDrill(dIdx)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" /> Reset
                            </button>
                            <button
                              type="button"
                              disabled={currentChosen.length === 0}
                              onClick={() => checkDrill(dIdx, drill.correctOrder)}
                              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              Check Sentence
                            </button>
                          </div>

                          {isChecked && (
                            <div className={`text-xs font-bold flex items-center gap-1.5 ${
                              isCorrect ? 'text-emerald-700' : 'text-rose-600'
                            }`}>
                              {isCorrect ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span>ممتاز! الترتيب صحيح 100%</span>
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 text-rose-600" />
                                  <span>الترتيب الصحيح: {drill.correctOrder.join(' ')}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            TAB 3: SKILLS BUILDER & INTERACTIVE DIALOGUE VIDEO
           ========================================================== */}
        {activeTab === 'skills' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            {/* 1. INTERACTIVE DIALOGUE VIDEO STUDIO (16:9 Responsive Video Frame + Synchronized Subtitles) */}
            <div className="bg-slate-950 text-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 space-y-4 relative overflow-hidden">
              {/* Studio Header Bar & Player Mode Switcher */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-white">Interactive Dialogue Video Studio</span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold px-2 py-0.5 rounded-full">
                        HD 1080p
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate" dir="rtl">
                      محادثة مرئية تفاعلية بين آدم وعمر • منهج كونكت الرسمي
                    </span>
                  </div>
                </div>

                {/* Top Controls: Mode Switcher, Role-play, Speed */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* View Mode Toggle: Real Video vs Cartoon Studio vs Embed */}
                  <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-700 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setVideoPlayerMode('real_video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        videoPlayerMode === 'real_video'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>AI Video (MP4)</span>
                      {registeredVideo?.status === 'ready' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Video Ready" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoPlayerMode('cartoon_studio')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        videoPlayerMode === 'cartoon_studio'
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Cartoon Studio</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoPlayerMode('embed')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        videoPlayerMode === 'embed'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Curated Embed</span>
                    </button>
                  </div>

                  {/* Roleplay practice toggle */}
                  <button
                    type="button"
                    onClick={() => setIsRoleplayMode(!isRoleplayMode)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isRoleplayMode
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-rose-500" />
                    <span>{isRoleplayMode ? 'Role-Play Active' : 'Role-Play'}</span>
                  </button>

                  {/* Speech/Video playback speed */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextSpeed = dialogueSpeed === 0.85 ? 1.0 : dialogueSpeed === 1.0 ? 1.25 : 0.85;
                      handleSpeedChange(nextSpeed);
                    }}
                    className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold cursor-pointer border border-slate-700"
                    title="Change Playback Speed"
                  >
                    {dialogueSpeed}x
                  </button>
                </div>
              </div>

              {/* Video Load Warning if any */}
              {videoLoadError && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 flex items-center justify-between">
                  <span>⚠️ {videoLoadError}</span>
                  <button
                    type="button"
                    onClick={() => setVideoLoadError(null)}
                    className="text-amber-200 hover:text-white font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* 16:9 RESPONSIVE VIDEO PLAYER FRAME */}
              <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-950 flex flex-col justify-between">
                {videoPlayerMode === 'real_video' ? (
                  /* Mode A: Real Playable MP4 Video with Synchronized Subtitles */
                  <div className="relative w-full h-full bg-black flex flex-col justify-center items-center group">
                    <video
                      ref={videoRef}
                      src={registeredVideo?.videoUrl || '/assets/videos/p1_u1_adam_omar.mp4'}
                      poster={registeredVideo?.posterUrl}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={(e) => handleVideoTimeUpdate(e.currentTarget.currentTime)}
                      onPlay={() => setIsPlayingVideo(true)}
                      onPause={() => setIsPlayingVideo(false)}
                      onEnded={() => {
                        setIsPlayingVideo(false);
                        setActiveDialogueIndex(0);
                      }}
                      onError={() => {
                        setVideoLoadError("Video could not load. Switched to Cartoon Studio.");
                        setVideoPlayerMode('cartoon_studio');
                      }}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={handleTogglePlayRealVideo}
                    />

                    {/* Centered Big Play Button when paused */}
                    {!isPlayingVideo && (
                      <div
                        onClick={handleTogglePlayRealVideo}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
                      >
                        <div className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all ring-4 ring-white/30">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Video Player Floating Bottom Control Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 flex items-center justify-between text-xs text-white opacity-95 group-hover:opacity-100 transition-opacity flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleTogglePlayRealVideo}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                          title={isPlayingVideo ? "Pause" : "Play"}
                        >
                          {isPlayingVideo ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>
                        <button
                          type="button"
                          onClick={handleRestartRealVideo}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          title="Restart Video"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-[11px] text-slate-300">
                          {videoPlaybackTime.toFixed(1)}s / {registeredVideo?.durationSeconds || 7.5}s
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Speed pills */}
                        {[0.85, 1.0, 1.25].map(spd => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => handleSpeedChange(spd)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                              dialogueSpeed === spd ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}

                        {/* Subtitle Toggles */}
                        <button
                          type="button"
                          onClick={() => setShowEnSubtitles(p => !p)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            showEnSubtitles ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-transparent text-slate-400 border-slate-600'
                          }`}
                          title="Toggle English Subtitles"
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowArSubtitles(p => !p)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                            showArSubtitles ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-transparent text-slate-400 border-slate-600'
                          }`}
                          title="Toggle Arabic Subtitles"
                        >
                          عربي
                        </button>

                        {/* Fullscreen */}
                        <button
                          type="button"
                          onClick={handleFullscreenVideo}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer ml-1"
                          title="Fullscreen"
                        >
                          <Maximize className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : videoPlayerMode === 'embed' ? (
                  /* Mode B: Real Embedded Video Player Frame */
                  <div className="relative w-full h-full bg-black flex flex-col">
                    <iframe
                      src={targetVideoUrl}
                      title={`Connect Primary Dialogue Video - Unit ${lesson.unitNumber}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    {/* Floating quick switch banner */}
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={() => setVideoPlayerMode('real_video')}
                        className="px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black text-[10px] font-bold text-sky-300 border border-sky-400/40 backdrop-blur-md cursor-pointer transition-all shadow-md flex items-center gap-1"
                      >
                        <span>🎬 Switch to AI Cartoon Video</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mode C: Interactive 2-Boys Animated Stage (Adam & Omar Primary Classroom) */
                  <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] bg-[#0c241b] rounded-xl overflow-hidden p-3 sm:p-5 flex flex-col justify-between shadow-2xl border-4 border-[#78350f]">
                    {/* Blackboard Texture Overlay with Wood Frame */}
                    <div className="absolute inset-0 bg-radial from-[#154734] via-[#0d2e22] to-[#071d15] opacity-95 pointer-events-none" />

                    {/* Wooden Chalkboard Header Bar */}
                    <div className="relative z-10 flex items-center justify-between border-b-2 border-white/20 pb-2.5 text-xs text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/30 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold">
                          🏫 Connect Classroom
                        </span>
                        <span className="text-white font-black truncate text-xs sm:text-sm drop-shadow">
                          Primary {lesson.grade} • Unit {lesson.unitNumber}: {lesson.unitTitleEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-300 font-mono hidden sm:inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isSpeakingActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                          {isSpeakingActive ? 'Speech Active' : 'Dialogue Studio'}
                        </span>
                        {/* Switch to real video button */}
                        <button
                          type="button"
                          onClick={() => setVideoPlayerMode('real_video')}
                          className="px-2.5 py-0.5 rounded bg-sky-600/80 hover:bg-sky-500 text-white text-[10px] font-bold border border-sky-400 cursor-pointer shadow-xs transition-all"
                        >
                          🎬 MP4 Video
                        </button>
                      </div>
                    </div>

                    {/* Stage Center: Two Boys at School Desks with Dynamic Speech Bubble */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-4 my-auto px-2 sm:px-4 py-2">
                      {/* Boy 1: Adam (آدم) */}
                      <div className="flex flex-col items-center justify-center">
                        <BoyAvatar
                          type="adam"
                          isSpeaking={isSpeakingActive && currentTurn.speaker === 'adam'}
                          isMyRole={isRoleplayMode && selectedRole === 'adam'}
                        />
                      </div>

                      {/* Middle: Floating Blackboard Speech Card with Word-by-Word Highlight */}
                      <div className="flex flex-col items-center justify-center text-center px-2 w-full">
                        <div className="relative w-full p-4 rounded-2xl bg-slate-900/95 text-white shadow-2xl border-2 border-slate-700 backdrop-blur-md">
                          {/* Speaker Indicator */}
                          <div className="flex items-center justify-between gap-1 mb-2 border-b border-slate-800 pb-1.5 text-xs">
                            <span className={`px-2.5 py-0.5 rounded-full font-black text-[11px] flex items-center gap-1 shadow-xs ${
                              currentTurn.speaker === 'adam'
                                ? 'bg-sky-400 text-slate-950'
                                : 'bg-amber-400 text-slate-950'
                            }`}>
                              <span>{currentTurn.speaker === 'adam' ? '👦 Adam' : '🧒 Omar'}</span>
                              <span>({currentTurn.speakerNameAr})</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${isSpeakingActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                              <span className="text-[10px] font-mono text-slate-400 font-bold">
                                {isSpeakingActive ? 'Voice output...' : 'Ready'}
                              </span>
                            </div>
                          </div>

                          {/* English Sentence with Real-Time Word Highlighting */}
                          <p className="text-base sm:text-lg font-black text-amber-300 leading-snug drop-shadow min-h-[48px] flex items-center justify-center">
                            "{renderHighlightedText(currentTurn.en, currentCharIndex, isSpeakingActive)}"
                          </p>

                          {/* Arabic Translation */}
                          <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1.5 leading-relaxed" dir="rtl">
                            {currentTurn.ar}
                          </p>

                          {/* Direct Replay Sentence Button on Speech Card */}
                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                unlockAudio();
                                playSingleTurn(activeDialogueIndex);
                              }}
                              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                              title="Replay this sentence"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Replay Sentence / إعادة نطق الجملة</span>
                            </button>
                          </div>

                          {/* Pointer Arrow pointing to speaking boy */}
                          <div
                            className={`absolute -bottom-2.5 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-slate-700 transform rotate-45 transition-all duration-300 hidden md:block ${
                              currentTurn.speaker === 'adam' ? 'left-10' : 'right-10'
                            }`}
                          />
                        </div>

                        {/* Animated Live Equalizer Soundwave Bar */}
                        <div className="flex items-center gap-1 mt-3 h-5">
                          {[30, 65, 95, 50, 85, 40, 75, 100, 60, 35].map((h, bIdx) => (
                            <span
                              key={bIdx}
                              className={`w-1 rounded-full transition-all duration-150 ${
                                isSpeakingActive
                                  ? currentTurn.speaker === 'adam'
                                    ? 'bg-sky-400'
                                    : 'bg-amber-400'
                                  : 'bg-slate-700'
                              }`}
                              style={{ height: isSpeakingActive ? `${h}%` : '20%' }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Boy 2: Omar (عمر) */}
                      <div className="flex flex-col items-center justify-center">
                        <BoyAvatar
                          type="omar"
                          isSpeaking={isSpeakingActive && currentTurn.speaker === 'omar'}
                          isMyRole={isRoleplayMode && selectedRole === 'omar'}
                        />
                      </div>
                    </div>

                    {/* Wooden Chalk Tray with Chalk Sticks & Eraser at Bottom of Board */}
                    <div className="relative z-10 pt-2 border-t-4 border-[#5c280b] bg-[#451e08]/90 -mx-3 -mb-3 sm:-mx-5 sm:-mb-5 px-4 py-2 flex items-center justify-between text-xs text-amber-200">
                      <div className="flex items-center gap-3">
                        {/* Chalk Sticks */}
                        <div className="flex items-center gap-1">
                          <span className="w-5 h-2 rounded bg-white shadow-xs" title="White chalk" />
                          <span className="w-5 h-2 rounded bg-yellow-300 shadow-xs" title="Yellow chalk" />
                          <span className="w-8 h-3 rounded bg-amber-900 border border-amber-950 shadow-xs text-[8px] flex items-center justify-center text-amber-200 font-bold" title="Eraser">
                            Eraser
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-300">
                          Turn {activeDialogueIndex + 1} of {dialogueTurns.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-100" dir="rtl">
                          المتحدث: {currentTurn.speakerNameAr} ({currentTurn.speakerNameEn})
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. DYNAMIC SYNCHRONIZED BILINGUAL SUBTITLES (Directly below video frame) */}
              <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-slate-700/80 shadow-lg space-y-3 text-center transition-all">
                {/* Subtitle Header with Speaker Badge, Timing & Replay Button */}
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-xs ${
                      currentTurn.speaker === 'adam'
                        ? 'bg-sky-400 text-slate-950 ring-2 ring-sky-300'
                        : 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                    }`}>
                      <span>{currentTurn.speaker === 'adam' ? '👦' : '🧒'}</span>
                      <span>{currentTurn.speakerNameEn} ({currentTurn.speakerNameAr})</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Turn {activeDialogueIndex + 1} of {dialogueTurns.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Instant Replay Sentence Button in Subtitle Bar */}
                    <button
                      type="button"
                      onClick={() => {
                        unlockAudio();
                        playSingleTurn(activeDialogueIndex);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Replay Sentence / إعادة الجملة</span>
                    </button>

                    {isRoleplayMode && (
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        Role: {selectedRole === 'adam' ? 'You are Adam' : 'You are Omar'}
                      </span>
                    )}
                  </div>
                </div>

                {/* English Spoken Text on top (Large, Bold, High Contrast with Spoken Word Highlight) */}
                {showEnSubtitles && (
                  <p className="text-base sm:text-2xl font-black text-amber-300 tracking-wide leading-snug drop-shadow-sm min-h-[36px] flex items-center justify-center">
                    "{renderHighlightedText(currentTurn.en, currentCharIndex, isSpeakingActive)}"
                  </p>
                )}

                {/* Arabic Translation directly beneath it */}
                {showArSubtitles && (
                  <p className="text-xs sm:text-base font-semibold text-slate-200 leading-relaxed" dir="rtl">
                    {currentTurn.ar}
                  </p>
                )}

                {/* Role-Play Turn Prompt if it's the student's turn */}
                {isRoleplayMode && currentTurn.speaker === selectedRole && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-200 text-xs font-bold flex items-center justify-between flex-wrap gap-2 animate-pulse">
                    <span>🎙️ Your turn to speak as {currentTurn.speakerNameEn}! Read the sentence aloud.</span>
                    <button
                      type="button"
                      onClick={() => {
                        unlockAudio();
                        if (activeDialogueIndex + 1 < dialogueTurns.length) {
                          setActiveDialogueIndex(prev => prev + 1);
                          playDialogueLine(activeDialogueIndex + 1);
                        } else {
                          setIsPlayingVideo(false);
                          setIsSpeakingActive(false);
                          setActiveDialogueIndex(0);
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black cursor-pointer shadow-xs"
                    >
                      I spoke it! Next Turn →
                    </button>
                  </div>
                )}
              </div>

              {/* 3. DIALOGUE CONTROLS & LINE SCRUBBER */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                {/* Play / Pause / Replay Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlayVideo}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    {isPlayingVideo ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlayingVideo ? 'Pause Video' : 'Play Video / Speech'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestartVideo}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700 active:scale-95"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay All</span>
                  </button>
                </div>

                {/* Role selection buttons when role-play mode is active */}
                {isRoleplayMode && (
                  <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        unlockAudio();
                        setSelectedRole('adam');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedRole === 'adam'
                          ? 'bg-sky-500 text-slate-950 shadow-xs font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      👦 I'm Adam
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        unlockAudio();
                        setSelectedRole('omar');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedRole === 'omar'
                          ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🧒 I'm Omar
                    </button>
                  </div>
                )}

                {/* Turn selector scrubber pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                  {dialogueTurns.map((turn, tIdx) => (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => {
                        unlockAudio();
                        setActiveDialogueIndex(tIdx);
                        if (videoPlayerMode === 'real_video' && videoRef.current && registeredVideo?.subtitles?.[tIdx]) {
                          videoRef.current.currentTime = registeredVideo.subtitles[tIdx].startTime;
                          videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => {});
                        } else {
                          playDialogueLine(tIdx);
                        }
                      }}
                      className={`min-w-[44px] h-9 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                        activeDialogueIndex === tIdx
                          ? turn.speaker === 'adam'
                            ? 'bg-sky-500 text-slate-950 shadow-md ring-2 ring-sky-300'
                            : 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                      title={`Play Turn ${tIdx + 1}: ${turn.speakerNameEn}`}
                    >
                      <span>{turn.speaker === 'adam' ? '👦' : '🧒'}</span>
                      <span>Turn {tIdx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. GUIDED WRITING & PHONICS DRILLS BANNER */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-2xl border border-teal-200 flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <div>
                <h3 className="text-base font-black text-teal-950">
                  Skills Builder: Guided Writing &amp; Phonics Drills
                </h3>
                <p className="text-xs text-teal-800">
                  Practice early written production, phonics identification, and situational communication.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {lesson.tab3_Skills.map((act, idx) => {
                const userVal = skillsInputs[idx] || '';
                const isRevealed = skillsRevealed[idx];

                return (
                  <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                        {act.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">Activity {idx + 1}</span>
                    </div>

                    <p className="text-sm font-bold text-slate-800 leading-relaxed">
                      {act.instruction}
                    </p>

                    {/* Prompt Box */}
                    <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-800 font-mono border border-slate-200 whitespace-pre-line">
                      {act.prompt}
                    </div>

                    {/* Scaffolding hints */}
                    {act.scaffoldingHints && act.scaffoldingHints.length > 0 && (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                        <span className="font-bold flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          <span>Scaffolding Hints (إرشادات للمساعدة):</span>
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-amber-950">
                          {act.scaffoldingHints.map((hint, hIdx) => (
                            <li key={hIdx}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interactive Input */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) => setSkillsInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Type your response here..."
                        className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setSkillsRevealed(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          className="text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
                        >
                          {isRevealed ? 'Hide Model Response' : 'Show Model Response'}
                        </button>
                      </div>
                    </div>

                    {/* Model response box */}
                    {isRevealed && (
                      <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1 animate-in fade-in">
                        <span className="font-black text-emerald-900 block">
                          ✓ Target Model Response:
                        </span>
                        <p className="font-mono font-bold text-emerald-950">
                          {act.targetResponses.join(' / ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 4: 5-LEVEL ADAPTIVE EXAM SUITE
           ========================================================== */}
        {activeTab === 'exams' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            {/* Level Selector Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Adaptive Exam Suite • الاختبار المتدرج
                </span>
                <h3 className="text-sm sm:text-base font-black text-indigo-950">
                  {getLevelTitle(currentExamLevel)}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full">
                {([1, 2, 3, 4, 5] as const).map(lvl => {
                  const isDone = isLevelSubmitted[lvl];
                  const levelScore = levelScores[lvl];
                  const pct = levelScore ? Math.round((levelScore.score / levelScore.total) * 100) : 0;
                  const isPass = pct >= 50;

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCurrentExamLevel(lvl)}
                      className={`min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl font-black text-xs transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        currentExamLevel === lvl
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                          : isDone
                          ? isPass
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                      title={getLevelTitle(lvl)}
                      aria-label={`Level ${lvl}`}
                    >
                      <div className="flex items-center gap-1">
                        <span>L{lvl}</span>
                        {isDone && (isPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-[10px]">⚠️</span>)}
                      </div>
                      {isDone && levelScore && (
                        <span className={`text-[9px] font-bold ${currentExamLevel === lvl ? 'text-indigo-100' : 'text-slate-600'}`}>
                          {pct}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level Score Summary if Submitted */}
            {isLevelSubmitted[currentExamLevel] && levelScores[currentExamLevel] && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-7 h-7 text-amber-300 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 uppercase">
                        Level {currentExamLevel} Saved Result
                      </span>
                      <span className="text-[10px] bg-emerald-200/80 text-emerald-950 font-black px-2 py-0.5 rounded-full">
                        {Math.round((levelScores[currentExamLevel].score / levelScores[currentExamLevel].total) * 100) >= 50
                          ? '✓ Passed / ناجح'
                          : 'Needs Revision / بحاجة للمراجعة'}
                      </span>
                    </div>
                    <div className="text-lg font-black text-emerald-950">
                      Score: {levelScores[currentExamLevel].score} / {levelScores[currentExamLevel].total} Marks ({Math.round((levelScores[currentExamLevel].score / levelScores[currentExamLevel].total) * 100)}%)
                    </div>
                    {savedProgress?.levels[currentExamLevel]?.completedAt && (
                      <span className="text-[10px] text-slate-500">
                        Saved in browser: {new Date(savedProgress.levels[currentExamLevel].completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleRetakeLevel(currentExamLevel)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-black shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Retake / إعادة المحاولة</span>
                  </button>

                  {currentExamLevel < 5 && Math.round((levelScores[currentExamLevel].score / levelScores[currentExamLevel].total) * 100) >= 50 && (
                    <button
                      type="button"
                      onClick={() => setCurrentExamLevel((currentExamLevel + 1) as 1 | 2 | 3 | 4 | 5)}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Next Level</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {getExamQuestions(currentExamLevel).map((q, qIdx) => {
                const studentAns = userAnswers[q.id] || '';
                const qFeedback = feedback[q.id];

                return (
                  <div key={q.id} className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <p className="font-black text-slate-900 text-sm sm:text-base leading-relaxed">
                          {q.questionPrompt}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                        {q.marks} Mark{q.marks > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* MCQ Options with 48px touch targets */}
                    {(q.type === 'mcq' || q.type === 'matching' || (q.type === 'fill_in_the_blank' && q.options)) && q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = studentAns === opt;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleAnswerSelect(q.id, opt)}
                              className={`min-h-[48px] p-3.5 text-sm text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-50 font-black text-indigo-900 ring-2 ring-indigo-600/30'
                                  : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800'
                              }`}
                            >
                              <span className="font-medium">{opt}</span>
                              {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Free input for reorder, fill_in_the_blank without options, punctuation, guided_sentence */}
                    {(q.type === 'reorder' || q.type === 'punctuation' || q.type === 'guided_sentence' || (q.type === 'fill_in_the_blank' && !q.options)) && (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          value={studentAns}
                          onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium"
                        />
                      </div>
                    )}

                    {/* Feedback display */}
                    {qFeedback && (
                      <div className={`p-3.5 rounded-xl text-xs space-y-1 animate-in fade-in ${
                        qFeedback.correct ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                      }`}>
                        <div className="flex items-center gap-1.5 font-black">
                          {qFeedback.correct ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>✓ إجابة صحيحة (Correct)</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>
                                ✗ إجابة غير صحيحة (الإجابة المعتمدة:{' '}
                                {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer})
                              </span>
                            </>
                          )}
                        </div>
                        <p className="font-medium" dir="rtl">{qFeedback.note}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Level Button */}
              <button
                type="button"
                onClick={() => evaluateLevel(getExamQuestions(currentExamLevel))}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-2xl font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Level {currentExamLevel} ({getExamQuestions(currentExamLevel).length} Questions)</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
