import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { TEACHER_EMAIL, createOrUpdateStudent } from '../services/studentStorage.ts';
import { StudentProfile } from '../types.ts';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (teacherProfile: StudentProfile) => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [emailInput, setEmailInput] = useState<string>(TEACHER_EMAIL);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (cleanEmail !== TEACHER_EMAIL.toLowerCase()) {
      setError(`Unauthorized email. Teacher access is restricted to: ${TEACHER_EMAIL}`);
      return;
    }

    const teacher = createOrUpdateStudent({
      name: 'Mr. Mohammad El-Menshawy',
      email: TEACHER_EMAIL,
      role: 'teacher',
      grade: 'Teacher & Exam Specialist',
      school: 'EngliMensh Educational Platform',
      group: 'Staff / Admin',
    });

    setError('');
    onLoginSuccess(teacher);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200" dir="ltr">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">Teacher & Supervisor Authentication</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            Please verify the designated teacher email to access the manual assessment queue and student analytics hub.
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Designated Teacher Email Address:
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setError('');
              }}
              placeholder="e.g. muhammadelmenshawy1@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Authorized Teacher Email: <strong>{TEACHER_EMAIL}</strong>
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate as Teacher</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
