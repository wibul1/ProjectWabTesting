import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise3_2 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [inputs, setInputs] = useState(Array(15).fill(''));
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // คำตอบที่ถูกต้องของแต่ละช่อง
  const correctAnswers = [1, 2, 3, 8, 4, 5, 9, 10, 6, 7, 11, 12, 13, 14, 15];

  // ฟังก์ชันสำหรับอัพเดตค่า input
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    let newScore = 0;

    // ตำแหน่งที่ถูกต้องตาม pattern
    const pattern = [
      [0],        // Row 1
      [1],        // Row 2
      [2, 3],     // Row 3
      [4, 5, 6, 7], // Row 4
      [8, 9, 10, 11], // Row 5
      [12, 13],   // Row 6
      [14]        // Row 7
    ];

    inputs.forEach((input, index) => {
      // ตรวจสอบว่าตรงกับตำแหน่งใน pattern หรือไม่
      pattern.forEach((row) => {
        if (row.includes(index) && parseInt(input) === correctAnswers[index]) {
          newScore += 2; // คำตอบที่ถูกต้องได้ 2 คะแนน
        }
      });
    });

    setScore(newScore);
    const totalScore3 = previousScore + newScore;
    localStorage.setItem('totalScore3', totalScore3);

    // นำไปสู่หน้าผลลัพธ์
    navigate('/result', { state: { score: totalScore3, nextPage: '/Exercise3.3' } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score {previousScore}</div>
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.2 Basis Path Testing</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
        <pre style={styles.codeBlock}>
  {`int main() {
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
            <h1 style={styles.description}> คำอธิบาย : ให้เรียงเส้นทางจาก 1-15 โดยใส่ลงไปในช่องว่างที่มีให้ด้านล่าง แล้วกดSubmit </h1>
            <button style={styles.hintButton}>คำใบ้</button>
      </div>
      <div style={styles.container2}>
        <div style={styles.tree}>
          <div style={styles.row('0px')}>
            <input type="number" value={inputs[0]} onChange={(e) => handleInputChange(0, e.target.value)} style={styles.input('30px')} />
          </div>
          <div style={styles.row('0px')}>
            <input type="number" value={inputs[1]} onChange={(e) => handleInputChange(1, e.target.value)} style={styles.input('30px')} />
          </div>
          <div style={styles.row('0px')}>
            <input type="number" value={inputs[2]} onChange={(e) => handleInputChange(2, e.target.value)} style={styles.input('250px')} />
            <input type="number" value={inputs[3]} onChange={(e) => handleInputChange(3, e.target.value)} style={styles.input('25px')} />
          </div>
          <div style={styles.row('200px')}>
            <input type="number" value={inputs[4]} onChange={(e) => handleInputChange(4, e.target.value)} style={styles.input('220px')} />
            <input type="number" value={inputs[5]} onChange={(e) => handleInputChange(5, e.target.value)} style={styles.input('250px')} />
            <input type="number" value={inputs[6]} onChange={(e) => handleInputChange(6, e.target.value)} style={styles.input('420px')} />
            <input type="number" value={inputs[7]} onChange={(e) => handleInputChange(7, e.target.value)} style={styles.input('30px')} />
          </div>
          <div style={styles.row('70px')}>
            <input type="number" value={inputs[8]} onChange={(e) => handleInputChange(8, e.target.value)} style={styles.input('80px')} />
            <input type="number" value={inputs[9]} onChange={(e) => handleInputChange(9, e.target.value)} style={styles.input('180px')} />
            <input type="number" value={inputs[10]} onChange={(e) => handleInputChange(10, e.target.value)} style={styles.input('80px')} />
            <input type="number" value={inputs[11]} onChange={(e) => handleInputChange(11, e.target.value)} style={styles.input('30px')} />
          </div>
          <div style={styles.row('800px')}>
            <input type="number" value={inputs[12]} onChange={(e) => handleInputChange(12, e.target.value)} style={styles.input('30px')} />
            <input type="number" value={inputs[13]} onChange={(e) => handleInputChange(13, e.target.value)} style={styles.input('30px')} />
          </div>
          <div style={styles.row('0px')}>
            <input type="number" value={inputs[14]} onChange={(e) => handleInputChange(14, e.target.value)} style={styles.input('30px')} />
          </div>
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
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    padding: '20px'
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
    borderRadius: '5px',
    marginBottom: '15px',
    cursor: 'pointer',
    fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  codeBlock: {
    backgroundColor: '#2f4f4f',
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
  row: (marginLeft) => ({
    display: 'flex',
    justifyContent: 'flex-start',  // จัดแถวให้ชิดด้านซ้าย
    marginBottom: '80px',
    marginLeft: marginLeft || '0px',  // ระยะห่างจากด้านซ้ายสำหรับแต่ละแถว
  }),
  input: (marginRight = '0px') => ({
    width: '80px',
    height: '80px',
    marginRight: marginRight, // กำหนดระยะห่างระหว่างช่อง
    textAlign: 'center',
    fontSize: '18px',
    border: '2px solid #2f4f4f',
    borderRadius: '5px',
    fontSize: '60px',
    fontFamily: 'Arial, sans-serif',
  }),
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
