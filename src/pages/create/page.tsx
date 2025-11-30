import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SaveLocationSection from '../../components/create/common/SaveLocationSection';
import QuestionTypeSection from '../../components/create/common/QuestionTypeSection';
import SubjectField from '../../components/create/common/SubjectField';
import QuestionField from '../../components/create/common/QuestionField';
import MultipleChoiceSection from '../../components/create/mcq/MultipleChoiceSection';
import OxAnswerSection from '../../components/create/ox/OxAnswerSection';
import ShortAnswerSection from '../../components/create/short/ShortAnswerSection';
import EssaySection from '../../components/create/subjective/SubjectiveSection';
import ExplanationField from '../../components/create/common/ExplanationField';
import SaveActionBar from '../../components/create/common/SaveActionBar';
import { mapOxAnswerToBoolean, parseKeywordsToArray } from '../../utils/apiMappers';
import { useCreateProblemMutation } from '../../api/problem/hooks';
import type { CreateProblemBody } from '../../types/problem';
import { useGroupStudyRoomsQuery, usePersonalStudyRoomsQuery } from '../../api/studyRoom/hooks';
import toast from 'react-hot-toast';

export default function CreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from');
  const studyIdParam = searchParams.get('studyId');
  const groupIdParam = searchParams.get('groupId');
  const [saveLocation, setSaveLocation] = useState<'' | 'personal' | 'group'>(() =>
    fromParam === 'personal' ? 'personal' : fromParam === 'group' ? 'group' : '',
  );
  const [selectedGroup, setSelectedGroup] = useState<string>(() =>
    fromParam === 'group' && groupIdParam ? groupIdParam : '',
  );
  const [selectedPersonalStudy, setSelectedPersonalStudy] = useState<string>(() =>
    fromParam === 'personal' && studyIdParam ? studyIdParam : '',
  );
  const [questionType, setQuestionType] = useState<'' | 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE'>('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  const [oxAnswer, setOxAnswer] = useState('');
  const [keywords, setKeywords] = useState('');
  const [modelAnswer, setModelAnswer] = useState('');

  const createProblemMutation = useCreateProblemMutation();

  const { data: groupRooms } = useGroupStudyRoomsQuery();
  const { data: personalRooms } = usePersonalStudyRoomsQuery();

  // MultipleChoiceSection에서 정답 "인덱스"를 전달해도 수용하도록 래핑
  const handleSetCorrectAnswer = (val: unknown) => {
    if (typeof val === 'number') {
      setCorrectAnswer(String(val));
      return;
    }
    if (typeof val === 'string') {
      setCorrectAnswer(val);
    }
  };

  const myGroups = (groupRooms?.rooms ?? []).map((r) => ({
    id: r.studyRoomId,
    name: r.name,
    members: r.memberCount,
  }));

  const myPersonalStudies = (personalRooms?.rooms ?? []).map((r) => ({
    id: r.studyRoomId,
    name: r.name,
    questions: r.totalProblems,
  }));

  // 쿼리 파라미터는 초기 상태로만 반영 (렌더 내 파생), 이후 사용자가 변경 가능

  const handleSave = () => {
    const apiProblemType = questionType;

    let body: CreateProblemBody | null = null;
    if (apiProblemType === 'MCQ') {
      const trimmedChoices = options.map((c) => c.trim());
      const idx = Number.parseInt(correctAnswer, 10);
      if (!Number.isFinite(idx) || Number.isNaN(idx) || idx < 0 || idx >= trimmedChoices.length) {
        toast.error('객관식 정답을 선택해주세요.');
        return;
      }
      if (!trimmedChoices.every((c) => c.length > 0)) {
        toast.error('선택지는 비어 있을 수 없습니다.');
        return;
      }
      body = {
        problemType: 'MCQ',
        question,
        explanation,
        choices: trimmedChoices,
        correctChoiceIndex: idx,
      };
    } else if (apiProblemType === 'OX') {
      body = {
        problemType: 'OX',
        question,
        explanation,
        answerBoolean: mapOxAnswerToBoolean(oxAnswer as 'O' | 'X'),
      };
    } else if (apiProblemType === 'SHORT') {
      body = {
        problemType: 'SHORT',
        question,
        explanation,
        answerText: shortAnswer,
      };
    } else if (apiProblemType === 'SUBJECTIVE') {
      body = {
        problemType: 'SUBJECTIVE',
        question,
        explanation,
        modelAnswerText: modelAnswer,
        keywords: parseKeywordsToArray(keywords),
      };
    }

    if (!body) return;

    const studyRoomId =
      saveLocation === 'group'
        ? Number(selectedGroup)
        : saveLocation === 'personal'
          ? Number(selectedPersonalStudy)
          : NaN;

    if (!Number.isFinite(studyRoomId)) return;

    createProblemMutation.mutate(
      { studyRoomId, createProblemBody: body },
      {
        onSuccess: () => {
          if (saveLocation === 'group' && selectedGroup) {
            navigate(`/groups/${selectedGroup}`);
          } else if (saveLocation === 'personal' && selectedPersonalStudy) {
            navigate(`/personal-study/${selectedPersonalStudy}`);
          } else {
            navigate('/dashboard');
          }
        },
      },
    );
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const isFormValid = () => {
    if (!saveLocation || !questionType || !subject || !question || !explanation) return false;

    if (saveLocation === 'personal' && !selectedPersonalStudy) return false;
    if (saveLocation === 'group' && !selectedGroup) return false;

    if (questionType === 'MCQ') {
      return options.every((opt) => opt.trim()) && !!correctAnswer;
    } else if (questionType === 'OX') {
      return oxAnswer === 'O' || oxAnswer === 'X';
    } else if (questionType === 'SHORT') {
      return shortAnswer.trim().length > 0;
    } else if (questionType === 'SUBJECTIVE') {
      return keywords.trim().length > 0 && modelAnswer.trim().length > 0;
    }
    return false;
  };

  const hasTargetSelected =
    saveLocation === 'personal'
      ? !!selectedPersonalStudy
      : saveLocation === 'group'
        ? !!selectedGroup
        : false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">문제 만들기</h2>

        <div className="space-y-6">
          <SaveLocationSection
            saveLocation={saveLocation as '' | 'personal' | 'group'}
            setSaveLocation={setSaveLocation as (v: 'personal' | 'group') => void}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            selectedPersonalStudy={selectedPersonalStudy}
            setSelectedPersonalStudy={setSelectedPersonalStudy}
            myGroups={myGroups}
            myPersonalStudies={myPersonalStudies}
          />

          {/* 문제 유형 선택 - 저장 위치가 선택되었을 때만 표시 */}
          {hasTargetSelected && (
            <QuestionTypeSection questionType={questionType} setQuestionType={setQuestionType} />
          )}

          {!!questionType && (
            <>
              <SubjectField subject={subject} setSubject={setSubject} />
              <QuestionField question={question} setQuestion={setQuestion} />

              {questionType === 'MCQ' && (
                <MultipleChoiceSection
                  options={options}
                  updateOption={updateOption}
                  addOption={addOption}
                  removeOption={removeOption}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={handleSetCorrectAnswer as (v: string | number) => void}
                />
              )}

              {questionType === 'OX' && (
                <OxAnswerSection
                  oxAnswer={oxAnswer}
                  setOxAnswer={setOxAnswer as (v: 'O' | 'X') => void}
                />
              )}

              {questionType === 'SHORT' && (
                <ShortAnswerSection shortAnswer={shortAnswer} setShortAnswer={setShortAnswer} />
              )}

              {questionType === 'SUBJECTIVE' && (
                <EssaySection
                  keywords={keywords}
                  setKeywords={setKeywords}
                  modelAnswer={modelAnswer}
                  setModelAnswer={setModelAnswer}
                />
              )}

              <ExplanationField explanation={explanation} setExplanation={setExplanation} />
            </>
          )}
        </div>

        <SaveActionBar onSave={handleSave} isEnabled={isFormValid()} />
      </div>
    </div>
  );
}
