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
        
        let newScore = 0;

        // ตรวจสอบแต่ละกรณี
        if (calculateSquare(inputAge1) === 'Error' && expectedResult1 === 'Error') {
            newScore += 4;
        }
        if (calculateSquare(inputAge2) === 1 && expectedResult2 === '1') {
            newScore += 4;
        }
        if (calculateSquare(inputAge3) === 4 && expectedResult3 === '4') {
            newScore += 4;
        }
        if (calculateSquare(inputAge4) === 9801 && expectedResult4 === '9801') {
            newScore += 4;
        }
        if (calculateSquare(inputAge5) === 10000 && expectedResult5 === '10000') {
            newScore += 4;
        }
        if (calculateSquare(inputAge6) === 'Error' && expectedResult6 === 'Error') {
            newScore += 4;
        }

        setScore(newScore);

        if (newScore < 24) {
            setHint('ลองตรวจสอบผลลัพธ์ที่คาดหวังใหม่อีกครั้ง');
        } else {
            setHint('คุณตอบถูกทั้งหมดแล้ว!');
        }

        // คำนวณคะแนนรวมจากข้อ 2.2 และ 2.3
        const totalScore = previousScore + newScore;

        // บันทึกคะแนนรวมลงใน LocalStorage
        localStorage.setItem('totalScore', totalScore);

        // นำทางไปยังหน้าผลลัพธ์พร้อมส่งคะแนนรวม
        navigate('/result', { state: { score: totalScore, nextPage: '/' } });
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Software Testing Training</h1>
                <div style={styles.scoreBox}>Score: {previousScore}</div> 
            </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 2.3 Boundary Value Analysis</h3>
            <div style={styles.question}>
                <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
                <p>
                โปรแกรมหนึ่งรับค่าอินพุตเป็นตัวเลขระหว่าง 1 ถึง 100 เพื่อคำนวณตัวเลข (X * X) <br/>
                หากค่าที่กรอกอยู่นอกช่วง 1 ถึง 100 โปรแกรมจะแสดงข้อความว่า "Error" <br/>
                โปรแกรมนี้ทำงานกับตัวเลขจำนวนเต็มเท่านั้น
                </p>
                <p> : ให้ตอบค่าที่คิดว่า Testcase นั้นจะวิ่งไป แล้วกด Submit</p>
            </div>

            <button style={styles.hintButton}>คำใบ้</button>

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
                                    type="text" 
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
                                    type="text" 
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
                                    type="text" 
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
                                    type="text" 
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
                                    type="text" 
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
                                    type="text" 
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
        backgroundColor: '#f5f5f5',
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
