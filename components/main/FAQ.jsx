import FAQItem from "../reusable/FAQItem";
async function fetchFaqs() {
  const res = await fetch("http://localhost:3000/api/faqs", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }
  const data = await res.json();
  return data.data;
}

const FAQ = async () => {
  const faqs = await fetchFaqs();
  const FAQS = faqs.map((question, index) => {
    return (
      <FAQItem
        key={index}
        title={question.title}
        description={question.description}
        style={
          index === faqs.length - 1
            ? {
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              }
            : index === 0
            ? {
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }
            : null
        }
      />
    );
  });
  return (
    <div className="py-[24px] flex flex-col gap-[24px]">
      <div className="h5 text-gray-8">أسئلة متكررة</div>
      <div className="rounded-[8px] -space-y-[1px]">{FAQS}</div>
    </div>
  );
};
export default FAQ;
