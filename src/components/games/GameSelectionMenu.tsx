import React from 'react';
import { Trophy, Star, Flame, Gamepad2, Award, Play, Filter, Sparkles, BookOpen, Layers } from 'lucide-react';
import { GameStage, GameDifficulty, GameFocusArea } from '../../types/gameQuestions.ts';
import { ArcadeStudentProgress } from '../../types/gameQuestions.ts';

interface GameSelectionMenuProps {
  progress: ArcadeStudentProgress;
  activeGameId: string;
  onSelectGame: (gameId: 'shoot_and_score' | 'tug_of_words' | 'bowling_championship' | 'quick_match') => void;
  selectedStage: GameStage;
  onChangeStage: (stage: GameStage) => void;
  selectedGrade: number;
  onChangeGrade: (grade: number) => void;
  selectedDifficulty: GameDifficulty;
  onChangeDifficulty: (diff: GameDifficulty) => void;
  selectedFocus: GameFocusArea;
  onChangeFocus: (focus: GameFocusArea) => void;
  onOpenLeaderboard: () => void;
}

export const GameSelectionMenu: React.FC<GameSelectionMenuProps> = ({
  progress,
  activeGameId,
  onSelectGame,
  selectedStage,
  onChangeStage,
  selectedGrade,
  onChangeGrade,
  selectedDifficulty,
  onChangeDifficulty,
  selectedFocus,
  onChangeFocus,
  onOpenLeaderboard,
}) => {
  const games = [
    {
      id: 'shoot_and_score' as const,
      title: 'Shoot & Score',
      titleAr: 'دوري ركلات الجزاء',
      description: 'أجب عن السؤال التعليمي لفتح ضربة الجزاء وسدد الكرة نحو الشباك لتجاوز حارس المرمى.',
      icon: '⚽',
      badge: 'Penalty Shootout',
      gradient: 'from-emerald-600 via-teal-700 to-emerald-900',
      bestScore: progress.bestScores.shoot_and_score || 0,
      bestStars: progress.bestStars.shoot_and_score || 0,
    },
    {
      id: 'tug_of_words' as const,
      title: 'Tug of Words',
      titleAr: 'شد الحبل اللغوي',
      description: 'منافسة 1 ضد 1 قوية ضد الذكاء الاصطناعي؛ اسحب الحبل وأسقط المنافس في بركة الوحل!',
      icon: '🪢',
      badge: '1v1 Tug Arena',
      gradient: 'from-blue-600 via-indigo-700 to-slate-900',
      bestScore: progress.bestScores.tug_of_words || 0,
      bestStars: progress.bestStars.tug_of_words || 0,
    },
    {
      id: 'bowling_championship' as const,
      title: 'Bowling Championship',
      titleAr: 'بطولة صالة البولينج',
      description: 'تحدى نفسك في صالة البولينج عبر 10 إطارات امتحانية، وثبت مؤشر الزاوية والقوة لإسقاط جميع الدبابيس!',
      icon: '🎳',
      badge: '10-Frame Alley',
      gradient: 'from-amber-600 via-orange-700 to-amber-950',
      bestScore: progress.bestScores.bowling_championship || 0,
      bestStars: progress.bestStars.bowling_championship || 0,
    },
    {
      id: 'quick_match' as const,
      title: 'Quick Word Match',
      titleAr: 'مطابقة الكلمات السريعة',
      description: 'اربط الكلمات بمعانيها الإنجليزية والعربية بأسرع وقت لجمع نقاط السرعة وحفظ المفردات.',
      icon: '⚡',
      badge: 'Speed Flashcards',
      gradient: 'from-purple-600 via-indigo-800 to-slate-950',
      bestScore: progress.bestScores.quick_match || 0,
      bestStars: progress.bestStars.quick_match || 0,
    },
  ];

  const maxGrades = selectedStage === 'primary' ? 6 : 3;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Hero Summary Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07224D] via-[#0B397D] to-[#0878E8] border border-blue-400/30 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFC928] text-[#07224D] text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>EngliMensh Arcade Arena</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-bold">
              Curriculum Progression System
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            ألعاب المنشاوي التعليمية التفاعلية
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
            تحديات أكاديمية شيقة مبنية على مناهج وزارة التربية والتعليم، بنك أسئلة متدرج، ومضاعف كومبو لترقية النجوم وفتح الشارات بالصدارة.
          </p>
        </div>

        {/* Quick Stats Strip */}
        <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Arcade Points</span>
            <span className="text-lg sm:text-xl font-black text-[#FFC928] font-mono">
              {progress.totalArcadeScore} pts
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Total Stars</span>
            <span className="text-lg sm:text-xl font-black text-amber-300 font-mono flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-300" />
              <span>{progress.totalStars}</span>
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Best Combo</span>
            <span className="text-lg sm:text-xl font-black text-orange-300 font-mono flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current text-orange-400" />
              <span>{progress.highestCombo}x</span>
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-200 uppercase font-bold block">Leaderboard</span>
              <span className="text-xs font-bold text-white block mt-0.5">لوحة الصدارة</span>
            </div>
            <button
              onClick={onOpenLeaderboard}
              className="p-2 rounded-xl bg-[#FFC928] hover:bg-amber-300 text-[#07224D] font-black cursor-pointer shadow-md transition-transform active:scale-95"
              title="عرض لوحة المتصدرين"
            >
              <Trophy className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Unified Stage, Grade, Difficulty & Focus Selector Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-800 border-b border-slate-100 pb-3">
          <Filter className="w-4 h-4 text-[#0878E8]" />
          <span>تخصيص المنهج ومستوى التحدي (Curriculum & Difficulty Setup)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Stage Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">المرحلة الدراسية:</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl">
              {[
                { id: 'primary' as const, label: 'ابتدائي' },
                { id: 'intermediate' as const, label: 'إعدادي' },
                { id: 'secondary' as const, label: 'ثانوي' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChangeStage(s.id)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedStage === s.id
                      ? 'bg-[#07224D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grade Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">الصف الدراسي:</label>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl overflow-x-auto">
              {Array.from({ length: maxGrades }, (_, i) => i + 1).map((g) => (
                <button
                  key={`gsm_grade_${g}`}
                  onClick={() => onChangeGrade(g)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedGrade === g
                      ? 'bg-[#0878E8] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">مستوى الصعوبة:</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl">
              {[
                { id: 'easy' as const, label: 'سهل' },
                { id: 'medium' as const, label: 'متوسط' },
                { id: 'hard' as const, label: 'صعب' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => onChangeDifficulty(d.id)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDifficulty === d.id
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">مجال التركيز:</label>
            <select
              value={selectedFocus}
              onChange={(e) => onChangeFocus(e.target.value as any)}
              className="w-full bg-slate-100 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0878E8] cursor-pointer"
            >
              <option value="mixed">🌟 تدريب متنوع (Mixed Practice)</option>
              <option value="vocabulary">📚 المفردات والكلمات (Vocabulary)</option>
              <option value="grammar">⚡ القواعد والتراكيب (Grammar)</option>
              <option value="spelling">✍️ مهارات الإملاء (Spelling)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Games Selection Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>اختر اللعبة التفاعلية لبدء التحدي</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game) => {
            const isSelected = activeGameId === game.id;

            return (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-400/10 scale-[1.02] ring-2 ring-amber-400/40 text-white'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 text-slate-900'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-100 shadow-inner">{game.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {game.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-base sm:text-lg leading-tight">{game.title}</h4>
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-[#0878E8]'}`}>
                      {game.titleAr}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {game.description}
                  </p>
                </div>

                {/* Score & Stars Achieved on Card */}
                <div className="space-y-2 pt-2 border-t border-slate-200/40">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>Best:</span>
                    <span className="font-black text-amber-400">{game.bestScore} pts</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= game.bestStars ? 'fill-amber-400 text-amber-400' : 'text-slate-600 opacity-40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isSelected ? 'اللعبة النشطة حالياً' : 'ابدأ هذه اللعبة'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
