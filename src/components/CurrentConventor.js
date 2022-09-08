import React, { useEffect, useState } from 'react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Container, Col } from 'react-bootstrap';
import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const CurrentConventor = () => {

    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);
    const [base, setBase] = useState("USD");
    const [convertTo, setConvertTo] = useState("AZN");
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        axios.get(`https://api.apilayer.com/exchangerates_data/latest?base=${base}&apikey=ZpXQ6hDeJMYeJvlfKhPitV26y2tgiLIb`)
            .then((res) => {
                setData(res.data.rates);
            })
    }, [base]);

    useEffect(() => {
        setOptions(Object.keys(data));
        convert();
    }, [data])


    function convert() {
        var rate = data[convertTo];
        setOutput(input * rate);
    }

    function flip() {
        var arrow = base;
        setBase(convertTo);
        setConvertTo(arrow);
    }

    return (
        <div className='currency-converter-section'>
            <div className="currency-conventer-select">
                <Container>
                    <Col>
                        <div className='select-section'>
                            <Dropdown options={options}
                                onChange={(e) => { setBase(e.value) }}
                                value={base} />
                            <SwapHorizIcon onClick={() => { flip() }} />
                            <Dropdown options={options}
                                onChange={(e) => { setConvertTo(e.value) }}
                                value={convertTo} />
                        </div>
                    </Col>
                </Container>
            </div>
            <div className="currency-converter-input-section">
                <Container>
                    <div className="converter-input">
                        <p>Amount</p>
                        <div className="converter-input-button">
                            <input
                                type="number"
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button onClick={() => { convert() }}><CachedIcon /></button>
                        </div>
                        <p>{input + " " + base + " = " + output.toFixed(2) + " " + convertTo}</p>
                    </div>
                </Container>
            </div>
            <Container>
                <Col>
                    <div className='currency-converter-boxes'>
                        {Object.keys(data).map((key, index) => {
                            return (
                                <div className="currency-converter-box" key={index}>
                                    <p className='country-name'>{key}</p>
                                    <p className='price'>{input > 0 ? data[key] * input : data[key]}</p>
                                </div>
                            );
                        })}
                    </div>
                </Col>
            </Container>
        </div>
    )
}

export default CurrentConventor

