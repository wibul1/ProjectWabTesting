import React from 'react';
import Box from '../components/Box';

const Home = () => {
  const totalScore = localStorage.getItem('totalScore') || 0;

  const resetScore = () => {
    localStorage.setItem('totalScore', 0);
    window.location.reload(); // รีเฟรชหน้าเพื่อล้างคะแนนแสดงใหม่
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score: {totalScore}</div>
        <button style={styles.resetButton} onClick={resetScore}>รีเซ็ตคะแนน</button>
      </div>

      <Box title="ข้อ 1 Equivalence Partitioning" route="/exercise1.1" />
      <Box title="ข้อ 2 Boundary Value Analysis" route="/exercise2.1" />
      <Box title="ข้อ 3 Basis Path Testing" route="/exercise3.1"/>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#dbe6c1',
    padding: '20px',
    maxWidth: '40%',
    margin: '80px auto',
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
  },
  scoreBox: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  resetButton: {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
