import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  AlertCircle,
  FileText,
  User,
  Sparkles,
  Flame,
  Send,
  Eye,
} from 'lucide-react';
import { StudentProfile, SubjectiveSubmission } from '../types.ts';
import {
  getAllRegisteredStudents,
  getSubjectiveSubmissions,
  gradeSubjectiveSubmission,
  TEACHER_EMAIL,
} from '../services/studentStorage.ts';

interface TeacherDashboardViewProps {
  currentStudent: StudentProfile | null;
  onStudentUpdated?: () => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  currentStudent,
  onStudentUpdated,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'analytics' | 'schedule'>('queue');
  const [submissions, setSubmissions] = useState<SubjectiveSubmission[]>(() => getSubjectiveSubmissions());
  const [students, setStudents] = useState<StudentProfile[]>(() => getAllRegisteredStudents());

  // Search & Filter state for students
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');

  // Filter for submissions (all | pending | graded)
  const [queueFilter, setQueueFilter] = useState<'all' | 'pending' | 'graded'>('pending');

  // Grading form state: { [submissionId]: { score: number; feedback: string; error?: string } }
  const [gradingState, setGradingState] = useState<{
    [id: string]: { score: string; feedback: string; error?: string; success?: boolean };
  }>({});

  const isAuthorized =
    currentStudent?.email?.trim().toLowerCase() === TEACHER_EMAIL.toLowerCase() ||
    currentStudent?.role === 'teacher';

