import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  School,
  Award,
  BookOpen,
  Sparkles,
  RotateCcw,
  Cloud,
  CheckCircle2,
  Calendar,
  LogOut,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Zap,
  Camera,
  Trash2,
} from 'lucide-react';
import { StudentProfile, ExamHistoryRecord } from '../types.ts';
import {
  ALL_BADGES,
  clearStudentSession,
  getStudentAvatar,
  saveStudentAvatar,
  removeStudentAvatar,
} from '../services/studentStorage.ts';
import { flushCloudSyncQueue, getCustomWebhookUrl, setCustomWebhookUrl } from '../services/cloudSync.ts';
import { compressImageToAvatar } from '../utils/imageUtils.ts';

interface StudentProfileViewProps {
  student: StudentProfile | null;
  onEditProfile: () => void;
  onViewCertificate: (record: ExamHistoryRecord) => void;
  onLogout: () => void;
  onStudentUpdated?: (updated: StudentProfile) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  onEditProfile,
  onViewCertificate,
  onLogout,
  onStudentUpdated,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<string>(() => {
    return student?.avatarUrl || (student?.id ? getStudentAvatar(student.id) : null) || '';
  });
  const [uploadNotice, setUploadNotice] = useState<string>('');

  useEffect(() => {
    const current = student?.avatarUrl || (student?.id ? getStudentAvatar(student.id) : null) || '';
    setAvatar(current);
  }, [student]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadNotice('Please select an image file (PNG, JPG, WebP).');
      setTimeout(() => setUploadNotice(''), 3500);
      return;
    }

    setUploadNotice('Processing & optimizing image...');

