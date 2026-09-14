import { Zap } from 'lucide-react';
import './HackathonButton.css';

export default function HackathonButton() {
  return (
    <a
      className="hackathon-btn"
      href="https://devfolio.co"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label="Apply with Devfolio"
    >
      <span className="hackathon-btn__glow" />
      <span className="hackathon-btn__scanline" />
      <span className="hackathon-btn__icon" aria-hidden="true">
        <Zap className="h-5 w-5" />
      </span>
      <span className="hackathon-btn__text">Apply with Devfolio</span>
    </a>
  );
}
