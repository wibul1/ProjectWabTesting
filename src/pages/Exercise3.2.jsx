import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise3_2 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const totalScore3 = parseInt(localStorage.getItem('totalScore3')) || 0;

  const [inputValues, setInputValues] = useState({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  });
  const [incorrectAnswers, setIncorrectAnswers] = useState([]); // บันทึกคำตอบที่ผิดพร้อมกับคำเฉลย
  const [correctAnswersList, setCorrectAnswersList] = useState([]); // บันทึกคำตอบที่ถูกต้อง

  const correctAnswers = {
    input0: '1',
    input1: '2',
    input2: '4',
    input3: '9',
    input4: '6',
    input5: '11',
    input6: '14'
  };
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
    setScore(sumScore);
    const updatedScore = totalScore3 + sumScore;
    localStorage.setItem('totalScore3', updatedScore);
    localStorage.setItem('incorrectAnswers3', JSON.stringify(incorrect)); // เก็บคำตอบที่ผิด
    localStorage.setItem('correctAnswers3', JSON.stringify(correct)); // เก็บคำตอบที่ถูก

    setIncorrectAnswers(incorrect);
    setCorrectAnswersList(correct);

    // นำไปสู่หน้าผลลัพธ์
    navigate('/result', { state: { score: sumScore, incorrectAnswers: incorrect, correctAnswers: correct, nextPage: '/Exercise3.3', totalScore1: sumScore } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score {totalScore3}</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.2 Basis Path Testing</h3>
      <div style={styles.question}>
          <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
            <pre style={styles.codeBlock}>
          {`      int main() {
            int a, b, c, result;

            printf("Enter three integers (a, b, c): ");
            scanf("%d %d %d", &a, &b, &c);             // Step 1: 

            if (a > b) {                                                // Step 2: 
                if (b > c) {                                            // Step 3: 
                    result = a + b + c;                           // Step 4:
                } else if (c >= a) {                                // Step 5: 
                    result = a * b * c;                             // Step 6: 
                } else {
                    result = a - b - c;                            // Step 7:
                }
            } else {
                if (a == b && b == c) {                        // Step 8: 
                    result = a * 2;                                 // Step 9:
                } else if (a == b && c != a) {               // Step 10: 
                    result = (a + b) * c;                        // Step 11:
                } else if (a < c && b < c) {                  // Step 12: 
                    result = a - b + c;                           // Step 13:
                } else {
                    result = a + b * c;                         // Step 14: 
                }
            }
            printf("Result: %d\\n", result);                // Step 15:
            return 0;
        }`}
        </pre>
      </div>
      <div style={styles.headerContainer}>
            <h1 style={styles.description}> คำอธิบาย : จากโค้ดด้านบนอยากให้ใส่ตัวเลขเส้นทางไปแทนช่องที่เป็นภาษาอังกฤษ โดยใส่ที่ช่อง input ข้างๆ<br/>
            โดยแต่ละช่องจะมีบอกว่าต้องนี้อทนตัวไหนเช่น A....ตอบ 10 และสามารถดูว่าแต่ละเส้นทางมีตัวเลขอะไรบ้างได้ที่โค้ดด้านบน <br/>
            พอตอบครบแล้วกดSubmit </h1>
            <button style={styles.hintButton}>คำใบ้</button>
      </div>
      <div style={styles.container2}>
        <div style={styles.leftSide}>
          <img src="https://firebasestorage.googleapis.com/v0/b/project-d9486.appspot.com/o/L%2F%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%82%E0%B9%89%E0%B8%AD3.2.png?alt=media&token=b39437aa-66fc-4b7e-ab39-7a72c8266552" alt="Table" style={styles.image} />
        </div>
        <div style={styles.rightSide}>
          <p>A <input type="number" name="input0" value={inputValues.input0} onChange={handleInputChange} style={styles.input} /></p>
          <p>B <input type="number" name="input1" value={inputValues.input1} onChange={handleInputChange} style={styles.input} /></p>
          <p>C <input type="number" name="input2" value={inputValues.input2} onChange={handleInputChange} style={styles.input} /></p>
          <p>D <input type="number" name="input3" value={inputValues.input3} onChange={handleInputChange} style={styles.input} /></p>
          <p>E <input type="number" name="input4" value={inputValues.input4} onChange={handleInputChange} style={styles.input} /></p>
          <p>F <input type="number" name="input5" value={inputValues.input5} onChange={handleInputChange} style={styles.input} /></p>
          <p>G <input type="number" name="input6" value={inputValues.input6} onChange={handleInputChange} style={styles.input} /></p>
        </div>
      </div>      
      <button style={styles.submitBtn} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

// Styles สำหรับหน้าจอ
const styles = {
  container: {
    // backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '10px',
  },
  container2: {
    backgroundColor: '#e0e0e0',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    padding: '20px'
  },
  leftSide: {
    flex: 4,
    padding: '20px',
    // backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    marginRight: '20px',
    textAlign: 'left',
  },
  rightSide: {
    flex: 3,
    padding: '20px',
    fontSize: '40px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    textAlign: 'left',
  },
  image: {
    width: '70%',
    borderRadius: '10px',
    margin: '10px 0px 0px 150px',
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
    backgroundColor: '#4d6a6d',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'left',
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
    width: '180px',
    borderRadius: '5px',
    marginBottom: '15px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  codeBlock: {
    // backgroundColor: '#2f4f4f',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  tree: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '5px',
    width: '580px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  submitBtn: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#2f4f4f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  }
};



export default Exercise3_2;
