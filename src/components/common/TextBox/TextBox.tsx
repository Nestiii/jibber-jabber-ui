import React, {TextareaHTMLAttributes} from 'react';
import './TextBox.scss';

export const NeuTextBox = (props: TextareaHTMLAttributes<any>) =>
    <textarea className={'text-box'} {...props}/>