import { GradeCurriculumCatalog, UnitCurriculum, UnitExam, CurriculumQuestion } from '../types/curriculum.ts';
import { primaryCurriculumDatabase } from './primaryCurriculumDatabase.ts';
import { convertPrimaryLessonToUnitCurriculum } from './primaryCurriculumInjector.ts';

// Helper to generate a comprehensive Term 1 Revision Exam for each Primary grade
function createPrimaryRevisionExam(gradeNum: number, gradeLabelEn: string, gradeLabelAr: string, units: UnitCurriculum[]): UnitExam {
  const revisionQuestions: CurriculumQuestion[] = [];

  units.forEach((unit, uIdx) => {
    // Pick 2-3 questions from each unit's exam to build a balanced 16-question term exam
    const unitExamQuestions = unit.unitExam.questions || [];
    unitExamQuestions.slice(0, 3).forEach((q, qIdx) => {
      revisionQuestions.push({
        id: `rev_pri_g${gradeNum}_u${unit.unitNumber}_q${qIdx + 1}`,
        skill: q.skill || (qIdx % 2 === 0 ? 'Vocabulary' : 'Grammar'),
        question: `[Unit ${unit.unitNumber}: ${unit.unitTitle}] ${q.question}`,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `مبني على مفاهيم الوحدة ${unit.unitNumber} (${unit.unitTitleAr})`
      });
    });
  });

  // Ensure standard 16 questions
  const finalQuestions = revisionQuestions.slice(0, 16);

  return {
    examId: `exam_pri_g${gradeNum}_term1_comprehensive`,
    examTitle: `${gradeLabelEn} - Comprehensive Term 1 Final Benchmark`,
    examTitleAr: `الامتحان الشامل لنهاية الفصل الدراسي الأول (${gradeLabelAr})`,
    durationMinutes: 45,
    totalMarks: 20,
    stage: 'Primary',
    questions: finalQuestions
  };
}

const primaryGradeMeta: Record<number, { labelEn: string; labelAr: string; desc: string }> = {
  1: {
    labelEn: 'Primary 1 - الصف الأول الابتدائي',
    labelAr: 'الصف الأول الابتدائي (Connect 1 - المنهج الوزاري)',
    desc: 'Foundational English phonics, letter sounds (B, P, H, N), polite greetings, school objects, colors, and loving family members.'
  },
  2: {
    labelEn: 'Primary 2 - الصف الثاني الابتدائي',
    labelAr: 'الصف الثاني الابتدائي (Connect 2 - المنهج الوزاري)',
    desc: 'Family relationships, senses and body parts, school subjects, clock time, daily routines, sports, and healthy habits.'
  },
  3: {
    labelEn: 'Primary 3 - الصف الثالث الابتدائي',
    labelAr: 'الصف الثالث الابتدائي (Connect 3 - المنهج الوزاري)',
    desc: 'Feelings and emotional wellbeing, minor health ailments, weekend leisure, rooms and household chores, animals, and circus performances.'
  },
  4: {
    labelEn: 'Primary 4 - الصف الرابع الابتدائي',
    labelAr: 'الصف الرابع الابتدائي (Connect 4 - المنهج الوزاري)',
    desc: 'Digestive and respiratory systems, desert ecosystems and animal adaptations, plant life cycles, Egyptian geography, and community helper jobs.'
  },
  5: {
    labelEn: 'Primary 5 - الصف الخامس الابتدائي',
    labelAr: 'الصف الخامس الابتدائي (Connect 5 - المنهج الوزاري)',
    desc: 'Food cultivation, healthy diets, clothing materials and Egyptian cultural dress, Elephantine Island geography, jobs, and weather phenomena.'
  },
  6: {
    labelEn: 'Primary 6 - الصف السادس الابتدائي',
    labelAr: 'الصف السادس الابتدائي (Connect 6 - المنهج الوزاري)',
    desc: 'Urban greening and community rooftop gardens, personality traits, vacation planning, festivals, historical journeys, and animal care.'
  }
};

// ------------------------------------------------------------------------------------------------
// PRIMARY 1 TO 6 CATALOG (CONNECT SERIES - OFFICIAL EGYPTIAN MOE CURRICULUM)
// Contains all 36 verified units across Primary 1 through Primary 6
// ------------------------------------------------------------------------------------------------
export const primaryCurriculumCatalog: GradeCurriculumCatalog[] = [1, 2, 3, 4, 5, 6].map(g => {
  const meta = primaryGradeMeta[g];
  const term1Lessons = primaryCurriculumDatabase
    .filter(l => l.grade === `primary_${g}` && l.term === 1)
    .sort((a, b) => a.unitNumber - b.unitNumber);

  const term1Units: UnitCurriculum[] = term1Lessons.map(lesson => convertPrimaryLessonToUnitCurriculum(lesson));
  const revisionExam = createPrimaryRevisionExam(g, meta.labelEn, meta.labelAr, term1Units);

  return {
    stage: 'Primary',
    grade: g,
    gradeLabel: meta.labelEn,
    gradeLabelAr: meta.labelAr,
    track: 'Connect',
    description: meta.desc,
    semesters: [
      {
        semester: 1,
        semesterLabel: `Term 1 - الفصل الدراسي الأول (Connect ${g})`,
        revisionExam,
        revisionTitle: `Term 1 Comprehensive Assessment (${meta.labelEn})`,
        units: term1Units
      }
    ]
  };
});
