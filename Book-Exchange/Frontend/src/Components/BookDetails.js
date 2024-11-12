import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-book/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Book not found");
    }
  };

  const getGenreDescription = (genre) => {
    const genreDescriptions = {
      Thriller:
        "Thrillers are characterized by suspense, excitement, and intense moments that keep the reader on the edge of their seat. These books often involve high-stakes situations, mysterious events, and unexpected twists, typically featuring protagonists who must overcome danger or unravel a complex mystery.",
      Horror:
        "Horror books aim to elicit fear, dread, or disgust from readers. They often include supernatural elements such as ghosts, monsters, or dark forces, as well as intense psychological terror. The genre explores the darkest aspects of human nature and the unknown, often pushing characters into terrifying situations that test their survival instincts.",
      Comedy:
        "Comedy books are written to entertain and amuse. These works often feature humorous situations, witty dialogue, and quirky characters. The goal of a comedy is to make the reader laugh and feel uplifted, while poking fun at everyday situations, societal norms, or exaggerated character traits. Comedies often have happy endings and can range from light-hearted to satirical.",
      Biopic:
        "Biopics, or biographical novels, are stories based on the real lives of individuals, either historical or contemporary. These books focus on the personal experiences, struggles, and accomplishments of the subject, often offering an in-depth look at their character and motivations. Biopics can be inspirational, educational, or even tragic, as they tell the tale of someone who made an impact on the world.",
      Inspiring:
        "Inspiring books are designed to uplift, motivate, and encourage readers. They often tell the stories of individuals who overcome great odds to achieve success or happiness. These works emphasize themes of personal growth, resilience, and hope, aiming to provide readers with a sense of purpose and empowerment.",
      Knowledgeable:
        "Knowledgeable books offer insight, education, and information on various topics, from science and history to culture and technology. These books are often non-fiction and aim to inform or broaden the reader’s understanding of the world. Knowledgeable books can be highly detailed and research-driven, catering to curious minds looking to learn something new.",
      Technology:
        "Books in the technology genre delve into the world of innovation, gadgets, and the digital age. They often explore the impact of technology on society, the future of tech, or fictional accounts of groundbreaking technological advances. Technology books can range from educational, non-fiction works about coding and hardware to speculative fiction about AI and robotics.",
      Science:
        "The science genre includes books that explore scientific principles, discoveries, and ideas. These books can be non-fiction works that explain topics in biology, physics, astronomy, or chemistry, or they can be science fiction stories that imagine the future of science and technology. The genre often seeks to educate or inspire curiosity about the natural world and the universe.",
      Maths:
        "Math books delve into the world of numbers, formulas, and problem-solving. These works can be both educational and practical, helping readers understand mathematical concepts or apply them to real-world scenarios. They may include topics like algebra, geometry, calculus, or statistics. The genre can be approachable or deeply academic, depending on the level of complexity.",
      Comics:
        "The comics genre refers to graphic novels and comic books that combine visual art and storytelling. These books are typically characterized by sequential art, with panels of drawings accompanied by dialogue and narration. Comics can cover any genre and are often known for their colorful, dynamic visuals and creative illustrations.",
      Spiritual:
        "Spiritual books focus on the exploration of the soul, personal growth, and the search for meaning in life. These books often draw on religious or philosophical traditions, offering wisdom on topics like meditation, mindfulness, and inner peace. They may provide guidance on how to live a fulfilling life, seek enlightenment, or find spiritual connection.",
    };

    return (
      genreDescriptions[genre] || "No description available for this genre."
    );
  };

  const getStarRating = (condition) => {
    const ratings = {
      "Very Good": 5,
      "Good": 4,
      "Average": 3,
      "Usable": 2,
      "Bad": 1,
    };
    return ratings[condition] || 0;
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`/user-images/${book.imagePath}.jpg`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-400">
                  Title:{" "}
                  <span className="text-gray-900">{book.title}</span>
                </h2>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-400">
                  Author:{" "}
                  <span className="text-gray-900">{book.author}</span>
                </h2>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-400">
                  Genre:{" "}
                  <span className="text-gray-900">{book.genre}</span>
                </h2>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-400">
                  Condition:
                </h2>
                <span className="text-gray-900">{book.condition}</span>
                <div className="flex">
                  {[...Array(getStarRating(book.condition))].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                  {[...Array(5 - getStarRating(book.condition))].map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-400">
                  Status:{" "}
                  <span className="text-gray-900">{book.status}</span>
                </h2>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-400">Description:</h2>
                <p className="leading-relaxed text-gray-700 mt-2">
                  {getGenreDescription(book.genre)}
                </p>
              </div>
              <div className="flex gap-5 mt-6">
                <button className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                  Button
                </button>
                <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
