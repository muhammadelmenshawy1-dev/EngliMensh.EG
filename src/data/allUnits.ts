import { UnitInfo, Exam } from '../types.ts';
import { unit1, unit2 } from './units1_2.ts';
import { unit3, unit4 } from './units3_4.ts';
import { unit5, unit6 } from './units5_6.ts';
import { governmentalExams, getGovernmentalExamsByUnit } from './governmentalExams.ts';
import { term1RevisionExams, term2RevisionExams } from './termRevisions.ts';
import { allBaccalaureateExams } from './baccalaureateExams.ts';
import {
  secondary1GeneralUnits,
  secondary2GeneralUnits,
  secondary3GeneralUnits,
  baccalaureateUnits10,
  baccalaureateUnits11,
  baccalaureateUnits12,
  getExamsUnits,
  getExamsHeaderMeta,
  findAnyExamAcrossAllGrades
} from './secondaryCurriculumUnitsExams.ts';

export const allUnits: UnitInfo[] = [
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6
];

export {
  governmentalExams,
  getGovernmentalExamsByUnit,
  term1RevisionExams,
  term2RevisionExams,
  allBaccalaureateExams,
  secondary1GeneralUnits,
  secondary2GeneralUnits,
  secondary3GeneralUnits,
  baccalaureateUnits10,
  baccalaureateUnits11,
  baccalaureateUnits12,
  getExamsUnits,
  getExamsHeaderMeta,
  findAnyExamAcrossAllGrades
};

export const getUnitById = (id: number): UnitInfo | undefined => {
  return allUnits.find(u => u.id === id);
};

export const getExamById = (unitId: number, level: number): Exam | undefined => {
  const unit = getUnitById(unitId);
  return unit?.exams.find(e => e.level === level);
};

export const findAnyExamById = (examId: string): Exam | undefined => {
  return findAnyExamAcrossAllGrades(examId);
};
