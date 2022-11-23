import React, { useState } from 'react'
import { SliderPicker, SketchPicker } from 'react-color'
import { Row, Col, Input, InputGroup, InputGroupText } from "reactstrap"

const ColorPicker = () => {

    const [currentColor, setCurrentColor] = useState("#ff6")
    const [picker, setPicker] = useState(false)

    const togglePicker = () => setPicker(!picker)

    const handleColorChange = (color) => {
        setCurrentColor(color.hex)
        console.log(color.hex)
    }

    return (
        <>
            <Row className="align-items-center">
                <Col lg="4" className="d-flex align-items-center pr-1">
                    <img src={require('../../assets/images/drone-images/picker-icon.png').default} className="img-fluid" />
                    <h5 className="text-white">Color</h5>
                    <div style={{ backgroundColor: `${currentColor}` }} className="rounded d-flex justify-content-center" onClick={() => togglePicker()}>
                        <img src={require('../../assets/images/drone-images/Vector.png').default} className="img-fluid m-1" />
                    </div>
                </Col>
                <Col lg="8">
                    <SliderPicker color={currentColor} onChangeComplete={(e) => handleColorChange(e)} />
                </Col>
            </Row>
            {picker === true && <div className="mt-1 fixed"><SketchPicker color={currentColor} onChangeComplete={(e) => handleColorChange(e)} /></div>}
        </>
    )
}

export default ColorPicker