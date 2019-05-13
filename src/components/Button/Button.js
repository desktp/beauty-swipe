import React from 'react';

import s from './Button.module.css';

const Button = ({ text, onClick = () => {} }) => <button onClick={onClick} className={`${s.button} ${s[text]}`} />;

export default Button;
