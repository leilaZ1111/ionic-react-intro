import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

import './BmiResult.css';

const BmiResult: React.FC<{ result: number }> = (props) => {
  // here we create a new component called BmiResult. It's a functional component that takes one prop: result. The result prop is a number. We specify the type of the prop using the React.FC type. The React.FC type is a generic type that takes an object as an argument. The object specifies the type of the prop. In this case, the object has one property: result. The result prop is a number. The React.FC type returns a React component.
  return (
    <IonCard id="result" color="tertiary">
      <IonCardContent className="ion-text-center">
        <h2>Your Body-Mass-Index</h2>
        <h3>{props.result.toFixed(2)}</h3>
      </IonCardContent>
    </IonCard>
  );
};

export default BmiResult;

// <h2>{props.result}</h2>
// here we use the result prop as the value of the h2 element. The result prop is a number or a string as defined by the React.FC type. The h2 element is a heading element that displays the result of the calculation.
