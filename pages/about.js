// pages/about.js
export default function About() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-6 text-[var(--gold)]">
        About The Culinary World Gazette
      </h1>
      <div className="prose max-w-none text-black">
        <h2>Mission</h2>
        <p>
          To discover, recognize, and share the world’s best restaurants and
          chefs—guiding travelers and diners to unforgettable culinary
          experiences.
        </p>

        <h2>Vision</h2>
        <p>
          To become the most trusted global voice in gastronomy, where every
          reader finds inspiration to explore new flavors, cultures, and
          destinations through food.
        </p>

        <h2>Values</h2>
        <ul>
          <li>
            <b>Excellence:</b> We highlight chefs and restaurants that set the
            highest standards in taste, craft, and service.
          </li>
          <li>
            <b>Discovery:</b> We uncover hidden gems and celebrated icons,
            giving readers authentic insight into where the world eats best.
          </li>
          <li>
            <b>Inspiration:</b> We aim to inspire journeys—whether across the
            globe or within one’s own city—through food and culture.
          </li>
          <li>
            <b>Integrity:</b> Every recommendation is based on genuine quality
            and culinary merit, not trends or hype.
          </li>
        </ul>

        <h2>Our Promise</h2>
        <p>
          The Culinary World Gazette is more than a guide—it is a curated
          experience. Each article connects readers to the people, places, and
          stories that define the future of dining.
        </p>
      </div>

      <div className="mt-10">
        <a
          href="/"
          className="inline-block rounded-lg border border-[var(--gold)] text-[var(--gold)] px-5 py-2 hover:bg-[var(--gold)] hover:text-black transition"
        >
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}
