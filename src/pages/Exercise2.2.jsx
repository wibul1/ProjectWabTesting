import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise2_2 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [minValues, setMinValues] = useState(['', '', '']);
  const [maxValues, setMaxValues] = useState(['', '', '']);

  const navigate = useNavigate();

  // ฟังก์ชัน handleInputChange ที่แก้ไข
  const handleInputChange = (setter, values, index, value) => {
    const newValues = [...values];  // คัดลอก array เดิม
    newValues[index] = value;  // อัปเดตค่าในตำแหน่งที่ระบุ
    setter(newValues);  // เซ็ตค่าใหม่ให้กับ state
  };

  // ฟังก์ชันเช็คค่า min
  const validateMin = (value, index) => {
    const num = parseInt(value);
    if (index === 0 && num === 0) return true;
    if (index === 1 && num === 1) return true;
    if (index === 2 && num === 2) return true;
    return false;
  };

  // ฟังก์ชันเช็คค่า max
  const validateMax = (value, index) => {
    const num = parseInt(value);
    if (index === 0 && num === 99) return true;
    if (index === 1 && num === 100) return true;
    if (index === 2 && num === 101) return true;
    return false;
  };

  const handleSubmit = () => {
    // ตรวจสอบค่า min
    const minScore = minValues.filter((value, index) => validateMin(value, index)).length * 2;

    // ตรวจสอบค่า max
    const maxScore = maxValues.filter((value, index) => validateMax(value, index)).length * 2;

    // คำนวณคะแนนรวม
    const totalScore = previousScore + minScore + maxScore;
    localStorage.setItem('totalScore', totalScore);

    // นำไปสู่หน้าผลลัพธ์
    navigate('/result', { state: { score: totalScore, nextPage: '/Exercise2.3' } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score: {previousScore}</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 2.2 Boundary Value Analysis</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
      <p>
        โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br/>
        หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br/>
        โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
        </p>
        <p> : ให้เติมค่าที่คิดว่าอยู่ในช่วง min max แล้วกด Submit</p>
      </div>

      <button style={styles.hintButton}>คำใบ้</button>

      <div style={styles.inputContainer}>
        <div style={styles.labelRow}>
          <span>Min</span>
          <span>Max</span>
        </div>

        {[0, 1, 2].map((index) => (
          <div key={index} style={styles.row}>
            <div style={styles.inputWrapper}>
              <input
                type="number"
                placeholder={`Min ${index + 1}`}
                value={minValues[index]}
                onChange={(e) =>
                  handleInputChange(setMinValues, minValues, index, e.target.value)
                }
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <input
                type="number"
                placeholder={`Max ${index + 1}`}
                value={maxValues[index]}
                onChange={(e) =>
                  handleInputChange(setMaxValues, maxValues, index, e.target.value)
                }
                style={styles.input}
              />
            </div>
          </div>
        ))}
      </div>

      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '350px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px 0px 0px 300px'
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: '2px solid #0a3d3d',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '120px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Exercise2_2;
