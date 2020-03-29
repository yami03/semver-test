import { storiesOf } from '@storybook/react';
import React from 'react';
import { Sample } from './Sample';

storiesOf('Sample', module)
  .add('text=Hello?', () => (
    <Sample text="Hello?"/>
  ))
  .add('text=World?', () => (
    <Sample text="World?"/>
  ));