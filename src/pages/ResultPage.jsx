import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { score, correctAnswers = [], incorrectAnswers = [], nextPage } = location.state || {};
  const navigate = useNavigate();

  // สมมติว่าคุณต้องการสะสมคะแนนทั้งหมด
  const totalScore = score; // ปรับปรุงตามวิธีการสะสมคะแนนของคุณ

  const handleNext = () => {
    if (nextPage) {
      // กำหนดให้เมื่อกดปุ่ม "Next" จะไปยังหน้าอื่น
      navigate(nextPage, { state: { score, totalScore } });
    } else {
      console.error('Next page is not defined');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scoreBox}>
        <p style={styles.title}>คะแนนที่คุณได้</p>
        <p style={styles.score}>{score} คะแนน</p>
      </div >
      <div style={styles.correctBox}>
        <h2>คำตอบที่ถูกต้อง</h2>
        {correctAnswers.length > 0 ? (
          <ul>
            {correctAnswers.map((answer, index) => (
              <li key={index}>
                {answer.group} คำตอบที่ {answer.index}: คุณตอบ "{answer.userAnswer}" (ถูกต้อง)
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีคำตอบที่ถูกต้อง</p>
        )}
      </div>
      <div style={styles.incorrectBox}>
        <h2>คำตอบที่ไม่ถูกต้อง</h2>
        {incorrectAnswers.length > 0 ? (
          <ul>
            {incorrectAnswers.map((answer, index) => (
              <li key={index}>
                {answer.group} คำตอบที่ {answer.index}: คุณตอบ "{answer.userAnswer}" (คำตอบที่ถูกต้อง: "{answer.correctAnswer}")
              </li>
            ))}
          </ul>
        ) : (
          <p>ตอบถูกทุกข้อ!</p>
        )}
      </div>
      <button style={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '80%',
    margin: '80px auto',
    textAlign: 'center',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  scoreBox: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '40px',
    borderRadius: '10px',
    marginBottom: '20px',
    width: '450px',
  },
  title: {
    fontSize: '48px',
    margin: '0',
  },
  score: {
    fontSize: '45px',
    margin: '10px 0 0 0',
  },
  nextButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 40px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '26px',
    border: 'none',
  },
  correctBox: {
    // backgroundColor: '#f8d7da',
    color: '#0a3d3d',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    width: '800px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  incorrectBox: {
    // backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    width: '800px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default ResultPage;
