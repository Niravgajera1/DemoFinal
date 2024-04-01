import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";
import Main from "./main/page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="relative flex flex-col mt-6 text-gray-700 bg-grey shadow-md bg-clip-border rounded-xl w-96">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt="card-image"
          />
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to "Naviglio" where you can enjoy the main night life
            in Barcelona.
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
            type="button"
          >
            Read More
          </button>
        </div>
        <div>Hello word</div>
        <div>hello cksnjsdndjcdpn</div>
      </div>
      <Footer />
    </main>
  );
}
