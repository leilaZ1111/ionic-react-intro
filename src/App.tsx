import { Redirect, Route } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();

  const weightInputRef = useRef<HTMLIonInputElement>(null); // see the comment at the end for useRef, a react hook
  const heightInputRef = useRef<HTMLIonInputElement>(null); // here we create two ref objects, one for each input. We use the useRef Hook to create the ref objects. We also specify the type of the ref object. In this case, we want to access the value property of the ref object, so we specify the type as HTMLIonInputElement. This is a type that's provided by Ionic React. It's a type that represents an HTML input element. We also initialize the ref objects to null. This is because the ref objects are initially null. We'll assign the ref objects to the inputs later.

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value; // here we use the non-null assertion operator (!) to tell TypeScript that we know that the value is not null or undefined. This is a way to tell TypeScript that we know better than it does. It prevents TypeScript from throwing an error when we try to access the value property of the ref object. If the value is null or undefined, we'll get a runtime error, but we know that it won't be null or undefined because we've already checked for that.

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      return;
    } // here we check if the enteredHeight or enteredWeight is falsy. If either of them is falsy, we return early from the function. This is a way to prevent the function from executing if the user hasn't entered a value for either of the inputs. We also check if the enteredHeight or enteredWeight is less than or equal to 0. If either of them is less than or equal to 0, we return early from the function. This is a way to prevent the function from executing if the user enters a negative value for either of the inputs.

    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight); // here, the + operator converts the string values to numbers. This is a way to tell TypeScript that we know that the values are numbers. It prevents TypeScript from throwing an error when we try to perform a mathematical operation on the values.
    setCalculatedBMI(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Your Height"
                  type="number"
                  ref={heightInputRef}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Your Weight"
                  type="number"
                  ref={weightInputRef}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
          {calculatedBMI && <BmiResult result={calculatedBMI} />}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;

// The IonIcon component is self-closing, so it doesn't need a closing tag.

// useRef is a Hook in React that allows you to create a mutable ref object. Refs are a way to access the properties or the DOM (Document Object Model) elements of a React component directly. You can think of useRef as a way to "remember" values between renders without causing a re-render of the component.
// Here's how you can use useRef:
// 1. Import useRef: You've already imported useRef in your code with import React, { useRef } from 'react';.
// 2. Create a Ref Object: const myRef = useRef(initialValue) or const weightInputRef = useRef<HTMLIonInputElement>(null); => initialValue (optional): You can provide an initial value if you want. This is particularly useful for initializing the ref to a DOM element, as in the case of useRef(null).
// 3. Accessing the Current Value: You can access the current value of the ref using myRef.current. This is a property of the ref object that holds the current value. You can also assign new values to it.

// ////// <BmiControls onCalculate={calculateBMI} onReset={resetInputs} /> ///////// here we use the BmiControls component. We pass the calculateBMI function as the onCalculate prop and the resetInputs function as the onReset prop. Both props are functions that don't take any argument and don't return anything.

// ////// {calculatedBMI && ( <IonRow> ... </IonRow> ////// here we use the && operator to conditionally render the card. The && operator is a way to conditionally render elements in React. It's a way to say that if the condition is true, render the element. If the condition is false, don't render the element. In this case, we're saying that if calculatedBMI is truthy, render the card. If calculatedBMI is falsy, don't render the card. This is a way to prevent the card from being rendered when the user hasn't calculated the BMI yet.
