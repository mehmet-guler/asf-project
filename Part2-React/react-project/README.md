# Generic Form Component
### What is the purpose
Creating the form component once and using it as a standard everywhere.Checking from one place in case of an error or bug.This creates a sustainable, edible code.
In addition, the developers who will use the form will be easier to use.Developers define necessary props to inputs and pass these inputs as children in form component.And, developers sends the form's work as its method.Also can shape the form as desired

### How to Use ? 
```javascript
import Form from './Form';

const handleSubmit = ({ name, subject, message }) => {
  const newEntry = {
    id: new Date().getTime() + Math.random(),
    name: name,
    subject: subject,
    message: message,
    date: new Date().getTime()
  };
  onAddNewEntry(newEntry);
};
    
<Form doIt={handleSubmit} showErrorLabel={true} showStatusAlert={true} formRef={formRef}>
    <Input
        type="input"
        name="name"
        validate={{
            minLength: { value: 3, message: "This field must have a minimum of 3 characters" },
            maxLength: { value: 30, message: "This field must have a maxium of 30 characters" },
              required: true
         }}
          placeholder="Name..."
      />
    
     <Input
        type="input"
        name="subject"
        validate={{
             customValidate: { value: (inputValue) => inputValue === "info", message: "This fields value must be a info " },
            required: true
        }}
        placeholder="Surname..."
    />
    
    <Input
        type="textarea"
        name="message"
        validate={{
            minLength: { value: 15, message: "This field must have a minimum of 15 characters!" },
             required: { value: true, message: "Message field must be a required!" }
            }}
        rows="3"
        cols="50"
        placeholder="Your message..."
    />
    <button type="submit" className="button green btn-block mb-2" >SEND</button>
 </Form>
```

> If we want to add a some designs
```javascript

<Form doIt={handleSubmit} showErrorLabel={true} showStatusAlert={true} formRef={formRef}>
<div className="form-group">
    <label>Name</label>
    <Input
        type="input"
        name="name"
        validate={{
            minLength: { value: 3, message: "This field must have a minimum of 3 characters" },
            maxLength: { value: 30, message: "This field must have a maxium of 30 characters" },
              required: true
         }}
          placeholder="Name..."
      />
</div>
<div className="form-group">
    <label>Subject</label>
     <Input
        type="input"
        name="subject"
        validate={{
             customValidate: { value: (inputValue) => inputValue === "info", message: "This fields value must be a info " },
            required: true
        }}
        placeholder="Surname..."
    />
</div> 
<div className="form-group">
    <label>Message</label>
    <Input
        type="textarea"
        name="message"
        validate={{
            minLength: { value: 15, message: "This field must have a minimum of 15 characters!" },
             required: { value: true, message: "Message field must be a required!" }
            }}
        rows="3"
        cols="50"
        placeholder="Your message..."
    />
</div>
    <button type="submit" className="button green btn-block mb-2" >SEND</button>
 </Form>

```

### Form Props
- classname : form css class 
(string - optional)
- doIt : what form will do   
(function - required)
- showErrorLabel : show error label under the inputs
(boolean - optional)
- showStatusAlert : show all errors or all values after submitting
(boolean - optional)

### Input Props
- className : input css class
(string - optional)
- type : for input type
(string - required)
( select , input , textarea)
- name : for input name ( must be unique)
(string - required)
- validate : for input validation
(object - optional) If you dont set validate,the input remains outside the validation
- placeholder : input placeholder
(string - optional)
- rows : textarea rows count
(string - optional)
- cols : textarea input columns count
(string - optional)
- options : select input options
(array - optional) // if you use select but dont send options,any option cant show in page,because default values is []


## Validation
### Standart Validations
- required : field is required
- min  : field min value
- max  : field max value
- minLength : field min characters length
- maxLength : field max characters length
- customValidate : our custom validation methods

### Default Validation Messages 
- required = "This field is required!";
- min = "This field has a minimum(integer) value!";
- max = "This field has a maximum(integer) value!";
- minLength= "This field has a minimum length value!";
- maxLength = "This field has a maximum length value!";
- customValidate = "This field is has custom validate!";

### Validation Using Examples
```javascript
// If we use validate like this,the error messages are come default validation messages
<Input 
type="input" 
className="custom-form-control" 
name="username" 
placeholder="Username ..."
validate={{ minLength:5 }} />

//If we want give a our validation message, use like this ;
<Input 
type="input" 
className="custom-form-control" 
name="username" 
placeholder="Username ..."
validate={{ minLength:{value:5 ,message:"Our Custom Validation Message" }} />

// Standart validation examples
// We can define multiple validation
// Whichever validation is written first, the error message comes from it
<Input 
type="input" 
className="custom-form-control" 
name="username" 
placeholder="Username ..."
validate={{ 
required:true, // required:{value:true,message:"Custom required message}"
minLength:{value:5 ,message:"Our Custom Validation Message"},
maxLength:{value:15,message:"Custom max length message"}
}} />

// TextArea input
<Input 
type="textarea" 
name="description" 
placeholder="Description ..."
validate={{ 
required:true, // required:{value:true,message:"Custom required message}"
minLength:{value:5 ,message:"Our Custom Validation Message"},
maxLength:{value:15,message:"Custom max length message"}
}}
rows="4"
cols="5"
/>
// Select input
<Input 
type="select" 
name="programmingLanguage" 
placeholder="Programming Language ..."
validate={{ 
required:true, // required:{value:true,message:"Custom required message}"
}}
options:{
    [
        {value:"",label:"Please Select a Programming Language"},
        {value:"js",label:"Javascript"},
        {value:"java",label:"Java"},
        {value:"csharp",label:"C#"},
        {value:"phyton",label:"Phyton"},
    ]
}
/>

// Custom Validation Example
// The important point is,'customValidate' key

<Input 
type="input" 
className="custom-form-control" 
name="username" 
placeholder="Username ..."
validate={{ 
customValidate:(inputValue)=>inputValue === "some stuff",
minLength:5
}} />

<Input 
type="input" 
className="custom-form-control" 
name="username" 
placeholder="Username ..."
validate={{ 
customValidate:{value:(inputValue)=>inputValue === "some stuff",message:"Custom Validation Error Message"},
minLength:5
}} />
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
