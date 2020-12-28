import React, { useState } from 'react';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import './picker.css'




function Datepicker() {
    const [dateRange, setdateRange] = useState({
        startDate: moment(),
        endDate: moment()
    });
    const [focus, setFocus] = useState("startDate");


    const { startDate, endDate } = dateRange;

    const handleOnDateChange = (startDate, endDate) => {
        setdateRange(startDate, endDate);
    }



const onFocusChange = (focus)=>{
   if(focus) {
    setFocus(focus)
   } else {
       setFocus("startDate")
   }
}

    return (
        <div>
            <DateRangePicker
                startDatePlaceholderText="Start"
                startDate={startDate}
                onDatesChange={handleOnDateChange}
                endDatePlaceholderText="End"
                endDate={endDate}
                reopenPickerOnClearDate={true}
                // keepOpenOnDateSelect={true}
                readOnly={false}
                // displayFormat={"DD/MMMM/YYYY"}
                //   numberOfMonths={1}
                showClearDates={true}
                focusedInput={focus}
                onFocusChange={onFocusChange}
                startDateId="startDateMookh"
                endDateId="endDateMookh"
                minimumNights={0}
            />
        </div>
    );
}

export default Datepicker;

{/* <DateRangePicker
startDateId="startDate"
endDateId="endDate"
startDate={this.state.startDate}
endDate={this.state.endDate}
onDatesChange={this.onDatesChange}
focusedInput={this.state.focusedInput}
onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
/> */}