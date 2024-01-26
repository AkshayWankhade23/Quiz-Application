import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Style.module.css";
import cross from "../../assets/charm_cross.png";
import delete_logo from "../../assets/delete.png";
import plus_logo from "../../assets/plus.png";

const EditQuiz = ({ quizData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(quizData);
  const [loading, setLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizDetails, setShowQuizDetails] = useState(true);
  const [quizPublished, setQuizPublished] = useState(false);

  useEffect(() => {
    setFormData(quizData);
  }, [quizData]);


  const handleQuizNameChange = (e) => {
    setFormData({ ...formData, quizName: e.target.value });
  };

  const handleQuizTypeChange = (selectedType) => {
    setFormData({ ...formData, quizType: selectedType });
  };

  const handleOptionTypeChange = (questionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].optionType = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleTimerChange = (questionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].timer = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: e.target.value,
    };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex].option =
      e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].correctOption = optionIndex;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      numQuestions: formData.numQuestions + 1,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: [{ option: "", impressionofOption: 0 }, { option: "", impressionofOption: 0 }],
          correctOption: null,
          optionType: "",
          timer: "",
        },
      ],
    });
  };

  const handleRemoveQuestion = (index) => {
    if (index > 0 && index <= formData.numQuestions - 1) {
      const updatedQuestions = [...formData.questions];
      updatedQuestions.splice(index, 1);
      setFormData({
        ...formData,
        numQuestions: formData.numQuestions - 1,
        questions: updatedQuestions,
      });
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, formData.numQuestions - 2)
      );
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    if (quizData.questions[questionIndex].options.length > 2) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setFormData({ ...quizData, questions: updatedQuestions });
    }
  };

  const handleSubmit = async () => {
    console.log(formData._id);
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/editQuiz/${formData._id}`,
        formData
      );

      if (response.data.success) {
        console.log('Quiz updated successfully:', response.data.updatedQuiz);
      } else {
        console.error('Error updating quiz:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleRemove = () => {
    navigate('/dashboard-page');
  };

  return (
    <>
      <div className={style.question_container}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <div className={style.ellipse}>
            {formData.questions.map((question, index) => (
              <div key={index}>
                <button
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={style.ellipse_index}
                >
                  {index + 1}
                </button>
                {/* {index > 0 && (
                  <button
                    onClick={() => handleRemoveQuestion(index)}
                    className={style.cross}
                  >
                    <img src={cross} alt="cross_logo" />
                  </button>
                )} */}
              </div>
            ))}
            {/* <button onClick={handleAddQuestion}>
              <img src={plus_logo} alt="plus_logo" className={style.plus} />
            </button> */}
          </div>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <input
            type="text"
            value={formData.questions[currentQuestionIndex].question}
            onChange={(e) => handleQuestionChange(currentQuestionIndex, e)}
            placeholder="Poll Question"
            className={style.question_input}
          />
          <br />
          <label>
            Option Type
            <div className={style.optionType_label}>
              <label>
                <input
                  type="radio"
                  value="text"
                  checked={
                    formData.questions[currentQuestionIndex].optionType ===
                    "text"
                  }
                  onChange={(e) =>
                    handleOptionTypeChange(currentQuestionIndex, e)
                  }
                />
                Text
              </label>

              <label>
                <input
                  type="radio"
                  value="image"
                  checked={
                    formData.questions[currentQuestionIndex].optionType ===
                    "image"
                  }
                  onChange={(e) =>
                    handleOptionTypeChange(currentQuestionIndex, e)
                  }
                />
                Image URL
              </label>

              <label>
                <input
                  type="radio"
                  value="both"
                  checked={
                    formData.questions[currentQuestionIndex].optionType ===
                    "both"
                  }
                  onChange={(e) =>
                    handleOptionTypeChange(currentQuestionIndex, e)
                  }
                />
                Text & Image URL
              </label>
            </div>
          </label>

          {formData.questions[currentQuestionIndex].options.map(
            (option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  placeholder="Text"
                  value={option.option}
                  onChange={(e) =>
                    handleOptionChange(currentQuestionIndex, optionIndex, e)
                  }
                />
                {/* <button
                  onClick={() =>
                    handleCorrectAnswerChange(
                      currentQuestionIndex,
                      optionIndex
                    )
                  }
                >
                  Set Correct
                </button> */}
                {/* {optionIndex > 1 && (
                  <button
                    onClick={() =>
                      handleRemoveOption(currentQuestionIndex, optionIndex)
                    }
                  >
                    <img src={delete_logo} alt="delete_logo" />
                  </button>
                )} */}
              </div>
            )
          )}

          <div>
            <button onClick={handleSubmit}>Update Quiz</button>
            <button onClick={handleRemove}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;
