import React, { useState } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import HintPopup from '../components/HintPopup';

const Exercise1_2 = () => {
    const location = useLocation();
    const { score: previousScore = 0 } = location.state || {};
    const [childValues, setChildValues] = useState(['', '', '']);
    const [teenValues, setTeenValues] = useState(['', '', '']);
    const [adultValues, setAdultValues] = useState(['', '', '']);
    const totalScore1 = parseInt(localStorage.getItem('totalScore1')) || 0;
    // const [score, setScore] = useState(previousScore); // ตั้งคะแนนเริ่มต้น
  
    const navigate = useNavigate();
    const hints1_2 = [
      "คำใบ้ 1: การตรวจสอบค่าขอบเขตบนและล่างของตัวเลขควรทำอย่างไร?",
      "คำใบ้ 2: คุณสามารถใช้คำสั่งอะไรในการตรวจสอบค่าที่น้อยที่สุดและมากที่สุดใน C?",
      "คำใบ้ 3: ค่าที่ไม่อยู่ในขอบเขตที่กำหนดจะถือเป็นค่าผิดพลาดหรือไม่?"
    ];    
    const handleInputChange = (setter, values, index, value) => {
      const newValues = [...values];
      newValues[index] = value;
      setter(newValues);
    };

  
  const validateInput = (value, group, index) => {
    const age = parseInt(value);
  
    if (group === 'child') {
      // เช็คเงื่อนไขสำหรับกลุ่มเด็กตาม index ที่แตกต่างกัน
      if (index === 0) {
        // เช็คเงื่อนไขสำหรับ input 1 (index 0)
        if (age < 0 ) {
          return true; // เงื่อนไขอายุ < 0 ถือว่าถูกต้อง
        } else {
          return false;
        }
      } else if (index === 1) {
        // เช็คเงื่อนไขสำหรับ input 2 (index 1)
        if (age >= 1 && age <= 12) {
          return true; // เงื่อนไขอายุ 1 - 12 ถือว่าถูกต้อง
        } else {
          return false;
        }
      } else if (index === 2) {
        // เช็คเงื่อนไขสำหรับ input 3 (index 2)
        if (age > 12) {
          return true; // เงื่อนไขอายุ > 12 ถือว่าถูกต้อง
        } else {
          return false;
        }
      }
    } 
    // คุณสามารถเขียนเงื่อนไขลักษณะนี้สำหรับกลุ่มวัยรุ่น (teen) และผู้ใหญ่ (adult) ต่อได้เช่นกัน
    else if (group === 'teen') {
        // เช็คเงื่อนไขสำหรับกลุ่มเด็กตาม index ที่แตกต่างกัน
        if (index === 0) {
            // เช็คเงื่อนไขสำหรับ input 1 (index 0)
            if (age < 13) {
            return true; // เงื่อนไขอายุ < 0 ถือว่าถูกต้อง
            } else {
            return false;
            }
        } else if (index === 1) {
            // เช็คเงื่อนไขสำหรับ input 2 (index 1)
            if (age >= 13 && age <= 19) {
            return true; // เงื่อนไขอายุ 1 - 12 ถือว่าถูกต้อง
            } else {
            return false;
            }
        } else if (index === 2) {
            // เช็คเงื่อนไขสำหรับ input 3 (index 2)
            if (age >= 20) {
            return true; // เงื่อนไขอายุ > 20 ถือว่าถูกต้อง
            } else {
            return false;
            }
        }
    }
    // กลุ่มผู้ใหญ่ (adult)
    else if (group === 'adult') {
        // เช็คเงื่อนไขสำหรับกลุ่มเด็กตาม index ที่แตกต่างกัน
        if (index === 0) {
            // เช็คเงื่อนไขสำหรับ input 1 (index 0)
            if (age < 20) {
            return true; // เงื่อนไขอายุ < 0 ถือว่าถูกต้อง
            } else {
            return false;
            }
        } else if (index === 1) {
            // เช็คเงื่อนไขสำหรับ input 2 (index 1)
            if (age >= 20 && age <= 100) {
            return true; // เงื่อนไขอายุ 1 - 12 ถือว่าถูกต้อง
            } else {
            return false;
            }
        } else if (index === 2) {
            // เช็คเงื่อนไขสำหรับ input 3 (index 2)
            if (age > 100) {
            return true; // เงื่อนไขอายุ > 20 ถือว่าถูกต้อง
            } else {
            return false;
            }
        }
    }
  
    return false; // ค่าอื่น ๆ ถือว่าไม่ถูกต้อง
  };
  
  const handleSubmit = () => {
    const incorrectAnswers = []; // เก็บคำตอบที่ผิดพร้อมคำเฉลย
    const correctAnswers = [];   // เก็บคำตอบที่ถูกต้อง
  
    const checkAnswers = (group, values) => {
      return values.map((value, index) => {
        const isCorrect = validateInput(value, group, index);
        if (!isCorrect) {
          incorrectAnswers.push({
            group: group,
            index: index + 1,
            userAnswer: value,
            correctAnswer: getCorrectAnswer(group, index) // ดึงคำตอบที่ถูกต้อง
          });
        } else {
          correctAnswers.push({
            group: group,
            index: index + 1,
            userAnswer: value,
          });
        }
        return isCorrect;
      }).filter(Boolean).length * 2;
    };
  
    const getCorrectAnswer = (group, index) => {
      // ระบุคำตอบที่ถูกต้องสำหรับแต่ละกลุ่มและ index
      const correctAnswers = {
        child: ['< 0', '1-12', '> 12'],
        teen: ['< 13', '13-19', '>= 20'],
        adult: ['< 20', '20-100', '> 100']
      };
      return correctAnswers[group][index];
    };
  
    const childScore = checkAnswers('child', childValues);
    const teenScore = checkAnswers('teen', teenValues);
    const adultScore = checkAnswers('adult', adultValues);
  
    const sumScore = childScore + teenScore + adultScore;
    const updatedScore = totalScore1 + sumScore;
    localStorage.setItem('totalScore1', updatedScore);
  
    // ส่งคำตอบทั้งที่ถูกและผิดไปที่ ResultPage
    navigate('/result', { state: { score: sumScore, correctAnswers, incorrectAnswers, nextPage: '/Exercise1.3' } });
  };
  
  

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Software Testing Training</h1>
        <div style={styles.scoreBox}>Score: {totalScore1}</div> {/* แสดงคะแนนจากข้อ 1.1 */}
      </div>
      <h3  style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>ข้อ 1.2 Equivalence Partitioning</h3>
      <div style={styles.question}>
      <h3 style={{fontSize: '40px',fontFamily: 'Arial, sans-serif'}}>Requirement</h3>
        <p>
          โปรแกรมหนึ่งรับค่าอินพุตเป็นอายุของบุคคลและจะแยกบุคคลออกเป็น 3 กลุ่มตามอายุ:
          <br />
          1. Child (0 - 12 ปี)<br />
          2. Teenager (13 - 19 ปี)<br />
          3. Adult (20 ปีขึ้นไป)<br />
          โปรแกรมนี้รับค่าอายุเป็นจำนวนเต็มระหว่าง 0 ถึง 100 ปี <br />
          หากค่าไม่อยู่ในช่วงนี้จะถือว่าเป็นค่าไม่ถูกต้อง (Invalid age).
        </p>
      </div>
      <div style={styles.headerContainer}>
            <h1 style={styles.description}> คำอธิบาย : ให้เติมค่าที่คิดว่าเป็น Invalid Valid แล้วกด Submit </h1>
            <HintPopup hints={hints1_2} />
          </div>
      <div style={styles.inputContainer}>
        <div style={styles.labelRow}>
          <span>Invalid Input</span>
          <span>Valid Input</span>
          <span>Invalid Input</span>
        </div>

        {[ 
          { label: 'Child', values: childValues, setter: setChildValues },
          { label: 'Teenager', values: teenValues, setter: setTeenValues },
          { label: 'Adult', values: adultValues, setter: setAdultValues },
        ].map((group, groupIndex) => (
          <div key={groupIndex} style={styles.row}>
            <div style={styles.label}>{group.label}</div>
            <div style={styles.inputGroup}>
              {[0, 1, 2].map((index) => (
                <div key={index} style={styles.inputWrapper}>
                  <input
                    type="number"
                    placeholder={`Input ${index + 1}`}
                    value={group.values[index]}
                    onChange={(e) =>
                      handleInputChange(group.setter, group.values, index, e.target.value)
                    }
                    style={styles.input}
                  />
                </div>
              ))}
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
    maxWidth: '80%',
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
    fontSize: '30px',
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
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    cursor: 'pointer',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
    
  },
  inputContainer: {
    backgroundColor: '#0a3d3d',
    padding: '10px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '10px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    width: '80px',
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    width: '80%',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px 0px 0px 50px'
  },
  input: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '150px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '25px',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Exercise1_2;
