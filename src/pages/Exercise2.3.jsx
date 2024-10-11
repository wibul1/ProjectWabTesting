import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise2_3 = () => {
  const location = useLocation();
  const { score: previousScore = 0 } = location.state || {};
  const [inputAge1, setInputAge1] = useState('');
  const [inputAge2, setInputAge2] = useState('');
  const [inputAge3, setInputAge3] = useState('');
  const [inputAge4, setInputAge4] = useState('');
  const [inputAge5, setInputAge5] = useState('');
  const [inputAge6, setInputAge6] = useState('');
  const [expectedResult1, setExpectedResult1] = useState('');
  const [expectedResult2, setExpectedResult2] = useState('');
  const [expectedResult3, setExpectedResult3] = useState('');
  const [expectedResult4, setExpectedResult4] = useState('');
  const [expectedResult5, setExpectedResult5] = useState('');
  const [expectedResult6, setExpectedResult6] = useState('');
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState('');
  const navigate = useNavigate();
  const totalScore2 = parseInt(localStorage.getItem('totalScore2')) || 0;

  // ฟังก์ชันสำหรับคำนวณค่ากำลังสองและตรวจสอบเงื่อนไข
  const calculateSquare = (inputValue) => {
    const num = parseInt(inputValue);

    if (isNaN(num)) {
      return 'Error';
    }

    if (num === 0 || num === 101) {
      return 'Error';
    } else if (num >= 1 && num <= 100) {
      return num * num;
    } else {
      return 'Error';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let sumScore = 0;
    const correctAnswers = [];
    const incorrectAnswers = [];

    // ตรวจสอบแต่ละกรณี
    const result1 = calculateSquare(inputAge1);
    if (result1 === 'Error' && expectedResult1 === 'Error') {
      sumScore += 4;
      correctAnswers.push({ index: 1, userAnswer: inputAge1, correctAnswer: expectedResult1 });
    } else {
      incorrectAnswers.push({ index: 1, userAnswer: inputAge1, correctAnswer: expectedResult1 });
    }

    const result2 = calculateSquare(inputAge2);
    if (result2 === 1 && expectedResult2 === '1') {
      sumScore += 4;
      correctAnswers.push({ index: 2, userAnswer: inputAge2, correctAnswer: expectedResult2 });
    } else {
      incorrectAnswers.push({ index: 2, userAnswer: inputAge2, correctAnswer: expectedResult2 });
    }

    const result3 = calculateSquare(inputAge3);
    if (result3 === 4 && expectedResult3 === '4') {
      sumScore += 4;
      correctAnswers.push({ index: 3, userAnswer: inputAge3, correctAnswer: expectedResult3 });
    } else {
      incorrectAnswers.push({ index: 3, userAnswer: inputAge3, correctAnswer: expectedResult3 });
    }

    const result4 = calculateSquare(inputAge4);
    if (result4 === 9801 && expectedResult4 === '9801') {
      sumScore += 4;
      correctAnswers.push({ index: 4, userAnswer: inputAge4, correctAnswer: expectedResult4 });
    } else {
      incorrectAnswers.push({ index: 4, userAnswer: inputAge4, correctAnswer: expectedResult4 });
    }

    const result5 = calculateSquare(inputAge5);
    if (result5 === 10000 && expectedResult5 === '10000') {
      sumScore += 4;
      correctAnswers.push({ index: 5, userAnswer: inputAge5, correctAnswer: expectedResult5 });
    } else {
      incorrectAnswers.push({ index: 5, userAnswer: inputAge5, correctAnswer: expectedResult5 });
    }

    const result6 = calculateSquare(inputAge6);
    if (result6 === 'Error' && expectedResult6 === 'Error') {
      sumScore += 4;
      correctAnswers.push({ index: 6, userAnswer: inputAge6, correctAnswer: expectedResult6 });
    } else {
      incorrectAnswers.push({ index: 6, userAnswer: inputAge6, correctAnswer: expectedResult6 });
    }

    setScore(sumScore);

    if (sumScore < 24) {
      setHint('ลองตรวจสอบผลลัพธ์ที่คาดหวังใหม่อีกครั้ง');
    } else {
      setHint('คุณตอบถูกทั้งหมดแล้ว!');
    }

    // คำนวณคะแนนรวมจากข้อ 2.2 และ 2.3
    const updatedScore = totalScore2 + sumScore;

    // บันทึกคะแนนรวมลงใน LocalStorage
    localStorage.setItem('totalScore2', updatedScore);

    // นำทางไปยังหน้าผลลัพธ์พร้อมส่งคะแนนรวม
    navigate('/result', {
      state: {
        score: sumScore,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
        nextPage: '/',
      },
    });
  };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Software Testing Training</h1>
                <div style={styles.scoreBox}>Score: {totalScore2}</div> 
            </div>
            <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 2.3 Boundary Value Analysis</h3>
            <div style={styles.question}>
                <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
                <p>
                โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br/>
                หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br/>
                โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
                </p>
            </div>
            <div style={styles.headerContainer}>
                <h1 style={styles.description}> คำอธิบาย : ให้ตอบค่าที่คิดว่า Testcase นั้นจะวิ่งไป แล้วกด Submit </h1>
                <button style={styles.hintButton}>คำใบ้</button>
            </div>
            <form onSubmit={handleSubmit}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Testcase</th>
                            <th style={styles.th}>Input A</th>
                            <th style={styles.th}>Expected Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.th_td}>TC 01</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge1} 
                                    onChange={(e) => setInputAge1(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult1} 
                                    onChange={(e) => setExpectedResult1(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>TC 02</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge2} 
                                    onChange={(e) => setInputAge2(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult2} 
                                    onChange={(e) => setExpectedResult2(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>TC 03</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge3} 
                                    onChange={(e) => setInputAge3(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult3} 
                                    onChange={(e) => setExpectedResult3(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>TC 04</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge4} 
                                    onChange={(e) => setInputAge4(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult4} 
                                    onChange={(e) => setExpectedResult4(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>TC 05</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge5} 
                                    onChange={(e) => setInputAge5(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult5} 
                                    onChange={(e) => setExpectedResult5(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>TC 06</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge6} 
                                    onChange={(e) => setInputAge6(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="text" 
                                    value={expectedResult6} 
                                    onChange={(e) => setExpectedResult6(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button style={styles.submitBtn} type="submit">Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColo2r: '#f5f5f5',
        padding: '20px',
        maxWidth: '90%',
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
    question: {
        backgroundColor: '#315a5a',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px',
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
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
        fontSize: '30px',
        fontFamily: 'Arial, sans-serif',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
        fontSize: '30px',
        fontFamily: 'Arial, sans-serif',
    },
    th_td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        fontSize: '25px',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        width: '90%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '25px',
        fontFamily: 'Arial, sans-serif',
    },
    submitBtn: {
        backgroundColor: '#0a3d3d',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
    }
};

export default Exercise2_3;