  // Security Gate
  if (!isAuthorized) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center max-w-lg mx-auto space-y-4 my-12 shadow-md">
        <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Access Restricted</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Teacher Dashboard is exclusively reserved for the platform supervisor (<strong>{TEACHER_EMAIL}</strong>). Regular student accounts cannot view grading queues or student directories.
        </p>
      </div>
    );
  }

  // Handle Score Change
  const handleScoreChange = (subId: string, value: string, maxScore: number) => {
    const num = parseFloat(value);
    let error: string | undefined = undefined;
    if (isNaN(num)) {
      error = 'Enter a valid number';
    } else if (num < 0 || num > maxScore) {
      error = `Score must be between 0 and ${maxScore}`;
    }

    setGradingState((prev) => ({
      ...prev,
      [subId]: {
        score: value,
        feedback: prev[subId]?.feedback || '',
        error,
      },
    }));
  };

  // Handle Feedback Change
  const handleFeedbackChange = (subId: string, feedback: string) => {
    setGradingState((prev) => ({
      ...prev,
      [subId]: {
        score: prev[subId]?.score || '',
        feedback,
        error: prev[subId]?.error,
      },
    }));
  };

  // Submit Grade
  const handleFinalizeGrade = (sub: SubjectiveSubmission) => {
    const currentGrade = gradingState[sub.id];
    const scoreVal = parseFloat(currentGrade?.score ?? (sub.awardedScore !== undefined ? String(sub.awardedScore) : ''));

    if (isNaN(scoreVal) || scoreVal < 0 || scoreVal > sub.maxScore) {
      setGradingState((prev) => ({
        ...prev,
        [sub.id]: {
          score: currentGrade?.score || '',
          feedback: currentGrade?.feedback || '',
          error: `Please provide a valid score between 0 and ${sub.maxScore}`,
        },
      }));
      return;
    }

    const feedbackVal = currentGrade?.feedback || sub.teacherFeedback || 'Well done! Great critical perspective and lexical command.';

    const success = gradeSubjectiveSubmission(sub.id, scoreVal, feedbackVal);
    if (success) {
      setSubmissions(getSubjectiveSubmissions());
      setStudents(getAllRegisteredStudents());
      setGradingState((prev) => ({
        ...prev,
        [sub.id]: {
          ...prev[sub.id],
          success: true,
          error: undefined,
        },
      }));

      if (onStudentUpdated) onStudentUpdated();

      setTimeout(() => {
        setGradingState((prev) => ({
          ...prev,
          [sub.id]: { ...prev[sub.id], success: false },
        }));
      }, 3000);
    }
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.school && s.school.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchGroup = selectedGroupFilter === 'all' || s.group === selectedGroupFilter;
    return matchName && matchGroup;
  });

  // Filtered Submissions
  const filteredSubmissions = submissions.filter((s) => {
    if (queueFilter === 'pending') return s.status === 'pending';
    if (queueFilter === 'graded') return s.status === 'graded';
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300" dir="ltr">
      {/* 1. TEACHER HERO STRIP */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Teacher Portal</span>
              </span>
              <span className="text-xs text-amber-300 font-semibold font-mono">
                {TEACHER_EMAIL}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Teacher Assessment & Management Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Supervisor: <strong>Mr. Mohammad El-Menshawy</strong> · Review subjective student answers, grade novel questions & essays, and inspect student performance.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending Review</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {pendingCount}
              </span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Students</span>
              <span className="text-2xl font-black text-blue-400 font-mono">
                {students.length}
              </span>
            </div>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('queue')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'queue'
                ? 'bg-amber-400 text-slate-950 shadow-xs scale-102'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Subjective Grading Queue</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-black">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'analytics'
                ? 'bg-amber-400 text-slate-950 shadow-xs scale-102'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Analytics & Directory ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'schedule'
                ? 'bg-amber-400 text-slate-950 shadow-xs scale-102'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Teaching Timetable (الجدول الدراسي)</span>
          </button>
        </div>
      </section>

      {/* 2. TAB 1: SUBJECTIVE GRADING QUEUE */}
      {activeSubTab === 'queue' && (
        <section className="space-y-6">
          {/* Submissions Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Queue:</span>
              <button
                onClick={() => setQueueFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  queueFilter === 'pending'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pending ({submissions.filter((s) => s.status === 'pending').length})
              </button>
              <button
                onClick={() => setQueueFilter('graded')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  queueFilter === 'graded'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Graded ({submissions.filter((s) => s.status === 'graded').length})
              </button>
              <button
                onClick={() => setQueueFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  queueFilter === 'all'
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({submissions.length})
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing {filteredSubmissions.length} student submissions
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">All Clear! No Pending Submissions</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                All submitted essays and critical thinking story answers have been reviewed and finalized.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredSubmissions.map((sub) => {
                const isPending = sub.status === 'pending';
                const currentGrade = gradingState[sub.id];
                const displayedScore =
                  currentGrade?.score !== undefined
                    ? currentGrade.score
                    : sub.awardedScore !== undefined
                    ? String(sub.awardedScore)
                    : '';
                const displayedFeedback =
                  currentGrade?.feedback !== undefined
                    ? currentGrade.feedback
                    : sub.teacherFeedback || '';

                return (
                  <div
                    key={sub.id}
                    className={`bg-white rounded-3xl border transition-all shadow-xs p-6 space-y-5 ${
                      isPending ? 'border-amber-300 ring-1 ring-amber-400/20' : 'border-slate-200'
                    }`}
                  >
                    {/* Submission Header Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              sub.type === 'story'
                                ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                : 'bg-blue-100 text-blue-900 border border-blue-200'
                            }`}
                          >
                            {sub.type === 'story' ? 'Novel: Old Man & The Sea' : 'Official Writing Task'}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isPending
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            {isPending ? 'Pending Teacher Review' : `Graded: ${sub.awardedScore}/${sub.maxScore}`}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{sub.examTitle}</h3>
                      </div>

                      {/* Student Info Strip */}
                      <div className="text-left sm:text-right text-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5 sm:justify-end">
                          <User className="w-3.5 h-3.5 text-blue-900" />
                          <span>{sub.studentName}</span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {sub.studentGrade} • {sub.studentGroup} • {new Date(sub.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                        Question Prompt (Maximum Marks: {sub.maxScore})
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                        {sub.questionPrompt}
                      </p>
                    </div>

                    {/* Student Written Response */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>Student's Written Submission:</span>
                        <span className="font-mono text-slate-400">
                          {sub.studentResponse.trim().split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>
                      <div className="bg-blue-50/40 rounded-2xl p-4 sm:p-5 border border-blue-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-serif">
                        {sub.studentResponse}
                      </div>
                    </div>

                    {/* Teacher Manual Grading Controls */}
                    <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Teacher Assessment & Feedback</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        {/* Score Input */}
                        <div className="space-y-1">
                          <label className="text-xs text-slate-300 font-semibold block">
                            Awarded Score (out of {sub.maxScore}):
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={sub.maxScore}
                            step="0.5"
                            value={displayedScore}
                            onChange={(e) => handleScoreChange(sub.id, e.target.value, sub.maxScore)}
                            placeholder={`0 - ${sub.maxScore}`}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                          />
                          {currentGrade?.error && (
                            <span className="text-[11px] text-rose-400 font-bold block">
                              {currentGrade.error}
                            </span>
                          )}
                        </div>

                        {/* Personalized Feedback Input */}
                        <div className="md:col-span-3 space-y-1">
                          <label className="text-xs text-slate-300 font-semibold block">
                            Personalized Guidance & Rubric Commentary:
                          </label>
                          <textarea
                            rows={2}
                            value={displayedFeedback}
                            onChange={(e) => handleFeedbackChange(sub.id, e.target.value)}
                            placeholder="Provide targeted feedback to help the student elevate their argumentation or syntax..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                          />
                        </div>
                      </div>

                      {/* Action Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        {currentGrade?.success ? (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Grade finalized and student score updated!</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Finalizing adds awarded marks to student's aggregate progress.
                          </span>
                        )}

                        <button
                          onClick={() => handleFinalizeGrade(sub)}
                          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ml-auto"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isPending ? 'Submit & Finalize Grade' : 'Update Grade & Feedback'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 3. TAB 2: STUDENT ANALYTICS & DIRECTORY */}
      {activeSubTab === 'analytics' && (
        <section className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name or school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedGroupFilter}
                onChange={(e) => setSelectedGroupFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-semibold focus:outline-none"
              >
                <option value="all">All Groups</option>
                <option value="Group Alpha">Group Alpha</option>
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
                <option value="Group C">Group C</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="p-4 font-bold uppercase tracking-wider">Student Name</th>
                    <th className="p-4 font-bold uppercase tracking-wider">Grade & Group</th>
                    <th className="p-4 font-bold uppercase tracking-wider">School</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-center">Exams Done</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-center">Streak</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-right">Total Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block">{st.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{st.email || 'No email registered'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">
                        <div>{st.grade}</div>
                        <span className="text-[10px] text-blue-700 font-bold">{st.group}</span>
                      </td>
                      <td className="p-4 text-slate-600">{st.school}</td>
                      <td className="p-4 text-center font-mono font-bold text-slate-800">
                        {st.examHistory ? st.examHistory.length : 0}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-orange-500">
                        {st.highStreak || 0}x
                      </td>
                      <td className="p-4 text-right font-mono font-black text-amber-600 text-sm">
                        {st.totalScore} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 4. TAB 3: TEACHING TIMETABLE REFERENCE */}
      {activeSubTab === 'schedule' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Weekly Secondary Teaching Schedule</h3>
              <p className="text-xs text-slate-500">
                Official aSc Timetables allocation for Mr. Mohammad El-Menshawy (1st Secondary & Intermediate classes).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
              Academic Year 2026
            </span>
          </div>

          {/* Embedded Image Reference */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
            <img
              src="/assets/aistudio/IMG_20260906_110255_14c39cd8.jpg"
              alt="Official Weekly Teaching Schedule"
              className="w-full h-auto object-contain max-h-[600px] mx-auto"
            />
          </div>
        </section>
      )}
    </div>
  );
};
