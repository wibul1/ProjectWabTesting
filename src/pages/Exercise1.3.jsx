import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HintPopup from '../components/HintPopup';

const Exercise1_3 = () => {
    const location = useLocation();
    const { score: previousScore = 0 } = location.state || {};
    const [inputAge1, setInputAge1] = useState('');
    const [inputAge2, setInputAge2] = useState('');
    const [inputAge3, setInputAge3] = useState('');
    const [inputAge4, setInputAge4] = useState('');
    const [inputAge5, setInputAge5] = useState('');
    const [inputAge6, setInputAge6] = useState('');
    const [inputAge7, setInputAge7] = useState('');
    const [inputAge8, setInputAge8] = useState('');
    const [inputAge9, setInputAge9] = useState('');
    const [expectedResult1, setExpectedResult1] = useState('');
    const [expectedResult2, setExpectedResult2] = useState('');
    const [expectedResult3, setExpectedResult3] = useState('');
    const [expectedResult4, setExpectedResult4] = useState('');
    const [expectedResult5, setExpectedResult5] = useState('');
    const [expectedResult6, setExpectedResult6] = useState('');
    const [expectedResult7, setExpectedResult7] = useState('');
    const [expectedResult8, setExpectedResult8] = useState('');
    const [expectedResult9, setExpectedResult9] = useState('');
    const [score, setScore] = useState(0);
    const [hint, setHint] = useState('');
    const navigate = useNavigate();
    const totalScore1 = parseInt(localStorage.getItem('totalScore1')) || 0;
    const hints1_3 = [
        "คำใบ้ 1: ตารางการตัดสินใจใช้ในการทดสอบอะไร?",
        "คำใบ้ 2: การแยกเงื่อนไขหลายๆ อย่างออกเป็นกรณีต่างๆ ทำได้อย่างไร?",
        "คำใบ้ 3: ในภาษา C คำสั่งที่ใช้ในการตรวจสอบเงื่อนไขมีอะไรบ้าง?"
      ];
      

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let sumScore = 0;
        const incorrectAnswers = []; // เก็บคำตอบที่ผิด
        const correctAnswers = [];   // เก็บคำตอบที่ถูกต้อง
    
        // ฟังก์ชันในการตรวจสอบตาม Expected Result ที่ส่งมา และคืนค่าคำอธิบาย
        const checkExpectedResult = (inputAge, expectedResult) => {
            const ageNum = parseInt(inputAge);

            // เงื่อนไขตาม expectedResult พร้อมคำอธิบาย
            switch (expectedResult) {
                case 'InvalidAge':
                    return { isCorrect: ageNum <= 0 || ageNum > 100, correctAnswer: "มากกว่า 0 และน้อยกว่า 100" };
                case 'Child':
                    return { isCorrect: ageNum >= 0 && ageNum <= 12, correctAnswer: "อยู่ระหว่าง 1-12" };
                case 'Teenager':
                    return { isCorrect: ageNum >= 13 && ageNum <= 19, correctAnswer: "อยู่ระหว่าง 13-19" };
                case 'Adult':
                    return { isCorrect: ageNum >= 20 && ageNum <= 100, correctAnswer: "อยู่ระหว่าง 20-100" };
                case 'ChildInvalidOver':
                    return { isCorrect: ageNum > 12, correctAnswer: "มากกว่า 12" };
                case 'TeenagerInvalid':
                    return { isCorrect: ageNum < 13, correctAnswer: "น้อยกว่า 13" };
                case 'TeenagerInvalidOver':
                    return { isCorrect: ageNum > 19, correctAnswer: "มากกว่า 19" };
                case 'AdultInvalid':
                    return { isCorrect: ageNum < 20, correctAnswer: "น้อยกว่า 20" };
                default:
                    return { isCorrect: false, correctAnswer: "ไม่ทราบช่วงอายุที่ถูกต้อง" };
            }
        };
    
        // ฟังก์ชันเช็คและเก็บคำตอบที่ถูกและผิด
        const checkAndStore = (inputAge, expectedResult, expectedText, index, group) => {
            const { isCorrect, correctAnswer } = checkExpectedResult(inputAge, expectedResult);
            const userAnswer = inputAge;

            if (isCorrect) {
                sumScore += 2;
                correctAnswers.push({
                    group,
                    index,
                    userAnswer,
                    correctAnswer,
                });
            } else {
                incorrectAnswers.push({
                    group,
                    index,
                    userAnswer,
                    correctAnswer,
                    explanation: `Expected '${expectedText}' but got '${userAnswer}'`
                });
            }
        };

        // เรียกฟังก์ชัน checkAndStore สำหรับแต่ละ input พร้อมเพิ่ม index และ group
        checkAndStore(inputAge1, expectedResult1, "Expected Child", 1, "Group A");
        checkAndStore(inputAge2, expectedResult2, "Expected Teenager", 2, "Group A");
        checkAndStore(inputAge3, expectedResult3, "Expected ChildInvalidOver", 3, "Group A");
        checkAndStore(inputAge4, expectedResult4, "Expected TeenagerInvalid", 4, "Group B");
        checkAndStore(inputAge5, expectedResult5, "Expected Teenager", 5, "Group B");
        checkAndStore(inputAge6, expectedResult6, "Expected TeenagerInvalidOver", 6, "Group B");
        checkAndStore(inputAge7, expectedResult7, "Expected AdultInvalid", 7, "Group C");
        checkAndStore(inputAge8, expectedResult8, "Expected Adult", 8, "Group C");
        checkAndStore(inputAge9, expectedResult9, "Expected AdultInvalidOver", 9, "Group C");

    
        setScore(sumScore);
    
        if (sumScore < 18) {
            setHint('ลองตรวจสอบผลลัพธ์ที่คาดหวังใหม่อีกครั้ง');
        } else {
            setHint('คุณตอบถูกทั้งหมดแล้ว!');
        }
    
        // บันทึกคะแนนรวมจากข้อ 1.2 และ 1.3
        const updatedScore = totalScore1 + sumScore;
    
        // เก็บข้อมูลลงใน LocalStorage
        localStorage.setItem('totalScore1', updatedScore);
    
        // นำทางไปยังหน้าผลลัพธ์พร้อมส่งคะแนนรวมและคำตอบที่ถูก/ผิด
        navigate('/result', { 
            state: { 
                score: sumScore, 
                incorrectAnswers, 
                correctAnswers,
                nextPage: '/'
            } 
        });
    };
    
    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Software Testing Training</h1>
                <div style={styles.scoreBox}>Score: {totalScore1}</div> 
            </div>
            <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 1.3 Equivalence Partitioning</h3>
            <div style={styles.question}>
            <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
                <p>
                    โปรแกรมหนึ่งรับค่าอินพุตเป็นอายุของบุคคลและจะแยกบุคคลออกเป็น 3 กลุ่มตามอายุ:
                    <br />
                    1. Child (0 - 12 ปี)
                    <br />
                    2. Teenager (13 - 19 ปี)
                    <br />
                    3. Adult (20 ปีขึ้นไป)
                    <br />
                    โปรแกรมนี้รับค่าอายุเป็นจำนวนเต็มระหว่าง 0 ถึง 100 ปี <br />
                    หากค่าไม่อยู่ในช่วงนี้จะถือว่าเป็นค่าไม่ถูกต้อง (Invalid age).
                </p>
            </div>
            <div style={styles.headerContainer}>
                <h1 style={styles.description}> คำอธิบาย : ให้ตอบค่าที่คิดว่า Testcase นั้นจะวิ่งไป แล้วกด Submit </h1>
                <HintPopup hints={hints1_3} />
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
                            <td style={styles.th_td}>Invalid เด็ก</td>
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
                                <select
                                    value={expectedResult1}
                                    onChange={(e) => setExpectedResult1(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Valid เด็ก</td>
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
                                <select
                                    value={expectedResult2}
                                    onChange={(e) => setExpectedResult2(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Invalid เด็ก</td>
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
                                <select
                                    value={expectedResult3}
                                    onChange={(e) => setExpectedResult3(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Invalid วัยรุ่น</td>
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
                                <select
                                    value={expectedResult4}
                                    onChange={(e) => setExpectedResult4(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Valid วัยรุ่น</td>
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
                                <select
                                    value={expectedResult5}
                                    onChange={(e) => setExpectedResult5(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Invalid วัยรุ่น</td>
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
                                <select
                                    value={expectedResult6}
                                    onChange={(e) => setExpectedResult6(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Invalid ผู้ใหญ่</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge7} 
                                    onChange={(e) => setInputAge7(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <select
                                    value={expectedResult7}
                                    onChange={(e) => setExpectedResult7(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Valid ผู้ใหญ่</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge8} 
                                    onChange={(e) => setInputAge8(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <select
                                    value={expectedResult8}
                                    onChange={(e) => setExpectedResult8(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={styles.th_td}>Invalid ผู้ใหญ่</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={inputAge9} 
                                    onChange={(e) => setInputAge9(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <select
                                    value={expectedResult9}
                                    onChange={(e) => setExpectedResult9(e.target.value)}
                                    style={styles.input}
                                >
                                    <option value="">Select</option>
                                    <option value="ChildInvalidOver">Child Invalid มากกว่า</option>
                                    <option value="Child">Child Valid</option>
                                    <option value="TeenagerInvalid">Teenager Invalid น้อยกว่า</option>
                                    <option value="TeenagerInvalidOver">Teenager Invalid มากกว่า</option>
                                    <option value="Teenager">Teenager Valid </option>
                                    <option value="AdultInvalid">Adult Invalid น้อยกว่า</option>
                                    <option value="InvalidAge">Invalid age</option>
                                    <option value="Adult">Adult Valid</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button style={styles.button} type="submit">Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        maxWidth: '80%',
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
        backgroundColor: '#315a5a',
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
        backgroundColor: '#315a5a',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '30px',
    fontFamily: 'Arial, sans-serif',
    },
    table: {
        width: '100%',
        marginBottom: '20px',
        
    },
    th: {
        padding: '10px',
        backgroundColor: '#e0e0e0',
        fontSize: '30px',
        fontFamily: 'Arial, sans-serif',
    },
    th_td: {
        padding: '10px',
        textAlign: 'center',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#315a5a',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '30px',
        fontFamily: 'Arial, sans-serif',
    },
};

export default Exercise1_3;
