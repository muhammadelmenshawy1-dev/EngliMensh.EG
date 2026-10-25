import React, { useRef, useState, useEffect } from 'react';
import {
  Rocket,
  BookOpen,
  ArrowRight,
  Flame,
  Camera,
  Smartphone,
  CheckCircle2,
  GraduationCap,
  Star,
  Target,
  Heart,
  Download,
  Sparkles,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { StudentProfile } from '../types.ts';
import { getStudentAvatar, saveStudentAvatar } from '../services/studentStorage.ts';
import { compressImageToAvatar } from '../utils/imageUtils.ts';

interface HomeViewProps {
  student: StudentProfile | null;
  isInstalled: boolean;
  onNavigate: (tab: 'curricula' | 'exams' | 'games' | 'leaderboard' | 'profile', stage?: 'Primary' | 'Preparatory' | 'Secondary') => void;
  onOpenInstallModal: () => void;
  onOpenShareModal: () => void;
  onOpenRegistrationModal: () => void;
  onStudentUpdated?: (updated: StudentProfile) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  student,
  isInstalled: _isInstalled,
  onNavigate,
  onOpenInstallModal,
  onOpenShareModal,
  onOpenRegistrationModal,
  onStudentUpdated,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<string>(() => {
    return student?.avatarUrl || (student?.id ? getStudentAvatar(student.id) : null) || '';
  });
  const [gradeNotification, setGradeNotification] = useState<string>('');

  useEffect(() => {
    setAvatar(student?.avatarUrl || (student?.id ? getStudentAvatar(student.id) : null) || '');
  }, [student]);

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;

    try {
      const compressed = await compressImageToAvatar(file, {
        maxWidth: 256,
        maxHeight: 256,
        quality: 0.8,
      });

      if (!compressed) return;

      setAvatar(compressed);
      if (student?.id) {
        const updated = saveStudentAvatar(student.id, compressed);
        if (updated && onStudentUpdated) {
          onStudentUpdated(updated);
        }
      }
    } catch (err) {
      console.error('Error handling avatar upload in HomeView:', err);
    } finally {
      e.target.value = '';
    }
  };

  const handleGradeExplore = (gradeName: 'Primary' | 'Preparatory' | 'Secondary') => {
    onNavigate('curricula', gradeName);
  };

  // Compute student progress indicators
  const completedExamsCount = student?.examHistory?.length || 0;
  const targetDailyTasks = 5;
  const dailyProgressPercent = Math.min(100, Math.round(((completedExamsCount % 5) / targetDailyTasks) * 100) || 20);

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300" dir="ltr">
      
      {/* ========================================================
          1. HERO SECTION (Gradient Dark Blue #0B397D to #0878E8)
         ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white shadow-2xl p-6 sm:p-10 lg:p-12 border border-blue-400/20">
        {/* Subtle decorative background effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wide text-blue-200 uppercase bg-blue-900/60 px-3.5 py-1 rounded-full border border-blue-400/30">
              Welcome to EngliMensh.EG
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Learn English <br />
              <span className="text-[#FFC928] drop-shadow-md">
                the Easy &amp; Fun Way!
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-blue-100/90 font-normal leading-relaxed max-w-xl">
              Complete English learning platform with interactive lessons, quizzes, games and much more.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              {/* Primary Yellow Button */}
              <button
                onClick={() => onNavigate('exams')}
                className="px-6 py-3.5 rounded-full bg-[#FFC928] hover:bg-[#ffbe0b] text-[#0B397D] text-sm sm:text-base font-black shadow-lg shadow-amber-400/25 hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer group active:scale-95"
              >
                <Rocket className="w-5 h-5 text-[#0B397D] fill-current" />
                <span>Start Learning</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">&gt;</span>
              </button>

              {/* Secondary Blue Button */}
              <button
                onClick={() => onNavigate('curricula')}
                className="px-6 py-3.5 rounded-full bg-blue-950/60 hover:bg-blue-900/80 text-white border border-blue-300/40 text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-5 h-5 text-blue-200" />
                <span>Explore Curricula</span>
              </button>
            </div>

            {/* Hero Feature Checklist */}
            <div className="pt-3 border-t border-blue-400/20 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-blue-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[#FFC928] font-bold">✓</span>
                <span>For all grades</span>
              </div>
              <span className="text-blue-300/50 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC928]" />
                <span>Easy to use</span>
              </div>
              <span className="text-blue-300/50 hidden xs:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC928]" />
                <span>Fun &amp; Interactive</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (5 Cols - Matching Mockup with student, badges, Big Ben artwork) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/assets/redesign/hero-student.png"
                alt="Smiling student holding books with learning badges"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          NOTIFICATION TOAST (when grade filter is clicked)
         ======================================================== */}
      {gradeNotification && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-[#FFC928] text-[#0B397D] text-sm font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-current" />
            <span>{gradeNotification}</span>
          </div>
          <button
            onClick={() => setGradeNotification('')}
            className="text-xs px-2 py-1 rounded-md bg-[#FFC928] text-[#0B397D] font-black"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================
          STUDENT PROFILE & LIVE PROGRESS CARD (Preserved Logic)
         ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_-5px_rgba(11,57,125,0.08)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Student Profile Info */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Clickable Student Avatar with Camera Badge & Compression */}
            <div className="relative group shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] overflow-hidden cursor-pointer shadow-lg shadow-blue-900/10 border-2 border-[#FFC928] relative group transition-all active:scale-95 hover:border-amber-400 bg-slate-900"
                style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '20px' }}
                title="Click to upload/change profile picture"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={student?.name || 'Student Avatar'}
                    className="w-full h-full object-cover rounded-[20px]"
                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '20px' }}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-[#0878E8] to-[#0B397D] text-white flex items-center justify-center font-black text-2xl sm:text-3xl"
                    style={{ borderRadius: '20px' }}
                  >
                    {student?.name?.charAt(0).toUpperCase() || 'S'}
                  </div>
                )}

                {/* Hover Camera Prompt */}
                <div className="absolute inset-0 bg-[#0B397D]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold select-none">
                  <Camera className="w-4 h-4 mb-0.5 text-[#FFC928]" />
                  <span>{avatar ? 'Change' : 'Upload'}</span>
                </div>
              </div>

              {/* Camera Badge Icon */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFC928] text-[#0B397D] flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-all cursor-pointer"
                title="Upload custom avatar photo"
              >
                <Camera className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>

            <div className="space-y-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0878E8] uppercase tracking-wider">
                  {student?.role === 'teacher' ? 'Teacher / Educator Portal' : 'Active Learner'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Online
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#12366B] tracking-tight truncate">
                {student?.name ? `Welcome back, ${student.name}` : 'Welcome, Student!'}
              </h2>

              <p className="text-xs text-[#5A6E85] font-medium truncate max-w-md">
                {[
                  student?.grade || '1st Secondary',
                  student?.school || 'General Secondary School',
                  student?.group ? `Group ${student.group.replace(/^Group\s*/i, '')}` : 'Group A',
                ].filter(Boolean).join(' • ')}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges & Profile Trigger */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full md:w-auto md:min-w-[340px]">
            <div className="bg-[#F4F8FD] px-3 py-2.5 rounded-2xl border border-blue-100 text-center flex flex-col justify-center items-center h-16 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#5A6E85] tracking-wider">Total Points</span>
              <span className="text-base sm:text-lg font-black text-[#0878E8] font-mono leading-none mt-1">
                {student?.totalScore || 0} <span className="text-[10px] text-blue-400 font-sans">pts</span>
              </span>
            </div>

            <div className="bg-[#F4F8FD] px-3 py-2.5 rounded-2xl border border-blue-100 text-center flex flex-col justify-center items-center h-16 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#5A6E85] tracking-wider">Streak</span>
              <span className="text-base sm:text-lg font-black text-orange-500 font-mono flex items-center justify-center gap-1 leading-none mt-1">
                {student?.highStreak || 0}x <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              </span>
            </div>

            <button
              onClick={onOpenRegistrationModal}
              className="bg-[#FFC928]/20 hover:bg-[#FFC928]/35 text-[#0B397D] border border-[#FFC928]/50 px-3 py-2.5 rounded-2xl text-center flex flex-col justify-center items-center h-16 transition-all cursor-pointer shadow-2xs active:scale-95 group"
            >
              <span className="text-[10px] uppercase font-bold text-[#12366B] tracking-wider">Account</span>
              <span className="text-xs sm:text-sm font-bold text-[#0B397D] group-hover:text-[#0878E8] leading-none mt-1">
                Edit Profile ⚙️
              </span>
            </button>
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5A6E85]">
            <span className="font-semibold flex items-center gap-1.5 text-[#12366B]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC928] fill-current" />
              <span>Daily Practice Progress ({completedExamsCount % 5}/{targetDailyTasks} Tests Completed)</span>
            </span>
            <span className="font-mono text-[#0878E8] font-bold">{dailyProgressPercent}% Complete</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0878E8] via-[#0B397D] to-[#FFC928] transition-all duration-500 shadow-xs"
              style={{ width: `${dailyProgressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURES SECTION ("What Makes EngliMensh Special?")
         ======================================================== */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-1 rounded-full bg-[#FFC928]" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#12366B] tracking-tight">
              What Makes EngliMensh Special?
            </h2>
            <span className="w-8 h-1 rounded-full bg-[#FFC928]" />
          </div>
          <p className="text-sm sm:text-base text-[#5A6E85] font-medium">
            Everything you need to build your English skills in one place
          </p>
        </div>

        {/* 5 Circular-Icon Feature Cards (White card with circular blue-gradient icon & yellow arrow) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Card 1: Curricula */}
          <div
            onClick={() => onNavigate('curricula')}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(11,57,125,0.06)] hover:shadow-[0_10px_30px_-5px_rgba(8,120,232,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src="/assets/redesign/feat-curricula.png"
                  alt="Curricula"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-[#12366B]">Curricula</h3>
              <p className="text-xs text-[#5A6E85] leading-relaxed">
                Well-organized lessons for each grade level.
              </p>
            </div>

            <div className="mt-5 w-8 h-8 rounded-full bg-[#FFC928] group-hover:bg-[#ffbe0b] text-[#0B397D] flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Exams */}
          <div
            onClick={() => onNavigate('exams')}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(11,57,125,0.06)] hover:shadow-[0_10px_30px_-5px_rgba(8,120,232,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src="/assets/redesign/feat-exams.png"
                  alt="Exams"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-[#12366B]">Exams</h3>
              <p className="text-xs text-[#5A6E85] leading-relaxed">
                Realistic quizzes to check your progress.
              </p>
            </div>

            <div className="mt-5 w-8 h-8 rounded-full bg-[#FFC928] group-hover:bg-[#ffbe0b] text-[#0B397D] flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Learning Games */}
          <div
            onClick={() => onNavigate('games')}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(11,57,125,0.06)] hover:shadow-[0_10px_30px_-5px_rgba(8,120,232,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src="/assets/redesign/feat-games.png"
                  alt="Learning Games"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-[#12366B]">Learning Games</h3>
              <p className="text-xs text-[#5A6E85] leading-relaxed">
                Make learning fun and exciting!
              </p>
            </div>

            <div className="mt-5 w-8 h-8 rounded-full bg-[#FFC928] group-hover:bg-[#ffbe0b] text-[#0B397D] flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Vocabulary & Grammar */}
          <div
            onClick={() => onNavigate('curricula')}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(11,57,125,0.06)] hover:shadow-[0_10px_30px_-5px_rgba(8,120,232,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src="/assets/redesign/feat-vocab.png"
                  alt="Vocabulary & Grammar"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-[#12366B]">Vocabulary &amp; Grammar</h3>
              <p className="text-xs text-[#5A6E85] leading-relaxed">
                Build your vocabulary and master grammar.
              </p>
            </div>

            <div className="mt-5 w-8 h-8 rounded-full bg-[#FFC928] group-hover:bg-[#ffbe0b] text-[#0B397D] flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: Progress Tracking */}
          <div
            onClick={() => onNavigate('leaderboard')}
            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(11,57,125,0.06)] hover:shadow-[0_10px_30px_-5px_rgba(8,120,232,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src="/assets/redesign/feat-progress.png"
                  alt="Progress Tracking"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-[#12366B]">Progress Tracking</h3>
              <p className="text-xs text-[#5A6E85] leading-relaxed">
                See your results and improve.
              </p>
            </div>

            <div className="mt-5 w-8 h-8 rounded-full bg-[#FFC928] group-hover:bg-[#ffbe0b] text-[#0B397D] flex items-center justify-center transition-all group-hover:scale-110 shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. GRADE SELECTION SECTION ("Choose Your Grade")
         ======================================================== */}
      <section id="grade-selection-section" className="space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-1 rounded-full bg-[#FFC928]" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#12366B] tracking-tight">
              Choose Your Grade
            </h2>
            <span className="w-8 h-1 rounded-full bg-[#FFC928]" />
          </div>
          <p className="text-sm sm:text-base text-[#5A6E85] font-medium">
            Select your grade level to access the right curriculum and tests
          </p>
        </div>

        {/* 3 Large Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Primary Stage */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_25px_-5px_rgba(11,57,125,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between">
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-44 h-32 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/redesign/grade-primary.png"
                  alt="Primary Students"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#12366B]">
                  Primary (Grades 1 – 6)
                </h3>
                <p className="text-sm font-bold text-[#0878E8]" dir="rtl">
                  المرحلة الابتدائية
                </p>
              </div>
            </div>

            <button
              onClick={() => handleGradeExplore('Primary')}
              className="mt-6 w-full py-3 rounded-full bg-[#FFC928] hover:bg-[#ffbe0b] text-[#0B397D] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Primary</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Card 2: Preparatory Stage */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_25px_-5px_rgba(11,57,125,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between">
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-44 h-32 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/redesign/grade-preparatory.png"
                  alt="Preparatory Student"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#12366B]">
                  Preparatory (Grades 7 – 9)
                </h3>
                <p className="text-sm font-bold text-[#0878E8]" dir="rtl">
                  المرحلة المتوسطة
                </p>
              </div>
            </div>

            <button
              onClick={() => handleGradeExplore('Preparatory')}
              className="mt-6 w-full py-3 rounded-full bg-[#FFC928] hover:bg-[#ffbe0b] text-[#0B397D] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Preparatory</span>
              <span>&gt;</span>
            </button>
          </div>

          {/* Card 3: Secondary Stage (Active Focus) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#0878E8]/40 shadow-[0_6px_30px_-5px_rgba(8,120,232,0.18)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between relative overflow-hidden">
            {/* Top Badge */}
            <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
              2026/2027 MOE Dual Paths
            </span>

            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-44 h-32 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/redesign/grade-secondary.png"
                  alt="Secondary Students"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#12366B]">
                  Secondary Stage (Grades 10 – 12)
                </h3>
                <p className="text-xs font-bold text-[#0878E8]" dir="rtl">
                  الثانوية العامة والبكالوريا المصرية (2026/2027)
                </p>
                <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 font-semibold">
                  <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded-md border border-blue-200/60">Thanaweya Amma</span>
                  <span>•</span>
                  <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200/60">Baccalaureate</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleGradeExplore('Secondary')}
              className="mt-6 w-full py-3 rounded-full bg-[#FFC928] hover:bg-[#ffbe0b] text-[#0B397D] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Secondary &amp; Baccalaureate</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. MOBILE APP BANNER (Rich Royal Blue #0858C8 Card)
         ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0858C8] via-[#0868D8] to-[#0B397D] text-white p-6 sm:p-10 shadow-2xl border border-blue-300/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Smartphone Mockup (3 Cols) */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="w-36 sm:w-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-slate-900 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src="/assets/redesign/phone-mockup.png"
                alt="EngliMensh Mobile App Screen"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Middle: Content & CTAs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-xs sm:text-sm font-semibold text-blue-200">
              Ready to take your English to the next level?
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Try the <span className="text-[#FFC928]">EngliMensh</span> App!
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
              Access all features on your mobile anytime, anywhere. Full offline capability, fast question loading, and instant exam grading.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Outline Button: APK / Android */}
              <button
                onClick={onOpenInstallModal}
                className="px-4 py-2.5 rounded-full border-2 border-white/80 hover:border-white hover:bg-white/10 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-white" />
                <span>Available for Android (APK)</span>
              </button>

              {/* Filled White Button: Install Now */}
              <button
                onClick={onOpenInstallModal}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#0B397D] text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-[#0878E8] fill-current" />
                <span>Install Now</span>
              </button>
            </div>
          </div>

          {/* Right: QR Code & Handwritten Tagline (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center text-center space-y-3">
            <div className="font-handwriting text-xl sm:text-2xl font-bold text-[#FFC928] leading-tight">
              Your English <br />
              Journey Starts Here ⤷
            </div>

            {/* White QR Code Container */}
            <div
              onClick={onOpenShareModal}
              className="bg-white p-2.5 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-transform border border-amber-300"
              title="Click to share or scan QR code"
            >
              <img
                src="/assets/redesign/banner-qr.png"
                alt="EngliMensh Web App QR Code"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg"
              />
            </div>
            <span className="text-[11px] text-blue-200 font-medium">
              Scan to visit the app
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. VALUE & TRUST METRICS SECTION
         ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_25px_-5px_rgba(11,57,125,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1: Better Grades */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0878E8] flex items-center justify-center shrink-0 border border-blue-100">
              <GraduationCap className="w-6 h-6 text-[#0878E8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-black text-[#12366B]">
                Better Grades
              </h4>
              <p className="text-xs text-[#5A6E85] leading-snug">
                Improve your skills and achieve your goals.
              </p>
            </div>
          </div>

          {/* Benefit 2: More Confidence */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
              <Star className="w-6 h-6 text-[#FFC928] fill-current" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-black text-[#12366B]">
                More Confidence
              </h4>
              <p className="text-xs text-[#5A6E85] leading-snug">
                Speak, read and write with confidence.
              </p>
            </div>
          </div>

          {/* Benefit 3: A Brighter Future */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0878E8] flex items-center justify-center shrink-0 border border-blue-100">
              <Target className="w-6 h-6 text-[#0878E8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-black text-[#12366B]">
                A Brighter Future
              </h4>
              <p className="text-xs text-[#5A6E85] leading-snug">
                English opens doors to new opportunities.
              </p>
            </div>
          </div>

          {/* Benefit 4: Parents' Trust */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
              <Heart className="w-6 h-6 text-[#FFC928] fill-current" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-black text-[#12366B]">
                Parents&apos; Trust
              </h4>
              <p className="text-xs text-[#5A6E85] leading-snug">
                A safe and effective learning environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
