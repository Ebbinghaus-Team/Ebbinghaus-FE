import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SaveLocationSection from "../../components/create/common/SaveLocationSection";
import QuestionTypeSection from "../../components/create/common/QuestionTypeSection";
import SubjectField from "../../components/create/common/SubjectField";
import QuestionField from "../../components/create/common/QuestionField";
import MultipleChoiceSection from "../../components/create/multiple/MultipleChoiceSection";
import OxAnswerSection from "../../components/create/ox/OxAnswerSection";
import ShortAnswerSection from "../../components/create/short/ShortAnswerSection";
import EssaySection from "../../components/create/essay/EssaySection";
import ExplanationField from "../../components/create/common/ExplanationField";
import SaveActionBar from "../../components/create/common/SaveActionBar";

export default function CreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [saveLocation, setSaveLocation] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedPersonalStudy, setSelectedPersonalStudy] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [oxAnswer, setOxAnswer] = useState("");
  const [keywords, setKeywords] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");

  const myGroups = [
    { id: 1, name: "토익 스터디 그룹", members: 8 },
    { id: 2, name: "공무원 시험 준비", members: 12 },
    { id: 3, name: "컴활 1급 취득", members: 6 },
  ];

  const myPersonalStudies = [
    { id: 1, name: "영어 단어 암기", questions: 45 },
    { id: 2, name: "수학 공식 정리", questions: 23 },
    { id: 3, name: "역사 연표 암기", questions: 67 },
  ];

  // 쿼리 파라미터로 전달된 경우 자동 설정
  useEffect(() => {
    const from = searchParams.get("from");
    const studyId = searchParams.get("studyId");
    const groupId = searchParams.get("groupId");

    if (from === "personal" && studyId) {
      setSaveLocation("personal");
      setSelectedPersonalStudy(studyId);
    } else if (from === "group" && groupId) {
      setSaveLocation("group");
      setSelectedGroup(groupId);
    }
  }, [searchParams]);

  const handleSave = () => {
    // 문제 저장 로직
    console.log("문제 저장:", {
      saveLocation,
      selectedGroup,
      selectedPersonalStudy,
      questionType,
      subject,
      question,
      options: questionType === "multiple" ? options : undefined,
      correctAnswer,
      oxAnswer: questionType === "ox" ? oxAnswer : undefined,
      shortAnswer: questionType === "short" ? shortAnswer : undefined,
      keywords: questionType === "essay" ? keywords : undefined,
      modelAnswer: questionType === "essay" ? modelAnswer : undefined,
      explanation,
    });

    // 저장 후 해당 위치로 이동
    if (saveLocation === "group" && selectedGroup) {
      navigate(`/groups/${selectedGroup}`);
    } else if (saveLocation === "personal" && selectedPersonalStudy) {
      navigate(`/personal-study/${selectedPersonalStudy}`);
    } else {
      navigate("/dashboard");
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const isFormValid = () => {
    if (!saveLocation || !questionType || !subject || !question || !explanation)
      return false;

    if (saveLocation === "personal" && !selectedPersonalStudy) return false;
    if (saveLocation === "group" && !selectedGroup) return false;

    if (questionType === "multiple") {
      return options.every((opt) => opt.trim()) && !!correctAnswer;
    } else if (questionType === "ox") {
      return oxAnswer === "O" || oxAnswer === "X";
    } else if (questionType === "short") {
      return shortAnswer.trim().length > 0;
    } else if (questionType === "essay") {
      return keywords.trim().length > 0 && modelAnswer.trim().length > 0;
    }
    return false;
  };

  const hasTargetSelected =
    saveLocation === "personal"
      ? !!selectedPersonalStudy
      : saveLocation === "group"
      ? !!selectedGroup
      : false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          문제 만들기
        </h2>

        <div className="space-y-6">
          <SaveLocationSection
            saveLocation={saveLocation as "" | "personal" | "group"}
            setSaveLocation={
              setSaveLocation as (v: "personal" | "group") => void
            }
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            selectedPersonalStudy={selectedPersonalStudy}
            setSelectedPersonalStudy={setSelectedPersonalStudy}
            myGroups={myGroups}
            myPersonalStudies={myPersonalStudies}
          />

          {/* 문제 유형 선택 - 저장 위치가 선택되었을 때만 표시 */}
          {hasTargetSelected && (
            <QuestionTypeSection
              questionType={
                questionType as "" | "multiple" | "ox" | "short" | "essay"
              }
              setQuestionType={
                setQuestionType as (
                  v: "multiple" | "ox" | "short" | "essay"
                ) => void
              }
            />
          )}

          {!!questionType && (
            <>
              <SubjectField subject={subject} setSubject={setSubject} />
              <QuestionField question={question} setQuestion={setQuestion} />

              {questionType === "multiple" && (
                <MultipleChoiceSection
                  options={options}
                  updateOption={updateOption}
                  addOption={addOption}
                  removeOption={removeOption}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                />
              )}

              {questionType === "ox" && (
                <OxAnswerSection
                  oxAnswer={oxAnswer}
                  setOxAnswer={setOxAnswer as (v: "O" | "X") => void}
                />
              )}

              {questionType === "short" && (
                <ShortAnswerSection
                  shortAnswer={shortAnswer}
                  setShortAnswer={setShortAnswer}
                />
              )}

              {questionType === "essay" && (
                <EssaySection
                  keywords={keywords}
                  setKeywords={setKeywords}
                  modelAnswer={modelAnswer}
                  setModelAnswer={setModelAnswer}
                />
              )}

              <ExplanationField
                explanation={explanation}
                setExplanation={setExplanation}
              />
            </>
          )}
        </div>

        <SaveActionBar onSave={handleSave} isEnabled={isFormValid()} />
      </div>
    </div>
  );
}
