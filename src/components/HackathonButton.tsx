
export default function HackathonButton() {
  return (
    <a
      href="https://devfolio.co"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-[#3770FF] text-white font-semibold text-lg hover:bg-[#2563EB] transition-colors"
      style={{ width: '312px', height: '44px', borderRadius: '3px' }}
      aria-label="Apply with Devfolio"
    >
      <svg className="w-6 h-6 mr-2" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M114.5 57.25C114.5 88.8683 88.8683 114.5 57.25 114.5C25.6317 114.5 0 88.8683 0 57.25C0 25.6317 25.6317 0 57.25 0C88.8683 0 114.5 25.6317 114.5 57.25Z" fill="#3770FF"/>
        <path d="M72.2965 37.0398H45.865C43.1979 37.0398 41.0398 39.1979 41.0398 41.865V75.635C41.0398 78.3021 43.1979 80.4602 45.865 80.4602H72.2965C84.2753 80.4602 93.993 70.7425 93.993 58.7637C93.993 46.7849 84.2753 37.0398 72.2965 37.0398Z" fill="white"/>
      </svg>
      Apply with Devfolio
    </a>
  );
}
