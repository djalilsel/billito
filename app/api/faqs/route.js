import { NextResponse } from "next/server";

const questions = [
  {
    title: "ما هي كمية الأمتعة المسموح بها لكل رحلة؟",
    description:
      "تختلف كمية الأمتعة المسموح بها حسب شركة الطيران، نوع التذكرة، ووجهة السفر. عادةً، يُسمح للمسافرين على الدرجة الاقتصادية بحمل حقيبة يد واحدة بوزن محدد (يتراوح بين 7-10 كجم) وحقيبة شحن بوزن يتراوح بين 20-30 كجم. ينصح بالتحقق من سياسة الأمتعة المحددة لشركة الطيران التي تسافر معها.",
  },
  {
    title: "ما هو سعر تذكرة الطيران للرضع والأطفال أقل من 12 سنة؟",
    description:
      "أسعار تذاكر الطيران للرضع والأطفال تختلف حسب شركة الطيران وسياسة التسعير الخاصة بها. عادةً، يحصل الرضع (أقل من سنتين) على خصم كبير أو يسافرون مجانًا، بينما يحصل الأطفال (من سنتين إلى أقل من 12 سنة) على خصم معين على سعر التذكرة العادية. يفضل التحقق من موقع شركة الطيران أو موقع بيليتو للحصول على الأسعار الدقيقة.",
  },
  {
    title: "هل من الممكن إرجاع تذكرة الطائرة بعد شرائها عبر الإنترنت؟",
    description:
      "نعم، يمكن إرجاع تذكرة الطائرة بعد شرائها عبر الإنترنت، ولكن هذا يعتمد على سياسة شركة الطيران وشروط التذكرة المشتراة. بعض التذاكر تكون غير قابلة للإرجاع أو قد تفرض رسومًا على الإرجاع. يفضل مراجعة شروط التذكرة وسياسة الإرجاع قبل الشراء.",
  },
  {
    title: "هل يمكن تغيير الاسم أو اللقب بعد شراء تذكرة الطائرة؟",
    description:
      "تغيير الاسم أو اللقب بعد شراء تذكرة الطائرة ممكن في بعض الحالات، ولكن يعتمد على سياسة شركة الطيران. بعض الشركات تتيح التعديل البسيط مثل تصحيح الأخطاء الإملائية، بينما قد تفرض شركات أخرى رسومًا على التغييرات. يجب الاتصال بخدمة العملاء لشركة الطيران أو موقع بيليتو للحصول على المساعدة.",
  },
  {
    title:
      "عندما نقوم بحجز تذكرة من الموقع، هل من الممكن اختيار المقعد الذي نريده؟",
    description:
      "نعم، يمكن اختيار المقعد عند حجز التذكرة عبر موقع بيليتو، ولكن يعتمد ذلك على سياسة شركة الطيران ونوع التذكرة. بعض الشركات توفر هذه الخدمة مجانًا، بينما قد تفرض رسومًا إضافية على اختيار المقاعد المميزة مثل المقاعد ذات المساحة الإضافية للساقين.",
  },
  {
    title: "يمكنني البحث وشراء تذاكر الطيران لأي دولة على موقع بيليتو؟",
    description:
      "نعم، يمكنك البحث وشراء تذاكر الطيران لأي دولة على موقع بيليتو، حيث يوفر الموقع مجموعة واسعة من الرحلات من شركات الطيران العالمية والمحلية.",
  },
  {
    title: "كيفية تغيير موعد الرحلة؟",
    description:
      "لتغيير موعد الرحلة، يجب التحقق من سياسة التغيير الخاصة بشركة الطيران أولاً. يمكن أن يتم التغيير عبر موقع بيليتو أو من خلال الاتصال بخدمة العملاء. قد يتم فرض رسوم تغيير بناءً على سياسة الشركة ونوع التذكرة.",
  },
];

export async function GET(request) {
  return NextResponse.json({ data: questions }, { status: 200 });
}
