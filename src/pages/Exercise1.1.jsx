import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HintPopup from '../components/HintPopup';

const Exercise1_1 = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: ''
  });
  const hints = [
    "คำใบ้ 1: คำสั่งรับค่าจากผู้ใช้โดยทั่วไปใน C คืออะไร?",
    "คำใบ้ 2: ตรวจสอบว่าค่าที่ผู้ใช้กรอกอยู่นอกช่วงหรือไม่โดยใช้คำสั่งใด?",
    "คำใบ้ 3: ช่วงอายุของเด็กอยู่ในช่วงใด?"
  ];
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]); // บันทึกคำตอบที่ผิดพร้อมกับคำเฉลย
  const [correctAnswersList, setCorrectAnswersList] = useState([]); // บันทึกคำตอบที่ถูกต้อง
  
  const correctAnswers = {
    input0: 'scanf',
    input1: 'if',
    input2: 'age',
    input3: 'age',
    input4: 'else',
    input5: 'return'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    const incorrect = [];
    const correct = [];

    Object.keys(correctAnswers).forEach((key) => {
      if (inputValues[key].trim() === correctAnswers[key]) {
        newScore += 2; // ให้คะแนน 2 คะแนนต่อคำตอบที่ถูกต้อง
        correct.push({ question: key, userAnswer: inputValues[key] });
      } else {
        incorrect.push({ question: key, userAnswer: inputValues[key], correctAnswer: correctAnswers[key] });
      }
    });
    
    // ดึงคะแนนสะสมก่อนหน้านี้จาก LocalStorage
    const previousScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
    
    // บันทึกคะแนนรวมใหม่ลงใน LocalStorage
    localStorage.setItem('totalScore1', previousScore + newScore);
    localStorage.setItem('incorrectAnswers1', JSON.stringify(incorrect)); // เก็บคำตอบที่ผิด
    localStorage.setItem('correctAnswers1', JSON.stringify(correct)); // เก็บคำตอบที่ถูก

    setScore(newScore);
    setIncorrectAnswers(incorrect);
    setCorrectAnswersList(correct);
    
    navigate('/result', { state: { score: newScore, incorrectAnswers: incorrect, correctAnswers: correct, nextPage: '/Exercise1.2', totalScore1: newScore } });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score 0</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 1.1 Equivalence Partitioning</h3>
          <div style={styles.question}>
            <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
            <p>
              โปรแกรมหนึ่งรับค่าอินพุตเป็นอายุของบุคคลและจะแยกบุคคลออกเป็น 3 กลุ่มตามอายุ:
              <br />
              1. Child (0 - 12 ปี)
              <br />
              2. Teenager (13 - 19 ปี)
              <br />
              3. Adult (20 ปีขึ้นไป)
              <br />
              โปรแกรมนี้รับค่าอายุเป็นจำนวนเต็มระหว่าง 0 ถึง 100 ปี <br />
              หากค่าไม่อยู่ในช่วงนี้จะถือว่าเป็นค่าไม่ถูกต้อง (Invalid).
            </p>
          </div>
          <div style={styles.headerContainer}>
            <h1 style={styles.description}> คำอธิบาย : ให้เติมคำจากโค้ดที่เว้นช่องว่างให้ แล้วกด Submit </h1>
            <HintPopup hints={hints} />
          </div>
          <div style={styles.codeBox}>
            <p>#include &#60;stdio.h&#62;</p>
            <p>int main() &#123;</p>
            <p>&nbsp;&nbsp;int age;</p>
            <p>&nbsp;&nbsp;printf("Enter the age: ");</p>
            <p>&nbsp;&nbsp;<input type="text" name="input0" value={inputValues.input0} onChange={handleInputChange} style={styles.input} />("%d", &age);</p>
            <p>&nbsp;&nbsp;<input type="text" name="input1" value={inputValues.input1} onChange={handleInputChange} style={styles.input} /> (age &#60; 0 || age &#62; 100) &#123; </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Invalid age.");</p>
            <p>&nbsp;&nbsp;&#125;  else if (<input type="text" name="input2" value={inputValues.input2} onChange={handleInputChange} style={styles.input} /> &#62;= 0 && <input type="text" name="input3" value={inputValues.input3} onChange={handleInputChange} style={styles.input} /> &#60;= 12)  &#123;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Child Valid");</p>
            <p>&nbsp;&nbsp;&#125;  else if(age &#62; 12 && age &#60;= 19) &#123; </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Teenager Valid");</p>
            <p>&nbsp;&nbsp;&#125;  <input type="text" name="input4" value={inputValues.input4} onChange={handleInputChange} style={styles.input} /> &#123;  </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;printf("Adult Valid.");</p>
            <p>&nbsp;&nbsp;&#125;</p>
            <p>&nbsp;&nbsp;<input type="text" name="input5" value={inputValues.input5} onChange={handleInputChange} style={styles.input} /> 0;</p>
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
    maxWidth: '100%',
    margin: 'auto',
    borderRadius: '10px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  description: {
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    
    color: '#0a3d3d',
    fontSize: '50px',
    fontFamily: 'Arial, sans-serif',
    padding: '0px',

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
    fontSize: '30px',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '5px',
    width: '80px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '30px',
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

export default Exercise1_1;
