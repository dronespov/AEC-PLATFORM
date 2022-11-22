import React from 'react'


const Measurement = () => {

    return (
        <>
            <div className="d-flex align-items-center py-3">
                <img src={require('../../assets/images/drone-images/measurement.png').default} className="img-fluid" />
                <h4 className="ml-2 text-white mb-0">Measurement</h4>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span className="dr-text-primary">Slope as percentage</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">2D length</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">3D length</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">Min. Elevation</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">Max. Elevation</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">Elevation Difference</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">Min. slope</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="dr-text-primary">Max. slope</span>
                <div className="bg-num-right dr-text-primary p-1">3,583.39 ft</div>
            </div>
        </>
    )
}

export default Measurement