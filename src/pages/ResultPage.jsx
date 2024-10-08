import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { score, nextPage } = location.state || { score: 0, nextPage: '/Exercise1_2' };
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
        <p style={styles.title}>คะแนนรวมตอนนี้</p>
        <p style={styles.score}>{score} คะแนน</p>
      </div>
      <button style={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '800px',
    margin: '80px auto',
    textAlign: 'center',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
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
};

export default ResultPage;
