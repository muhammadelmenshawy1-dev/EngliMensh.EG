import React, { useState } from 'react';
import { User, School, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../types.ts';
import { createOrUpdateStudent } from '../services/studentStorage.ts';
import { EngliMenshLogo } from './EngliMenshLogo.tsx';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  isFirstLaunch: boolean;
  currentStudent: StudentProfile | null;
  onClose: () => void;
  onSaved: (student: StudentProfile) => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  isFirstLaunch,
  currentStudent,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState<string>(currentStudent?.name || '');
  const [school, setSchool] = useState<string>(currentStudent?.school || '');
  const [grade, setGrade] = useState<string>(currentStudent?.grade || '1st Secondary · الصف الأول الثانوي');
  const [group, setGroup] = useState<string>(currentStudent?.group || '');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى إدخال اسم الطالب ثلاثي أو رباعي باللغة الإنجليزية أو العربية.');
      return;
    }
    if (!group.trim()) {
      setError('يرجى تحديد الفصل أو المجموعة (Group / Class).');
      return;
    }

    const saved = createOrUpdateStudent({
      name: name.trim(),
      school: school.trim() || 'General Secondary School',
      grade: grade.trim() || '1st Secondary · الصف الأول الثانوي',
      group: group.trim(),
    });

    onSaved(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 p-6 text-white relative">
          {!isFirstLaunch && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3.5">
            <EngliMenshLogo size="md" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">
                  {isFirstLaunch ? 'Welcome to EngliMensh' : 'Edit Student Profile'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {isFirstLaunch ? 'Step 1' : 'Profile'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5" dir="rtl">
                {isFirstLaunch
                  ? 'تسجيل بيانات الطالب لأول مرة لحفظ التقدم وإصدار الشهادات الرسمية'
                  : 'تحديث بيانات الحساب والمدرسة والمجموعة'}
              </p>
            </div>
          </div>
        </div>

        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {isFirstLaunch && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                مرحباً بك! قم بتسجيل بياناتك مرة واحدة فقط، وسيتعرف عليك التطبيق تلقائياً في كل زيارة قادمة دون الحاجة لإعادة التسجيل.
              </span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Student Full Name (اسم الطالب رباعي)</span>
              <span className="text-red-500 text-[11px]">* Required</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Ahmed Mohamed Al-Sayed"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Group / Class (المجموعة / الفصل)</span>
                <span className="text-red-500 text-[11px]">* Required</span>
              </label>
              <input
                type="text"
                required
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Group A / 1st Sec"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                School Name (اسم المدرسة)
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Abbasia Secondary School"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              Grade & Educational Track (المرحلة والمسار التعليمي 2026/2027)
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent cursor-pointer"
            >
              <optgroup label="General Secondary (مسار الثانوية العامة 2026/2027)">
                <option value="1st Secondary · General (الصف الأول الثانوي - عام)">Secondary 1 · General (الصف الأول الثانوي - عام)</option>
                <option value="2nd Secondary · General (الصف الثاني الثانوي - عام)">Secondary 2 · General (الصف الثاني الثانوي - عام)</option>
                <option value="3rd Secondary · General (شهادة إتمام الثانوية العامة)">Secondary 3 · Thanaweya Amma (شهادة الثانوية العامة)</option>
              </optgroup>
              <optgroup label="Egyptian Baccalaureate (مسار البكالوريا المصرية المتقدم)">
                <option value="1st Secondary · Baccalaureate (الأول الثانوي - بكالوريا)">Secondary 1 · Baccalaureate (الأول الثانوي - بكالوريا)</option>
                <option value="2nd Secondary · Baccalaureate (الثاني الثانوي - بكالوريا)">Secondary 2 · Baccalaureate (الثاني الثانوي - بكالوريا)</option>
                <option value="3rd Secondary · Baccalaureate (الثالث الثانوي - بكالوريا)">Secondary 3 · Baccalaureate Capstone (الثالث الثانوي - بكالوريا)</option>
              </optgroup>
              <optgroup label="Preparatory & Primary Stages (المرحلة الإعدادية والابتدائية)">
                <option value="Prep 3 · الصف الثالث الإعدادي">Prep 3 · الصف الثالث الإعدادي (New Hello)</option>
                <option value="Prep 2 · الصف الثاني الإعدادي">Prep 2 · الصف الثاني الإعدادي (New Hello)</option>
                <option value="Prep 1 · الصف الأول الإعدادي">Prep 1 · الصف الأول الإعدادي (New Hello)</option>
                <option value="Primary 6 · الصف السادس الابتدائي">Primary 6 · الصف السادس الابتدائي (Connect)</option>
              </optgroup>
            </select>
          </div>

          {error && (
            <div className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            {!isFirstLaunch && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                إلغاء (Cancel)
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isFirstLaunch ? 'Start Learning (بدء المنصة)' : 'Save Changes (حفظ التعديلات)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
