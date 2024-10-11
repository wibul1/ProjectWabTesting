import React from 'react';
import Box from '../components/Box';

const Home = () => {
  const totalScore1 = parseInt(localStorage.getItem('totalScore1')) || 0;
  const totalScore2 = parseInt(localStorage.getItem('totalScore2')) || 0;
  const totalScore3 = parseInt(localStorage.getItem('totalScore3')) || 0;
  
  const totalScore = totalScore1 + totalScore2 + totalScore3;
  
  let rank;
  if (totalScore >= 80) {
    rank = 'S';
  } else if (totalScore >= 60 && totalScore < 80) {
    rank = 'A';
  } else if (totalScore >= 40 && totalScore < 60) {
    rank = 'B';
  } else if (totalScore >= 30 && totalScore < 40) {
    rank = 'C';
  } else if (totalScore >= 20 && totalScore < 30) {
    rank = 'D';
  } else {
    rank = 'F'; // เผื่อกรณีคะแนนน้อยกว่า 20
  }
  
  console.log(`Total Score: ${totalScore}, Rank: ${rank}`);
  


const resetScore = () => {
  localStorage.setItem('totalScore1', 0);
  localStorage.setItem('totalScore2', 0);
  localStorage.setItem('totalScore3', 0);
  localStorage.setItem('totalScore', 0); // ถ้ามีการใช้ totalScore รวมอยู่ด้วย
  window.location.reload(); // รีเฟรชหน้าเพื่อล้างคะแนนแสดงใหม่
};


  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score: {totalScore}</div>
        <div style={styles.scoreBox}>Rank: {rank}</div>
        <button style={styles.resetButton} onClick={resetScore}>รีเซ็ตคะแนน</button>
      </div>
      <div style={styles.choice}>
        <Box title="ข้อ 1 Equivalence Partitioning" route="/exercise1.1" />
        <div style={styles.scoreBox}>Score: {totalScore1}</div>
      </div>
      <div style={styles.choice}>
        <Box title="ข้อ 2 Boundary Value Analysis" route="/exercise2.1" />
        <div style={styles.scoreBox}>Score: {totalScore2}</div>
      </div>
      <div style={styles.choice}>
        <Box title="ข้อ 3 Basis Path Testing" route="/exercise3.1"/>
        <div style={styles.scoreBox}>Score: {totalScore3}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '70%',
    margin: '80px auto',
    borderRadius: '10px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  choice: {
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
    width: '200px',
    padding: '20px',
    borderRadius: '5px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  resetButton: {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '30px',
        fontFamily: 'Arial, sans-serif',
  },
};

export default Home;
