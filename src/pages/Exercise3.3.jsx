import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HintPopup from '../components/HintPopup';

const Exercise3_3 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [score, setScore] = useState(0);
  const [paths, setPaths] = useState({ path1: '', path2: '', path3: '' });
  const [totalPaths, setTotalPaths] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const totalScore3 = parseInt(localStorage.getItem('totalScore3')) || 0;
  const hints3_3 = [
    "คำใบ้ 1: Mutation Testing ทดสอบโดยการแก้ไขโค้ดเพื่อดูผลกระทบหรือไม่?",
    "คำใบ้ 2: คำว่า 'mutation' ใน Mutation Testing หมายถึงการเปลี่ยนแปลงในส่วนไหนของโค้ด?",
    "คำใบ้ 3: คำสั่งที่สามารถใช้เพื่อสร้าง mutation ในภาษา C คืออะไร?"
  ];
  

  const correctTotalPaths = 7;
  const correctPaths = [
    '1-2-3-4-15', 
    '1-2-3-5-6-15', 
    '1-2-3-5-7-15', 
    '1-2-8-9-15', 
    '1-2-8-10-11-15', 
    '1-2-8-10-12-13-15', 
    '1-2-8-10-12-14-15'
  ];

  const handleInputChange = (e) => {
    setPaths({ ...paths, [e.target.name]: e.target.value });
    setError('');
  };

  const handleTotalPathsChange = (e) => {
    setTotalPaths(e.target.value);
    setError('');
  };

  const checkDuplicatePaths = () => {
    const uniquePaths = new Set(Object.values(paths));
    return uniquePaths.size !== Object.values(paths).length;
  };

  const handleSubmit = () => {
    let sumScore = 0;
    const incorrect = [];
    const correct = [];
    const pathResult = { path1: '', path2: '', path3: '' };
  
    if (checkDuplicatePaths()) {
      setError('กรุณากรอกเส้นทางที่ไม่ซ้ำกัน');
      return;
    }
  
    // เช็คจำนวนเส้นทางที่กรอก
    const totalPathsResult = parseInt(totalPaths) === correctTotalPaths ? 'ถูกต้อง' : 'ไม่ถูกต้อง';
    if (totalPathsResult === 'ถูกต้อง') {
      sumScore += 2;
      correct.push({ question: 'totalPaths', userAnswer: totalPaths }); // เก็บค่าที่ถูกต้อง
    } else {
      incorrect.push({ question: 'totalPaths', userAnswer: totalPaths, correctAnswer: correctTotalPaths });
    }
  
    // เช็คเส้นทางที่กรอก
    Object.entries(paths).forEach(([key, path]) => {
      if (correctPaths.includes(path)) {
        sumScore += 2;
        pathResult[key] = 'ถูกต้อง';
        correct.push({ question: key, userAnswer: path });
      } else {
        pathResult[key] = 'ไม่ถูกต้อง';
        incorrect.push({ question: key, userAnswer: path, correctAnswer: correctPaths }); // แสดงคำตอบที่ถูกต้อง
      }
    });
  
    // อัพเดตคะแนนใน localStorage
    const updatedScore = totalScore3 + sumScore;
    localStorage.setItem('totalScore3', updatedScore);
    localStorage.setItem('incorrectAnswers3', JSON.stringify(incorrect));
    localStorage.setItem('correctAnswers3', JSON.stringify(correct));
  
    // ส่งข้อมูลไปยัง ResultPage
    navigate('/result', {
      state: {
        score: sumScore,
        incorrectAnswers: incorrect,
        correctAnswers: correct,
        nextPage: '/Exercise3.4',
        correctPaths: correctPaths, // ส่งเส้นทางที่ถูกต้องทั้งหมดไปยัง ResultPage
        userPaths: paths // ส่งเส้นทางที่ผู้ใช้กรอกไปยัง ResultPage
      }
    });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score {totalScore3}</div>
      </div>
      <h3 style={{ fontSize: '40px', fontFamily: 'Arial, sans-serif' }}>ข้อ 3.3 Basis Path Testing</h3>
      <div style={styles.question}>
        <div style={styles.row}>
          <div style={styles.leftSide}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-d9486.appspot.com/o/L%2Fpath.png?alt=media&token=af7d1574-64c3-4a58-8e8a-11ef90a13efe"
              alt="Path Diagram"
              style={styles.image}
            />
          </div>
          <div style={styles.rightSide}>
            <h3 style={{ fontSize: '40px', fontFamily: 'Arial, sans-serif' }}>Requirement</h3>
            <p>
              ให้โปรแกรมรับอินพุตเป็นจำนวนเต็ม 3 ค่า a, b, และ c <br />
              และทำการตรวจสอบและคำนวณผลลัพธ์ตามเงื่อนไขที่ซับซ้อนขึ้นดังนี้: <br />
              1. ถ้า a &gt; b และ b &gt; c ให้คำนวณผลลัพธ์เป็น a + b + c<br />
              2. ถ้า a &gt; b และ c &gt; a ให้คำนวณผลลัพธ์เป็น a * b * c<br />
              3. ถ้า a &gt; b และไม่เข้า 2 เงื่อนไขข้างบน ให้คำนวณผลลัพธ์เป็น a - b - c<br />
              4. ถ้า a == b และ b == c ให้คำนวณผลลัพธ์เป็น a * 2<br />
              5. ถ้า a == b และ c != a ให้คำนวณผลลัพธ์เป็น (a + b) * c<br />
              6. ถ้า a &lt; c และ b &lt; c ให้คำนวณผลลัพธ์เป็น a - b + c<br />
              7. หากไม่ตรงกับเงื่อนไขใด ๆ ข้างต้น ให้คำนวณผลลัพธ์เป็น a + b * c<br />
            </p>
            <div style={styles.headerContainer}>
              <h1 style={styles.description}>คำอธิบาย: ต้องการให้ตอบถูกจำนวนเส้นทางที่เป็นไปได้ทั้งหมดและยกตัวอย่าง 3 เส้นทาง</h1>
              <HintPopup hints={hints3_3} />
            </div>
            <h3 style={{ fontSize: '30px', fontFamily: 'Arial, sans-serif' }}>คำตอบของคุณ</h3>
            <div style={{ fontSize: '30px', fontFamily: 'Arial, sans-serif' }}>ใส่จำนวนเส้นทางที่ถูกต้อง</div>
            <input type="number" value={totalPaths} onChange={handleTotalPathsChange} style={styles.input} />
            <div style={{ fontSize: '30px', fontFamily: 'Arial, sans-serif' }}>ยกตัวอย่างเส้นทางที่เป็นไปได้ 3 เส้นทาง</div>
            <input
              type="text"
              name="path1"
              value={paths.path1}
              onChange={handleInputChange}
              placeholder="เส้นทางที่ 1 ตัวอย่างการตอบ 1-2-3-4-5"
              style={styles.input}
            />
            <input
              type="text"
              name="path2"
              value={paths.path2}
              onChange={handleInputChange}
              placeholder="เส้นทางที่ 2 ตัวอย่างการตอบ 1-2-3-4-5"
              style={styles.input}
            />
            <input
              type="text"
              name="path3"
              value={paths.path3}
              onChange={handleInputChange}
              placeholder="เส้นทางที่ 3 ตัวอย่างการตอบ 1-2-3-4-5"
              style={styles.input}
            />
            {error && <div style={styles.error}>{error}</div>}
          </div>
        </div>
      </div>
      <button style={styles.submitBtn} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '90%',
    margin: 'auto',
    borderRadius: '10px',
  },
  headerContainer: {
    // backgroundColor: '#ffffff',
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Arial, sans-serif',
  },
  leftSide: {
    flex: 2,
    padding: '20px',
    borderRadius: '10px',
    marginRight: '20px',
    textAlign: 'left',
    backgroundColor: '#ffffff',
    
  },
  rightSide: {
    flex: 2,
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'left',
  },
  image: {
    width: '80%',
    maxWidth: '600px', // จำกัดขนาดความกว้างของรูปภาพ
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '2px solid #2f4f4f',
  },
  input: {
    width: '50%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '2px solid #2f4f4f',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  submitBtn: {
    backgroundColor: '#2f4f4f',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  // tree: {
  //   marginBottom: '20px',
  //   textAlign: 'center'
  // },
  error: {
    color: 'red',
    marginTop: '10px'
  }
};

export default Exercise3_3;
