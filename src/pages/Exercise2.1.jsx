import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const correctAnswers = {
    input0: 'include',
    input1: 'number;',
    input2: 'number',
    input3: '100',
    input4: '%d',
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
    Object.keys(correctAnswers).forEach((key) => {
      if (inputValues[key].trim() === correctAnswers[key]) {
        newScore += 2; // ให้คะแนน 2 คะแนนต่อคำตอบที่ถูกต้อง
      }
    });
    
    // ดึงคะแนนสะสมก่อนหน้านี้จาก LocalStorage
    const previousScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
  
    // บันทึกคะแนนรวมใหม่ลงใน LocalStorage
    localStorage.setItem('totalScore', previousScore + newScore);
    
    setScore(newScore);
    navigate('/result', { state: { score: newScore, nextPage: '/Exercise2.2' ,totalScore: newScore} });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 2.1 Boundary Value Analysis</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
        <p>
        โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br/>
        หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br/>
        โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
        </p>
        <p>: ให้เติมคำจากโค้ดที่เว้นช่องว่างให้ แล้วกด Submit</p>

      </div>

      <button style={styles.hintButton}>คำใบ้</button>

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
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '5px',
    width: '80px',
    borderRadius: '5px',
    textAlign: 'center',
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
