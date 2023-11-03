import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const BmiControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = (props) => {
  // here we create a new component called BmiControls. It's a functional component that takes two props: onCalculate and onReset. Both props are functions that don't take any arguments and don't return anything. We specify the type of the props using the React.FC type. The React.FC type is a generic type that takes an object as an argument. The object specifies the type of the props. In this case, the object has two properties: onCalculate and onReset. The onCalculate prop is a function that will be executed when the user clicks the Calculate button. The onReset prop is a function that will be executed when the user clicks the Reset button. Both properties are functions that don't take any arguments and don't return anything. The React.FC type returns a React component.
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonButton onClick={props.onCalculate}>
          <IonIcon slot="start" icon={calculatorOutline} />
          Calculate
        </IonButton>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonButton onClick={props.onReset}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;

// <IonButton onClick={props.onCalculate}>
// here we use the onCalculate prop as the onClick handler for the Calculate button. The onClick handler is a function that will be executed when the user clicks the button. The function is passed as the value of the onClick prop. The function is executed when the user clicks the button. The function doesn't take any arguments and doesn't return anything.

// <IonButton onClick={props.onReset}>
// here we use the onReset prop as the onClick handler for the Reset button. The onClick handler is a function that will be executed when the user clicks the button. The function is passed as the value of the onClick prop. The function is executed when the user clicks the button. The function doesn't take any arguments and doesn't return anything.
