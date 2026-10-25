import {
  UnitCurriculum,
  GradeCurriculumCatalog,
  UnitExam,
  EducationalStage,
  SecondaryTrackPath
} from '../types/curriculum.ts';
import { secondary1Term1Units, sec1Term1RevisionExam } from './secondary1CurriculumTerm1.ts';
import { secondary1Term2Units, sec1Term2RevisionExam } from './secondary1CurriculumTerm2.ts';
import { allStagesCurriculumCatalog, generalSecondaryCatalog, baccalaureateSecondaryCatalog } from './allStagesCurriculumCatalog.ts';

// Flatten all curricula across all grades and stages
export const allCurriculaUnits: UnitCurriculum[] = [];

// Populate from catalogs
allStagesCurriculumCatalog.forEach(catalog => {
  catalog.semesters.forEach(sem => {
    sem.units.forEach(unit => {
      allCurriculaUnits.push(unit);
    });
  });
});

// All Secondary 1 units (1 to 12)
export const allSecondary1Units: UnitCurriculum[] = [
  ...secondary1Term1Units,
  ...secondary1Term2Units
];

// Query functions with Path distinction
export const getStageCatalog = (
  stage: EducationalStage,
  secondaryPath: SecondaryTrackPath = 'general_secondary'
): GradeCurriculumCatalog[] => {
  if (stage === 'Secondary') {
    return allStagesCurriculumCatalog.filter(
      c => c.stage === 'Secondary' && (c.secondaryPath === secondaryPath || (!c.secondaryPath && secondaryPath === 'general_secondary'))
    );
  }
  return allStagesCurriculumCatalog.filter(c => c.stage === stage);
};

export const getGradeCatalog = (
  stage: EducationalStage,
  grade: number,
  secondaryPath: SecondaryTrackPath = 'general_secondary'
): GradeCurriculumCatalog | undefined => {
  if (stage === 'Secondary') {
    return allStagesCurriculumCatalog.find(
      c => c.stage === 'Secondary' && c.grade === grade && (c.secondaryPath === secondaryPath || (!c.secondaryPath && secondaryPath === 'general_secondary'))
    );
  }
  return allStagesCurriculumCatalog.find(c => c.stage === stage && c.grade === grade);
};

export const getUnitCurriculum = (
  stage: EducationalStage,
  grade: number,
  semester: 1 | 2,
  unitNumber: number
): UnitCurriculum | undefined => {
  return allCurriculaUnits.find(
    u => u.stage === stage && u.grade === grade && u.semester === semester && u.unitNumber === unitNumber
  );
};

export const findCurriculumExamById = (examId: string): UnitExam | undefined => {
  if (examId === sec1Term1RevisionExam.examId) return sec1Term1RevisionExam;
  if (examId === sec1Term2RevisionExam.examId) return sec1Term2RevisionExam;

  for (const u of allCurriculaUnits) {
    if (u.unitExam.examId === examId) {
      return u.unitExam;
    }
  }
  for (const catalog of allStagesCurriculumCatalog) {
    for (const sem of catalog.semesters) {
      if (sem.revisionExam && sem.revisionExam.examId === examId) {
        return sem.revisionExam;
      }
    }
  }
  return undefined;
};

export {
  allStagesCurriculumCatalog,
  generalSecondaryCatalog,
  baccalaureateSecondaryCatalog,
  secondary1Term1Units,
  secondary1Term2Units,
  sec1Term1RevisionExam,
  sec1Term2RevisionExam
};
