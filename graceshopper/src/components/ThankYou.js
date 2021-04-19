import './ThankYou.css'

const ThankYou = () => {

    return (
        <center>

        
        <section className="thankYouPage">

        
        <div className="thankYouMessage">
            
            <div className="info"> 
            <h3 className="thankYou"> Thank You! </h3>
            <h2 className="orderInfo"> You have successfuly completed your order. </h2>
            <p className="expect"> Expect an email within 24 hours </p>
            <img className="angelBoy" src="https://i.pinimg.com/originals/36/52/e7/3652e7bae997f73f9139265ac92dc0aa.png"/>
            <div className="customerService">
                <p > Experiencing problems?</p>
                <p> We can save the day! </p>
                <p> Please contact us at 
                    <div className="phoneNumber">
                    1-800-GAME-HEAVEN 
                    </div>
                </p>
            </div>
            
            </div>
            
        </div>
        </section>
        </center>
    )

}

export default ThankYou;