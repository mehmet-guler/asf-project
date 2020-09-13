import React from 'react';
import Description from './description/Description';
import Segment from './segment/Segment';
import SegmentDetails from './segmentDetails/SegmentDetails';
import GuestBook from './guestBook/GuestBook';

function Content() {

    return (
        <React.Fragment>
            <Description />
            <Segment />
            <SegmentDetails />
            <GuestBook />
        </React.Fragment>
    )

}
export default Content;