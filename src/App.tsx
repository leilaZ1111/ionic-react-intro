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
  IonAlert,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InptutControl from './components/inputControls';

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
  const [calculatedBMI, setCalculatedBMI] = useState<number>(); // see (1)
  const [error, setError] = useState<string>(); //  see (2)
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg'); // see (3)

  const weightInputRef = useRef<HTMLIonInputElement>(null); // see (4) the comment at the end for useRef, a react hook
  const heightInputRef = useRef<HTMLIonInputElement>(null); // see (5)

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value; // here we use the non-null assertion operator (!) to tell TypeScript that we know that the value is not null or undefined. This is a way to tell TypeScript that we know better than it does. It prevents TypeScript from throwing an error when we try to access the value property of the ref object. If the value is null or undefined, we'll get a runtime error, but we know that it won't be null or undefined because we've already checked for that.

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError('Please enter a valid (non-negative) input number.');
      return;
    } // here we check if the enteredHeight or enteredWeight is falsy. If either of them is falsy, we return early from the function. This is a way to prevent the function from executing if the user hasn't entered a value for either of the inputs. We also check if the enteredHeight or enteredWeight is less than or equal to 0. If either of them is less than or equal to 0, we return early from the function. This is a way to prevent the function from executing if the user enters a negative value for either of the inputs.

    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight); // here, the + operator converts the string values to numbers. This is a way to tell TypeScript that we know that the values are numbers. It prevents TypeScript from throwing an error when we try to perform a mathematical operation on the values.
    setCalculatedBMI(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Ok', handler: (clearError) => {} }]}
      />
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
                <InptutControl
                  selectedValue={calcUnits}
                  onSelectedValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
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
    </React.Fragment>
  );
};

export default App;

// The IonIcon component is self-closing, so it doesn't need a closing tag.

//  (1)  here we use the useState Hook to create a state variable called calculatedBMI. The state variable is initialized to undefined. We also specify the type of the state variable. In this case, we want the state variable to be a number, so we specify the type as number. We use the useState Hook to create the state variable. The useState Hook returns an array with two elements. The first element is the state variable. The second element is a function that we can use to update the state variable. We use array destructuring to assign the elements of the array to the calculatedBMI variable and the setCalculatedBMI function.

//  (2)  here we use the useState Hook to create a state variable called error. The state variable is initialized to undefined. We also specify the type of the state variable. In this case, we want the state variable to be a string, so we specify the type as string. We use the useState Hook to create the state variable. The useState Hook returns an array with two elements. The first element is the state variable. The second element is a function that we can use to update the state variable. We use array destructuring to assign the elements of the array to the error variable and the setError function.

//  (3)

// (4)  useRef is a Hook in React that allows you to create a mutable ref object. Refs are a way to access the properties or the DOM (Document Object Model) elements of a React component directly. You can think of useRef as a way to "remember" values between renders without causing a re-render of the component.
// Here's how you can use useRef:
// 1. Import useRef: You've already imported useRef in your code with import React, { useRef } from 'react';.
// 2. Create a Ref Object: const myRef = useRef(initialValue) or const weightInputRef = useRef<HTMLIonInputElement>(null); => initialValue (optional): You can provide an initial value if you want. This is particularly useful for initializing the ref to a DOM element, as in the case of useRef(null).
// 3. Accessing the Current Value: You can access the current value of the ref using myRef.current. This is a property of the ref object that holds the current value. You can also assign new values to it.

// (5)

// the <React.Fragment> element is a way to group elements without a parent element. It's a way to group elements without adding an extra node to the DOM (Document Object Model). It's a react requirement that you can't return multiple elements from a component. You can only return one root element. The <React.Fragment> element is a way to return multiple elements without adding an extra node to the DOM. Here it is to group the <IonAlert> element and the <IonApp> element. The <IonAlert> element is a component that displays an alert. The <IonApp> element is the root element of the app.

// ////// <BmiControls onCalculate={calculateBMI} onReset={resetInputs} /> ///////// here we use the BmiControls component. We pass the calculateBMI function as the onCalculate prop and the resetInputs function as the onReset prop. Both props are functions that don't take any argument and don't return anything.

// ////// {calculatedBMI && ( <IonRow> ... </IonRow> ////// here we use the && operator to conditionally render the card. The && operator is a way to conditionally render elements in React. It's a way to say that if the condition is true, render the element. If the condition is false, don't render the element. In this case, we're saying that if calculatedBMI is truthy, render the card. If calculatedBMI is falsy, don't render the card. This is a way to prevent the card from being rendered when the user hasn't calculated the BMI yet. The card is only rendered when the user has calculated the BMI.
