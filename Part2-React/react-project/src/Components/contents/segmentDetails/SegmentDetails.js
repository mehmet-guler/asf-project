import React from 'react';
import '../segment/Segment.css';

function SegmentDetails() {

    return (
        <div className="segment-details">
            <div className="flex-container">
                <div className="segment-details-item text-center border-top-green">
                    <div className="list">
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>WEB DESING</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>UI DESIGN</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>GRAPHIC DESIGN</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>BRANDING</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>CORPORATE IDENTITY</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MOBILE APP DESING</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>POSTER DESING</label>
                        </div>
                    </div>
                    <button className="button green">Button</button>
                </div>

                <div className="segment-details-item text-center border-top-gray">
                    <div className="list">
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MARKETING TITLE</label>
                            <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                dolor.</p>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MARKETING TITLE</label>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                dolor.</p>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MARKETING TITLE</label>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                        </div>

                    </div>
                    <button className="button gray">Button</button>
                </div>

                <div className="segment-details-item text-center border-top-red">
                    <div className="list">
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MARKETING TITLE</label>
                        </div>
                        <div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                            <label>MARKETING TITLE</label>
                        </div>
                    </div>
                    <button className="button red">Button</button>
                </div>

            </div>


        </div>
    )
}

export default SegmentDetails;