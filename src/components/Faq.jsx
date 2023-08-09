import { useState } from "react"
import HomeImages from "../constants/HomeImages"

export default function Faq( {styles} ){
    const[selected, setSelected] = useState(null)

    const toggle = (i) => {
        console.log(selected)
        if(selected === i){
        return setSelected(null)
        }

        setSelected(i)
    }

    const promptAnswer = [
        {
          prompt: 'What is Zara?',
          answer: 'Zara, by Preptify, is an advanced AI-powered platform for comprehensive career preparation, aiding job seekers to effectively prepare for interviews and improve soft skills.'
        },
        {
          prompt: 'Is ZARA only for software engineering?',
          answer: 'Currently, yes. However, very soon we\'ll expand Zara to assist with a variety of job roles and industries, not just software engineering.'
        },
        {
          prompt: 'Do I need to pay to use Zara?',
          answer: 'Nope! Zara is available as part of our two-tier system. While we offer a basic version, there\'s also a paid subscription called Zara Green. A premium tier with advanced features is launching soon. For detailed pricing, please visit our Pricing Page.'
        },
        {
          prompt: 'What\'s your cancellation policy?',
          answer: 'Users can cancel their subscription anytime. Upon cancellation, access will continue until the end of the billing cycle. No refunds for partial months.'
        },
        {
          prompt: 'Who can I contact for support or more information?',
          answer: 'For any queries, issues, or more details, feel free to reach out to our support team at preptifyco@gmail.com. We\'re here to help!'
        },
    ]
    
    return <div className={styles["home-block-4"]}>
        <img
            className={styles["faq-squiggle"]}
            src={HomeImages.squiggle}
            alt="Squiggle"
            >
        </img>
        <img
            className={styles["faq-arrow-squiggle"]}
            src={HomeImages.arrow_squiggle}
            alt="Arrow-squiggle"
            >
        </img>
        <h1 className={styles["faq"]}>
        frequently asked <span className={styles["faq-highlight"]}><br/>questions.</span>
        <h2 className={styles['faq-sub']}>things that are commonly <br/>asked.</h2>
        </h1>
        <div className={styles["faq-accordian"]}>
            {promptAnswer.map((item, i) => (
                <div className={selected === i ? styles['faq-item-show'] : styles['faq-item']} onClick={() => toggle(i)}>
                    <img
                        className={styles["faq-arrow"]}
                        src={selected === i ? HomeImages.faq_up_arrow : HomeImages.faq_down_arrow}
                        alt="faq_up_arrow"
                        >
                    </img>
                <div className="faq-container">
                    <div className={selected === i ? styles['faq-title-show'] : styles['faq-title']}>                  
                        <h2 className={styles['faq-prompt']}>{item.prompt}</h2>
                    </div>
                    <div className={selected === i ? styles['faq-content-show'] : styles['faq-content']}>
                        {item.answer}
                    </div>
                </div>
                </div>
            ))}
        </div>
    </div>
}