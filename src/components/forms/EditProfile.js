import { useContext, useEffect, useState } from "react";
import { CLASSES, UOM } from "../../config";
import { AuthContext } from "../../context/auth.context";
import { SelectBirthday } from "./select/SelectBirthday";
import { SelectHeight } from "./select/SelectHeight";
import { SelectUnits } from "./select/SelectUnits";
import { FormTitle } from "./FormTitle";
import { TextInput } from "./input/TextInput";
import { Label } from "./Label";

export const EditProfile = ({ userData }) => {
  const [fields, setFields] = useState({
    first: userData.first,
    last: userData.last,
    email: userData.email,
  });
  const [birthday, setBirthday] = useState({
    day: userData.day,
    month: userData.month,
    year: userData.year,
  });
  const [centimeters, setCentimeters] = useState(userData.height || 0);
  const [uom, setUom] = useState(UOM.IMPERIAL);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // handle fieldValue change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  // de-structure fields for form values
  const { first, last } = fields;

  return (
    <form className={CLASSES.DEFAULT.FORMS}>
      <div className="row">
        <div className="col">
          <FormTitle title="Edit Profile" />
        </div>
      </div>

      <div className="container">
        <div className="row mb-3">
          <div className="col-sm-auto">
            <Label label="Name" />
          </div>
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="First Name" name="first" inputText={true} />
              <TextInput
                for="first"
                type="first"
                name="last"
                id="first"
                value={first}
                onChange={handleFieldChange}
              />
            </span>
          </div>
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="Last Name" name="last" inputText={true} />
              <TextInput
                for="last"
                type="text"
                name="last"
                label="Last Name"
                id="last"
                value={last}
                onChange={handleFieldChange}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <SelectBirthday birthday={birthday} setBirthday={setBirthday} />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <Label label="Height" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-auto mb-2">
            <SelectUnits uom={uom} onChangeUom={handleUomChange} />
          </div>
          <div className="col-sm-auto mb-2">
            <SelectHeight cm={centimeters} setCm={setCentimeters} uom={uom} />
          </div>
        </div>
      </div>
    </form>
  );
};
