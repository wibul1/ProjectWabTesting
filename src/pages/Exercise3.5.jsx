import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise3_5 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();
  const [newScore, setScore] = useState(0);
  const totalScore3 = parseInt(localStorage.getItem('totalScore3')) || 0;
  const correctAnswer = '2'; // คำตอบที่ถูกต้องคือ '2'

  const handleSubmit = () => {
    let sumScore = 0;
    const incorrect = [];
    const correct = [];

    // ตรวจสอบว่าคำตอบถูกหรือไม่
    if (selectedAnswer === correctAnswer) {
      sumScore += 2;
      correct.push({ question: '3.5', userAnswer: selectedAnswer, correctAnswer });
    } else {
      incorrect.push({ question: '3.5', userAnswer: selectedAnswer, correctAnswer });
    }

    const updatedScore = totalScore3 + sumScore;
    localStorage.setItem('totalScore3', updatedScore);

     // เก็บข้อมูลคำตอบที่ถูกและผิดใน localStorage
     localStorage.setItem('incorrectAnswers3', JSON.stringify(incorrect));
     localStorage.setItem('correctAnswers3', JSON.stringify(correct));

    // นำไปสู่หน้าผลลัพธ์
    navigate('/result', {
      state: {
        score: sumScore,
        incorrectAnswers: incorrect,
        correctAnswers: correct,
        nextPage: '/', 
      }
    });
  };

  // ฟังก์ชันเลือกสีตามว่าปุ่มถูกเลือกหรือไม่
  const getButtonStyle = (answer) => ({
    backgroundColor: selectedAnswer === answer ? '#dbe6c1' : '#0a3d3d',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  });

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
                <h1 style={styles.header}>Software Testing Training</h1>
                <div style={styles.scoreBox}>Score: {totalScore3}</div> 
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.5 Basis Path Testing</h3>
      <div style={styles.container2}>
        <div style={styles.leftSide}>
          
          <img src="https://firebasestorage.googleapis.com/v0/b/project-d9486.appspot.com/o/L%2F3.5.png?alt=media&token=8bd8c07e-763a-4d10-93e4-838322ca259e" alt="Table" style={styles.image} />
        </div>

        {/* Right Side - Code and Answers */}
        <div style={styles.rightSide}>
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
            <div style={styles.headerContainer}>
              <h1 style={styles.description}> คำอธิบาย : ให้เลือกข้อที่คิดว่าเป็นจุดผิดพลาดของระบบ แล้วกด Submit</h1>
              <button style={styles.hintButton}>คำใบ้</button>
            </div>
          </div>
        <pre style={styles.codeBlock}>
    {`int main() {
      int a, b, c, result;

      printf("Enter three integers (a, b, c): ");
      scanf("%d %d %d", &a, &b, &c);             // Step 1: 

      if (a > b) {                               // Step 2: 
          if (b > c) {                           // Step 3: 
              result = a + b + c;                // Step 4:
          } else if (c >= a) {                   // Step 5: 
              result = a * b * c;                // Step 6: 
          } else {
              result = a - b - c;                // Step 7:
          }
      } else {
          if (a == b && b == c) {                // Step 8: 
              result = a * 2;                    // Step 9:
          } else if (a == b && c != a) {         // Step 10: 
              result = (a + b) * c;              // Step 11:
          } else if (a < c && b < c) {           // Step 12: 
              result = a - b + c;                // Step 13:
          } else {
              result = a + b * c;                // Step 14: 
          }
      }
      printf("Result: %d\\n", result);           // Step 15:
      return 0;
  }`}
  </pre>

  <button style={styles.hintButton}>คำใบ้</button>
          <div style={styles.options}>
            <button style={getButtonStyle('1')} onClick={() => setSelectedAnswer('1')}>
              1. Step 3 (b &gt; c)
            </button>
            <button style={getButtonStyle('2')} onClick={() => setSelectedAnswer('2')}>
              2. Step 5 (c &gt;= a)
            </button>
            <button style={getButtonStyle('3')} onClick={() => setSelectedAnswer('3')}>
              3. Step 8 (a == b && b == c)
            </button>
            <button style={getButtonStyle('4')} onClick={() => setSelectedAnswer('4')}>
              4. Step 12 (a &lt; c && b &lt; c)
            </button>
          </div>

          <button style={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>

  );
};

// Styles
const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    maxWidth: '100%',
    margin: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  header: {
    fontSize: '24px',
    color: '#333',
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
  container2: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  question: {
    // backgroundColor: '#315a5a',
    color: 'black',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
},
  leftSide: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    marginRight: '20px',
    textAlign: 'left',
  },
  rightSide: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    textAlign: 'left',
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
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  codeBlock: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    marginBottom: '20px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  submitBtn: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Exercise3_5;
