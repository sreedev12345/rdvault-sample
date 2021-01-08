import React from 'react';
import {TextField } from '@material-ui/core';
const Form = () => {
    return (
        <div className="container-fluid">
            <form className={"form-class"} noValidate autoComplete="off">
                <div className="data-content">
                    <div className="row">
                        <div className="col-md-12">
                            <TextField id="standard-secondary" label="firstname" color="Success" />
                        </div>
                        <div className="col-md-12">
                            <TextField id="standard-secondary" label="lastname" color="Success" />
                        </div>
                        <div className="col-md-12">
                            <TextField id="standard-secondary" label="email" color="Success" />
                        </div>
                        <div className="col-md-12">
                            <TextField id="standard-secondary" label="mobilenumber" color="Success" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;