import React, { useState, useImperativeHandle } from "react";

function RefDeneme(props) {
  console.log("proops", props);
  const [primitiveType, updatePrimitiveType] = useState("Mehmet");
  const [referenceType, updateReferenceType] = useState(props.options);

  useImperativeHandle(props.testRef, () => ({
    primitiveType,
    updatePrimitiveType,
    referenceType,
    updateReferenceType,
    updateReferenceTypeInComponent
  }));

  const updateReferenceTypeInComponent = newOption => {
    const newArray = [...referenceType, newOption];
    updateReferenceType(newArray)
  };

  return (
    <div>
      <h1>PrimitiveType - {primitiveType} </h1>
      <hr />
      <ul>
        {referenceType.map(option => (
          <li key={option.value}>{option.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default RefDeneme;


