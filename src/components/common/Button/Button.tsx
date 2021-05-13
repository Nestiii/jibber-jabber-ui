import React from 'react';
import './Button.scss';
import {Button} from 'bisk';
import {IButtonProps} from 'bisk/dist/types/Button';
import loader from '../../../assets/loader.svg';

export const NeuButton = (props: IButtonProps) =>
    <Button
        className={'button'}
        loadingComponent={<img src={loader} className={'loader'} alt={'Loading'}/>}
        {...props}
    />