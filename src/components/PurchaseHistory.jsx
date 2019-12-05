import React, {Component} from 'react';
import * as EventService from "../services/EventService";

class PurchaseHistory extends Component {

    state = {
        loadingDone: false,
        history: []
    };

    getHistory = async () => {
        console.log("getHistory:");

        const {data: response} = await EventService.getPurchaseHistory();

        console.log("data received :" + response);

        this.setState({
            loadingDone: true,
            history: response
        });

    }

    render() {
        const token = localStorage.getItem("idToken");
        if (!token) {
            return (<div> Please login see your Booking history !!!!!</div>);
        }

        if (!this.state.loadingDone) {
            return (<div> Loading !!!!!</div>);
        }
        if (this.state.history == null || this.state.history.length < 1 ) {
            return (<div> No Booking History  !!!!!</div>);
        }

        let purchaseHistory = this.state.history.map(record=>{
            const {event,createdDate} = record
            // const recordDate = Date.parse(createdDate)
            let recordDate = new Date(createdDate).toLocaleString()

            if (event == null)
                return ( <div/>)
                return(
                    <li className="collection-item avatar" key={record.id}>
                        <div className="item-img">
                            <img src={event.imageUrl} alt={event.imageUrl} />
                        </div>

                        <div className="item-desc">
                            <span className="title">{record.description}</span>
                            <p><b>  Price: $ {record.price}</b></p>
                            <p><b>  Quantity: {record.quantity}</b></p>
                            <p><b>  Time of Booking : { recordDate }</b></p>
                            <p><b>  Booking Id: { record.id }</b></p>
                            <br/>
                            <br/>
                            <br/>



                        </div>
                    </li>
                )
            })

        return (
            <div className="container">
                <div className="cart">
                    <ul className="collection"> {purchaseHistory} </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log("Fetching Purchase History ");
        this.getHistory()
    }
}

export default PurchaseHistory;