    try {
      // Compress and scale to a lightweight 256x256 JPEG (~15KB)
      const compressedDataUrl = await compressImageToAvatar(file, {
        maxWidth: 256,
        maxHeight: 256,
        quality: 0.8,
      });

      if (!compressedDataUrl) {
        setUploadNotice('Unable to process this image. Please try another file.');
        setTimeout(() => setUploadNotice(''), 3000);
        return;
      }

      // Update state immediately without requiring reload
      setAvatar(compressedDataUrl);

      // Persist to storage safely
      if (student?.id) {
        const updated = saveStudentAvatar(student.id, compressedDataUrl);
        if (updated && onStudentUpdated) {
          onStudentUpdated(updated);
        }
      }

      setUploadNotice('Profile picture updated successfully!');
      setTimeout(() => setUploadNotice(''), 3000);
    } catch (err) {
      console.error('Error handling avatar upload:', err);
      setUploadNotice('Could not save avatar. Please try another image.');
      setTimeout(() => setUploadNotice(''), 3000);
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoveAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!student?.id) return;
    setAvatar('');
    const updated = removeStudentAvatar(student.id);
    if (updated && onStudentUpdated) {
      onStudentUpdated(updated);
    }
    setUploadNotice('Profile picture removed.');
    setTimeout(() => setUploadNotice(''), 3000);
  };
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [showWebhookConfig, setShowWebhookConfig] = useState<boolean>(false);
  const [webhookInput, setWebhookInput] = useState<string>(getCustomWebhookUrl());

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage('');
    try {
      const count = await flushCloudSyncQueue();
      setSyncMessage(count > 0 ? `تمت المزامنة بنجاح (${count} سجل)` : 'جميع البيانات متزامنة بالفعل مع السحابة!');
      setTimeout(() => setSyncMessage(''), 4000);
    } catch {
      setSyncMessage('حدث خطأ أثناء المزامنة.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveWebhook = () => {
    setCustomWebhookUrl(webhookInput);
    setShowWebhookConfig(false);
    setSyncMessage('تم حفظ رابط الـ Google Sheets Web App بنجاح!');
    setTimeout(() => setSyncMessage(''), 3000);
  };

  const studentBadges = new Set(student?.badges || []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* PROFILE HEADER HERO */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white border border-blue-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Clickable Student Avatar with Camera Badge & Hidden File Input */}
            <div className="relative group shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onClick={handleAvatarClick}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] overflow-hidden cursor-pointer shadow-xl shadow-amber-400/20 border-2 border-amber-400/60 relative group transition-all active:scale-95 hover:border-amber-300 bg-slate-900"
                style={{ borderRadius: '20px' }}
                title="Click to upload or change profile picture"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={student?.name || 'Student Profile'}
                    className="w-full h-full object-cover rounded-[20px]"
                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '20px' }}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-2xl sm:text-3xl"
                    style={{ borderRadius: '20px' }}
                  >
                    {student?.name?.charAt(0) || 'S'}
                  </div>
                )}

                {/* Subtle Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold select-none">
                  <Camera className="w-4 h-4 mb-0.5 text-amber-300" />
                  <span>{avatar ? 'Change' : 'Upload'}</span>
                </div>
              </div>

              {/* Small Camera / Edit Badge Icon on Avatar Box */}
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md border-2 border-slate-900 group-hover:scale-110 group-hover:bg-amber-300 transition-all cursor-pointer"
                title="Upload or change profile picture"
              >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  {student?.name || 'Student Profile'}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Active Session
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-blue-400" />
                  <span>{student?.school || 'Secondary School'}</span>
                </span>
                <span>•</span>
                <span>{student?.grade || '1st Secondary'}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{student?.group || 'Group A'}</span>
              </div>

              {uploadNotice && (
                <div className="text-[11px] font-bold text-amber-300 animate-in fade-in flex items-center gap-1 pt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{uploadNotice}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAvatarClick}
              className="px-3.5 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-400/40 shadow-xs"
              title="Upload profile picture from your phone or PC"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{avatar ? 'تغيير الصورة (Photo)' : 'رفع صورة (Upload Photo)'}</span>
            </button>

            {avatar && (
              <button
                onClick={handleRemoveAvatar}
                className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs transition-colors cursor-pointer border border-red-800/50"
                title="Remove uploaded profile picture"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-white/15"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل البيانات (Edit Profile)</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-xl bg-red-900/30 hover:bg-red-900/50 text-red-300 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-red-800/40"
              title="Logout / Switch Student"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تبديل الطالب</span>
            </button>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Points</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              {student?.totalScore || 0} pts
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Exams Taken</span>
            <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono">
              {student?.examHistory?.length || 0}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Games Streak</span>
            <span className="text-xl sm:text-2xl font-black text-orange-400 font-mono">
              {student?.highStreak || 0}x 🔥
            </span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Badges Unlocked</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              {student?.badges?.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* CLOUD SYNC & GOOGLE SHEETS UTILITY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">Google Sheets Cloud Sync</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Online Auto-Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              مزامنة نتائج الاختبارات وتقييمات الذكاء الاصطناعي مع شيت المعلم في الخلفية تلقائياً
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {syncMessage && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {syncMessage}
            </span>
          )}

          <button
            onClick={() => setShowWebhookConfig(!showWebhookConfig)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            إعدادات الشيت
          </button>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>مزامنة الآن</span>
          </button>
        </div>
      </div>

      {/* WEBHOOK CONFIG DRAWER */}
      {showWebhookConfig && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-bold text-slate-800 block">
            رابط Google Apps Script Web App Webhook:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={webhookInput}
              onChange={(e) => setWebhookInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
              placeholder="https://script.google.com/macros/s/.../exec"
            />
            <button
              onClick={handleSaveWebhook}
              className="px-4 py-2 bg-blue-900 text-white font-bold text-xs rounded-xl hover:bg-blue-800 cursor-pointer"
            >
              حفظ
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            يمكنك ربط كود Google Apps Script الخاص بك لإرسال بيانات الطلاب إلى Google Sheets الخاصة بمجموعتك مباشرة.
          </p>
        </div>
      )}

      {/* EXAM HISTORY LOG */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">سجل الامتحانات المكتملة (Exam History)</h3>
              <p className="text-xs text-slate-500">
                قائمة بجميع الاختبارات التي أتممتها مع إمكانية استخراج شهادات التقدير الرسمية لكل امتحان
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-900">
            {student?.examHistory?.length || 0} Exams Completed
          </span>
        </div>

        {student?.examHistory && student.examHistory.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {student.examHistory.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span>{item.examTitle}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.percentage >= 85
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.percentage >= 70
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>
                      الدرجة: <strong>{item.score} / {item.maxMarks}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(item.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => onViewCertificate(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-amber-300/60 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>عرض الشهادة (Certificate)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="font-bold text-slate-800 text-sm">لم تقم بحل أي اختبار بعد</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              انتقل لتبويب الاختبارات لحل امتحانات الوحدات ونماذج المحافظات الرسمية لتوثيق درجاتك هنا!
            </p>
          </div>
        )}
      </div>

      {/* BADGES COLLECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">أوسمة وشارات الطالب</h3>
              <p className="text-xs text-slate-500">إنجازاتك الشخصية في المنصة</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ALL_BADGES.map((b) => {
            const hasBadge = studentBadges.has(b.id);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                  hasBadge ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-2xl">{b.icon}</div>
                <div className="font-bold text-xs text-slate-900">{b.title}</div>
                <div className="text-[10px] text-amber-800 font-semibold">{b.titleAr}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
