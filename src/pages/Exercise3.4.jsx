import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Exercise2_3 = () => {
    const location = useLocation();
    const { score: previousScore = 0 } = location.state || {};
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [input7, setInput7] = useState('');
    const [input8, setInput8] = useState('');
    const [input9, setInput9] = useState('');
    const [input10, setInput10] = useState('');
    const [input11, setInput11] = useState('');
    const [input12, setInput12] = useState('');
    const [input13, setInput13] = useState('');
    const [input14, setInput14] = useState('');
    const [input15, setInput15] = useState('');
    const [input16, setInput16] = useState('');
    const [input17, setInput17] = useState('');
    const [input18, setInput18] = useState('');
    const [input19, setInput19] = useState('');
    const [input20, setInput20] = useState('');
    const [input21, setInput21] = useState('');

    const [expectedResult1,setExpectedResult1] = useState('');
    const [expectedResult2, setExpectedResult2] = useState('');
    const [expectedResult3, setExpectedResult3] = useState('');
    const [expectedResult4, setExpectedResult4] = useState('');
    const [expectedResult5, setExpectedResult5] = useState('');
    const [expectedResult6, setExpectedResult6] = useState('');
    const [expectedResult7, setExpectedResult7] = useState('');
    const [score, setScore] = useState(0);
    const [hint, setHint] = useState('');
    const navigate = useNavigate();
    const totalScore3 = parseInt(localStorage.getItem('totalScore3')) || 0;


    const expectedOptions = [
        '0-0-0-0-0-0-0',
        '1-2-3-4-15', 
        '1-2-3-5-6-15', 
        '1-2-3-5-7-15', 
        '1-2-8-9-15', 
        '1-2-8-10-11-15', 
        '1-2-8-10-12-13-15', 
        '1-2-8-10-12-14-15'
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        
        let sumScore = 0;
        const incorrect = [];
        const correct = [];
        
        // ตรวจสอบว่าข้อมูลถูกกรอกครบหรือไม่
        if (
            !input1 || !input2 || !input3 || !expectedResult1 ||
            !input4 || !input5 || !input6 || !expectedResult2 ||
            !input7 || !input8 || !input9 || !expectedResult3 ||
            !input10 || !input11 || !input12 || !expectedResult4 ||
            !input13 || !input14 || !input15 || !expectedResult5 ||
            !input16 || !input17 || !input18 || !expectedResult6 ||
            !input19 || !input20 || !input21 || !expectedResult7
        ) {
            setHint('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
    
        const expectedResults = [
            expectedResult1, expectedResult2, expectedResult3, expectedResult4,
            expectedResult5, expectedResult6, expectedResult7
        ];
    
        const uniqueResults = new Set(expectedResults);
        if (uniqueResults.size !== expectedResults.length || expectedResults.includes('0-0-0-0-0-0-0')) {
            setHint('Expected Results ห้ามซ้ำกันหรือเลือก 0-0-0-0-0-0-0');
            return;
        }
    
        const paths = {
            row1: [parseInt(input1), parseInt(input2), parseInt(input3)],
            row2: [parseInt(input4), parseInt(input5), parseInt(input6)],
            row3: [parseInt(input7), parseInt(input8), parseInt(input9)],
            row4: [parseInt(input10), parseInt(input11), parseInt(input12)],
            row5: [parseInt(input13), parseInt(input14), parseInt(input15)],
            row6: [parseInt(input16), parseInt(input17), parseInt(input18)],
            row7: [parseInt(input19), parseInt(input20), parseInt(input21)]
        };
    
        const correctPaths = [
            '1-2-3-4-15', '1-2-3-5-6-15', '1-2-3-5-7-15', 
            '1-2-8-9-15', '1-2-8-10-11-15', '1-2-8-10-12-13-15', 
            '1-2-8-10-12-14-15'
        ];
    
        const conditions = [
            (A, B, C) => A > B && B > C,
            (A, B, C) => A > B && B <= C,
            (A, B, C) => A > B && B <= C && C < A,
            (A, B, C) => A === B && B === C,
            (A, B, C) => A === B && C !== A,
            (A, B, C) => A < C && B < C,
            () => true // แถวสุดท้ายไม่มีเงื่อนไขเฉพาะ
        ];
    
        // ตรวจสอบและอัปเดตคะแนน
        Object.entries(paths).forEach(([key, [A, B, C]], index) => {
            if (conditions[index](A, B, C) && expectedResults[index] === correctPaths[index]) {
                sumScore += 2;
                correct.push({ question: key, userAnswer: `${A}-${B}-${C}`, correctAnswer: correctPaths[index] });
            } else {
                incorrect.push({ question: key, userAnswer: `${A}-${B}-${C}`, correctAnswer: correctPaths[index] });
            }
        });
    
        setScore(sumScore);
    
        if (sumScore < 14) {
            setHint('ลองตรวจสอบผลลัพธ์ที่คาดหวังใหม่อีกครั้ง');
        } else {
            setHint('คุณตอบถูกทั้งหมดแล้ว!');
        }
    
        const updatedScore = totalScore3 + sumScore;
        localStorage.setItem('totalScore3', updatedScore);
        localStorage.setItem('incorrectAnswers3', JSON.stringify(incorrect));
        localStorage.setItem('correctAnswers3', JSON.stringify(correct));
    
        navigate('/result', {
            state: {
                score: sumScore,
                incorrectAnswers: incorrect,
                correctAnswers: correct,
                nextPage: '/Exercise3.5',
                correctPaths: correctPaths,
                userPaths: paths
            }
        });
    };
    
    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Software Testing Training</h1>
                <div style={styles.scoreBox}>Score: {totalScore3}</div> 
            </div>
            <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 3.4 Basis Path Testing</h3>
            <div style={styles.question}>
                <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
                <p>
                ให้โปรแกรมรับอินพุตเป็นจำนวนเต็ม 3 ค่า a, b, และ c <br/>
                และทำการตรวจสอบและคำนวณผลลัพธ์ตามเงื่อนไขที่ซับซ้อนขึ้นดังนี้: <br/>
                1. ถ้า a &gt; b และ b &gt; c ให้คำนวณผลลัพธ์เป็น a + b + c<br/>
                2. ถ้า a &gt; b และ c &gt; a ให้คำนวณผลลัพธ์เป็น a * b * c<br/>
                3. ถ้า a &gt; b และไม่เข้า 2 เงื่อนไขข้างบน ให้คำนวณผลลัพธ์เป็น a - b - c<br/>
                4. ถ้า a == b และ b == c ให้คำนวณผลลัพธ์เป็น a * 2<br/>
                5. ถ้า a == b และ c != a ให้คำนวณผลลัพธ์เป็น (a + b) * c<br/>
                6. ถ้า a &lt; c และ b &lt; c ให้คำนวณผลลัพธ์เป็น a - b + c<br/>
                7. หากไม่ตรงกับเงื่อนไขใด ๆ ข้างต้น ให้คำนวณผลลัพธ์เป็น a + b * c<br/>
            </p>
            </div>
            <div style={styles.headerContainer}>
                <h1 style={styles.description}> คำอธิบาย : ให้ตอบค่าที่คิดว่า Testcase นั้นจะวิ่งไป แล้วกด Submit</h1>
                <button style={styles.hintButton}>คำใบ้</button>
            </div>
            <form onSubmit={handleSubmit}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Testcase</th>
                            <th style={styles.th}>Input A</th>
                            <th style={styles.th}>Input b</th>
                            <th style={styles.th}>Input c</th>
                            <th style={styles.th}>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.th_td}>TC 01</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input1} 
                                    onChange={(e) => setInput1(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input2} 
                                    onChange={(e) => setInput2(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input3} 
                                    onChange={(e) => setInput3(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 02</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input4} 
                                    onChange={(e) => setInput4(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input5} 
                                    onChange={(e) => setInput5(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input6} 
                                    onChange={(e) => setInput6(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 03</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input7} 
                                    onChange={(e) => setInput7(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input8} 
                                    onChange={(e) => setInput8(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input9} 
                                    onChange={(e) => setInput9(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 04</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input10} 
                                    onChange={(e) => setInput10(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input11} 
                                    onChange={(e) => setInput11(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input12} 
                                    onChange={(e) => setInput12(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 05</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input13} 
                                    onChange={(e) => setInput13(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input14} 
                                    onChange={(e) => setInput14(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input15} 
                                    onChange={(e) => setInput15(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 06</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input16} 
                                    onChange={(e) => setInput16(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input17} 
                                    onChange={(e) => setInput17(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input18} 
                                    onChange={(e) => setInput18(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={styles.th_td}>TC 07</td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input19} 
                                    onChange={(e) => setInput19(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input20} 
                                    onChange={(e) => setInput20(e.target.value)} 
                                    placeholder=""
                                    style={styles.input}
                                />
                            </td>
                            <td style={styles.th_td}>
                                <input 
                                    type="number" 
                                    value={input21} 
                                    onChange={(e) => setInput21(e.target.value)} 
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
                                        {expectedOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>

                <button style={styles.submitBtn} onClick={handleSubmit}>Submit</button>
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
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '18px',
        color: ' #FFFFFF',
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
