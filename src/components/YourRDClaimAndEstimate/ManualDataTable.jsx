import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { Ngpv, RdSum } from '../../../Services/Formulas';
import Mtable1 from './Mtable1';
import projectContext from '../../../projectContext';

const ManualDataTable = ({
  setGrantDetails,
  toggleValue,
  RdTypes,
  setRdExpensesTotal,
  profit,
  loss,
  boxValue,
  setRD,
  setFirst,
  setNonGrantTable,
  nonGrantTable,
  setPdf2,
  pdf2,
  table3,
  setManualData,
}) => {
  const [slider1, setSlider1] = useState(0);
  const [p, setP] = useState('');
  const [eamount, setEamount] = useState(0);
  const [accName, setAccName] = useState('');
  const [ind, setI] = useState(null);
  const ngpv = Ngpv(eamount, slider1);
  const { tableData, setTableData } = useContext(projectContext);
  const [dropdownDisability, setDropdownDisability] = useState(true);
  useEffect(() => {
    if (accName != '' && eamount != 0) {
      setDropdownDisability(false);
    }
  }, [accName, eamount]);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < tableData.length; i++) {
      sum += tableData[i].RdSmeSum;
    }
    setRdExpensesTotal(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);
  const handleSave = (e) => {
    e.preventDefault();
    setFirst(true);
    if (accName !== '' && eamount !== null && p !== '') {
      const rdsum = RdSum(ngpv, p.value);
      const pdf = {
        name: accName,
        amount: parseInt(eamount),
        type_of_rd_id: 1,
        off_non_grant_allocation: slider1,
        off_non_grant_amount: parseInt(ngpv),
        on_non_grant_allocation: 0,
        on_non_grant_amount: 0,
        grant_funded_allocation: 0,
        grant_funded_amount: 0,
      };
      const data = {
        id: tableData.length,
        accname: accName,
        Amount: parseInt(eamount),
        type: p,
        percentage: slider1,
        ngpv: ngpv,
        RdSmeSum: rdsum,
      };
      const newArray = tableData.slice(); // Create a copy
      newArray.push(data);
      setTableData(newArray);
      const pdfarr = nonGrantTable.slice();
      pdfarr.push(pdf);
      setNonGrantTable(pdfarr);
      setAccName(''), setEamount(0), setP(''), setSlider1(0), setDropdownDisability(true);
    }
  };
  const updateFieldChanged = (name, index) => (event) => {
    setI(index);
    setFirst(false);
    let newArr = tableData.map((item, i) => {
      if (index === i) {
        if (name === 'type' || name === 'percentage') {
          return { ...item, [name]: event };
        } else if (name === name) {
          return { ...item, [name]: event.target.value };
        }
      } else {
        return item;
      }
    });
    setTableData(newArr);
  };

  useEffect(() => {
    let RDQualifyingExpenses = 0;
    if (ind !== null && tableData.length != 0) {
      tableData.map((expense) => {
        RDQualifyingExpenses =
          RDQualifyingExpenses +
          Ngpv(expense.Amount, (expense.percentage / 100) * expense.type.value);
        setRD(parseInt(RDQualifyingExpenses));
      });
      var objIndex = tableData.findIndex((obj) => obj.id === ind);
      var a1 = tableData[objIndex].Amount;
      var a2 = tableData[objIndex].percentage;
      var sel = tableData[objIndex].type.value;
      var a3 = Ngpv(a1, a2);
      const a4 = RdSum(a3, sel);
      tableData[objIndex].ngpv = a3;
      tableData[objIndex].RdSmeSum = a4;
    }
    setTableData(tableData);
  }, [tableData, slider1]);
  return (
    <div className="rd_expenses_information_table">
      {toggleValue ? (
        <Mtable1
          profit={profit}
          loss={loss}
          boxValue={boxValue}
          setGrantDetails={setGrantDetails}
          pdf2={pdf2}
          setPdf2={setPdf2}
          manualData={table3}
          setManualData={setManualData}
        />
      ) : (
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
                <th style={{ width: '21%' }} className="extra-width">
                  <a data-toggle="modal" data-target="#myModal5">
                    Normal Funded Projects <img src="images/info.png" />
                  </a>
                </th>
              </tr>
            </thead>

            <tbody className="tbody-bg">
              {tableData.map((data, i) => (
                <tr key={i}>
                  <td style={{ width: '5%' }}></td>
                  <td>
                    <span className="close-icon">
                      <img
                        src="images/close-btn.png"
                        onClick={() => {
                          let arr = tableData.filter((item) => item.id !== i);
                          setTableData(arr);
                        }}
                      />
                      <span>{data.accname}</span>
                    </span>
                  </td>
                  <td>
                    <div className="rupee-editable-btn">
                      <div className="form-group">
                        <input
                          type="text"
                          name="Amount"
                          value={data.Amount}
                          onChange={updateFieldChanged('Amount', i)}
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
                      name="type"
                      options={RdTypes.map((type) => ({
                        value: type.RD_off_non_grant_allocation,
                        label: type.name,
                      }))}
                      value={data.type}
                      onChange={updateFieldChanged('type', i)}
                    />{' '}
                  </td>
                  <td>
                    <label className="custom-range-slider-price">£{Math.round(data.ngpv)}</label>
                    <Slider
                      className="custom-range-slider"
                      name="percentage"
                      min={0}
                      max={100}
                      value={data.percentage}
                      orientation="horizontal"
                      onChange={updateFieldChanged('percentage', i)}
                    />{' '}
                    <span className="custom-range-slider-percentage-text">{data.percentage}%</span>
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ width: '5%' }}></td>
                <td>
                  <span className="close-icon" style={{ display: 'flex' }}>
                    <img
                      src="images/add-icon.png"
                      style={{ height: '20px' }}
                      onClick={handleSave}
                    />
                    <img className="img-display" src="images/close-btn.png" />
                    <div className="form-group">
                      <input
                        className="no-border-input"
                        type="text"
                        placeholder="Enter Account Name"
                        value={accName}
                        onChange={(e) => {
                          setAccName(e.target.value);
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
                        value={eamount}
                        placeholder="0"
                        onChange={(e) => setEamount(e.target.value)}
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
                    options={RdTypes.map((type) => ({
                      value: type.RD_off_non_grant_allocation,
                      label: type.name,
                    }))}
                    value={p}
                    isDisabled={dropdownDisability}
                    onChange={(selectedOption) => {
                      setP(selectedOption);
                    }}
                  />{' '}
                </td>
                <td>
                  <label className="custom-range-slider-price">
                    £{new Intl.NumberFormat('en-GB').format(Math.round(ngpv))}
                  </label>
                  <Slider
                    className="custom-range-slider"
                    min={0}
                    max={100}
                    value={slider1}
                    onChange={(value) => setSlider1(value)}
                    orientation="horizontal"
                  />{' '}
                  <span className="custom-range-slider-percentage-text">{slider1}%</span>
                </td>
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
      )}
    </div>
  );
};

export default ManualDataTable;
