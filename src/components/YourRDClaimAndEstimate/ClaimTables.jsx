import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const ClaimTables = ({
  NongrantManualData,
  setNongrantManualData,
  GrantManualData,
  setGrantManualData,
  RdTypes,
  toggleValue,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [on_non_grant_allocation, setOn_non_grant_allocation] = useState(0);
  const [grant_funded_allocation, setGrant_funded_allocation] = useState(0);
  const [type_of_rd_id, setType_of_rd_id] = useState(null);
  const [dropDownDisability, setDropDownDisability] = useState(true);

  const nonGrantAmount = parseInt(amount * (on_non_grant_allocation / 100));
  const grantAmount = parseInt(amount * (grant_funded_allocation / 100));

  const setSecondSliderPercentage = (percentageOne, percentageTwo) => {
    const remainingPercentage = 100 - percentageOne;
    if (percentageTwo < remainingPercentage) {
      return percentageTwo;
    }
    return remainingPercentage;
  };

  useEffect(() => {
    if (name !== '' && amount !== 0) {
      setDropDownDisability(false);
    }
  }, [name, amount]);

  useEffect(()=>{
    if(GrantManualData.length !== 0 && toggleValue === false){
      GrantManualData.forEach((item,index)=>{
           if(item.id == index )
           GrantManualData[index].grant_funded_allocation = 0 
        })
    }
  },[toggleValue]);
  useEffect(()=>{
    if(name !=='' && amount !== 0 && type_of_rd_id !== null){
      const data = {
        id: GrantManualData.length,
        name: name,
        amount: isNaN(parseInt(amount)) ? 0 : parseInt(amount),
        type_of_rd_id: type_of_rd_id,
        off_non_grant_allocation: 0,
        off_non_grant_amount: 0,
        on_non_grant_allocation: on_non_grant_allocation,
        on_non_grant_amount: parseInt(amount*(on_non_grant_allocation / 100)*(type_of_rd_id.value/100)),
        grant_funded_allocation: grant_funded_allocation,
        grant_funded_amount: parseInt(amount * (grant_funded_allocation / 100)*(type_of_rd_id.value/100)),
      };
      const pdf = {
        id: GrantManualData.length,
        name: name,
        amount: isNaN(parseInt(amount)) ? 0 : parseInt(amount),
        type_of_rd_id: type_of_rd_id.id,
        off_non_grant_allocation: 0,
        off_non_grant_amount: 0,
        on_non_grant_allocation: on_non_grant_allocation,
        on_non_grant_amount: parseInt(amount*(on_non_grant_allocation / 100)*(type_of_rd_id.value/100)),
        grant_funded_allocation: grant_funded_allocation,
        grant_funded_amount: parseInt(amount*(grant_funded_allocation / 100)*(type_of_rd_id.value/100)),
      };
      let newArr = GrantManualData.slice();
      newArr.push(data);
      setGrantManualData(newArr);
      let arr = NongrantManualData.slice();
      arr.push(pdf);
      setNongrantManualData(arr);
      setAmount(0);
      setName('');
      setOn_non_grant_allocation(0);
      setGrant_funded_allocation(0);
      setType_of_rd_id(null);
      setDropDownDisability(true);
    }
  },[name,amount,type_of_rd_id,GrantManualData])

  const handleSave = (e) => {
    e.preventDefault();
    if (name !== '' && amount !== 0 && type_of_rd_id !== null) {
      const data = {
        id: GrantManualData.length,
        name: name,
        amount: parseInt(amount),
        type_of_rd_id: type_of_rd_id,
        off_non_grant_allocation: 0,
        off_non_grant_amount: 0,
        on_non_grant_allocation: on_non_grant_allocation,
        on_non_grant_amount: parseInt(amount*(on_non_grant_allocation / 100)*(type_of_rd_id.value/100)),
        grant_funded_allocation: grant_funded_allocation,
        grant_funded_amount: parseInt(amount * (grant_funded_allocation / 100)*(type_of_rd_id.value/100)),
      };
      const pdf = {
        id: GrantManualData.length,
        name: name,
        amount: parseInt(amount),
        type_of_rd_id: type_of_rd_id.id,
        off_non_grant_allocation: 0,
        off_non_grant_amount: 0,
        on_non_grant_allocation: on_non_grant_allocation,
        on_non_grant_amount: parseInt(amount*(on_non_grant_allocation / 100)*(type_of_rd_id.value/100)),
        grant_funded_allocation: grant_funded_allocation,
        grant_funded_amount: parseInt(amount*(grant_funded_allocation / 100)*(type_of_rd_id.value/100)),
      };
      let newArr = GrantManualData.slice();
      newArr.push(data);
      setGrantManualData(newArr);
      let arr = NongrantManualData.slice();
      arr.push(pdf);
      setNongrantManualData(arr);
      setName('');
      setAmount(0);
      setOn_non_grant_allocation(0);
      setGrant_funded_allocation(0);
      setType_of_rd_id(null);
    }
  };
  const updateFieldChanged = (name, index) => (event) => {
    let newArr = GrantManualData.map((item, i) => {
      if (index === i) {
        if (name === 'type_of_rd_id') {
          return { ...item, [name]: event };
        } else if (name === 'on_non_grant_allocation') {
          let slider = { ...item };
          return {
            ...item,
            [name]: event,
            ['grant_funded_allocation']: setSecondSliderPercentage(
              event,
              slider.grant_funded_allocation,
            ),
          };
        } else if (name === 'grant_funded_allocation') {
          let slider2 = { ...item };
          return {
            ...item,
            [name]: event,
            ['on_non_grant_allocation']: setSecondSliderPercentage(
              event,
              slider2.on_non_grant_allocation,
            ),
          };
        } else {
          return { ...item, [name]: isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value) };
        }
      } else {
        return item;
      }
    });
    setGrantManualData(newArr);
    let arr = NongrantManualData.map((item, i) => {
      if (index === i) {
        if (name === 'type_of_rd_id') {
          return { ...item, [name]: event.id };
        } else if (name === 'on_non_grant_allocation') {
          let slider = { ...item };
          return {
            ...item,
            [name]: event,
            ['grant_funded_allocation']: setSecondSliderPercentage(
              event,
              slider.grant_funded_allocation,
            ),
          };
        } else if (name === 'grant_funded_allocation') {
          let slider2 = { ...item };
          return {
            ...item,
            [name]: event,
            ['on_non_grant_allocation']: setSecondSliderPercentage(
              event,
              slider2.on_non_grant_allocation,
            ),
          };
        } else {
          return { ...item, [name]: parseInt(event.target.value) };
        }
      } else {
        return item;
      }
    });
    setNongrantManualData(arr);
  };
  return (
    <div className="table-responsive">
      <table>
        <thead className="thead-bg">
          <tr>
            <th style={{ width: '5%' }}>
              <a data-toggle="modal" data-target="#myModal1" className="all-refresh-icon">
                <img src="images/refresh-icon.png" />
                <p>ALL</p>
              </a>
            </th>
            <th>
              <a data-toggle="modal" data-target="#myModal2">
                Account Name <img src="images/info.png" />
              </a>
            </th>
            <th>
              <a data-toggle="modal" data-target="#myModal4">
                Amount <img src="images/info.png" />
              </a>
            </th>
            <th>
              <a data-toggle="modal" data-target="#myModal7">
                Type of R&D Expense <img src="images/info.png" />
              </a>
            </th>
            <th style={{ width: '21%' }}>
              <a data-toggle="modal" data-target="#myModal5">
                Normal Funded Projects <img src="images/info.png" />
              </a>
            </th>
            {toggleValue ? (
              <th style={{ width: '21%' }}>
                <a data-toggle="modal" data-target="#myModal6">
                  Grant/Special Loans funded Projects <img src="images/info.png" />
                </a>
              </th>
            ) : (
              ''
            )}
          </tr>
        </thead>

        <tbody className="tbody-bg">
          {GrantManualData.map((data, i) => (
            <tr key={i}>
              <td style={{ width: '5%' }}></td>
              <td>
                <span className="close-icon">
                  <img
                    src="images/close-btn.png"
                    onClick={(index) => {
                      let arr = GrantManualData.filter((item) => item.id !== data.id);
                      setGrantManualData(arr);
                    }}
                  />
                  <span>{data.name}</span>
                </span>
              </td>
              <td>
                <div className="rupee-editable-btn">
                  <div className="form-group">
                    <input
                      type="number"
                      value={`${('&#163;', data.amount)}`}
                      name="amount"
                      onChange={updateFieldChanged('amount', i)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                      }
                    />
                  </div>
                  <a className="">
                    <img src="images/edit-pencil-icon.png" />
                  </a>
                </div>
                {/* <a className="rupee-edit-btn" href="#">
                      <span>£20,000</span>
                      <img src="images/edit-pencil-icon.png" />
                    </a> */}
              </td>
              <td style={{ width: '22%' }}>
                <Select
                  className="custom-select-box"
                  name="type_of_rd_id"
                  value={data.type_of_rd_id}
                  onChange={updateFieldChanged('type_of_rd_id', i)}
                  options={RdTypes.map((type) => ({
                    value: type.RD_off_non_grant_allocation,
                    label: type.name,
                    id: type.id,
                  }))}
                />{' '}
              </td>
              <td>
                <label className="custom-range-slider-price">
                  £
                  {new Intl.NumberFormat('en-GB').format(
                    Math.round(data.amount * (data.on_non_grant_allocation / 100)),
                  )}
                </label>
                <Slider
                  className="custom-range-slider"
                  name="on_non_grant_allocation"
                  value={data.on_non_grant_allocation}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={updateFieldChanged('on_non_grant_allocation', i)}
                />{' '}
                <span className="custom-range-slider-percentage-text">
                  {data.on_non_grant_allocation}%
                </span>
              </td>
              {toggleValue ? (
                <td>
                  <label className="custom-range-slider-price">
                    £
                    {new Intl.NumberFormat('en-GB').format(
                      Math.round(data.amount * (data.grant_funded_allocation / 100)),
                    )}
                  </label>
                  <Slider
                    className="custom-range-slider"
                    name="grant_funded_allocation"
                    value={data.grant_funded_allocation}
                    min={0}
                    max={100}
                    orientation="horizontal"
                    onChange={updateFieldChanged('grant_funded_allocation', i)}
                  />{' '}
                  <span className="custom-range-slider-percentage-text">
                    {data.grant_funded_allocation}%
                  </span>
                </td>
              ) : (
                ''
              )}
            </tr>
          ))}
          <tr>
            <td style={{ width: '5%' }}></td>
            <td>
              <span className="close-icon" style={{ display: 'flex' }}>
                <img src="images/add-icon.png" onClick={handleSave} />
                <img className="img-display" src="images/close-btn.png" />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Account Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </span>
            </td>
            <td>
              <div className="rupee-editable-btn">
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    onKeyDown={(e) => (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 189 || e.keyCode === 187) && e.preventDefault()}
                  />
                </div>
                <a className="">
                  <img src="images/edit-pencil-icon.png" />
                </a>
              </div>
              {/* <a className="rupee-edit-btn" href="#">
                      <span>£20,000</span>
                      <img src="images/edit-pencil-icon.png" />
                    </a> */}
            </td>
            <td style={{ width: '22%' }}>
              <Select
                className="custom-select-box"
                options={RdTypes.map((type) => ({
                  value: type.RD_off_non_grant_allocation,
                  label: type.name,
                  id: type.id,
                }))}
                value={type_of_rd_id}
                isDisabled={dropDownDisability}
                onChange={(selectedOption) => {
                  setType_of_rd_id(selectedOption);
                }}
              />{' '}
            </td>
            <td>
              <label className="custom-range-slider-price">£{nonGrantAmount}</label>
              <Slider
                className="custom-range-slider"
                min={0}
                max={100}
                value={on_non_grant_allocation}
                onChange={(value) => {
                  setOn_non_grant_allocation(value);
                  setGrant_funded_allocation(
                    setSecondSliderPercentage(value, grant_funded_allocation),
                  );
                }}
                orientation="horizontal"
              />{' '}
              <span className="custom-range-slider-percentage-text">
                {on_non_grant_allocation}%
              </span>
            </td>
            {toggleValue ? (
              <td>
                <label className="custom-range-slider-price">£{grantAmount}</label>
                <Slider
                  className="custom-range-slider"
                  min={0}
                  max={100}
                  value={grant_funded_allocation}
                  onChange={(value) => {
                    setGrant_funded_allocation(value);
                    setOn_non_grant_allocation(
                      setSecondSliderPercentage(value, on_non_grant_allocation),
                    );
                  }}
                  orientation="horizontal"
                />{' '}
                <span className="custom-range-slider-percentage-text">
                  {grant_funded_allocation}%
                </span>
              </td>
            ) : (
              ''
            )}
          </tr>
          <tr>
            <td className="end-of-data-text" colSpan="6" style={{ textAlign: 'center' }}>
              {' '}
              - End Of Data -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClaimTables;
