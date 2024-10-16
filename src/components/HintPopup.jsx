import React, { useState } from 'react';

const HintPopup = ({ hints }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setCurrentHint(0);  // Reset to first hint
  };

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const previousHint = () => {
    if (currentHint > 0) {
      setCurrentHint(currentHint - 1);
    }
  };

  return (
    <div>
      <button onClick={togglePopup} style={styles.hintButton}>คำใบ้</button>
      {isOpen && (
  <div style={styles.popup}>
    <div style={styles.popupContent}>
      <h3 style={styles.popupHeader}>คำใบ้ {currentHint + 1}</h3>
      <p style={styles.popupText}>{hints[currentHint]}</p>
      <div style={styles.hintNavigation}>
        <button 
          onClick={previousHint} 
          style={currentHint === 0 ? styles.disabledButton : styles.button}
          disabled={currentHint === 0}
        >
          ก่อนหน้า
        </button>
        <button 
          onClick={nextHint} 
          style={currentHint === hints.length - 1 ? styles.disabledButton : styles.button}
          disabled={currentHint === hints.length - 1}
        >
          ถัดไป
        </button>
      </div>
      <button onClick={togglePopup} style={{ ...styles.button, marginTop: '20px' }}>ปิด</button>
    </div>
  </div>
)}

    </div>
  );
};

const styles = {
    hintButton: {
      backgroundColor: '#0a3d3d',
      width: '160px',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '30px',
      fontFamily: 'Arial, sans-serif',
    },
    popup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      maxWidth: '600px',
      width: '100%',
    },
    popupContent: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    popupHeader: {
      fontSize: '30px',
      marginBottom: '10px',
      color: '#0a3d3d',
    },
    popupText: {
      fontSize: '25px',
      marginBottom: '20px',
      color: '#333',
    },
    hintNavigation: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    button: {
      backgroundColor: '#0a3d3d',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '25px',
      fontFamily: 'Arial, sans-serif',
    },
    disabledButton: {
      backgroundColor: '#c0c0c0',
      color: '#666',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      cursor: 'not-allowed',
    }
  };
  

export default HintPopup;
