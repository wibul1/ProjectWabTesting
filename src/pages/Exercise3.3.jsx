import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise3_3 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [paths, setPaths] = useState({ path1: '', path2: '', path3: '' });
  const [totalPaths, setTotalPaths] = useState('');
  const [error, setError] = useState(''); // เพิ่ม state สำหรับเก็บข้อความแจ้งเตือน
  const navigate = useNavigate();

  const correctTotalPaths = 7; // จำนวนเส้นทางที่ถูกต้อง (เปลี่ยนตามจริงได้)
  const correctPaths = ['1-2-3-4-15', '1-2-3-5-6-15', '1-2-3-5-7-15', '1-2-8-9-15', '1-2-8-10-11-15', '1-2-8-10-12-13-15', '1-2-8-10-12-14-15']; // ตัวอย่างเส้นทางที่ถูกต้อง

 // ฟังก์ชันสำหรับอัพเดตค่า input
const handleInputChange = (e) => {
  setPaths({ ...paths, [e.target.name]: e.target.value });
  setError(''); // เคลียร์ข้อความแจ้งเตือนเมื่อมีการกรอกข้อมูลใหม่
};

const handleTotalPathsChange = (e) => {
  setTotalPaths(e.target.value);
  setError(''); // เคลียร์ข้อความแจ้งเตือนเมื่อมีการกรอกข้อมูลใหม่
};


  const checkDuplicatePaths = () => {
    const uniquePaths = new Set(Object.values(paths));
    return uniquePaths.size !== Object.values(paths).length;
  };

  const handleSubmit = () => {
    let score = previousScore;
    let incorrectPaths = []; // เก็บเส้นทางที่ไม่ถูกต้อง
  
    // เช็คว่ามีการกรอกเส้นทางซ้ำหรือไม่
    if (checkDuplicatePaths()) {
      setError('กรุณากรอกเส้นทางที่ไม่ซ้ำกัน');
      return;
    }
  
    // เช็คจำนวนเส้นทางที่กรอกว่าถูกต้องไหม
    if (parseInt(totalPaths) === correctTotalPaths) {
      score += 2;
    }
  
    // เช็คแต่ละเส้นทางที่กรอกว่าถูกต้องไหม
    Object.values(paths).forEach((path) => {
      if (correctPaths.includes(path)) {
        score += 2; // ได้คะแนนเพิ่มถ้าตรงกับเส้นทางที่ถูกต้อง
      } else {
        incorrectPaths.push(path); // เก็บเส้นทางที่ไม่ถูกต้อง
      }
    });
  
    // หากมีเส้นทางที่ไม่ถูกต้อง แสดงข้อความแจ้งเตือน
    if (incorrectPaths.length > 0) {
      setError(`เส้นทางที่ไม่ถูกต้อง: ${incorrectPaths.join(', ')}`);
      return; // หยุดการทำงานหากมีเส้นทางไม่ถูกต้อง
    }
  
    // เก็บคะแนนใน localStorage และนำไปสู่หน้าผลลัพธ์
    localStorage.setItem('totalScore', score);
    navigate('/result', { state: { score, nextPage: '/Exercise3.4' } });
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
      <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score {previousScore}</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.3 Basis Path Testing</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>

        <p>: จากข้อ 3.2 ต้องการให้ตอบถูกจำนวนเส้นทางที่เป็นไปได้ทั้งหมดและยกตัวอย่าง 3 เส้นทาง</p>

        <div style={styles.tree}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-d9486.appspot.com/o/L%2Fpath.png?alt=media&token=af7d1574-64c3-4a58-8e8a-11ef90a13efe"
            alt="Path Diagram"
            style={styles.image}
          />

          <h3>คำตอบของคุณ</h3>
          <div>ใส่จำนวนเส้นทางที่ถูกต้อง</div>
          <input type="text" value={totalPaths} onChange={handleTotalPathsChange} style={styles.input} />

          <div>ยกตัวอย่างเส้นทางที่เป็นไปได้ 3 เส้นทาง</div>
          <input
            type="text"
            name="path1"
            value={paths.path1}
            onChange={handleInputChange}
            placeholder="เส้นทางที่ 1"
            style={styles.input}
          />
          <input
            type="text"
            name="path2"
            value={paths.path2}
            onChange={handleInputChange}
            placeholder="เส้นทางที่ 2"
            style={styles.input}
          />
          <input
            type="text"
            name="path3"
            value={paths.path3}
            onChange={handleInputChange}
            placeholder="เส้นทางที่ 3"
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>} {/* แสดงข้อความแจ้งเตือนถ้ามี */}
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
  input: {
    width: '50%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '2px solid #2f4f4f'
  },
  submitBtn: {
    backgroundColor: '#2f4f4f',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer'
  },
  tree: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  image: {
    width: '80%',
    maxWidth: '600px', // จำกัดขนาดความกว้างของรูปภาพ
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '2px solid #2f4f4f'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  }
};

export default Exercise3_3;
