import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Style.module.css";
import cross from "../../assets/charm_cross.png";
import delete_logo from "../../assets/delete.png";
import plus_logo from "../../assets/plus.png";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    userId: localStorage.getItem("userId"),
    quizName: "",
    quizType: "",
    numQuestions: 1,
    questions: [
      {
        question: "",
        options: [
          { option: "", impressionofOption: 0 },
          { option: "", impressionofOption: 0 },
        ],
        correctOption: null,
        optionType: "",
        timer: "",
        impressionofQuestion: 0,
      },
    ],
    quizId: null, // New field to store the unique ID
    impressionofQuiz: 0,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuizDetails, setShowQuizDetails] = useState(true);
  const [quizPublished, setQuizPublished] = useState(false);

  const handleQuizNameChange = (e) => {
    setQuizData({ ...quizData, quizName: e.target.value });
  };

  // const handleQuizTypeChange = (e) => {
  //   setQuizData({ ...quizData, quizType: e.target.value });
  // };
  const handleQuizTypeChange = (selectedType) => {
    setQuizData({ ...quizData, quizType: selectedType });
  };

  const handleOptionTypeChange = (questionIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    if (!updatedQuestions[questionIndex]) {
      updatedQuestions[questionIndex] = {
        question: "",
        options: [
          { option: "", impressionofOption: 0 },
          { option: "", impressionofOption: 0 },
        ],
        correctOption: null,
        optionType: "",
        timer: "",
      };
    }
    updatedQuestions[questionIndex].optionType = e.target.value;

    // Clear existing option values if option type is changed
    updatedQuestions[questionIndex].options = [
      { option: "", impressionofOption: 0 },
      { option: "", impressionofOption: 0 },
    ];
    updatedQuestions[questionIndex].correctOption = null;

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleTimerChange = (questionIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].timer = e.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      question: e.target.value,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex].option =
      e.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionCombinedChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    const oldvalue =
      updatedQuestions[questionIndex].options[optionIndex].option;
    const splitStrings = oldvalue.split("***");
    let firstString = splitStrings[0]?.trim() || "";
    let secondString = splitStrings[1]?.trim() || "";
    const firstChild = e.target.parentElement.children[0];
    const secondChild = e.target.parentElement.children[1];
    if (e.target === firstChild) {
      firstString = firstChild.value;
    } else {
      secondString = secondChild.value;
    }
    const value = firstString + "***" + secondString;
    updatedQuestions[questionIndex].options[optionIndex].option = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].correctOption = optionIndex;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setCurrentQuestionIndex(quizData.numQuestions);
    setQuizData({
      ...quizData,
      numQuestions: quizData.numQuestions + 1,
      questions: [
        ...quizData.questions,
        {
          question: "",
          options: [
            { option: "", impressionofOption: 0 },
            { option: "", impressionofOption: 0 },
          ],
          correctOption: null,
          optionType: "",
          timer: "",
        },
      ],
    });
  };

  const handleRemoveQuestion = (index) => {
    if (index > 0 && index <= quizData.numQuestions - 1) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions.splice(index, 1);
      setQuizData({
        ...quizData,
        numQuestions: quizData.numQuestions - 1,
        questions: updatedQuestions,
      });
      setCurrentQuestionIndex(
        Math.min(currentQuestionIndex, quizData.numQuestions - 2)
      );
    }
  };

  const handleContinue = () => {
    // Check for required fields before continuing
    if (quizData.quizName.trim() === "" || quizData.quizType.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }

    setShowQuizDetails(false);
  };

  const handleTabClick = (index) => {
    // Check if index is within the valid range
    if (index >= 0 && index < quizData.numQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleAddOption = (questionIndex) => {
    if (quizData.questions[questionIndex].options.length < 4) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex].options.push({
        option: "",
        impressionofOption: 0,
      });
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    if (quizData.questions[questionIndex].options.length > 2) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const handleSubmit = async () => {
    // Check for required fields before submitting
    const currentQuestion = quizData.questions[currentQuestionIndex];
    if (
      currentQuestion.question.trim() === "" ||
      currentQuestion.options.some((option) => option.option.trim() === "") ||
      (quizData.quizType === "qa" && currentQuestion.correctOption === null) ||
      currentQuestion.optionType.trim() === "" ||
      (quizData.quizType === "qa" && currentQuestion.timer.trim() === "")
    ) {
      alert("Please fill in all required fields for the current question.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/saveQuiz",
        quizData
      );

      if (response.data.success) {
        setQuizData({ ...quizData, quizId: response.data.quizId });
        setQuizPublished(true);
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };

  const copyQuizLink = () => {
    const inputElement = document.getElementById("quizLinkInput");
    inputElement.select();
    document.execCommand("copy");
  };


  const handleRemove = () => {
    navigate('/dashboard-page')
  };

  return (
    <div>
      {showQuizDetails && (
        <div className={style.container}>
          <input
            type="text"
            placeholder="Quiz name "
            value={quizData.quizName}
            onChange={handleQuizNameChange}
            className={style.quizName}
          />
          <br />

          {/* <label>
            Quiz Type:
            <select value={quizData.quizType} onChange={handleQuizTypeChange}>
              <option value="">Select Type</option>
              <option value="poll">Poll</option>
              <option value="qa">Q&A</option>
            </select>
          </label> */}

          <label className={style.quiz_type}>
            Quiz Type
            <div>
              <button
                onClick={() => handleQuizTypeChange("qa")}
                // className={quizData.quizType === "qa" ? "selected" : ""}
                className={`${style.type_button} ${
                  quizData.quizType === "qa" ? style.selected : ""
                }`}
              >
                Q&A
              </button>
              <button
                onClick={() => handleQuizTypeChange("poll")}
                // className={quizData.quizType === "poll" ? "selected" : ""}
                className={`${style.type_button} ${
                  quizData.quizType === "poll" ? style.selected : ""
                }`}
              >
                Poll Type
              </button>
            </div>
          </label>

          <br />

          <button onClick={handleContinue} className={style.continue_btn}>
            Continue
          </button>
        </div>
      )}

      <div className={style.question_container}>
        {!showQuizDetails && !quizPublished && (
          <>
            {/* <button onClick={handleAddQuestion}>+ Add Question</button> */}

            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <div className={style.ellipse}>
                {quizData.questions.map((question, index) => (
                  <div key={index}>
                    <button
                      onClick={() => handleTabClick(index)}
                      className={style.ellipse_index}
                    >
                      {index + 1}
                    </button>
                    {index > 0 && index <= quizData.numQuestions - 1 && (
                      <button
                        onClick={() => handleRemoveQuestion(index)}
                        className={style.cross}
                      >
                        <img src={cross} alt="cross_logo" />
                        {/* X */}
                      </button>
                    )}
                  </div>
                ))}
                {quizData.questions.length < 5 && (
                  <button onClick={handleAddQuestion}>
                    <img
                      src={plus_logo}
                      alt="plus_logo"
                      className={style.plus}
                    />
                  </button>
                )}
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
                value={quizData.questions[currentQuestionIndex].question}
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
                        quizData.questions[currentQuestionIndex].optionType ===
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
                        quizData.questions[currentQuestionIndex].optionType ===
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
                        quizData.questions[currentQuestionIndex].optionType ===
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

              {/* <div className={style.options_container}> */}
              {[
                ...Array(
                  quizData.questions[currentQuestionIndex].options.length || 2
                ),
              ].map((_, optionIndex) => (
                <div className={style.options_container}>
                  <div key={optionIndex}>
                    {quizData.quizType === "qa" && (
                      <input
                        type="radio"
                        name={`correctOption-${currentQuestionIndex}`}
                        checked={
                          quizData.questions[currentQuestionIndex]
                            .correctOption === optionIndex
                        }
                        onChange={() =>
                          handleCorrectAnswerChange(
                            currentQuestionIndex,
                            optionIndex
                          )
                        }
                      />
                    )}

                    {quizData.questions[currentQuestionIndex].optionType ===
                    "both" ? (
                      <div className={style.text_image}>
                        <input
                          type="text"
                          placeholder="Text"
                          value={
                            quizData.questions[currentQuestionIndex]?.options[
                              optionIndex
                            ]?.option
                              .split("***")[0]
                              ?.trim() || ""
                          }
                          onChange={(e) =>
                            handleOptionCombinedChange(
                              currentQuestionIndex,
                              optionIndex,
                              e
                            )
                          }
                          className={
                            quizData.questions[currentQuestionIndex]
                              .correctOption === optionIndex
                              ? style.selected
                              : ""
                          }
                          // className={style.text_image}
                        />
                        <input
                          type="link"
                          placeholder="Image URL"
                          value={
                            quizData.questions[currentQuestionIndex]?.options[
                              optionIndex
                            ]?.option
                              .split("***")[1]
                              ?.trim() || ""
                          }
                          onChange={(e) =>
                            handleOptionCombinedChange(
                              currentQuestionIndex,
                              optionIndex,
                              e
                            )
                          }
                          className={
                            quizData.questions[currentQuestionIndex]
                              .correctOption === optionIndex
                              ? style.selected
                              : ""
                          }
                          // className={style.text_image}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Text"
                        value={
                          quizData.questions[currentQuestionIndex].options[
                            optionIndex
                          ]?.option || ""
                        }
                        onChange={(e) =>
                          handleOptionChange(
                            currentQuestionIndex,
                            optionIndex,
                            e
                          )
                        }
                        className={
                          quizData.questions[currentQuestionIndex]
                            .correctOption === optionIndex
                            ? style.selected
                            : ""
                        }
                      />
                    )}
                  </div>

                  <div>
                    {optionIndex > 1 && (
                      <button
                        onClick={() =>
                          handleRemoveOption(currentQuestionIndex, optionIndex)
                        }
                        className={style.delete_btn}
                      >
                        <img src={delete_logo} alt="delete_logo" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {quizData.questions[currentQuestionIndex].options.length < 4 && (
                <button
                  onClick={() => handleAddOption(currentQuestionIndex)}
                  className={style.addOption_btn}
                >
                  Add Option
                </button>
              )}

              <div className={style.timer_container}>
                {quizData.quizType !== "poll" && (
                  <div>
                    <label>Timer</label>
                    <div>
                      <button
                        className={`${style.timerButton} ${
                          quizData.questions[currentQuestionIndex].timer ===
                          "Off"
                            ? style.selectedButton
                            : ""
                        }`}
                        value="Off"
                        onClick={(e) =>
                          handleTimerChange(currentQuestionIndex, e)
                        }
                        checked={
                          quizData.questions[currentQuestionIndex].timer ===
                          "Off"
                        }
                      >
                        Off
                      </button>
                      <br />

                      <button
                        className={`${style.timerButton} ${
                          quizData.questions[currentQuestionIndex].timer ===
                          "5s"
                            ? style.selectedButton
                            : ""
                        }`}
                        value="5s"
                        onClick={(e) =>
                          handleTimerChange(currentQuestionIndex, e)
                        }
                        checked={
                          quizData.questions[currentQuestionIndex].timer ===
                          "5s"
                        }
                      >
                        5s
                      </button>
                      <br />

                      <button
                        className={`${style.timerButton} ${
                          quizData.questions[currentQuestionIndex].timer ===
                          "10s"
                            ? style.selectedButton
                            : ""
                        }`}
                        value="10s"
                        onClick={(e) =>
                          handleTimerChange(currentQuestionIndex, e)
                        }
                        checked={
                          quizData.questions[currentQuestionIndex].timer ===
                          "10s"
                        }
                      >
                        10s
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleSubmit} className={style.continue_btn}>
              Create Quiz
            </button>
          </>
        )}

        {quizPublished && (
          <div className={style.quiz_published}>
            <button onClick={handleRemove} className={style.cross_btn}>
              <img src={cross} alt="cross_logo" />
            </button>
            <h3>Congrats your Quiz is Published!</h3>
            <p>
              <input
                placeholder="your link is here"
                type="text"
                value={`livequiz/${quizData.quizId}`}
                readOnly
                className={style.link_input}
                id="quizLinkInput"
              />
            </p>
            <button onClick={copyQuizLink} className={style.share_btn}>
              Share
            </button>
          </div>
        )}

        {/* {quizPublished && (
          <div className={style.quiz_published}>
            <h3>Congrats your Quiz is Published!</h3>
            <p>
              Your link is:{" "}
              <a
                href={`livequiz/${quizData.quizId}`}
              >{`/livequiz/${quizData.quizId}`}</a>
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CreateQuiz;