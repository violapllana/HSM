import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Vendos këtë jashtë JSX
const departments = [
  { name: "Emergency Department", icon: "/images/emergency-img.png" },
  { name: "Pediatric Department", icon: "/images/pediatrics-img.png" },
  { name: "Obstetrics and Gynaecology", icon: "/images/gynecology-img.png" },
  { name: "Cardiology Department", icon: "/images/cardiology-img.png" },
  { name: "Neurology Department", icon: "/images/neurology-img.png" },
  { name: "Psychiatry Department", icon: "/images/pyschiatry-img.png" },
];

const doctors = [
  { name: "Dr. Albert", position: "Cardiologist", image: "/images/albert.png" },
  { name: "Dr. Suela", position: "Pediatrician", image: "/images/suela-img.png" },
  { name: "Dr. Joni", position: "Neuro Specialist", image: "/images/joni-img.png" },
];


const Home = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Your Partner in Health and Wellness</h1>
            <p className="mb-6 text-lg max-w-md">
              We are committed to providing you with the best medical and healthcare services to help you live healthier and happier
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100">
              BOOK AN APPOINTMENT
            </button>
          </div>
          <img src="/images/doctor_home1.png" alt="Doctors" className="w-80 mt-10 md:mt-0" />
        </div>
      </section>

      <section className="py-12 bg-white">
  <h2 className="text-3xl font-bold text-center mb-10">Departments</h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto px-4">
    {departments.map((dept) => (
      <div
        key={dept.name}
        className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
      >
        <img src={dept.icon} alt="icon" className="mx-auto h-12 mb-2" />
        <p className="font-medium">{dept.name}</p>
      </div>
    ))}
  </div>
</section>


  {/* Doctors Section */}
<section className="py-12 bg-gradient-to-r from-blue-100 to-purple-100">
  <h2 className="text-3xl font-bold text-center mb-10">Our Dedicated Doctors Team</h2>
  <div className="flex justify-center gap-10 flex-wrap">
    {doctors.map(({ name, position, image }) => (
      <div key={name} className="bg-white rounded-lg shadow-md p-4 text-center w-48 hover:shadow-lg transition">
        <img src={image} alt={name} className="rounded-full w-24 h-24 mx-auto mb-2 object-cover" />
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{position}</p>
        <button className="mt-2 text-sm text-blue-500 underline">View Profile</button>
      </div>
    ))}
  </div>
</section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Don’t Let Your Health Take a Backseat!</h2>
            <p className="mb-4">Schedule an appointment with one of our experienced medical professionals today!</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">Book Now</button>
          </div>
          <img src="/images/Ellipse13.png" alt="Doctor" className="w-40 mt-6 md:mt-0 md:w-52 rounded-full" />
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>
        <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          <input placeholder="Name" className="p-2 border rounded" />
          <input placeholder="Phone Number" className="p-2 border rounded" />
          <input placeholder="Preferred Date" type="date" className="p-2 border rounded" />
          <input placeholder="Preferred Time" type="time" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Reason for Visit</option>
            <option>Consultation</option>
            <option>Follow-up</option>
          </select>
          <select className="p-2 border rounded">
            <option>Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
          </select>
          <button className="col-span-1 md:col-span-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
            Submit
          </button>
        </form>
      </section>
{/* Values Section */}
<section className="py-12 bg-gray-100">
  <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
    {[
      {
        title: "Respect",
        desc: "We treat all individuals with respect and dignity.",
        icon: "/images/respect-icon.png",
      },
      {
        title: "Compassion",
        desc: "We strive to create a supportive environment.",
        icon: "/images/c.png",
      },
      {
        title: "Excellence",
        desc: "We are committed to providing excellent care.",
        icon: "/images/Vector.png",
      },
      {
        title: "Teamwork",
        desc: "We believe in working collaboratively.",
        icon: "/images/teamwork.png",
      },
      {
        title: "Integrity",
        desc: "We believe in practicing medicine with honesty.",
        icon: "/images/integrity.png",
      },
    ].map(({ title, desc, icon }) => (
      <div
        key={title}
        className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center hover:shadow-xl transition duration-300"
      >
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    ))}
  </div>
</section>



      <Footer />
    </>
  );
};

export default Home;
