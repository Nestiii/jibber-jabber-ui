import React from 'react';
import './Button.scss';
import {Button} from 'bisk';
import {ButtonProps} from 'bisk/dist/types/Button';
import loader from '../../../assets/loader.svg';

export const NeuButton = (props: ButtonProps) =>
    <Button
        className={'button'}
        loadingComponent={<img src={loader} className={'loader'} alt={'Loading'}/>}
        {...props}
    />