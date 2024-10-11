import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise2_2 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [minValues, setMinValues] = useState(['', '', '']);
  const [maxValues, setMaxValues] = useState(['', '', '']);
  const totalScore2 = parseInt(localStorage.getItem('totalScore2')) || 0;

  const navigate = useNavigate();

  const handleInputChange = (setter, values, index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setter(newValues);
  };

  const correctMinValues = [0, 1, 2];
  const correctMaxValues = [99, 100, 101];

  const validateMin = (value, index) => parseInt(value) === correctMinValues[index];
  const validateMax = (value, index) => parseInt(value) === correctMaxValues[index];

  const handleSubmit = () => {
    const correctAnswers = { min: [], max: [] };
    const incorrectAnswers = { min: [], max: [] };

    minValues.forEach((value, index) => {
      if (validateMin(value, index)) {
        correctAnswers.min.push({ index, userAnswer: value });
      } else {
        incorrectAnswers.min.push({ index, userAnswer: value, correctAnswer: correctMinValues[index] });
      }
    });

    maxValues.forEach((value, index) => {
      if (validateMax(value, index)) {
        correctAnswers.max.push({ index, userAnswer: value });
      } else {
        incorrectAnswers.max.push({ index, userAnswer: value, correctAnswer: correctMaxValues[index] });
      }
    });

    const sumScore = (correctAnswers.min.length + correctAnswers.max.length) * 2;
    const updatedScore = totalScore2 + sumScore;
    localStorage.setItem('totalScore2', updatedScore);

    navigate('/result', {
      state: {
        score: sumScore,
        nextPage: '/Exercise2.3',
        correctAnswers: [...correctAnswers.min, ...correctAnswers.max],
        incorrectAnswers: [...incorrectAnswers.min, ...incorrectAnswers.max],
      },
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score: {totalScore2}</div>
      </div>
      <h3 style={{ fontSize: '40px', fontFamily: 'Arial, sans-serif' }}>ข้อ 2.2 Boundary Value Analysis</h3>
      <div style={styles.question}>
        <h3 style={{ fontSize: '40px', fontFamily: 'Arial, sans-serif' }}>Requirement</h3>
        <p>
          โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br />
          หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br />
          โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
        </p>
      </div>
      <div style={styles.headerContainer}>
        <h1 style={styles.description}>คำอธิบาย: ให้เติมค่าที่คิดว่าอยู่ในช่วง min max แล้วกด Submit</h1>
        <button style={styles.hintButton}>คำใบ้</button>
      </div>
      <div style={styles.inputContainer}>
        <div style={styles.labelRow}>
          <span>Min</span>
          <span>Max</span>
        </div>

        {[0, 1, 2].map((index) => (
          <div key={index} style={styles.row}>
            <div style={styles.inputWrapper}>
              <input
                type="number"
                placeholder={`Min ${index + 1}`}
                value={minValues[index]}
                onChange={(e) => handleInputChange(setMinValues, minValues, index, e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <input
                type="number"
                placeholder={`Max ${index + 1}`}
                value={maxValues[index]}
                onChange={(e) => handleInputChange(setMaxValues, maxValues, index, e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
        ))}
      </div>

      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '10px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  header: {
    fontSize: '24px',
    color: '#0a3d3d',
    fontSize: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  scoreBox: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  question: {
    backgroundColor: '#315a5a',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  description: {
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  hintButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  inputContainer: {
    backgroundColor: '#0a3d3d',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  labelRow: {
    display: 'flex',
    color: 'white',
    justifyContent: 'space-around',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '400px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px 0px 0px 400px',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: '2px solid #0a3d3d',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '120px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Exercise2_2;
