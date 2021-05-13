import React, {InputHTMLAttributes} from 'react';
import './Input.scss';

export const NeuInput = (props: InputHTMLAttributes<any>) =>
    <input
        className={'input'}
        {...props}
    />