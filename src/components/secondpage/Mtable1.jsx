import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {
  Gngpv,
  Gpv,
  GRdEx,
  Rdec,
  RdRdec,
  TotalDecCredits,
  TaxCredits,
} from '../../../Services/Formulas';
import { RdList } from '../../../Services/company-house';
import projectContext from '../../../projectContext';

/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/
const Mtable1 = ({ profit, loss, boxValue, setGrantDetails, pdf2, setPdf2 }) => {
  const [acName, setAcName] = useState('');
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [sl1, setSl1] = useState(null);
  const [sl2, setSl2] = useState(null);
  const [Rdtypes, setRdTypes] = useState([]);
  const [sngpv, setSngpv] = useState(null);
  const [sgpv, setSgpv] = useState(null);
  const nonGRantValue = Gngpv(amount, sl1);
  const [dec, setDec] = useState(null);
  const grantValue = Gpv(amount, sl2);
  const [ind, setI] = useState(null);
  const { setRdex1, setRdec, setManualData, manualData } = useContext(projectContext);
  const [dropDownDisability, setDropDownDisability] = useState(true);
  const setSecondSliderPercentage = (percentageOne, percentageTwo) => {
    const remainingPercentage = 100 - percentageOne;
    if (percentageTwo < remainingPercentage) {
      return percentageTwo;
    }
    return remainingPercentage;
  };
  useEffect(() => {
    if (acName != '' && amount != null) {
      setDropDownDisability(false);
    }
  }, [acName, amount]);
  useEffect(() => {
    RdList.then((res) => setRdTypes(res));
  }, []);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < manualData.length; i++) {
      sum += manualData[i].Ngpv;
    }
    setSngpv(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualData]);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < manualData.length; i++) {
      sum += manualData[i].RdDecEx;
    }
    setSgpv(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualData]);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < manualData.length; i++) {
      sum += manualData[i].RDec;
    }
    setRdec(sum);
    setDec(sum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualData]);
  useEffect(() => {
    const rdqe = sngpv + sgpv;
    setRdex1(rdqe);
  }, [sngpv, sgpv, setRdex1]);

  useEffect(() => {
    if (boxValue === null || boxValue === 0 || isNaN(boxValue)) {
      setRdec(TotalDecCredits(profit, loss, sngpv, dec));
    } else {
      if (profit) {
        setRdec(TaxCredits(boxValue, dec, sngpv));
      } else if (loss) {
        setRdec(TaxCredits(-boxValue, dec, sngpv));
      }
    }
  }, [boxValue, dec, loss, profit, setRdec, sngpv]);

  useEffect(() => {
    if (ind !== null && manualData.length !== 0) {
      const objIndex = manualData.findIndex((obj) => obj.Id === ind);
      const a1 = manualData[objIndex].Amount;
      const a2 = manualData[objIndex].Sl1;
      const a3 = manualData[objIndex].Sl2;
      const sel = manualData[objIndex].Type.value;
      const a4 = Gngpv(a1, a2);
      const a5 = Gpv(a1, a3);
      const a6 = GRdEx(a4, sel);
      const a7 = RdRdec(a5, sel);
      const a8 = Rdec(a7);
      manualData[objIndex].Ngpv = GRdEx(
        Gngpv(manualData[objIndex].Amount, manualData[objIndex].Sl1),
        manualData[objIndex].Type.value,
      );
      manualData[objIndex].Gpv = RdRdec(
        Gpv(manualData[objIndex].Amount, manualData[objIndex].Sl2),
        manualData[objIndex].Type.value,
      );
      manualData[objIndex].DecValue = Rdec(
        RdRdec(
          Gpv(manualData[objIndex].Amount, manualData[objIndex].Sl2),
          manualData[objIndex].Type.value / 100,
        ),
      );
    }
    setManualData(manualData);
  }, [manualData]);

  const handleSave = (e) => {
    e.preventDefault();
    if (type !== null && acName !== '' && amount !== null) {
      const id = manualData.length;
      const rdSme = GRdEx(nonGRantValue, type.value);
      const rdDec = RdRdec(grantValue, type.value);
      const rdec = Rdec(rdDec);
      const pdf = {
        name: acName,
        amount: parseInt(amount),
        type_of_rd_id: Rdtypes.find((rd) => rd.name === type.label).id,
        off_non_grant_allocation: 0,
        off_non_grant_amount: 0,
        on_non_grant_allocation: sl1,
        on_non_grant_amount: nonGRantValue,
        grant_funded_allocation: sl2,
        grant_funded_amount: sl2,
      };
      const data = {
        Id: id,
        AccountName: acName,
        Amount: parseInt(amount),
        Type: type,
        Sl1: sl1,
        Sl2: sl2,
        Ngpv: nonGRantValue * (type.value / 100),
        Gpv: grantValue * (type.value / 100),
      };
      const newArray = manualData.slice(); // Create a copy
      newArray.push(data);
      setManualData(newArray);
      const pdfarr = pdf2.slice();
      pdfarr.push(pdf);
      setPdf2(pdfarr);
      setAcName(''), setAmount(0), setType(null), setSl1(0), setSl2(0), setDropDownDisability(true);
    }
  };
  useEffect(() => {
    let asum = 0;
    let bsum = 0;
    let csum = 0;
    let decsum = 0;
    if (manualData.length !== 0) {
      manualData.map((expense) => {
        asum = asum + expense.Ngpv;
        bsum = bsum + expense.Gpv;
        decsum = bsum * (13 / 100);
        csum = asum + bsum;
      });
    }
    setGrantDetails({
      asum: asum,
      bsum: bsum,
      decsum: decsum,
      csum: csum,
    });
  }, [manualData]);

  const updateFieldChanged = (name, index) => (event) => {
    setI(index);
    let newArr = manualData.map((item, i) => {
      if (index === i) {
        if (name === 'Type') {
          return { ...item, [name]: event };
        } else if (name === 'Sl1') {
          let slider = { ...item };
          return { ...item, [name]: event, ['Sl2']: setSecondSliderPercentage(event, slider.Sl2) };
        } else if (name === 'Sl2') {
          let slider2 = { ...item };
          return { ...item, [name]: event, ['Sl1']: setSecondSliderPercentage(event, slider2.Sl1) };
        } else {
          return { ...item, [name]: event.target.value };
        }
      } else {
        return item;
      }
    });
    setManualData(newArr);
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
            <th style={{ width: '21%' }}>
              <a data-toggle="modal" data-target="#myModal6">
                Grant/Special Loans funded Projects <img src="images/info.png" />
              </a>
            </th>
          </tr>
        </thead>

        <tbody className="tbody-bg">
          {manualData.map((data, i) => (
            <tr key={i}>
              <td style={{ width: '5%' }}></td>
              <td>
                <span className="close-icon">
                  <img
                    src="images/close-btn.png"
                    onClick={() => {
                      let arr = manualData.filter((item) => item.Id !== i);
                      setManualData(arr);
                    }}
                  />
                  <span>{data.AccountName}</span>
                </span>
              </td>
              <td>
                <div className="rupee-editable-btn">
                  <div className="form-group">
                    <input
                      type="text"
                      value={`${('&#163;', data.Amount)}`}
                      name="Amount"
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
                  name="Type"
                  options={Rdtypes.map((type) => ({
                    value: type.RD_off_non_grant_allocation,
                    label: type.name,
                  }))}
                  value={data.Type}
                  onChange={updateFieldChanged('Type', i)}
                />{' '}
              </td>
              <td>
                <label className="custom-range-slider-price">
                  £{new Intl.NumberFormat('en-GB').format(Math.round(data.Ngpv))}
                </label>
                <Slider
                  className="custom-range-slider"
                  name="Sl1"
                  value={data.Sl1}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={updateFieldChanged('Sl1', i)}
                />{' '}
                <span className="custom-range-slider-percentage-text">{data.Sl1}%</span>
              </td>
              <td>
                <label className="custom-range-slider-price">
                  £{new Intl.NumberFormat('en-GB').format(Math.round(data.Gpv))}
                </label>
                <Slider
                  className="custom-range-slider"
                  name="Sl2"
                  value={data.Sl2}
                  min={0}
                  max={100}
                  orientation="horizontal"
                  onChange={updateFieldChanged('Sl2', i)}
                />{' '}
                <span className="custom-range-slider-percentage-text">{data.Sl2}%</span>
              </td>
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
                    value={acName}
                    onChange={(e) => {
                      setAcName(e.target.value);
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
                    onKeyDown={(e) => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()}
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
                options={Rdtypes.map((type) => ({
                  value: type.RD_off_non_grant_allocation,
                  label: type.name,
                }))}
                value={type}
                isDisabled={dropDownDisability}
                onChange={(selectedOption) => {
                  setType(selectedOption);
                }}
              />{' '}
            </td>
            <td>
              <label className="custom-range-slider-price">£{Math.round(nonGRantValue)}</label>
              <Slider
                className="custom-range-slider"
                min={0}
                max={100}
                value={sl1}
                onChange={(value) => {
                  setSl1(value);
                  setSl2(setSecondSliderPercentage(value, sl2));
                }}
                orientation="horizontal"
              />{' '}
              <span className="custom-range-slider-percentage-text">{sl1}%</span>
            </td>
            <td>
              <label className="custom-range-slider-price">£{Math.round(grantValue)}</label>
              <Slider
                className="custom-range-slider"
                value={sl2}
                min={0}
                max={100}
                onChange={(value) => {
                  setSl2(value);
                  setSl1(setSecondSliderPercentage(value, sl1));
                }}
                orientation="horizontal"
              />{' '}
              <span className="custom-range-slider-percentage-text">{sl2}%</span>
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
  );
};

export default Mtable1;
