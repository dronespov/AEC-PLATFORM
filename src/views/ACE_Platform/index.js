import React, { useState } from "react"
import Navbar from "../../components/Navbar"
import { Row, Col, Input, InputGroup, InputGroupText, CustomInput } from "reactstrap"
import { AiOutlinePlusCircle, AiFillCheckCircle, AiOutlineRight } from "react-icons/ai"
import { CheckCircle, Edit2 } from "react-feather"
import Measurement from "./Measurement"
import ColorPicker from "./ColorPicker"
import Timeline from "../../components/timeline"


const ACE_Platform = () => {

    const Annotations = [
        {
            itemName: "Polygon 056",
            image: <img src={require('../../assets/images/drone-images/search-square.png').default} className="mr-2 img-fluid" />
        },
        {
            itemName: "Line 454",
            image: <img src={require('../../assets/images/drone-images/search-key.png').default} className="mr-2 img-fluid" />
        },
        {
            itemName: "Polygon 056",
            image: <img src={require('../../assets/images/drone-images/search-square.png').default} className="mr-2 img-fluid" />
        },
        {
            itemName: "Line 454",
            image: <img src={require('../../assets/images/drone-images/search-key.png').default} className="mr-2 img-fluid" />
        }
    ]

    return (
        <>
            <Navbar />
            <div className="container py-2">
                <Row>
                    <Col xl="3">
                        <div className="bg-left p-1">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                                <div className="d-flex align-items-center">
                                    <img src={require('../../assets/images/drone-images/layer.png').default} className="mr-2 img-fluid" />
                                    <h4 className="text-white">Layers</h4>
                                </div>
                                <AiOutlinePlusCircle color="#B1B5C3" size={30} />
                            </div>
                            <Input placeholder="Search by name" className="input-left my-4 py-2" />
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <div className="d-flex align-items-center">
                                    <img src={require('../../assets/images/drone-images/search-square.png').default} className="mr-2 img-fluid" />
                                    <h4 className="text-white">Annotations</h4>
                                </div>
                                <AiFillCheckCircle color="#D6B636" size={30} />
                            </div>
                            <Timeline data={Annotations} />
                            <div className="d-flex justify-content-between align-items-center pb-3 mb-4">
                                <div className="d-flex align-items-center">
                                    <img src={require('../../assets/images/drone-images/output.png').default} className="mr-2 img-fluid" width={25} height={25} />
                                    <h4 className="text-white">Outputs</h4>
                                </div>
                                <AiFillCheckCircle color="#D6B636" size={30} />
                            </div>
                        </div>
                    </Col>
                    <Col xl="5">
                        <div>
                            <div className="d-flex align-items-center justify-content-center mt-5">
                                <img src={require('../../assets/images/drone-images/2d-image.png').default} className="img-fluid" />
                            </div>
                        </div>
                    </Col>
                    <Col xl="1" className="px-0">

                        <div className="d-flex flex-column mr-1">
                            <div className="bg-tool mb-1 p-1">
                                <img src={require('../../assets/images/drone-images/arrow.png').default} className="img-fluid" />
                            </div>
                            <div className="bg-tool mb-1 p-1">
                                <img src={require('../../assets/images/drone-images/search-square.png').default} className="img-fluid" width={20} />
                            </div>
                            <div className="bg-tool mb-1 p-1">
                                <img src={require('../../assets/images/drone-images/search-key.png').default} className="img-fluid" width={20} />
                            </div>
                        </div>
                    </Col>
                    <Col xl="3" className="d-flex">
                        <div className="bg-left p-1">
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
                                <div className="d-flex align-items-center">
                                    <AiOutlineRight color="#D6B636" size={20} />
                                    <h4 className="ml-2 mb-0 text-white">Collapse</h4>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center my-3">
                                <div className="d-flex align-items-center">
                                    <img src={require('../../assets/images/drone-images/search-key.png').default} className="img-fluid" width={20} />
                                    <h5 className="text-white mb-0 ml-1">Line</h5>
                                </div>
                                <div className="d-flex align-items-center">
                                    <img src={require('../../assets/images/drone-images/view.png').default} className="img-fluid mr-1" width={20} />
                                    <img src={require('../../assets/images/drone-images/delete.png').default} className="img-fluid" />
                                </div>
                            </div>
                            <div>
                                <InputGroup className='input-group-merge mb-1'>
                                    <Input
                                        type='text'
                                        placeholder='Line'
                                        id='line'
                                        name='line'
                                        className="input-left py-2"

                                    />
                                    <InputGroupText className="input-left">
                                        <Edit2 color="#d6b636" size={15} />
                                    </InputGroupText>
                                </InputGroup>
                                <InputGroup className='input-group-merge mb-1'>
                                    <Input
                                        type='textarea'
                                        placeholder='Description'
                                        id='description'
                                        name='description'
                                        className="input-left py-2"

                                    />
                                    <InputGroupText className="input-left">
                                        <Edit2 color="#d6b636" size={15} />
                                    </InputGroupText>
                                </InputGroup>
                                <InputGroup className='input-group-merge mb-1'>
                                    <Input
                                        type='text'
                                        placeholder='Tags'
                                        id='tags'
                                        name='tags'
                                        className="input-left py-2"
                                    />
                                </InputGroup>
                            </div>
                            <ColorPicker />
                            <Measurement />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ACE_Platform