const Footer = () => (
  <footer className="relative mt-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
      <div className="bg-gradient-to-tr from-indigo-600/20 to-pink-500/20 backdrop-blur-md ring-1 ring-white/10 rounded-full px-5 py-2 text-center text-sm text-white/70 animate-fade-in">
        Made by{' '}
        <a
          href="https://github.com/arindal1"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white underline hover:text-indigo-200 transition"
        >
          @arindal
        </a>{' '}
        – 2025
      </div>
    </div>
  </footer>
);

export default Footer;
