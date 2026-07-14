import { quotes } from "../data/quotes";
import { Quote } from "../types/quote";

export function getQuoteOfTheDay(): Quote {
    const today = new Date();

    const day = 
    Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); 

    return quotes[day % quotes.length];
}

export function getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}