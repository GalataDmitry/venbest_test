import {useEffect, useState} from "react"
import {v4 as uuidv4} from 'uuid'

const App = () => {

    const [resultData, setResultData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [inputNameFilterValue, setInputNameFilterValue] = useState('')
    const [inputLastNameFilterValue, setInputLastNameFilterValue] = useState('')
    const [inputAgeFilterValue, setInputAgeFilterValue] = useState('')
    const [inputMaleFilterValue, setInputMaleFilterValue] = useState('')
    const [inputFemaleFilterValue, setInputFemaleFilterValue] = useState('')
    const [checkedMale, setCheckedMale] = useState(false)
    const [checkedFemale, setCheckedFemale] = useState(false)

    const getData = () => {

        let requestOptions = {
            method: 'GET',
        }

        fetch("https://venbest-test.herokuapp.com/", requestOptions)
            .then(response => response.text())
            .then(result => setResultData(JSON.parse(result)))
            .catch(error => console.log('error', error))
    }

    const filterNameFunc = (el) => {
        return el.name.toLowerCase().includes(inputNameFilterValue.toLowerCase())
    }

    const filterLastNameFunc = (el) => {
        return el.lastname.toLowerCase().includes(inputLastNameFilterValue.toLowerCase())
    }

    const filterAgeFunc = (el) => {
        return String(el.age).toLowerCase().includes(inputAgeFilterValue.toLowerCase())
    }

    const filterMaleFunc = (el) => {
        return el.sex.toLowerCase().includes(inputMaleFilterValue.toLowerCase())
    }

    const filterFemaleFunc = (el) => {
        return el.sex.toLowerCase().includes(inputFemaleFilterValue.toLowerCase())
    }

    const checkInputResultData = () => {
        return !inputNameFilterValue ||
            !inputLastNameFilterValue ||
            !inputAgeFilterValue ||
            !inputMaleFilterValue ||
            !inputFemaleFilterValue
    }

    const checkInputFilterData = () => {
        return inputNameFilterValue ||
            inputLastNameFilterValue ||
            inputAgeFilterValue ||
            inputMaleFilterValue ||
            inputFemaleFilterValue
    }

    const filters = () => {
        return setFilteredData(resultData
            .filter(filterNameFunc)
            .filter(filterLastNameFunc)
            .filter(filterAgeFunc)
            .filter(filterMaleFunc)
            .filter(filterFemaleFunc))
    }

    const changeCheckboxMaleFunc = () => {
        if (inputMaleFilterValue === '') {
            setInputMaleFilterValue('m')
            setCheckedMale(true)
        } else {
            setInputMaleFilterValue('')
            setCheckedMale(false)
        }
        if (inputFemaleFilterValue !== '' && checkedFemale === true) {
            setInputFemaleFilterValue('')
            setCheckedFemale(false)
        }
    }

    const changeCheckboxFemaleFunc = () => {
        if (inputFemaleFilterValue === '') {
            setInputFemaleFilterValue('f')
            setCheckedFemale(true)
        } else {
            setInputFemaleFilterValue('')
            setCheckedFemale(false)
        }
        if (inputMaleFilterValue !== '' && checkedMale === true) {
            setInputMaleFilterValue('')
            setCheckedMale(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {

            if (checkInputResultData()) {
                setFilteredData(resultData)
            }
            if (checkInputFilterData()) {
                filters()
            }

        }, [
            inputNameFilterValue,
            inputLastNameFilterValue,
            inputAgeFilterValue,
            inputMaleFilterValue,
            inputFemaleFilterValue,
            resultData
        ]
    )

    return (
        <>
            <div>
                <input
                    type='text'
                    placeholder='Name filter'
                    onChange={(event => setInputNameFilterValue(event.target.value))}
                />
                <td/>
                <input
                    type='text'
                    placeholder='Last name filter'
                    onChange={(event => setInputLastNameFilterValue(event.target.value))}
                />
                <td/>
                <input
                    type='text'
                    placeholder='Age filter'
                    onChange={(event => setInputAgeFilterValue(event.target.value))}
                />
                <td/>
                sex:
                <input type='checkbox' id='1' checked={checkedMale} onChange={changeCheckboxMaleFunc}/>m
                <input type='checkbox' id='2' checked={checkedFemale} onChange={changeCheckboxFemaleFunc}/>f
                <hr/>
            </div>
            {
                filteredData.map(el => {
                        return (
                            <table key={uuidv4()}>
                                <tbody>
                                <tr>
                                    <td>Name: {el.name} {el.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Age: {el.age}</td>
                                </tr>
                                <tr>
                                    <td>Sex: {el.sex}</td>
                                </tr>
                                </tbody>
                                <hr/>
                            </table>
                        )
                    }
                )
            }
        </>
    )
}

export default App