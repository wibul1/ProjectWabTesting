import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HintPopup from '../components/HintPopup';

const Exercise2_1 = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]); // บันทึกคำตอบที่ผิดพร้อมกับคำเฉลย
  const [correctAnswersList, setCorrectAnswersList] = useState([]); // บันทึกคำตอบที่ถูกต้อง

  const correctAnswers = {
    input0: 'include',
    input1: 'number;',
    input2: 'number',
    input3: '100',
    input4: '%d',
  };
  const hints2_1 = [
    "คำใบ้ 1: State Transition Testing เกี่ยวข้องกับการเปลี่ยนสถานะของอะไร?",
    "คำใบ้ 2: แต่ละสถานะของโปรแกรมควรถูกตรวจสอบด้วยอะไร?",
    "คำใบ้ 3: การยืนยันการเปลี่ยนสถานะในระบบเป็นอย่างไร?"
  ];

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let sumScore = 0;
    const incorrect = [];
    const correct = [];

    Object.keys(correctAnswers).forEach((key) => {
      if (inputValues[key].trim() === correctAnswers[key]) {
        sumScore += 2; // ให้คะแนน 2 คะแนนต่อคำตอบที่ถูกต้อง
        correct.push({ question: key, userAnswer: inputValues[key] });
      } else {
        incorrect.push({ question: key, userAnswer: inputValues[key], correctAnswer: correctAnswers[key] });
      }
    });
    
    // ดึงคะแนนสะสมก่อนหน้านี้จาก LocalStorage
    const previousScore = parseInt(localStorage.getItem('totalScore2') || '0', 10);
  
    // บันทึกคะแนนรวมใหม่ลงใน LocalStorage
    localStorage.setItem('totalScore2', previousScore + sumScore);
    localStorage.setItem('incorrectAnswers2', JSON.stringify(incorrect)); // เก็บคำตอบที่ผิด
    localStorage.setItem('correctAnswers2', JSON.stringify(correct)); // เก็บคำตอบที่ถูก
    
    setScore(sumScore);
    setIncorrectAnswers(incorrect);
    setCorrectAnswersList(correct);

    navigate('/result', { state: { score: sumScore, incorrectAnswers: incorrect, correctAnswers: correct, nextPage: '/Exercise2.2', totalScore1: sumScore } });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score 0</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 2.1 Boundary Value Analysis</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
        <p>
        โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br/>
        หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br/>
        โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
        </p>
      </div>
      <div style={styles.headerContainer}>
            <h1 style={styles.description}> คำอธิบาย : ให้เติมคำจากโค้ดที่เว้นช่องว่างให้ แล้วกด Submitt </h1>
            <HintPopup hints={hints2_1} />
      </div>
      <div style={styles.codeBox}>
        <p>#<input type="text" name="input0" value={inputValues.input0} onChange={handleInputChange} style={styles.input}/> &#60;stdio.h&#62;</p>
        <p>int main() &#123;</p>
        <p>&nbsp;&nbsp;int <input type="text" name="input1" value={inputValues.input1} onChange={handleInputChange} style={styles.input}/></p>
        <p>&nbsp;&nbsp;printf("Enter a number between 1 and 100: ");</p>
        <p>&nbsp;&nbsp;scanf("%d", & <input type="text" name="input2" value={inputValues.input2} onChange={handleInputChange} style={styles.input}/>);</p>
        <p>&nbsp;&nbsp;if (number &#60; 0 || number &#62; <input type="text" name="input3" value={inputValues.input3} onChange={handleInputChange} style={styles.input}/>) &#123; </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Calculated result: Error\n");</p>
        <p>&nbsp;&nbsp;&#125;  else  &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Calculated result: <input type="text" name="input4" value={inputValues.input4} onChange={handleInputChange} style={styles.input}/> \n", number * number);</p>
        <p>&nbsp;&nbsp;&#125;</p>
        <p>&nbsp;&nbsp; return 0;</p>
        <p>&#125;</p>
      </div>

      <button style={styles.submitButton} onClick={handleSubmit}>Submit</button>
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
  codeBox: {
    backgroundColor: '#315a5a',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '5px',
    width: '120px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Exercise2_1;
