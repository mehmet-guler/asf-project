import React from 'react';
import './Segment.css';
import '../../../assets/Hexagon.css';
function Segment() {
    return (
        <div className="segment">
            <h1 className="text-center">SEGMENT</h1>

            <div className="flex-container">

                <div className="segment-item">
                    <div className="hexagon-green mb-5"></div>
                    <h4>Marketing Slot</h4>
                    <p>Section below should have more emphasis on hover,list below can be highlighted individually as
            well.</p>
                </div>
                <div className="segment-item">
                    <div className="hexagon-gray mb-5"></div>
                    <h4>Marketing Slot </h4>
                    <p>Text below should have less emphasis until hovered.</p>
                </div>
                <div className="segment-item">
                    <div className="hexagon-red  mb-5"></div>
                    <h4>Marketing Slot </h4>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.</p>
                </div>
            </div>
        </div>
    )
}
export default Segment;