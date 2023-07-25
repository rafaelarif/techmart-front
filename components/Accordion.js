import React, {useState} from 'react';
import styled from 'styled-components';
import Title from "@/components/Title";
import {useLang} from './LangContext';

const textPrimary = "#0072CE";
const textSecondary = "#647780";
const white = "#ffffff";

const Container = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const AccordionFAQ = styled.div`
  margin-bottom: 20px;
  padding: 0px 15px;
  background-color: ${white};
  border-radius: 5px;
  cursor: pointer;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: ${props => props.active ? textPrimary : textSecondary};
    user-select: none;
  }
  div {
    user-select: none;
  }
`;

const AccordionContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  p {
    margin: 0px;
    padding-bottom: 20px;
    color: ${textSecondary};
    line-height: 1.4;
  }
`;

const dataCollection = [
    {
        question: 'What is TechMart?',
        answer: 'TechMart is an ecommerce website specializing in a wide range of electronics. We carry products from many of the leading global technology brands.'
    },
    {
        question: 'What payment methods does TechMart accept?',
        answer: 'We accept all major credit and debit cards including Visa, Mastercard and American Express.'
    },
    {
        question: 'How long will it take for my order to arrive?',
        answer: 'Delivery time depends on your location and the shipping method you have chosen. However, most orders within the continental U.S. will arrive within 5-7 business days. For more accurate estimates, please refer to the shipping information provided at checkout.'
    },
    {
        question: 'Can I return or exchange a product I purchased?',
        answer: 'Yes, we have a 30-day return policy for most items sold on TechMart, provided they are returned in their original condition and packaging. Some exclusions may apply, such as for clearance or open-box items.'
    },
    {
        question: 'What if my product is damaged or defective?',
        answer: 'If you receive a damaged or defective item, please contact our customer service team immediately. We will arrange for a return or exchange, and we will work to resolve the issue as quickly as possible.'
    },
    {
        question: 'How secure is my personal information on TechMart?',
        answer: 'TechMart takes customer privacy and security very seriously. We use industry-standard encryption methods to protect your personal information. We will never sell or distribute your personal information to third parties without your explicit consent.'
    },
    {
        question: 'How can I contact TechMart if I have more questions?',
        answer: 'If you have any questions or need further assistance, you can reach out to our customer service team via our email at support@techmart.com. Our aim is to respond to all queries within 24 hours.'
    }
];

function Accordion() {
    const [accordion, setActiveAccordion] = useState(-1);
    const {lang, translations} = useLang();

    const dataCollection = translations[lang].faqData;

    function toggleAccordion(index) {
        if (index === accordion) {
            setActiveAccordion(-1);
            return
        }
        setActiveAccordion(index);
    };

    return (
        <Container>
            <Title>{translations[lang].faqTitle}</Title>
            {dataCollection.map((item, index) =>
                <AccordionFAQ key={index} onClick={() => toggleAccordion(index)} id={`accordion-${index}`}>
                    <AccordionHeader active={accordion === index}>
                        <h3 id={`header-${index}`}>{item.question}</h3>
                        <div aria-labelledby={`header-${index}`} aria-expanded={accordion === index} aria-controls={`content-${index}`}>
                            {accordion === index ?
                                <span className="verticle">-</span> : <span className="horizental">+</span>}
                        </div>
                    </AccordionHeader>
                    <AccordionContent active={accordion === index} id={`content-${index}`} aria-labelledby={`header-${index}`} role="region">
                        <p>{item.answer}</p>
                    </AccordionContent>
                </AccordionFAQ>
            )}
        </Container>
    );
}

export default Accordion;