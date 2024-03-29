import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React from 'react';

const InptutControl: React.FC<{
  selectedValue: 'mkg' | 'ftlbs';
  onSelectedValue: (value: 'mkg' | 'ftlbs') => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onSelectedValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InptutControl;
