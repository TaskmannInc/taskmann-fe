import { BiUserVoice } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { TbCashBanknote } from "react-icons/tb";

// FAQ categories
export const FAQCatData = [
  {
    title: "Frequently asked...",
    icon: FaQuestion,
    action: "showFrequentlyAsked",
  },
  {
    title: "Payment & invoice",
    icon: TbCashBanknote,
    action: "showFrequentlyAsked",
  },
  { title: "Deliveries", icon: GrDeliver, action: "showFrequentlyAsked" },
  {
    title: "Returns & Crediting",
    icon: GiReturnArrow,
    action: "showFrequentlyAsked",
  },
  { title: "Complaint", icon: BiUserVoice, action: "showFrequentlyAsked" },
];

/*FAQ Categorical data*/
export const RegistrationQuestionsAnswers__ = [
  {
    id: 1,
    question: "How do I register? ",
    answer: "You can register by...",
  },
];

export const AccountRelatedQuestionsAnswers__ = [
  {
    id: 1,
    question: "What is My Account?  ",
    answer: "My Account is the section you reach after you log in ...",
  },
];

export const OrderRelatedQuestionsAnswers__ = [
  {
    id: 5,
    question: "What You Receive Is What You Pay For ",
    answer: "Some answer here",
  },
];

export const PaymentsQuestionsAnswers__ = [
  {
    id: 1,
    question: "What are the modes of payment? ",
    answer: "Some answer here",
  },
];

export const CustomerQuestionsAnswers__ = [
  {
    id: 1,
    question: "Quality Guarantee? ",
    answer: "Some answer here",
  },

  {
    id: 2,
    question: "Return & Refund",
    answer: "Some answer here",
  },
  {
    id: 3,
    question: "Return Policy - Time Limits: ",
    answer: "Some answer here",
  },
];

export const DeliveryQuestionsAnswers__ = [
  {
    id: 1,
    question: "When will I receive my order? ",
    answer: "Some answer here",
  },
];

export const OthersQuestionsAnswers__ = [
  {
    id: 1,
    question: "Do you have offline offices? ",
    answer: "Some answer here",
  },
];
