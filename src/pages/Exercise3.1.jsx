import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Exercise3_1 = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
    input7: '',
  });
  const [score, setScore] = useState(0);

  const correctAnswers = {
    input0: 'stdio.h',
    input1: 'main',
    input2: 'result',
    input3: 'else',
    input4: '&&',
    input5: '&&',
    input6: '&&',
    input7: 'result',
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
    navigate('/result', { state: { score: newScore, nextPage: '/Exercise3.2' ,totalScore: newScore} });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.1 Basis Path Testing</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
      <p>
        ให้โปรแกรมรับอินพุตเป็นจำนวนเต็ม 3 ค่า a, b, และ c <br/>
        และทำการตรวจสอบและคำนวณผลลัพธ์ตามเงื่อนไขที่ซับซ้อนขึ้นดังนี้: <br/>
        1. ถ้า a &gt; b และ b &gt; c ให้คำนวณผลลัพธ์เป็น a + b + c<br/>
        2. ถ้า a &gt; b และ c &gt; a ให้คำนวณผลลัพธ์เป็น a * b * c<br/>
        3. ถ้า a &gt; b และไม่เข้า 2 เงื่อนไขข้างบน ให้คำนวณผลลัพธ์เป็น a - b - c<br/>
        4. ถ้า a == b และ b == c ให้คำนวณผลลัพธ์เป็น a * 2<br/>
        5. ถ้า a == b และ c != a ให้คำนวณผลลัพธ์เป็น (a + b) * c<br/>
        6. ถ้า a &lt; c และ b &lt; c ให้คำนวณผลลัพธ์เป็น a - b + c<br/>
        7. หากไม่ตรงกับเงื่อนไขใด ๆ ข้างต้น ให้คำนวณผลลัพธ์เป็น a + b * c<br/>
      </p>
      <p> : ให้เติมคำจากโค้ดที่เว้นช่องว่างให้ แล้วกด Submit</p>
      </div>

      <button style={styles.hintButton}>คำใบ้</button>

      <div style={styles.codeBox}>
        <p># include &#60;<input type="text" name="input0" value={inputValues.input0} onChange={handleInputChange} style={styles.input}/>&#62;</p>
        <p>int <input type="text" name="input1" value={inputValues.input1} onChange={handleInputChange} style={styles.input}/>() &#123;</p>
        <p>&nbsp;&nbsp;int a,b,c,<input type="text" name="input2" value={inputValues.input2} onChange={handleInputChange} style={styles.input}/></p>
        <p>&nbsp;&nbsp;printf("Enter three integers (a, b, c): ");</p>
        <p>&nbsp;&nbsp;scanf("%d %d %d", &a, &b, &c);  // Step 1:</p>
        <p>&nbsp;&nbsp;if (a &gt; b) &#123;  // Step 2:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;if (b &gt; c) &#123;  // Step 3:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a + b + c;  // Step 4:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125; <input type="text" name="input3" value={inputValues.input3} onChange={handleInputChange} style={styles.input}/> (c &gt;=  a) &#123;  // Step 5:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a * b * c;  // Step 6:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125; else &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a - b - c;  // Step 7:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</p>
        <p>&nbsp;&nbsp;&#125; else &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;if (a == b <input type="text" name="input4" value={inputValues.input4} onChange={handleInputChange} style={styles.input}/> b == c) &#123;  // Step 8:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a * 2;  // Step 9: คำนวณผลลัพธ์เป็น a * 2</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125; else if (a == b <input type="text" name="input5" value={inputValues.input5} onChange={handleInputChange} style={styles.input}/> c != a) &#123;  // Step 10:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = (a + b) * c;  // Step 11:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125; else if (a &lt; c <input type="text" name="input6" value={inputValues.input6} onChange={handleInputChange} style={styles.input}/> b &lt; c) &#123;  // Step 12:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a - b + c;  // Step 13:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125; else &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = a - b - c;  // Step 14:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</p>
        <p>&nbsp;&nbsp;&#125;</p>
        <p>&nbsp;&nbsp;printf("Result: %d\n", <input type="text" name="input7" value={inputValues.input7} onChange={handleInputChange} style={styles.input}/>);  // Step 15: แสดงผลลัพธ์</p>
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
    maxWidth: '100vh',
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
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '5px',
    width: '80px',
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

export default Exercise3_1;
