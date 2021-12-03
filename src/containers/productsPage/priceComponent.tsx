import React, { ReactElement } from "react";
import { Price } from "../../intrefaces/productsInterface";
import { getPriceUnit } from "../../Utils";

interface PriceComponentProps {
    priceArray: Price[];
}


function PriceComponent(props: PriceComponentProps): ReactElement {
    return <div>
        <h1>{props.priceArray[0].amount} {getPriceUnit(props.priceArray[0].billingFrequency)}</h1>
        {props.priceArray[1] && <span>From {props.priceArray[1].periodStart} month {props.priceArray[1].amount} {getPriceUnit(props.priceArray[1].billingFrequency)}</span>}
    </div>
}

export default PriceComponent;
