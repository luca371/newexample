import { useRef, useState } from "react";
import "./App.css";

function App() {
  const audioRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [rating, setRating] = useState(0);

  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.play().catch(() => {});

    setStarted(true);
    setFireworks(true);
  };

  const submitRating = () => {
    window.location.reload();
  };

  return (
    <div className="wrapper">
      {/* Background audio */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/sound/bg.mp3`}
        loop
      />

      {/* Images */}
      <div className="container">
        <img
          src={`${process.env.PUBLIC_URL}/images/img1.png`}
          alt="img1"
          className="image slide delay1"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/img2.png`}
          alt="img2"
          className="image slide delay2"
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/img3.png`}
          alt="img3"
          className="image slide delay3"
        />
      </div>

      {/* Main text */}
      <p className="text">
        Șefii mei m-au trimis să văd dacă știi sistemul ăsta nebun.
      </p>

      {/* Start button */}
      {!started && (
        <button
          className="audio-button button-appear"
          onClick={startAudio}
        >
          Apasă dacă ai tupeu
        </button>
      )}

      {/* Fireworks */}
      {fireworks && (
        <div className="fireworks-layer">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      )}

      {/* ⭐ Rating — appears ONLY after button click */}
      {started && (
        <div className="rating-container rating-appear">
          <p className="rating-title">Dă o notă șefule</p>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <button
            className="submit-rating"
            onClick={submitRating}
            disabled={rating === 0}
          >
            Trimite
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
