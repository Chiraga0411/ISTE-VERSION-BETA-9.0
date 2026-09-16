
export default function HackathonButton() {
  return (
    <a
      href="https://devfolio.co"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-[#3770FF] text-white hover:bg-[#2563EB] transition-colors"
      style={{ 
        width: '235px',
        height: '49x', 
        borderRadius: '7px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: '17px',
        fontWeight: 400,
        textDecoration: 'none'
      }}
      aria-label="Apply with Devfolio"
    >
      <img src="/images/devfolio.png" alt="Devfolio" className="w-11 h-11 mr-3" />
      Apply with Devfolio
    </a>
  );
}
