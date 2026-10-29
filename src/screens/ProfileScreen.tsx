import React, { useState, useEffect } from 'react';
import {
  Award,
  Trophy,
  ShieldCheck,
  Edit3,
  Check,
  RotateCcw,
  BookOpen,
  Gamepad2,
  Bookmark,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import { StudentProfile } from '../types.ts';
import { EducationalStage } from '../types/curriculum.ts';
import { useGameLeaderboard } from '../hooks/useGameLeaderboard.ts';
import {
  loadLearningState,
  loadWordBank,
  evaluateStudentAchievements,
  updateStudentProfileMetadata,
  resetStudentLearningProgress,
  LearningStoreState,
} from '../services/learningStore.ts';

interface ProfileScreenProps {
  student: StudentProfile | null;
  onUpdateStudentName: (newName: string) => void;
  onStateUpdated?: () => void;
}

const AVATAR_OPTIONS = ['👦', '👧', '🧑‍🎓', '🦸‍♂️', '🦸‍♀️', '🦁', '🚀', '🏆'];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  onUpdateStudentName,
  onStateUpdated,
}) => {
  const [learningState, setLearningState] = useState<LearningStoreState>(() =>
    loadLearningState()
  );
  const [wordBankCount, setWordBankCount] = useState<number>(
    () => loadWordBank().length
  );

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(
    student?.name || learningState.nickname || 'عمر محمد'
  );
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] =
    useState<boolean>(false);

  const { entries, clearLeaderboard } = useGameLeaderboard();

  useEffect(() => {
    const ls = loadLearningState();
    setLearningState(ls);
    setWordBankCount(loadWordBank().length);
    setNameInput(student?.name || ls.nickname || 'عمر محمد');
  }, [student]);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      const updated = updateStudentProfileMetadata({ nickname: trimmed });
      setLearningState(updated);
      onUpdateStudentName(trimmed);
      setIsEditingName(false);
      onStateUpdated?.();
    }
  };

  const handleSelectAvatar = (emoji: string) => {
    const updated = updateStudentProfileMetadata({ avatar: emoji });
    setLearningState(updated);
    setShowAvatarPicker(false);
    onStateUpdated?.();
  };

  const handleStageChange = (stage: EducationalStage) => {
    const defaultGrade =
      stage === 'Primary' ? 1 : stage === 'Preparatory' ? 7 : 10;
    const updated = updateStudentProfileMetadata({
      preferredStage: stage,
      preferredGrade: defaultGrade,
    });
    setLearningState(updated);
    onStateUpdated?.();
  };

  const handleGradeChange = (grade: number) => {
    const updated = updateStudentProfileMetadata({
      preferredGrade: grade,
    });
    setLearningState(updated);
    onStateUpdated?.();
  };

  const handleConfirmResetProgress = () => {
    const fresh = resetStudentLearningProgress();
    clearLeaderboard();
    setLearningState(fresh);
    setShowResetConfirmModal(false);
    onStateUpdated?.();
  };

  const displayXp = Math.max(learningState.xp, student?.totalScore || 0);
  const displayName = student?.name || learningState.nickname || 'عمر محمد';

  // Evaluate all 8 achievements from real student data
  const achievements = evaluateStudentAchievements(
    learningState,
    wordBankCount,
    student?.badges || []
  );
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Build truthful local podium from recorded local sessions (or current student profile if no game sessions yet)
  const podiumRecords =
    entries.length > 0
      ? entries.slice(0, 3).map((e) => ({
          name: e.studentName,
          score: e.score,
          subtitle: e.gameTitle,
          isPlaceholder: false,
        }))
      : [
          {
            name: displayName,
            score: displayXp,
            subtitle: 'رصيدك الحالي على الجهاز',
            isPlaceholder: false,
          },
        ];

  const firstPlace = podiumRecords[0] || {
    name: displayName,
    score: displayXp,
    subtitle: 'المركز الأول',
    isPlaceholder: false,
  };
  const secondPlace = podiumRecords[1] || {
    name: 'بانتظار جولة 2',
    score: 0,
    subtitle: 'العب لتسجيل رقم جديد',
    isPlaceholder: true,
  };
  const thirdPlace = podiumRecords[2] || {
    name: 'بانتظار جولة 3',
    score: 0,
    subtitle: 'العب لتسجيل رقم جديد',
    isPlaceholder: true,
  };

  const availableGrades =
    learningState.preferredStage === 'Primary'
      ? [1, 2, 3, 4, 5, 6]
      : learningState.preferredStage === 'Preparatory'
      ? [7, 8, 9]
      : [10, 11, 12];

  return (
    <div
      className="space-y-4 pb-24 pt-3 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
      dir="rtl"
    >
      {/* 1. Student Identity & Total XP Card (Matches Screen 5 Mockup) */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 sm:p-6 shadow-sm text-center space-y-4 relative overflow-hidden">
        {/* Top Royal Blue Decorative Header Accent */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[#1E3A8A] via-[#172E6E] to-[#0F2856]" />

        {/* Avatar with Gold Ring */}
        <div className="relative pt-4">
          <button
            type="button"
            onClick={() => setShowAvatarPicker((prev) => !prev)}
            className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#F59E0B] via-amber-300 to-[#D97706] p-1 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            title="تغيير الصورة الرمزية"
          >
            <div className="w-full h-full rounded-full bg-amber-50 flex items-center justify-center text-5xl select-none">
              {learningState.avatar || '👦'}
            </div>
            <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1E3A8A] border-2 border-white text-white flex items-center justify-center text-xs shadow-xs">
              ✎
            </span>
          </button>

          {showAvatarPicker && (
            <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 inline-flex flex-wrap items-center justify-center gap-2">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={`avatar_opt_${emoji}`}
                  type="button"
                  onClick={() => handleSelectAvatar(emoji)}
                  className={`w-10 h-10 rounded-xl text-2xl flex items-center justify-center cursor-pointer transition-all ${
                    learningState.avatar === emoji
                      ? 'bg-[#1E3A8A] ring-2 ring-[#F59E0B]'
                      : 'bg-white hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Student Title & Editable Name */}
        <div className="space-y-1">
          <span className="text-xs font-black text-[#64748B] block">
            بطل EngliMensh
          </span>

          {isEditingName ? (
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto pt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border-2 border-[#1E3A8A] text-[#0F172A] font-black text-sm text-center focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="p-2 rounded-xl bg-[#1E3A8A] text-white font-bold cursor-pointer"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                {displayName}
              </h1>
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E3A8A] hover:bg-slate-100 transition-colors cursor-pointer"
                title="تعديل الاسم"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-black">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>مقاتل الكلمات</span>
          </div>
        </div>

        {/* Large XP Pill Banner (Matches Screen 5 Mockup: 🏆 1250 XP) */}
        <div className="py-3 px-6 rounded-2xl bg-slate-50 border border-[#E2E8F0] shadow-inner inline-flex items-center justify-center gap-3">
          <Trophy className="w-7 h-7 text-[#F59E0B] fill-[#F59E0B]" />
          <span
            className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight"
            dir="ltr"
          >
            {displayXp} XP
          </span>
        </div>

        {/* Activity Stats Summary Row */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <BookOpen className="w-4 h-4 text-[#1E3A8A] mx-auto mb-1" />
            <span className="text-sm font-black text-[#0F172A] block">
              {learningState.lessonsCompleted}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">درس مكتمل</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <Gamepad2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span className="text-sm font-black text-[#0F172A] block">
              {learningState.gamesWon}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">فوز بالألعاب</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <Bookmark className="w-4 h-4 text-[#D97706] mx-auto mb-1" />
            <span className="text-sm font-black text-[#0F172A] block">
              {wordBankCount}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">كلمة محفوظة</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <span className="text-sm font-black text-[#0F172A] block">
              {learningState.streakDays}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">أيام متتالية</span>
          </div>
        </div>

        {/* Preferred Stage & Grade Selector */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-right">
          <span className="text-xs font-black text-[#64748B]">
            مرحلتي الدراسية:
          </span>
          <div className="flex items-center gap-1.5">
            <select
              value={learningState.preferredStage}
              onChange={(e) =>
                handleStageChange(e.target.value as EducationalStage)
              }
              aria-label="المرحلة الدراسية"
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-black text-[#0F172A] focus:outline-none cursor-pointer"
            >
              <option value="Primary">الابتدائي</option>
              <option value="Preparatory">المتوسط / الإعدادي</option>
              <option value="Secondary">الثانوي</option>
            </select>

            <select
              value={learningState.preferredGrade}
              onChange={(e) => handleGradeChange(Number(e.target.value))}
              aria-label="الصف الدراسي"
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-black text-[#1E3A8A] focus:outline-none cursor-pointer"
            >
              {availableGrades.map((g) => (
                <option key={`prof_grade_opt_${g}`} value={g}>
                  {learningState.preferredStage === 'Primary'
                    ? `الصف ${g}`
                    : learningState.preferredStage === 'Preparatory'
                    ? `الصف ${g - 6}`
                    : `الصف ${g - 9}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Badges & Achievements Showcase (شاراتي وإنجازاتي — Matches Screen 5 Mockup) */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[#0F172A] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <span>شاراتي وإنجازاتي</span>
          </h2>
          <span className="text-xs font-black text-[#D97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {unlockedCount} / {achievements.length} مكتسبة
          </span>
        </div>

        {/* Top 3 Featured Circular Badges (Matches Screen 5 Mockup: 5 أيام متتالية | بطل شد الحبل | صائد القواعد) */}
        <div className="grid grid-cols-3 gap-2.5">
          {achievements.slice(0, 6).map((badge) => (
            <div
              key={`profile_badge_${badge.id}`}
              className={`flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-amber-50/70 to-white border-amber-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 shadow-xs mb-1.5 ${
                  badge.unlocked
                    ? 'bg-gradient-to-tr from-[#F59E0B] to-yellow-200 border-amber-300'
                    : 'bg-slate-200 border-slate-300 grayscale'
                }`}
              >
                {badge.icon}
              </div>
              <h3 className="text-xs font-black text-[#0F172A] leading-tight">
                {badge.titleAr}
              </h3>
              <p className="text-[10px] text-[#64748B] font-semibold mt-0.5 line-clamp-2">
                {badge.criteriaAr}
              </p>
              <span
                className={`mt-1.5 text-[9px] font-black px-2 py-0.5 rounded-full ${
                  badge.unlocked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {badge.unlocked ? `✓ ${badge.unlockedAt || 'مكتسبة'}` : badge.progressText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Local Leaderboard Podium (لوحة الصدارة — Matches Screen 5 Mockup) */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-[#0F172A] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F59E0B]" />
              <span>لوحة الصدارة</span>
            </h2>
            <p className="text-[11px] text-[#64748B] font-semibold">
              أعلى الجولات المسجلة على هذا الجهاز
            </p>
          </div>

          {entries.length > 0 && (
            <button
              type="button"
              onClick={clearLeaderboard}
              className="p-2 rounded-xl text-[#64748B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="مسح سجل جولات الجهاز"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 1st / 2nd / 3rd Medal Podium (Matches Screen 5 Mockup) */}
        <div className="grid grid-cols-3 gap-2 items-end pt-3 pb-2 text-center">
          {/* 3rd Place */}
          <div className="flex flex-col items-center space-y-1">
            <div className="w-11 h-11 rounded-full bg-amber-700 text-white font-black text-sm flex items-center justify-center shadow-sm border-2 border-amber-500">
              3
            </div>
            <span className="text-xs font-black text-[#0F172A] truncate max-w-full">
              {thirdPlace.name}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">
              {thirdPlace.isPlaceholder ? '—' : `${thirdPlace.score} XP`}
            </span>
          </div>

          {/* 1st Place (Gold Medal Center) */}
          <div className="flex flex-col items-center space-y-1 -mt-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-yellow-300 text-white font-black text-lg flex items-center justify-center shadow-md ring-4 ring-amber-200">
              1
            </div>
            <span className="text-xs sm:text-sm font-black text-[#1E3A8A] truncate max-w-full">
              {firstPlace.name}
            </span>
            <span className="text-xs font-black text-[#D97706]">
              {firstPlace.score} XP
            </span>
          </div>

          {/* 2nd Place */}
          <div className="flex flex-col items-center space-y-1">
            <div className="w-11 h-11 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-sm border-2 border-slate-400">
              2
            </div>
            <span className="text-xs font-black text-[#0F172A] truncate max-w-full">
              {secondPlace.name}
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">
              {secondPlace.isPlaceholder ? '—' : `${secondPlace.score} XP`}
            </span>
          </div>
        </div>

        {/* Recorded Local Sessions List */}
        {entries.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {entries.slice(0, 5).map((entry, idx) => (
              <div
                key={`profile_leaderboard_${entry.id}_${idx}`}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A8A] text-white font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-[#0F172A]">
                      {entry.studentName}
                    </h4>
                    <span className="text-[10px] text-[#64748B] font-semibold">
                      {entry.gameTitle}
                    </span>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-xs font-black text-[#D97706] block">
                    {entry.score} نقطة
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    {entry.accuracy}% دقة
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Reset Progress Control with Explicit Confirmation */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={() => setShowResetConfirmModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#64748B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط تقدمي التعليمي على هذا الجهاز</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#0F172A]">
                تأكيد إعادة ضبط التقدم
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed font-semibold">
                هل أنت متأكد من تصفير نقاط الخبرة (XP) وتقدم الوحدات وسجل الألعاب؟ لن يتم حذف كلماتك المحفوظة في بنك الكلمات.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirmResetProgress}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black cursor-pointer"
              >
                نعم، إعادة الضبط
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-black cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
