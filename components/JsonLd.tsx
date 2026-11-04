/*
  JSON-LD from site-inputs/seo/SCHEMA-PLAN.md. Emits nothing until the domain is known (I6): no block
  containing {{SITE_URL}} or any "{{" ever ships, and Review, AggregateRating, Rating and Quotation
  nodes are refused (the testimonial is page text only). Throws on either, so the build fails.
*/

export function JsonLd({ data }: { data: object | null }) {
  if (!data || !process.env.SITE_URL) return null;
  const json = JSON.stringify(data);
  if (json.includes('{{')) throw new Error('JSON-LD still contains a {{ token');
  if (/"@type":\s*"(Review|AggregateRating|Rating|Quotation)"/.test(json)) throw new Error('Review or Quotation markup is not allowed');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }} />;
}
