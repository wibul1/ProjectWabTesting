import React from 'react';
import { useNavigate } from 'react-router-dom';

const Box = ({ title, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);  // ใช้ navigate เพื่อไปยัง route ที่ระบุ
  };

  return (
    <div style={styles.box} onClick={handleClick}>
      {title}
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: '#0a3d3d',
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',  // ทำให้กล่องสามารถคลิกได้
    textAlign: 'center',
  },
};

export default Box;
