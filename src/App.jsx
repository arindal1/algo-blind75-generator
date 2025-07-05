import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import DownloadButton from "./components/DownloadButton";
import PreviewTable from "./components/PreviewTable";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative isolate overflow-hidden bg-neutral-950 text-white min-h-screen">
      {/* Top Blob */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-fuchsia-500 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>



      {/* Main Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="rounded-2xl transition-all duration-300 ease-in-out overflow-hidden">
          <Header />
          <StatsGrid />
          <DownloadButton />
          <PreviewTable />
        </div>
      </div>

      {/* More Blobs */}
      <div
        className="absolute left-8 bottom-1/4 -z-20 transform-gpu overflow-hidden blur-2xl"
        aria-hidden="true"
      >
        <div
          className="w-56 h-56 bg-gradient-to-tl from-indigo-500 to-teal-400 opacity-25 rounded-full rotate-45"
        />
      </div>

      {/* Bottom Blob */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-500 to-violet-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1>)",
          }}
        />
      </div>

      <Footer />
    </main>
  );
}

export default App;
