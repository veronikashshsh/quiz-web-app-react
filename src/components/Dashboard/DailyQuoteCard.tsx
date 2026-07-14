import { DailyQuoteCardProps, Quote } from "../../types/quote";

const DailyQuoteCard = ({ quote }: DailyQuoteCardProps) => {
  return (
    <div className="bg-indigo-700 text-white rounded-2xl p-6 shadow mb-5">
      <p className="text-lg italic leading-relaxed">
        "{quote.text}"
      </p>

      <p className="mt-4 text-right text-indigo-100">
        — {quote.author}
      </p>
    </div>
  );
};

export default DailyQuoteCard;